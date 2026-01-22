//! Go Language Adapter
//!
//! Implements the LanguageAdapter trait for Go files.
//! This is a pragmatic (not fully semantic) indexer:
//! - Symbols: functions, methods, types, vars/consts (package-level)
//! - Imports: import specs
//! - Exports: inferred from Go export rule (Capitalized identifiers)
//! - Calls: call expressions

use crate::adapter::{AnalysisResult, CallInfo, ImportInfo, ImportItem, LanguageAdapter, SymbolBuilder, make_location};
use crate::symbol_table::{SymbolId, Visibility};
use logos_core::{Position, Range, SymbolKind};
use tree_sitter::{Node, Parser, Tree};

pub struct GoAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl GoAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_go::LANGUAGE.into())
            .map_err(|e| format!("Failed to set Go language: {}", e))?;
        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl LanguageAdapter for GoAdapter {
    fn language_id(&self) -> &str {
        "go"
    }

    fn file_extensions(&self) -> &[&str] {
        &["go"]
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

fn analyze_node(node: &Node, ctx: &mut AnalysisContext) {
    match node.kind() {
        // imports
        "import_declaration" => analyze_import(node, ctx),

        // functions / methods
        "function_declaration" => analyze_function(node, ctx),
        "method_declaration" => analyze_method(node, ctx),

        // type declarations
        "type_declaration" => analyze_type_declaration(node, ctx),

        // const/var declarations
        "const_declaration" | "var_declaration" => analyze_value_declaration(node, ctx),

        // calls
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

fn is_exported_go(name: &str) -> bool {
    name.chars().next().map(|c| c.is_uppercase()).unwrap_or(false)
}

fn analyze_import(node: &Node, ctx: &mut AnalysisContext) {
    // import "fmt"
    // import alias "pkg"
    // import ( "a"; b "c" )
    let mut specs = Vec::new();
    collect_nodes_by_kind(*node, "import_spec", &mut specs);
    for spec in specs {
        let path_node = spec.child_by_field_name("path");
        let name_node = spec.child_by_field_name("name"); // optional alias

        if let Some(path_node) = path_node {
            let mut module_path = ctx.get_text(&path_node);
            module_path = module_path.trim_matches(|c| c == '"' || c == '`').to_string();

            let alias = name_node.map(|n| ctx.get_text(&n)).filter(|s| !s.is_empty());
            ctx.result.imports.push(ImportInfo {
                module_path: module_path.clone(),
                items: vec![ImportItem {
                    name: module_path,
                    alias,
                    is_type: false,
                }],
                is_type_only: false,
                location: node_to_range(&spec),
            });
        }
    }
}

fn collect_nodes_by_kind<'a>(node: Node<'a>, kind: &str, out: &mut Vec<Node<'a>>) {
    if node.kind() == kind {
        out.push(node);
    }
    for i in 0..node.named_child_count() {
        if let Some(child) = node.named_child(i) {
            collect_nodes_by_kind(child, kind, out);
        }
    }
}

fn analyze_function(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name = match name_node {
        Some(n) => ctx.get_text(&n),
        None => return,
    };

    let exported = is_exported_go(&name);
    let visibility = if exported { Visibility::Public } else { Visibility::Private };

    let location = make_location(
        &ctx.uri,
        node_to_range(node),
        name_node.map(|n| node_to_range(&n)).unwrap_or_else(|| node_to_range(node)),
    );

    let symbol = SymbolBuilder::new(name.clone(), SymbolKind::Function, location)
        .exported(exported)
        .visibility(visibility)
        .qualified_name(ctx.qualified_name(&name))
        .build();

    let symbol_id = symbol.id;
    ctx.result.symbols.push(symbol);

    // descend into body for calls
    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo { symbol_id, name });
        analyze_node(&body, ctx);
        ctx.scope_stack.pop();
    }
}

fn analyze_method(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name = match name_node {
        Some(n) => ctx.get_text(&n),
        None => return,
    };

    // Methods can be exported too (capitalized), but we still keep visibility consistent
    let exported = is_exported_go(&name);
    let visibility = if exported { Visibility::Public } else { Visibility::Private };

    let location = make_location(
        &ctx.uri,
        node_to_range(node),
        name_node.map(|n| node_to_range(&n)).unwrap_or_else(|| node_to_range(node)),
    );

    let symbol = SymbolBuilder::new(name.clone(), SymbolKind::Method, location)
        .parent(ctx.current_scope().map(|s| s.symbol_id).unwrap_or(SymbolId(0)))
        .exported(exported)
        .visibility(visibility)
        .qualified_name(ctx.qualified_name(&name))
        .build();

    let symbol_id = symbol.id;
    ctx.result.symbols.push(symbol);

    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo { symbol_id, name });
        analyze_node(&body, ctx);
        ctx.scope_stack.pop();
    }
}

fn analyze_type_declaration(node: &Node, ctx: &mut AnalysisContext) {
    // type Foo struct { ... }
    for i in 0..node.named_child_count() {
        if let Some(spec) = node.named_child(i) {
            if spec.kind() != "type_spec" {
                continue;
            }
            let name_node = spec.child_by_field_name("name");
            let name = match name_node {
                Some(n) => ctx.get_text(&n),
                None => continue,
            };

            let exported = is_exported_go(&name);
            let visibility = if exported { Visibility::Public } else { Visibility::Private };

            let kind = spec
                .child_by_field_name("type")
                .map(|t| match t.kind() {
                    "struct_type" => SymbolKind::Struct,
                    "interface_type" => SymbolKind::Interface,
                    _ => SymbolKind::Class,
                })
                .unwrap_or(SymbolKind::Class);

            let location = make_location(
                &ctx.uri,
                node_to_range(&spec),
                name_node.map(|n| node_to_range(&n)).unwrap_or_else(|| node_to_range(&spec)),
            );

            let symbol = SymbolBuilder::new(name.clone(), kind, location)
                .exported(exported)
                .visibility(visibility)
                .qualified_name(ctx.qualified_name(&name))
                .build();

            ctx.result.symbols.push(symbol);
        }
    }
}

fn analyze_value_declaration(node: &Node, ctx: &mut AnalysisContext) {
    let is_const = node.kind() == "const_declaration";
    for i in 0..node.named_child_count() {
        if let Some(spec) = node.named_child(i) {
            if spec.kind() != "const_spec" && spec.kind() != "var_spec" {
                continue;
            }
            if let Some(name_node) = spec.child_by_field_name("name") {
                let name = ctx.get_text(&name_node);
                let exported = is_exported_go(&name);
                let visibility = if exported { Visibility::Public } else { Visibility::Private };
                let kind = if is_const { SymbolKind::Constant } else { SymbolKind::Variable };

                let location = make_location(&ctx.uri, node_to_range(&spec), node_to_range(&name_node));
                let symbol = SymbolBuilder::new(name.clone(), kind, location)
                    .exported(exported)
                    .visibility(visibility)
                    .qualified_name(ctx.qualified_name(&name))
                    .build();
                ctx.result.symbols.push(symbol);
            }
        }
    }
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    // call_expression: function + arguments
    if let Some(func) = node.child_by_field_name("function") {
        let text = ctx.get_text(&func);
        let (callee_name, qualified_name) = if let Some(last) = text.split('.').last() {
            (last.to_string(), if text.contains('.') { Some(text) } else { None })
        } else {
            (text.clone(), None)
        };

        ctx.result.calls.push(CallInfo {
            callee_name,
            qualified_name,
            location: node_to_range(node),
            is_constructor: false,
        });
    }

    // nested calls
    for i in 0..node.named_child_count() {
        if let Some(child) = node.named_child(i) {
            analyze_node(&child, ctx);
        }
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
    fn go_basic_symbols_imports_calls() {
        let adapter = GoAdapter::new().unwrap();
        let src = r#"
package main

import (
  "fmt"
  s "strings"
)

type User struct {
  Name string
}

func (u *User) Greet() {
  fmt.Println(s.ToUpper(u.Name))
}

func helper() {}
"#;
        let result = adapter.analyze("file:///test.go", src);
        assert!(result.imports.len() >= 2);
        assert!(result.symbols.iter().any(|s| s.name == "User"));
        assert!(result.symbols.iter().any(|s| s.name == "Greet"));
        assert!(result.symbols.iter().any(|s| s.name == "helper"));
        assert!(result.calls.len() >= 2);
    }
}

