//! Python Language Adapter
//!
//! Implements the LanguageAdapter trait for Python files.
//! Extracts symbols, imports, exports, and call relationships.

use crate::adapter::{
    AnalysisResult, CallInfo, ExportInfo, ImportInfo, ImportItem, LanguageAdapter,
    SymbolBuilder, TypeRelation, make_location,
};
use crate::symbol_table::{SymbolId, TypeInfo, Visibility};
use logos_core::{Position, Range, SymbolKind};
use std::path::Path;
use tree_sitter::{Node, Parser, Tree};

/// Python language adapter
pub struct PythonAdapter {
    parser: std::sync::Mutex<Parser>,
}

impl PythonAdapter {
    pub fn new() -> Result<Self, String> {
        let mut parser = Parser::new();
        parser
            .set_language(&tree_sitter_python::LANGUAGE.into())
            .map_err(|e| format!("Failed to set Python language: {}", e))?;

        Ok(Self {
            parser: std::sync::Mutex::new(parser),
        })
    }

    fn parse(&self, source: &str) -> Option<Tree> {
        let mut parser = self.parser.lock().ok()?;
        parser.parse(source, None)
    }
}

impl Default for PythonAdapter {
    fn default() -> Self {
        Self::new().expect("Failed to create Python adapter")
    }
}

impl LanguageAdapter for PythonAdapter {
    fn language_id(&self) -> &str {
        "python"
    }

    fn file_extensions(&self) -> &[&str] {
        &["py", "pyi", "pyw"]
    }

    fn analyze(&self, uri: &str, source: &str) -> AnalysisResult {
        let tree = match self.parse(source) {
            Some(t) => t,
            None => return AnalysisResult::default(),
        };

        let mut context = AnalysisContext {
            uri: uri.to_string(),
            source,
            result: AnalysisResult::default(),
            scope_stack: Vec::new(),
        };

        analyze_node(&tree.root_node(), &mut context);

        context.result
    }

    fn resolve_import(&self, from_file: &Path, import_path: &str) -> Option<std::path::PathBuf> {
        // Skip standard library imports
        if !import_path.starts_with('.') {
            return None;
        }

        let parent = from_file.parent()?;

        // Handle relative imports
        let levels = import_path.chars().take_while(|&c| c == '.').count();
        let mut base = parent.to_path_buf();
        for _ in 1..levels {
            base = base.parent()?.to_path_buf();
        }

        let module_name = import_path.trim_start_matches('.');
        if module_name.is_empty() {
            // Just dots - import from parent package
            let init = base.join("__init__.py");
            if init.exists() {
                return Some(init);
            }
        } else {
            // Try as directory with __init__.py
            let dir_path = base.join(module_name.replace('.', "/"));
            let init = dir_path.join("__init__.py");
            if init.exists() {
                return Some(init);
            }

            // Try as .py file
            let file_path = base.join(format!("{}.py", module_name.replace('.', "/")));
            if file_path.exists() {
                return Some(file_path);
            }
        }

        None
    }
}

/// Context for analysis traversal
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

    fn get_text(&self, node: &Node) -> String {
        self.source[node.byte_range()].to_string()
    }
}

fn analyze_node(node: &Node, ctx: &mut AnalysisContext) {
    match node.kind() {
        // Import statements
        "import_statement" => analyze_import(node, ctx),
        "import_from_statement" => analyze_import_from(node, ctx),

        // Function definitions
        "function_definition" => analyze_function(node, ctx),

        // Class definitions
        "class_definition" => analyze_class(node, ctx),

        // Assignments (module-level variables/constants)
        "assignment" | "augmented_assignment" => {
            if ctx.scope_stack.is_empty() {
                analyze_assignment(node, ctx);
            }
        }

        // Call expressions
        "call" => analyze_call(node, ctx),

        // Recurse into other nodes
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
    // import foo, bar, baz
    for i in 0..node.named_child_count() {
        if let Some(child) = node.named_child(i) {
            match child.kind() {
                "dotted_name" => {
                    let module_path = ctx.get_text(&child);
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
                "aliased_import" => {
                    let name = child
                        .child_by_field_name("name")
                        .map(|n| ctx.get_text(&n));
                    let alias = child
                        .child_by_field_name("alias")
                        .map(|n| ctx.get_text(&n));

                    if let Some(module_path) = name {
                        ctx.result.imports.push(ImportInfo {
                            module_path: module_path.clone(),
                            items: vec![ImportItem {
                                name: module_path,
                                alias,
                                is_type: false,
                            }],
                            is_type_only: false,
                            location: node_to_range(node),
                        });
                    }
                }
                _ => {}
            }
        }
    }
}

fn analyze_import_from(node: &Node, ctx: &mut AnalysisContext) {
    // from foo import bar, baz
    let module_name = node
        .child_by_field_name("module_name")
        .map(|n| ctx.get_text(&n))
        .unwrap_or_default();

    let mut import = ImportInfo {
        module_path: module_name,
        items: Vec::new(),
        is_type_only: false,
        location: node_to_range(node),
    };

    for i in 0..node.named_child_count() {
        if let Some(child) = node.named_child(i) {
            match child.kind() {
                "dotted_name" | "identifier" => {
                    let name = ctx.get_text(&child);
                    import.items.push(ImportItem {
                        name,
                        alias: None,
                        is_type: false,
                    });
                }
                "aliased_import" => {
                    let name = child
                        .child_by_field_name("name")
                        .map(|n| ctx.get_text(&n));
                    let alias = child
                        .child_by_field_name("alias")
                        .map(|n| ctx.get_text(&n));

                    if let Some(name) = name {
                        import.items.push(ImportItem {
                            name,
                            alias,
                            is_type: false,
                        });
                    }
                }
                "wildcard_import" => {
                    import.items.push(ImportItem {
                        name: "*".to_string(),
                        alias: None,
                        is_type: false,
                    });
                }
                _ => {}
            }
        }
    }

    if !import.module_path.is_empty() || !import.items.is_empty() {
        ctx.result.imports.push(import);
    }
}

fn analyze_function(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name = name_node
        .map(|n| ctx.get_text(&n))
        .unwrap_or_else(|| "anonymous".to_string());

    // Check if it's a private function (starts with _)
    let visibility = if name.starts_with("__") && !name.ends_with("__") {
        Visibility::Private
    } else if name.starts_with('_') {
        Visibility::Protected
    } else {
        Visibility::Public
    };

    // Check for decorators
    let mut is_staticmethod = false;
    let mut is_classmethod = false;
    let mut is_property = false;

    if let Some(decorators) = node.child_by_field_name("decorator") {
        let dec_text = ctx.get_text(&decorators);
        is_staticmethod = dec_text.contains("staticmethod");
        is_classmethod = dec_text.contains("classmethod");
        is_property = dec_text.contains("property");
    }

    // Also check siblings for decorators
    if let Some(parent) = node.parent() {
        for i in 0..parent.named_child_count() {
            if let Some(sibling) = parent.named_child(i) {
                if sibling.kind() == "decorator" {
                    let dec_text = ctx.get_text(&sibling);
                    if dec_text.contains("staticmethod") {
                        is_staticmethod = true;
                    }
                    if dec_text.contains("classmethod") {
                        is_classmethod = true;
                    }
                    if dec_text.contains("property") {
                        is_property = true;
                    }
                }
            }
        }
    }

    let kind = if is_property {
        SymbolKind::Property
    } else if ctx.scope_stack.is_empty() {
        SymbolKind::Function
    } else {
        SymbolKind::Method
    };

    let location = make_location(
        &ctx.uri,
        node_to_range(node),
        name_node.map(|n| node_to_range(&n)).unwrap_or_else(|| node_to_range(node)),
    );

    // Extract return type annotation
    let return_type = node
        .child_by_field_name("return_type")
        .map(|r| ctx.get_text(&r));

    let type_info = return_type.map(|rt| TypeInfo {
        type_expr: rt.clone(),
        nullable: false,
        type_params: Vec::new(),
        return_type: Some(Box::new(TypeInfo::simple(rt))),
        param_types: Vec::new(),
    });

    let mut builder = SymbolBuilder::new(name.clone(), kind, location)
        .visibility(visibility)
        .qualified_name(ctx.qualified_name(&name));

    if let Some(ti) = type_info {
        builder = builder.type_info(ti);
    }

    // Module-level functions are exported by default
    if ctx.scope_stack.is_empty() && !name.starts_with('_') {
        builder = builder.exported(true);
        ctx.result.exports.push(ExportInfo {
            name: name.clone(),
            original_name: None,
            from_module: None,
            is_type_only: false,
            is_default: false,
            location: node_to_range(node),
        });
    }

    let symbol = builder.build();
    let symbol_id = symbol.id;
    ctx.result.symbols.push(symbol);

    // Analyze function body
    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo {
            symbol_id,
            name: name.clone(),
        });
        analyze_node(&body, ctx);
        ctx.scope_stack.pop();
    }
}

fn analyze_class(node: &Node, ctx: &mut AnalysisContext) {
    let name_node = node.child_by_field_name("name");
    let name = name_node
        .map(|n| ctx.get_text(&n))
        .unwrap_or_else(|| "anonymous".to_string());

    // Check visibility
    let visibility = if name.starts_with('_') {
        Visibility::Private
    } else {
        Visibility::Public
    };

    let location = make_location(
        &ctx.uri,
        node_to_range(node),
        name_node.map(|n| node_to_range(&n)).unwrap_or_else(|| node_to_range(node)),
    );

    let mut builder = SymbolBuilder::new(name.clone(), SymbolKind::Class, location)
        .visibility(visibility)
        .qualified_name(ctx.qualified_name(&name));

    // Module-level classes are exported by default
    if ctx.scope_stack.is_empty() && !name.starts_with('_') {
        builder = builder.exported(true);
        ctx.result.exports.push(ExportInfo {
            name: name.clone(),
            original_name: None,
            from_module: None,
            is_type_only: false,
            is_default: false,
            location: node_to_range(node),
        });
    }

    let symbol = builder.build();
    let symbol_id = symbol.id;
    ctx.result.symbols.push(symbol);

    // Extract base classes
    if let Some(superclasses) = node.child_by_field_name("superclasses") {
        for i in 0..superclasses.named_child_count() {
            if let Some(base) = superclasses.named_child(i) {
                let base_name = ctx.get_text(&base);
                // Skip common non-class arguments like metaclass=
                if !base_name.contains('=') {
                    ctx.result.type_relations.push(TypeRelation {
                        child_name: name.clone(),
                        parent_name: base_name,
                        is_implements: false,
                        location: node_to_range(&base),
                    });
                }
            }
        }
    }

    // Analyze class body
    if let Some(body) = node.child_by_field_name("body") {
        ctx.scope_stack.push(ScopeInfo {
            symbol_id,
            name: name.clone(),
        });

        // Analyze class body members
        for i in 0..body.named_child_count() {
            if let Some(child) = body.named_child(i) {
                analyze_node(&child, ctx);
            }
        }

        ctx.scope_stack.pop();
    }
}

fn analyze_assignment(node: &Node, ctx: &mut AnalysisContext) {
    // Module-level assignments become constants/variables
    let left = match node.child_by_field_name("left") {
        Some(n) => n,
        None => return,
    };

    match left.kind() {
        "identifier" => {
            let name = ctx.get_text(&left);

            // Constants are typically ALL_CAPS
            let is_constant = name.chars().all(|c| c.is_uppercase() || c == '_');
            let kind = if is_constant {
                SymbolKind::Constant
            } else {
                SymbolKind::Variable
            };

            let visibility = if name.starts_with('_') {
                Visibility::Private
            } else {
                Visibility::Public
            };

            let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&left));

            let mut builder = SymbolBuilder::new(name.clone(), kind, location)
                .visibility(visibility)
                .qualified_name(ctx.qualified_name(&name));

            // Module-level public variables are exported
            if !name.starts_with('_') {
                builder = builder.exported(true);
                ctx.result.exports.push(ExportInfo {
                    name: name.clone(),
                    original_name: None,
                    from_module: None,
                    is_type_only: false,
                    is_default: false,
                    location: node_to_range(node),
                });
            }

            ctx.result.symbols.push(builder.build());
        }
        "pattern_list" | "tuple_pattern" => {
            // Multiple assignment: a, b = 1, 2
            for i in 0..left.named_child_count() {
                if let Some(child) = left.named_child(i) {
                    if child.kind() == "identifier" {
                        let name = ctx.get_text(&child);
                        let visibility = if name.starts_with('_') {
                            Visibility::Private
                        } else {
                            Visibility::Public
                        };

                        let location = make_location(&ctx.uri, node_to_range(node), node_to_range(&child));

                        let builder = SymbolBuilder::new(name.clone(), SymbolKind::Variable, location)
                            .visibility(visibility)
                            .qualified_name(ctx.qualified_name(&name));

                        ctx.result.symbols.push(builder.build());
                    }
                }
            }
        }
        _ => {}
    }
}

fn analyze_call(node: &Node, ctx: &mut AnalysisContext) {
    if let Some(function) = node.child_by_field_name("function") {
        let (callee_name, qualified_name) = match function.kind() {
            "identifier" => {
                let name = ctx.get_text(&function);
                (name.clone(), None)
            }
            "attribute" => {
                if let Some(attr) = function.child_by_field_name("attribute") {
                    let prop_name = ctx.get_text(&attr);
                    let full_name = ctx.get_text(&function);
                    (prop_name, Some(full_name))
                } else {
                    return;
                }
            }
            _ => return,
        };

        ctx.result.calls.push(CallInfo {
            callee_name,
            qualified_name,
            location: node_to_range(node),
            is_constructor: false,
        });
    }

    // Recurse into arguments for nested calls
    if let Some(args) = node.child_by_field_name("arguments") {
        analyze_node(&args, ctx);
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
    fn test_simple_function() {
        let adapter = PythonAdapter::new().unwrap();
        let source = r#"
def greet(name: str) -> str:
    return f"Hello, {name}!"
"#;
        let result = adapter.analyze("file:///test.py", source);

        assert_eq!(result.symbols.len(), 1);
        assert_eq!(result.symbols[0].name, "greet");
        assert_eq!(result.symbols[0].kind, SymbolKind::Function);
        assert!(result.symbols[0].exported);
    }

    #[test]
    fn test_class_with_methods() {
        let adapter = PythonAdapter::new().unwrap();
        let source = r#"
class User:
    def __init__(self, name: str):
        self.name = name

    def greet(self) -> str:
        return f"Hello, {self.name}!"

    def _private_method(self):
        pass
"#;
        let result = adapter.analyze("file:///test.py", source);

        // Should have: User class, __init__, greet, _private_method
        assert!(result.symbols.len() >= 4);

        let class_sym = result.symbols.iter().find(|s| s.name == "User").unwrap();
        assert_eq!(class_sym.kind, SymbolKind::Class);
        assert!(class_sym.exported);

        let private_sym = result.symbols.iter().find(|s| s.name == "_private_method").unwrap();
        assert_eq!(private_sym.visibility, Visibility::Protected);
    }

    #[test]
    fn test_imports() {
        let adapter = PythonAdapter::new().unwrap();
        let source = r#"
import os
import sys as system
from pathlib import Path
from typing import Optional, List
from . import sibling
from ..parent import something
"#;
        let result = adapter.analyze("file:///test.py", source);

        assert!(result.imports.len() >= 4);

        let os_import = result.imports.iter().find(|i| i.module_path == "os").unwrap();
        assert_eq!(os_import.items.len(), 1);

        let sys_import = result.imports.iter().find(|i| i.module_path == "sys").unwrap();
        assert_eq!(sys_import.items[0].alias, Some("system".to_string()));
    }

    #[test]
    fn test_inheritance() {
        let adapter = PythonAdapter::new().unwrap();
        let source = r#"
class Animal:
    pass

class Dog(Animal):
    pass

class ServiceDog(Dog, SomeInterface):
    pass
"#;
        let result = adapter.analyze("file:///test.py", source);

        // Check type relations
        let dog_extends = result.type_relations.iter()
            .find(|r| r.child_name == "Dog" && r.parent_name == "Animal");
        assert!(dog_extends.is_some());

        let service_dog = result.type_relations.iter()
            .filter(|r| r.child_name == "ServiceDog")
            .count();
        assert_eq!(service_dog, 2); // Dog and SomeInterface
    }

    #[test]
    fn test_constants() {
        let adapter = PythonAdapter::new().unwrap();
        let source = r#"
MAX_SIZE = 100
DEFAULT_NAME = "test"
_private_var = 42
"#;
        let result = adapter.analyze("file:///test.py", source);

        let max_size = result.symbols.iter().find(|s| s.name == "MAX_SIZE").unwrap();
        assert_eq!(max_size.kind, SymbolKind::Constant);
        assert!(max_size.exported);

        let private_var = result.symbols.iter().find(|s| s.name == "_private_var").unwrap();
        assert_eq!(private_var.visibility, Visibility::Private);
    }
}
