//! Rust Language Adapter
//!
//! Pragmatic indexer for Rust:
//! - Symbols: fn/struct/enum/trait/type/mod/const/static
//! - Imports: use declarations (best-effort string extraction)
//! - Exports: inferred from `pub` visibility (best-effort)
//! - Calls: call_expression (best-effort)

use crate::adapter::{AnalysisResult, CallInfo, ImportInfo, ImportItem, LanguageAdapter, SymbolBuilder, make_location};
use crate::symbol_table::{SymbolId, Visibility};
use logos_core::{Position, Range, SymbolKind};
use std::path::Path;
use tree_sitter::{Node, Parser, Tree};

pub struct RustAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl RustAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_rust::LANGUAGE.into())
            .map_err(|e| format!("Failed to set Rust language: {}", e))?;
        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl LanguageAdapter for RustAdapter {
    fn language_id(&self) -> &str {
        "rust"
    }

    fn file_extensions(&self) -> &[&str] {
        &["rs"]
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
        // Rust `use` paths are module paths, not file paths. Keep default behavior off.
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
            format!("{}::{}", prefix.join("::"), name)
        }
    }
}

fn has_pub_modifier(node: &Node, ctx: &AnalysisContext) -> bool {
    // best-effort: scan immediate children for "pub"
    for i in 0..node.child_count() {
        if let Some(ch) = node.child(i) {
            if ctx.get_text(&ch) == "pub" {
                return true;
            }
        }
    }
    false
}

fn analyze_node(node: &Node, ctx: &mut AnalysisContext) {
    match node.kind() {
        "use_declaration" => analyze_use(node, ctx),

        "function_item" => analyze_fn(node, ctx),
        "struct_item" => analyze_struct(node, ctx),
        "enum_item" => analyze_enum(node, ctx),
        "trait_item" => analyze_trait(node, ctx),
        "type_item" => analyze_type_alias(node, ctx),
        "mod_item" => analyze_mod(node, ctx),
        "const_item" => analyze_const(node, ctx),
        "static_item" => analyze_static(node, ctx),

        "call_expression" => analyze_call(node, ctx),

        _ => {
            for i in 0..node.named_child_count() {
                if let Some(child) = node.named_child(i) {
                    analyze_node(&child, ctx);
                }
            }
        }
    }
}

fn analyze_use(node: &Node, ctx: &mut AnalysisContext) {
    // `use foo::bar as baz;`
    // In Rust grammar, the tree can be nested. We'll grab the whole text as module_path.
    let text = ctx.get_text(node);
    let module_path = text
        .trim()
        .trim_start_matches("use")
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
            is_type: false,
        }],
        is_type_only: false,
        location: node_to_range(node),
    });
}

fn push_symbol(ctx: &mut AnalysisContext, name: String, kind: SymbolKind, node: &Node, name_node: &Node, exported: bool) -> SymbolId {
    let visibility = if exported { Visibility::Public } else { Visibility::Private };
    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(name_node));
    let sym = SymbolBuilder::new(name.clone(), kind, location)
        .parent(ctx.current_scope().map(|s| s.symbol_id).unwrap_or(SymbolId(0)))
        .exported(exported)
        .visibility(visibility)
        .qualified_name(ctx.qualified_name(&name))
        .build();
    let id = sym.id;
    ctx.result.symbols.push(sym);
    id
}

fn analyze_fn(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let id = push_symbol(ctx, name.clone(), SymbolKind::Function, node, &name_node, exported);
    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo { symbol_id: id, name });
        analyze_node(&body, ctx);
        ctx.scope_stack.pop();
    }
}

fn analyze_struct(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let _ = push_symbol(ctx, name, SymbolKind::Struct, node, &name_node, exported);
}

fn analyze_enum(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let _ = push_symbol(ctx, name, SymbolKind::Enum, node, &name_node, exported);
}

fn analyze_trait(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let _ = push_symbol(ctx, name, SymbolKind::Interface, node, &name_node, exported);
}

fn analyze_type_alias(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    // logos-core 没有 TypeAlias：这里用 Class 表示 type alias
    let _ = push_symbol(ctx, name, SymbolKind::Class, node, &name_node, exported);
}

fn analyze_mod(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let id = push_symbol(ctx, name.clone(), SymbolKind::Module, node, &name_node, exported);
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

fn analyze_const(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let _ = push_symbol(ctx, name, SymbolKind::Constant, node, &name_node, exported);
}

fn analyze_static(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = match node.child_by_field_name("name") {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);
    let exported = has_pub_modifier(node, ctx);
    let _ = push_symbol(ctx, name, SymbolKind::Variable, node, &name_node, exported);
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(function) = node.child_by_field_name("function") {
        let text = ctx.get_text(&function);
        let callee_name = text.split("::").last().unwrap_or(&text).split('.').last().unwrap_or(&text).to_string();
        let qualified = if text.contains("::") || text.contains('.') {
            Some(text)
        } else {
            None
        };
        ctx.result.calls.push(CallInfo {
            callee_name,
            qualified_name: qualified,
            location: node_to_range(node),
            is_constructor: false,
        });
    }
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
    fn rust_basic_symbols_imports_calls() {
        let adapter = RustAdapter::new().unwrap();
        let src = r#"
use std::collections::HashMap;

pub struct User {
  pub name: String,
}

impl User {
  pub fn greet(&self) {
    helper();
  }
}

fn helper() {}

pub const MAX: usize = 10;
"#;
        let result = adapter.analyze("file:///test.rs", src);
        assert!(result.imports.len() >= 1);
        assert!(result.symbols.iter().any(|s| s.name == "User" && s.exported));
        assert!(result.symbols.iter().any(|s| s.name == "helper"));
        assert!(result.calls.len() >= 1);
    }
}

