//! C Language Adapter
//!
//! Pragmatic indexer for C:
//! - Symbols: function definitions/declarations, struct/enum/typedef, global variables (best-effort)
//! - Imports: #include directives
//! - Exports: treated as public for non-static (best-effort)
//! - Calls: call_expression nodes (best-effort)

use crate::adapter::{AnalysisResult, CallInfo, ImportInfo, ImportItem, LanguageAdapter, SymbolBuilder, make_location};
use crate::symbol_table::Visibility;
use logos_core::{Position, Range, SymbolKind};
use std::path::Path;
use tree_sitter::{Node, Parser, Tree};

pub struct CAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl CAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_c::LANGUAGE.into())
            .map_err(|e| format!("Failed to set C language: {}", e))?;
        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl LanguageAdapter for CAdapter {
    fn language_id(&self) -> &str {
        "c"
    }

    fn file_extensions(&self) -> &[&str] {
        &["c", "h"]
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
        };

        analyze_node(&tree.root_node(), &mut ctx);
        ctx.result
    }

    fn resolve_import(&self, from_file: &Path, import_path: &str) -> Option<std::path::PathBuf> {
        // For `#include "x.h"` try relative to file dir
        if !(import_path.starts_with('"') && import_path.ends_with('"')) {
            return None;
        }
        let inner = import_path.trim_matches('"');
        let parent = from_file.parent()?;
        let resolved = parent.join(inner);
        if resolved.exists() {
            return Some(resolved);
        }
        None
    }
}

struct AnalysisContext<'a> {
    uri: String,
    source: &'a str,
    result: AnalysisResult,
}

impl<'a> AnalysisContext<'a> {
    fn get_text(&self, node: &Node) -> String {
        self.source[node.byte_range()].to_string()
    }
}

fn analyze_node(node: &Node, ctx: &mut AnalysisContext) {
    match node.kind() {
        "preproc_include" => analyze_include(node, ctx),
        "function_definition" => analyze_function(node, ctx),
        "declaration" => analyze_declaration(node, ctx),
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

fn analyze_include(node: &Node, ctx: &mut AnalysisContext) {
    // Grab the include path token (string or <...>)
    let text = ctx.get_text(node);
    // naive: find the last token after include
    if let Some(idx) = text.find("#include") {
        let rest = text[idx + "#include".len()..].trim();
        if !rest.is_empty() {
            ctx.result.imports.push(ImportInfo {
                module_path: rest.to_string(),
                items: vec![ImportItem {
                    name: rest.to_string(),
                    alias: None,
                    is_type: false,
                }],
                is_type_only: false,
                location: node_to_range(node),
            });
        }
    }
}

fn analyze_function(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node
        .child_by_field_name("declarator")
        .and_then(find_identifier_in_declarator);
    let name_node = match name_node {
        Some(n) => n,
        None => return,
    };
    let name = ctx.get_text(&name_node);

    // best-effort export: treat as public unless `static` appears in function_definition text
    let exported = !ctx.get_text(node).contains("static");
    let visibility = if exported { Visibility::Public } else { Visibility::Private };
    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
    let sym = SymbolBuilder::new(name.clone(), SymbolKind::Function, location)
        .exported(exported)
        .visibility(visibility)
        .build();
    ctx.result.symbols.push(sym);

    // Recurse into body for call sites
    if let Some(body) = node.child_by_field_name("body") {
        analyze_node(&body, ctx);
    }
}

fn analyze_declaration(node: &Node, ctx: &mut AnalysisContext) {
    // struct/enum/typedef and globals
    // We keep this minimal: capture typedef name and struct tag name when present.
    for i in 0..node.named_child_count() {
        if let Some(ch) = node.named_child(i) {
            match ch.kind() {
                "type_definition" => analyze_typedef(&ch, ctx),
                "struct_specifier" => analyze_struct(&ch, ctx),
                "enum_specifier" => analyze_enum(&ch, ctx),
                _ => {}
            }
        }
    }
}

fn analyze_typedef(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(name_node) = node.child_by_field_name("declarator")
        .and_then(find_identifier_in_declarator) {
        let name = ctx.get_text(&name_node);
        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
        ctx.result.symbols.push(
            // logos-core 没有 TypeAlias：这里用 Class 表示 typedef
            SymbolBuilder::new(name.clone(), SymbolKind::Class, location)
                .exported(true)
                .visibility(Visibility::Public)
                .build()
        );
    }
}

fn analyze_struct(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(name_node) = node.child_by_field_name("name") {
        let name = ctx.get_text(&name_node);
        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
        ctx.result.symbols.push(
            SymbolBuilder::new(name.clone(), SymbolKind::Struct, location)
                .exported(true)
                .visibility(Visibility::Public)
                .build()
        );
    }
}

fn analyze_enum(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(name_node) = node.child_by_field_name("name") {
        let name = ctx.get_text(&name_node);
        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
        ctx.result.symbols.push(
            SymbolBuilder::new(name.clone(), SymbolKind::Enum, location)
                .exported(true)
                .visibility(Visibility::Public)
                .build()
        );
    }
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(function) = node.child_by_field_name("function") {
        let text = ctx.get_text(&function);
        ctx.result.calls.push(CallInfo {
            callee_name: text.clone(),
            qualified_name: None,
            location: node_to_range(node),
            is_constructor: false,
        });
    }
}

fn find_identifier_in_declarator<'a>(node: Node<'a>) -> Option<Node<'a>> {
    // Walk down to find first "identifier"
    if node.kind() == "identifier" {
        return Some(node);
    }
    for i in 0..node.named_child_count() {
        if let Some(ch) = node.named_child(i) {
            if let Some(id) = find_identifier_in_declarator(ch) {
                return Some(id);
            }
        }
    }
    None
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
    fn c_basic_symbols_imports_calls() {
        let adapter = CAdapter::new().unwrap();
        let src = r#"
#include "foo.h"
#include <stdio.h>

typedef struct User { int id; } User;

static void helper(void) {}

int greet(User* u) {
  printf("%d\n", u->id);
  helper();
  return 0;
}
"#;
        let result = adapter.analyze("file:///test.c", src);
        assert!(result.imports.len() >= 1);
        assert!(result.symbols.iter().any(|s| s.name == "greet"));
        assert!(result.calls.len() >= 1);
    }
}

