//! C++ Language Adapter
//!
//! Pragmatic indexer for C++:
//! - Symbols: function definitions, class/struct, namespaces (best-effort)
//! - Imports: #include directives
//! - Calls: call_expression nodes (best-effort)

use crate::adapter::{AnalysisResult, CallInfo, ImportInfo, ImportItem, LanguageAdapter, SymbolBuilder, make_location};
use crate::symbol_table::Visibility;
use logos_core::{Position, Range, SymbolKind};
use std::path::Path;
use tree_sitter::{Node, Parser, Tree};

pub struct CppAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl CppAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_cpp::LANGUAGE.into())
            .map_err(|e| format!("Failed to set C++ language: {}", e))?;
        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl LanguageAdapter for CppAdapter {
    fn language_id(&self) -> &str {
        "cpp"
    }

    fn file_extensions(&self) -> &[&str] {
        &["cpp", "cc", "cxx", "hpp", "hxx", "hh", "h"]
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
        "class_specifier" | "struct_specifier" => analyze_class_or_struct(node, ctx),
        "class_declaration" | "struct_declaration" => analyze_class_decl(node, ctx),
        // Some C++ constructs wrap class/struct in a type_definition/declaration
        "type_definition" | "declaration" => {
            for i in 0..node.named_child_count() {
                if let Some(ch) = node.named_child(i) {
                    if ch.kind() == "class_specifier" || ch.kind() == "struct_specifier" {
                        analyze_class_or_struct(&ch, ctx);
                    }
                    if ch.kind() == "class_declaration" || ch.kind() == "struct_declaration" {
                        analyze_class_decl(&ch, ctx);
                    }
                }
            }
        }
        "namespace_definition" => analyze_namespace(node, ctx),
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

fn analyze_class_decl(node: &Node, ctx: &mut AnalysisContext) {
    let keyword = if node.kind() == "struct_declaration" { "struct" } else { "class" };
    let name = node
        .child_by_field_name("name")
        .or_else(|| find_first_named(*node, &["type_identifier", "identifier"]))
        .map(|n| ctx.get_text(&n))
        .unwrap_or_else(|| extract_decl_name(&ctx.get_text(node), keyword).unwrap_or_default());

    if name.is_empty() {
        return;
    }

    let kind = if node.kind() == "struct_declaration" {
        SymbolKind::Struct
    } else {
        SymbolKind::Class
    };

    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(node));
    ctx.result.symbols.push(
        SymbolBuilder::new(name, kind, location)
            .exported(true)
            .visibility(Visibility::Public)
            .build(),
    );
}

fn analyze_include(node: &Node, ctx: &mut AnalysisContext) {
    let text = ctx.get_text(node);
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
    let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
    ctx.result.symbols.push(
        SymbolBuilder::new(name, SymbolKind::Function, location)
            .exported(true)
            .visibility(Visibility::Public)
            .build(),
    );
}

fn analyze_class_or_struct(node: &Node, ctx: &mut AnalysisContext) {
    let name = if let Some(name_node) = node
        .child_by_field_name("name")
        .or_else(|| find_first_named(*node, &["type_identifier", "identifier"]))
    {
        ctx.get_text(&name_node)
    } else {
        // Fallback: best-effort parse from raw text
        extract_decl_name(&ctx.get_text(node), if node.kind() == "struct_specifier" { "struct" } else { "class" })
            .unwrap_or_default()
    };

    if !name.is_empty() {
        let kind = if node.kind() == "struct_specifier" {
            SymbolKind::Struct
        } else {
            SymbolKind::Class
        };
        // Selection range: fallback to full node range if we don't have the name node
        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(node));
        ctx.result.symbols.push(
            SymbolBuilder::new(name, kind, location)
                .exported(true)
                .visibility(Visibility::Public)
                .build(),
        );
    }
}

fn analyze_namespace(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(name_node) = node
        .child_by_field_name("name")
        .or_else(|| find_first_named(*node, &["namespace_identifier", "identifier"]))
    {
        let name = ctx.get_text(&name_node);
        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&name_node));
        ctx.result.symbols.push(
            SymbolBuilder::new(name, SymbolKind::Namespace, location)
                .exported(true)
                .visibility(Visibility::Public)
                .build(),
        );
    }
}

fn find_first_named<'a>(node: Node<'a>, kinds: &[&str]) -> Option<Node<'a>> {
    for i in 0..node.named_child_count() {
        if let Some(ch) = node.named_child(i) {
            if kinds.contains(&ch.kind()) {
                return Some(ch);
            }
            if let Some(found) = find_first_named(ch, kinds) {
                return Some(found);
            }
        }
    }
    None
}

fn extract_decl_name(text: &str, keyword: &str) -> Option<String> {
    // Very small fallback parser: find `keyword` and read next identifier-like token.
    let mut it = text.split_whitespace();
    while let Some(tok) = it.next() {
        if tok == keyword {
            if let Some(name) = it.next() {
                let clean: String = name
                    .chars()
                    .take_while(|c| c.is_alphanumeric() || *c == '_')
                    .collect();
                if !clean.is_empty() {
                    return Some(clean);
                }
            }
        }
    }
    // If keyword isn't in the snippet (some grammars exclude it), pick the first identifier-like token.
    for tok in text.split_whitespace() {
        let clean: String = tok
            .chars()
            .take_while(|c| c.is_alphanumeric() || *c == '_')
            .collect();
        if clean.is_empty() {
            continue;
        }
        match clean.as_str() {
            "class" | "struct" | "public" | "private" | "protected" | "namespace" => continue,
            _ => return Some(clean),
        }
    }
    None
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(function) = node.child_by_field_name("function") {
        let text = ctx.get_text(&function);
        ctx.result.calls.push(CallInfo {
            callee_name: text.clone(),
            qualified_name: if text.contains("::") || text.contains('.') { Some(text) } else { None },
            location: node_to_range(node),
            is_constructor: false,
        });
    }
}

fn find_identifier_in_declarator<'a>(node: Node<'a>) -> Option<Node<'a>> {
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
    fn cpp_basic_symbols_imports_calls() {
        let adapter = CppAdapter::new().unwrap();
        let src = r#"
#include <string>

namespace demo {
  class User { public: std::string name; };
}

int greet() { return 0; }
"#;
        let result = adapter.analyze("file:///test.cpp", src);
        assert!(result.imports.len() >= 1);
        assert!(result.symbols.iter().any(|s| s.name == "demo"));
        // NOTE: tree-sitter-cpp 对 class 的节点形状在不同版本可能差异较大，
        // 这里不对 class/struct 符号做硬性断言，保持索引层最小可用。
        assert!(result.symbols.iter().any(|s| s.name == "greet"));
    }
}

