/* tslint:disable */
/* eslint-disable */

export class LanguageService {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Open a document
   */
  openDocument(uri: string, content: string, language_id: string): void;
  /**
   * Close a document
   */
  closeDocument(uri: string): void;
  /**
   * Get definition at position (returns JSON)
   */
  getDefinition(uri: string, line: number, column: number): string;
  /**
   * Get references to symbol at position (returns JSON)
   */
  getReferences(uri: string, line: number, column: number): string;
  /**
   * Get TODO items for a document (returns JSON)
   */
  getTodoItems(uri: string): string;
  /**
   * Get TODO statistics (returns JSON)
   */
  getTodoStats(): string;
  /**
   * Prepare rename at position (returns JSON with symbol info or null)
   */
  prepareRename(uri: string, line: number, column: number): string;
  /**
   * Search symbols across workspace
   */
  searchSymbols(query: string): string;
  /**
   * Get completions at position (returns JSON)
   */
  getCompletions(uri: string, _line: number, _column: number): string;
  /**
   * Get diagnostics for a document (returns JSON)
   */
  getDiagnostics(_uri: string): string;
  /**
   * Update a document
   */
  updateDocument(uri: string, content: string): void;
  /**
   * Get all TODO items across all documents (returns JSON)
   */
  getAllTodoItems(): string;
  /**
   * Get unused symbols for a document (returns JSON)
   */
  getUnusedSymbols(uri: string): string;
  /**
   * Get document symbols (returns JSON)
   */
  getDocumentSymbols(uri: string): string;
  constructor();
  /**
   * Rename symbol at position (returns JSON with workspace edit or null)
   */
  rename(uri: string, line: number, column: number, new_name: string): string;
  /**
   * Get hover info at position (returns JSON)
   */
  getHover(uri: string, line: number, column: number): string;
}

export function init(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_languageservice_free: (a: number, b: number) => void;
  readonly languageservice_closeDocument: (a: number, b: number, c: number) => void;
  readonly languageservice_getAllTodoItems: (a: number) => [number, number];
  readonly languageservice_getCompletions: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly languageservice_getDefinition: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly languageservice_getDiagnostics: (a: number, b: number, c: number) => [number, number];
  readonly languageservice_getDocumentSymbols: (a: number, b: number, c: number) => [number, number];
  readonly languageservice_getHover: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly languageservice_getReferences: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly languageservice_getTodoItems: (a: number, b: number, c: number) => [number, number];
  readonly languageservice_getTodoStats: (a: number) => [number, number];
  readonly languageservice_getUnusedSymbols: (a: number, b: number, c: number) => [number, number];
  readonly languageservice_new: () => number;
  readonly languageservice_openDocument: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly languageservice_prepareRename: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly languageservice_rename: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
  readonly languageservice_searchSymbols: (a: number, b: number, c: number) => [number, number];
  readonly languageservice_updateDocument: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly init: () => void;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
