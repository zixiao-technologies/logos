//! Java Language Adapter
//!
//! Pragmatic indexer for Java:
//! - Symbols: classes/interfaces/enums, methods, fields (best-effort)
//! - Imports: import declarations
//! - Exports: public/protected treated as exported (best-effort)
//! - Calls: method_invocation nodes (best-effort)

use crate::adapter::{AnalysisResult, CallInfo, ImportInfo, ImportItem, LanguageAdapter, SymbolBuilder, make_location};
use crate::symbol_table::{SymbolId, Visibility};
use logos_core::{Position, Range, SymbolKind};
use std::path::Path;
use tree_sitter::{Node, Parser, Tree};

pub struct JavaAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl JavaAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_java::LANGUAGE.into())
            .map_err(|e| format!("Failed to set Java language: {}", e))?;
        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl LanguageAdapter for JavaAdapter {
    fn language_id(&self) -> &str {
        "java"
    }

    fn file_extensions(&self) -> &[&str] {
        &["java"]
    }

    fn analyze(&self, uri: &str, source: &str) -> AnalysisResult {
        let tree = match self.parse(source) {
            Some(t) => t,
            None => return AnalysisResult::default(),
        };

        let mut ctx = AnalysisContext {
            uri: uri.to_string(),
            source,
            result: AnalysisResult::default(),
            scope_stack: Vec::new(),
        };

        analyze_node(&tree.root_node(), &mut ctx);
        ctx.result
    }

    fn resolve_import(&self, from_file: &Path, import_path: &str) -> Option<std::path::PathBuf> {
        // Java imports are classpaths; don't resolve to files here.
        let _ = (from_file, import_path);
        None
    }
}

struct AnalysisContext<'a> {
    uri: String,
    source: &'a str,
    result: AnalysisResult,
    scope_stack: Vec<ScopeInfo>,
}

struct ScopeInfo {
    symbol_id: SymbolId,
    name: String,
}

impl<'a> AnalysisContext<'a> {
    fn get_text(&self, node: &Node) -> String {
        self.source[node.byte_range()].to_string()
    }

    fn current_scope(&self) -> Option<&ScopeInfo> {
        self.scope_stack.last()
    }

    fn qualified_name(&self, name: &str) -> String {
        if self.scope_stack.is_empty() {
            name.to_string()
        } else {
            let prefix: Vec<_> = self.scope_stack.iter().map(|s| s.name.as_str()).collect();
            format!("{}.{}", prefix.join("."), name)
        }
    }
}

fn has_modifier(node: &Node, ctx: &AnalysisContext, modifier: &str) -> bool {
    // best-effort: scan children for modifier token
    for i in 0..node.child_count() {
        if let Some(ch) = node.child(i) {
            if ctx.get_text(&ch) == modifier {
                return true;
            }
        }
    }
    false
}

fn visibility_and_export(node: &Node, ctx: &AnalysisContext) -> (Visibility, bool) {
    if has_modifier(node, ctx, "public") {
        (Visibility::Public, true)
    } else if has_modifier(node, ctx, "protected") {
        (Visibility::Protected, true)
    } else if has_modifier(node, ctx, "private") {
        (Visibility::Private, false)
    } else {
        // package-private
        (Visibility::Private, false)
    }
}

fn analyze_node(node: &Node, ctx: &mut AnalysisContext) {
    match node.kind() {
        "import_declaration" => analyze_import(node, ctx),

        "class_declaration" => analyze_class(node, ctx, SymbolKind::Class),
        "interface_declaration" => analyze_class(node, ctx, SymbolKind::Interface),
        "enum_declaration" => analyze_class(node, ctx, SymbolKind::Enum),

        "method_declaration" => analyze_method(node, ctx),
        "constructor_declaration" => analyze_constructor(node, ctx),
        "field_declaration" => analyze_field(node, ctx),

        "method_invocation" => analyze_call(node, ctx),

        _ => {
            for i in 0..node.named_child_count() {
                if let Some(child) = node.named_child(i) {
                    analyze_node(&child, ctx);
                }
            }
        }
    }
}

fn analyze_import(node: &Node, ctx: &mut AnalysisContext) {
    // import foo.bar.Baz;
    let text = ctx.get_text(node);
    let module_path = text
        .trim()
        .trim_start_matches("import")
        .trim_end_matches(';')
        .trim()
        .to_string();
    if module_path.is_empty() {
        return;
    }
    ctx.result.imports.push(ImportInfo {
        module_path: module_path.clone(),
        items: vec![ImportItem {
            name: module_path,
            alias: None,
            is_type: true,
        }],
        is_type_only: true,
        location: node_to_range(node),
    });
}

fn analyze_class(node: &Node, ctx: &mut AnalysisContext, kind: SymbolKind) {
    let name_node = node.child_by_field_name("name");
    let name_node = match name_node {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let (visibility, exported) = visibility_and_export(node, ctx);

    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
    let sym = SymbolBuilder::new(name.clone(), kind, location)
        .visibility(visibility)
        .exported(exported)
        .qualified_name(ctx.qualified_name(&name))
        .build();
    let id = sym.id;
    ctx.result.symbols.push(sym);

    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo { symbol_id: id, name });
        for i in 0..body.named_child_count() {
            if let Some(child) = body.named_child(i) {
                analyze_node(&child, ctx);
            }
        }
        ctx.scope_stack.pop();
    }
}

fn analyze_method(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name_node = match name_node {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let (visibility, exported) = visibility_and_export(node, ctx);

    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
    let sym = SymbolBuilder::new(name.clone(), SymbolKind::Method, location)
        .parent(ctx.current_scope().map(|s| s.symbol_id).unwrap_or(SymbolId(0)))
        .visibility(visibility)
        .exported(exported)
        .qualified_name(ctx.qualified_name(&name))
        .build();
    ctx.result.symbols.push(sym);

    // Recurse into body for calls
    if let Some(body) = node.child_by_field_name("body") {
        analyze_node(&body, ctx);
    }
}

fn analyze_constructor(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name_node = match name_node {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let (visibility, exported) = visibility_and_export(node, ctx);

    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
    let sym = SymbolBuilder::new(name.clone(), SymbolKind::Constructor, location)
        .parent(ctx.current_scope().map(|s| s.symbol_id).unwrap_or(SymbolId(0)))
        .visibility(visibility)
        .exported(exported)
        .qualified_name(ctx.qualified_name(&name))
        .build();
    ctx.result.symbols.push(sym);

    // Recurse into body for calls
    if let Some(body) = node.child_by_field_name("body") {
        analyze_node(&body, ctx);
    }
}

fn analyze_field(node: &Node, ctx: &mut AnalysisContext) {
    // Grab variable declarators (name)
    let (visibility, exported) = visibility_and_export(node, ctx);
    for i in 0..node.named_child_count() {
        if let Some(ch) = node.named_child(i) {
            if ch.kind() == "variable_declarator" {
                if let Some(name_node) = ch.child_by_field_name("name") {
                    let name = ctx.get_text(&name_node);
                    let location = make_location(&ctx.uri, node_to_range(&ch), node_to_range(&name_node));
                    let sym = SymbolBuilder::new(name.clone(), SymbolKind::Field, location)
                        .parent(ctx.current_scope().map(|s| s.symbol_id).unwrap_or(SymbolId(0)))
                        .visibility(visibility)
                        .exported(exported)
                        .qualified_name(ctx.qualified_name(&name))
                        .build();
                    ctx.result.symbols.push(sym);
                }
            }
        }
    }
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    // method_invocation has "name" field sometimes; fallback to text.
    let name = node
        .child_by_field_name("name")
        .map(|n| ctx.get_text(&n))
        .unwrap_or_else(|| ctx.get_text(node));
    ctx.result.calls.push(CallInfo {
        callee_name: name.clone(),
        qualified_name: None,
        location: node_to_range(node),
        is_constructor: false,
    });
}

fn node_to_range(node: &Node) -> Range {
    let start = node.start_position();
    let end = node.end_position();
    Range {
        start: Position {
            line: start.row as u32,
            column: start.column as u32,
        },
        end: Position {
            line: end.row as u32,
            column: end.column as u32,
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn java_basic_symbols_imports_calls() {
        let adapter = JavaAdapter::new().unwrap();
        let src = r#"
import java.util.List;

public class User {
  public String name;
  public User(String name) { this.name = name; }
  public void greet() { System.out.println(name); }
}
"#;
        let result = adapter.analyze("file:///User.java", src);
        assert!(result.imports.len() >= 1);
        assert!(result.symbols.iter().any(|s| s.name == "User"));
        assert!(result.symbols.iter().any(|s| s.name == "greet"));
        assert!(result.calls.len() >= 1);
    }
}

