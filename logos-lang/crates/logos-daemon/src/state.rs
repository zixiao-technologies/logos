//! Global state management for the language service

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use logos_core::Document;
use logos_index::{ProjectIndexer, SymbolIndex, TodoIndex};

/// Intelligence mode
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum IntelligenceMode {
    /// Basic mode - lightweight LSP
    Basic,
    /// Smart mode - full project indexing
    Smart,
}

impl Default for IntelligenceMode {
    fn default() -> Self {
        Self::Basic
    }
}

/// Global state for the language service daemon
pub struct State {
    /// Open documents by URI
    pub documents: HashMap<String, Document>,
    /// Symbol index (Basic mode)
    pub symbol_index: SymbolIndex,
    /// TODO index
    pub todo_index: TodoIndex,
    /// Project indexer (Smart mode)
    pub project_indexer: Option<Arc<ProjectIndexer>>,
    /// Current intelligence mode
    pub mode: IntelligenceMode,
    /// Whether the server has been initialized
    pub initialized: bool,
    /// Root path of the workspace
    pub root_path: Option<String>,
}

impl State {
    pub fn new() -> Self {
        Self {
            documents: HashMap::new(),
            symbol_index: SymbolIndex::new(),
            todo_index: TodoIndex::new(),
            project_indexer: None,
            mode: IntelligenceMode::Basic,
            initialized: false,
            root_path: None,
        }
    }

    /// Switch to Smart mode and start indexing
    pub fn enable_smart_mode(&mut self) -> Result<(), String> {
        if self.mode == IntelligenceMode::Smart {
            return Ok(());
        }

        let indexer = ProjectIndexer::new();

        // Index the workspace if root path is set
        if let Some(ref root) = self.root_path {
            let root_path = PathBuf::from(root);
            if root_path.exists() {
                log::info!("Starting Smart mode indexing for: {}", root);
                match indexer.index_directory(&root_path) {
                    Ok(stats) => {
                        log::info!(
                            "Indexed {} files, {} symbols, {} imports",
                            stats.files_indexed,
                            stats.symbols_found,
                            stats.imports_found
                        );
                    }
                    Err(e) => {
                        log::warn!("Indexing error: {}", e);
                    }
                }
            }
        }

        self.project_indexer = Some(Arc::new(indexer));
        self.mode = IntelligenceMode::Smart;
        Ok(())
    }

    /// Switch to Basic mode
    pub fn enable_basic_mode(&mut self) {
        self.project_indexer = None;
        self.mode = IntelligenceMode::Basic;
    }

    /// Check if Smart mode is active
    pub fn is_smart_mode(&self) -> bool {
        self.mode == IntelligenceMode::Smart
    }

    /// Get the project indexer (Smart mode only)
    pub fn get_indexer(&self) -> Option<&ProjectIndexer> {
        self.project_indexer.as_ref().map(|i| i.as_ref())
    }

    /// Open a document
    pub fn open_document(&mut self, uri: String, language_id: String, content: String) {
        let doc = Document::new(uri.clone(), language_id, content.clone());
        self.documents.insert(uri.clone(), doc);
        // Index TODOs
        self.todo_index.index_document(&uri, &content);

        // Re-index in Smart mode
        if let Some(ref indexer) = self.project_indexer {
            if let Some(path) = uri_to_path(&uri) {
                let _ = indexer.reindex_file(&path);
            }
        }
    }

    /// Update a document
    pub fn update_document(&mut self, uri: &str, content: String) {
        if let Some(doc) = self.documents.get_mut(uri) {
            doc.set_content(content.clone());
        }
        // Re-index TODOs
        self.todo_index.index_document(uri, &content);

        // Re-index in Smart mode
        if let Some(ref indexer) = self.project_indexer {
            if let Some(path) = uri_to_path(uri) {
                let _ = indexer.reindex_file(&path);
            }
        }
    }

    /// Close a document
    pub fn close_document(&mut self, uri: &str) {
        self.documents.remove(uri);
        self.symbol_index.remove_document(uri);
        self.todo_index.remove_document(uri);
    }

    /// Get a document by URI
    pub fn get_document(&self, uri: &str) -> Option<&Document> {
        self.documents.get(uri)
    }

    /// Get all open document URIs
    pub fn get_open_documents(&self) -> Vec<String> {
        self.documents.keys().cloned().collect()
    }
}

impl Default for State {
    fn default() -> Self {
        Self::new()
    }
}

/// Convert a file URI to a path
fn uri_to_path(uri: &str) -> Option<PathBuf> {
    if uri.starts_with("file://") {
        Some(PathBuf::from(&uri[7..]))
    } else {
        None
    }
}
