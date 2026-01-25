import { promises as fs } from 'fs'
import * as fsSync from 'fs'
import path from 'path'
import crypto from 'crypto'

const minimatch = require('minimatch') as (value: string, pattern: string, options?: { dot?: boolean }) => boolean

type WindowMessageLevel = 'info' | 'warning' | 'error'

type CommandHandler = (...args: unknown[]) => unknown

type EventListener<T> = (event: T) => unknown

type DiagnosticEntry = unknown

type ConfigurationChangeEvent = {
  affectsConfiguration: (section?: string) => boolean
}

type DocumentFilter = {
  language?: string
  scheme?: string
  pattern?: string
}

type DocumentSelector = string | DocumentFilter | Array<string | DocumentFilter>

type CompletionProviderEntry = {
  selector: DocumentSelector
  provider: CompletionItemProvider
  triggerCharacters?: string[]
}

type InlineCompletionProviderEntry = {
  selector: DocumentSelector
  provider: InlineCompletionItemProvider
}

interface CancellationToken {
  isCancellationRequested: boolean
  onCancellationRequested: (listener: EventListener<void>) => Disposable
}

interface CompletionContext {
  triggerKind?: number
  triggerCharacter?: string
}

interface CompletionItemProvider {
  provideCompletionItems: (
    document: TextDocument,
    position: Position,
    context: CompletionContext,
    token: CancellationToken
  ) => CompletionItem[] | CompletionList | Promise<CompletionItem[] | CompletionList | undefined> | undefined
}

interface InlineCompletionItemProvider {
  provideInlineCompletionItems: (
    document: TextDocument,
    position: Position,
    context: unknown,
    token: CancellationToken
  ) => InlineCompletionItem[] | InlineCompletionList | Promise<InlineCompletionItem[] | InlineCompletionList | undefined> | undefined
}

interface CompletionList {
  items: CompletionItem[]
  isIncomplete?: boolean
}

interface CompletionItem {
  label: string | { label: string }
  kind?: number
  detail?: string
  documentation?: string | MarkdownString
  insertText?: string | SnippetString
  insertTextFormat?: number
  textEdit?: {
    range: Range
    newText: string
  }
}

interface InlineCompletionItem {
  insertText: string | SnippetString
  range?: Range
}

interface InlineCompletionList {
  items: InlineCompletionItem[]
}

type TerminalInstance = {
  name: string
  sendText: (text: string) => void
  show: () => void
  shellIntegration?: unknown
  dispose: () => void
}

class Disposable {
  private onDispose?: () => void

  constructor(onDispose?: () => void) {
    this.onDispose = onDispose
  }

  dispose(): void {
    if (this.onDispose) {
      this.onDispose()
      this.onDispose = undefined
    }
  }

  static from(...disposables: Array<{ dispose: () => void }>): Disposable {
    return new Disposable(() => {
      for (const disposable of disposables) {
        disposable.dispose()
      }
    })
  }
}

class EventEmitter<T> {
  private listeners = new Set<EventListener<T>>()

  event = (listener: EventListener<T>): Disposable => {
    this.listeners.add(listener)
    return new Disposable(() => {
      this.listeners.delete(listener)
    })
  }

  fire(data: T): void {
    for (const listener of Array.from(this.listeners)) {
      try {
        listener(data)
      } catch (error) {
        console.error('[extension-host] event listener error', error)
      }
    }
  }

  dispose(): void {
    this.listeners.clear()
  }
}

class Uri {
  scheme: string
  path: string
  fsPath: string

  private constructor(scheme: string, pathValue: string) {
    this.scheme = scheme
    this.path = pathValue
    this.fsPath = pathValue
  }

  static file(filePath: string): Uri {
    return new Uri('file', filePath)
  }

  static parse(value: string): Uri {
    if (value.startsWith('file://')) {
      const decoded = decodeURI(value.replace('file://', ''))
      return new Uri('file', decoded)
    }
    return new Uri('file', value)
  }

  static joinPath(base: Uri, ...pathSegments: string[]): Uri {
    return new Uri(base.scheme, path.join(base.fsPath, ...pathSegments))
  }

  toString(): string {
    if (this.scheme === 'file') {
      return `file://${encodeURI(this.path)}`
    }
    return `${this.scheme}://${encodeURI(this.path)}`
  }
}

class Position {
  line: number
  character: number

  constructor(line: number, character: number) {
    this.line = line
    this.character = character
  }

  isEqual(other: Position): boolean {
    return this.line === other.line && this.character === other.character
  }
}

class Range {
  start: Position
  end: Position

  constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    this.start = new Position(startLine, startCharacter)
    this.end = new Position(endLine, endCharacter)
  }

  get isEmpty(): boolean {
    return this.start.line === this.end.line && this.start.character === this.end.character
  }

  get isSingleLine(): boolean {
    return this.start.line === this.end.line
  }
}

class Selection extends Range {
  anchor: Position
  active: Position

  constructor(anchor: Position, active: Position) {
    super(anchor.line, anchor.character, active.line, active.character)
    this.anchor = anchor
    this.active = active
  }
}

class SnippetString {
  value: string

  constructor(value = '') {
    this.value = value
  }

  appendText(text: string): SnippetString {
    this.value += text.replace(/\$/g, '\\$')
    return this
  }

  appendSnippet(snippet: string): SnippetString {
    this.value += snippet
    return this
  }

  toString(): string {
    return this.value
  }
}

class MarkdownString {
  value: string

  constructor(value = '') {
    this.value = value
  }

  appendText(text: string): MarkdownString {
    this.value += text
    return this
  }

  appendMarkdown(markdown: string): MarkdownString {
    this.value += markdown
    return this
  }

  toString(): string {
    return this.value
  }
}

class CompletionItem {
  label: string | { label: string }
  kind?: number
  detail?: string
  documentation?: string | MarkdownString
  insertText?: string | SnippetString
  insertTextFormat?: number
  range?: Range | { insert: Range; replace: Range }
  command?: { command: string; title: string; arguments?: unknown[] }
  filterText?: string
  sortText?: string
  preselect?: boolean
  commitCharacters?: string[]
  tags?: number[]

  constructor(label: string | { label: string }, kind?: number) {
    this.label = label
    this.kind = kind
  }
}

class CompletionList {
  items: CompletionItem[]
  isIncomplete?: boolean

  constructor(items: CompletionItem[] = [], isIncomplete?: boolean) {
    this.items = items
    this.isIncomplete = isIncomplete
  }
}

class InlineCompletionItem {
  insertText: string | SnippetString
  range?: Range
  command?: { command: string; title: string; arguments?: unknown[] }

  constructor(insertText: string | SnippetString, range?: Range) {
    this.insertText = insertText
    this.range = range
  }
}

class InlineCompletionList {
  items: InlineCompletionItem[]

  constructor(items: InlineCompletionItem[] = []) {
    this.items = items
  }
}

class TextEdit {
  range: Range
  newText: string

  constructor(range: Range, newText: string) {
    this.range = range
    this.newText = newText
  }

  static replace(range: Range, newText: string): TextEdit {
    return new TextEdit(range, newText)
  }

  static insert(position: Position, newText: string): TextEdit {
    return new TextEdit(new Range(position.line, position.character, position.line, position.character), newText)
  }

  static delete(range: Range): TextEdit {
    return new TextEdit(range, '')
  }
}

class WorkspaceEdit {
  private edits = new Map<string, TextEdit[]>()

  replace(uri: Uri | string, range: Range, newText: string): void {
    this.set(uri, [TextEdit.replace(range, newText)])
  }

  insert(uri: Uri | string, position: Position, newText: string): void {
    this.set(uri, [TextEdit.insert(position, newText)])
  }

  delete(uri: Uri | string, range: Range): void {
    this.set(uri, [TextEdit.delete(range)])
  }

  set(uri: Uri | string, edits: TextEdit[]): void {
    const fsPath = normalizeFsPath(uri)
    const current = this.edits.get(fsPath) ?? []
    this.edits.set(fsPath, current.concat(edits))
  }

  entries(): Array<[Uri, TextEdit[]]> {
    return Array.from(this.edits.entries()).map(([fsPath, edits]) => [Uri.file(fsPath), edits])
  }
}

class CancellationTokenSource {
  private cancelled = false
  private emitter = new EventEmitter<void>()

  get token(): CancellationToken {
    return {
      isCancellationRequested: this.cancelled,
      onCancellationRequested: this.emitter.event
    }
  }

  cancel(): void {
    if (this.cancelled) {
      return
    }
    this.cancelled = true
    this.emitter.fire()
  }

  dispose(): void {
    this.emitter.dispose()
  }
}

class CancellationError extends Error {
  constructor() {
    super('Canceled')
    this.name = 'CancellationError'
  }
}

class Location {
  uri: Uri
  range: Range

  constructor(uri: Uri, range: Range) {
    this.uri = uri
    this.range = range
  }
}

class CodeLens {
  range: Range
  command?: { command: string; title: string; arguments?: unknown[] }

  constructor(range: Range, command?: { command: string; title: string; arguments?: unknown[] }) {
    this.range = range
    this.command = command
  }
}

class DocumentLink {
  range: Range
  target?: Uri

  constructor(range: Range, target?: Uri) {
    this.range = range
    this.target = target
  }
}

class SymbolInformation {
  name: string
  kind: number
  location: Location
  containerName?: string

  constructor(name: string, kind: number, rangeOrLocation: Range | Location, uri?: Uri, containerName?: string) {
    this.name = name
    this.kind = kind
    this.location = rangeOrLocation instanceof Location ? rangeOrLocation : new Location(uri ?? Uri.file(''), rangeOrLocation)
    this.containerName = containerName
  }
}

class InlayHint {
  position: Position
  label: string | { label: string }
  kind?: number

  constructor(position: Position, label: string | { label: string }, kind?: number) {
    this.position = position
    this.label = label
    this.kind = kind
  }
}

class CallHierarchyItem {
  name: string
  kind: number
  uri: Uri
  range: Range
  selectionRange: Range

  constructor(name: string, kind: number, uri: Uri, range: Range, selectionRange: Range) {
    this.name = name
    this.kind = kind
    this.uri = uri
    this.range = range
    this.selectionRange = selectionRange
  }
}

class TypeHierarchyItem {
  name: string
  kind: number
  uri: Uri
  range: Range
  selectionRange: Range

  constructor(name: string, kind: number, uri: Uri, range: Range, selectionRange: Range) {
    this.name = name
    this.kind = kind
    this.uri = uri
    this.range = range
    this.selectionRange = selectionRange
  }
}

class Diagnostic {
  range: Range
  message: string
  severity?: number
  source?: string
  code?: string | number | { value: string | number }

  constructor(range: Range, message: string, severity?: number) {
    this.range = range
    this.message = message
    this.severity = severity
  }
}

class CodeAction {
  title: string
  kind?: string
  diagnostics?: Diagnostic[]
  isPreferred?: boolean
  edit?: WorkspaceEdit
  command?: { command: string; title: string; arguments?: unknown[] }

  constructor(title: string, kind?: string) {
    this.title = title
    this.kind = kind
  }
}

const CodeActionKind = {
  Empty: '',
  QuickFix: 'quickfix',
  Refactor: 'refactor',
  RefactorExtract: 'refactor.extract',
  RefactorInline: 'refactor.inline',
  RefactorRewrite: 'refactor.rewrite',
  Source: 'source',
  SourceFixAll: 'source.fixAll',
  SourceOrganizeImports: 'source.organizeImports'
} as const

const CodeActionTriggerKind = {
  Invoke: 1,
  Automatic: 2
} as const

class TextDocument {
  uri: Uri
  fileName: string
  languageId: string
  version: number
  isUntitled = false
  isClosed = false

  private text: string

  constructor(uri: Uri, languageId: string, text: string, version: number) {
    this.uri = uri
    this.fileName = uri.fsPath
    this.languageId = languageId
    this.text = text
    this.version = version
  }

  get lineCount(): number {
    return this.text.split('\n').length
  }

  getText(range?: Range): string {
    if (!range) {
      return this.text
    }
    const startOffset = this.offsetAt(range.start)
    const endOffset = this.offsetAt(range.end)
    return this.text.slice(startOffset, endOffset)
  }

  lineAt(line: number | Position): {
    lineNumber: number
    text: string
    range: Range
    rangeIncludingLineBreak: Range
    firstNonWhitespaceCharacterIndex: number
    isEmptyOrWhitespace: boolean
  } {
    const lineNumber = typeof line === 'number' ? line : line.line
    const lines = this.text.split('\n')
    const safeLine = Math.max(0, Math.min(lineNumber, lines.length - 1))
    const lineText = lines[safeLine] ?? ''
    const range = new Range(safeLine, 0, safeLine, lineText.length)
    const rangeIncludingLineBreak = new Range(safeLine, 0, safeLine, lineText.length + 1)
    const firstNonWhitespaceCharacterIndex = lineText.search(/\S/)
    return {
      lineNumber: safeLine,
      text: lineText,
      range,
      rangeIncludingLineBreak,
      firstNonWhitespaceCharacterIndex: firstNonWhitespaceCharacterIndex === -1 ? lineText.length : firstNonWhitespaceCharacterIndex,
      isEmptyOrWhitespace: lineText.trim().length === 0
    }
  }

  offsetAt(position: Position): number {
    const lines = this.text.split('\n')
    let offset = 0
    for (let i = 0; i < position.line && i < lines.length; i += 1) {
      offset += lines[i].length + 1
    }
    return offset + position.character
  }

  positionAt(offset: number): Position {
    const lines = this.text.split('\n')
    let remaining = offset
    for (let i = 0; i < lines.length; i += 1) {
      const lineLength = lines[i].length
      if (remaining <= lineLength) {
        return new Position(i, remaining)
      }
      remaining -= lineLength + 1
    }
    return new Position(Math.max(0, lines.length - 1), Math.max(0, lines[lines.length - 1]?.length ?? 0))
  }

  updateText(text: string, version: number): void {
    this.text = text
    this.version = version
  }
}

function applyTextEdits(document: TextDocument, edits: Array<{ range: Range; newText: string }>): boolean {
  if (edits.length === 0) {
    return false
  }
  const text = document.getText()
  const sorted = edits.slice().sort((a, b) => document.offsetAt(b.range.start) - document.offsetAt(a.range.start))
  let updated = text
  for (const entry of sorted) {
    const startOffset = document.offsetAt(entry.range.start)
    const endOffset = document.offsetAt(entry.range.end)
    updated = `${updated.slice(0, startOffset)}${entry.newText}${updated.slice(endOffset)}`
  }
  document.updateText(updated, document.version + 1)
  onDidChangeTextDocumentEmitter.fire({ document, contentChanges: [] })
  return true
}

class Memento {
  private storageFile: string
  private state: Record<string, unknown>

  constructor(storagePath: string, name: string) {
    this.storageFile = path.join(storagePath, `${name}.json`)
    this.state = {}
    try {
      const raw = fsSync.readFileSync(this.storageFile, 'utf-8')
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        this.state = parsed as Record<string, unknown>
      }
    } catch {
      this.state = {}
    }
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    return (this.state[key] as T | undefined) ?? defaultValue
  }

  keys(): string[] {
    return Object.keys(this.state)
  }

  async update(key: string, value: unknown): Promise<void> {
    if (value === undefined) {
      delete this.state[key]
    } else {
      this.state[key] = value
    }
    await fs.mkdir(path.dirname(this.storageFile), { recursive: true })
    await fs.writeFile(this.storageFile, JSON.stringify(this.state, null, 2), 'utf-8')
  }
}

class SecretStorage {
  private storageFile: string
  private state: Record<string, string>
  private onDidChangeEmitter = new EventEmitter<{ key: string }>()

  constructor(storagePath: string) {
    this.storageFile = path.join(storagePath, 'secrets.json')
    this.state = {}
    try {
      const raw = fsSync.readFileSync(this.storageFile, 'utf-8')
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        this.state = parsed as Record<string, string>
      }
    } catch {
      this.state = {}
    }
  }

  onDidChange = this.onDidChangeEmitter.event

  get(key: string): Promise<string | undefined> {
    return Promise.resolve(this.state[key])
  }

  async store(key: string, value: string): Promise<void> {
    this.state[key] = value
    await this.persist()
    this.onDidChangeEmitter.fire({ key })
  }

  async delete(key: string): Promise<void> {
    delete this.state[key]
    await this.persist()
    this.onDidChangeEmitter.fire({ key })
  }

  private async persist(): Promise<void> {
    await fs.mkdir(path.dirname(this.storageFile), { recursive: true })
    await fs.writeFile(this.storageFile, JSON.stringify(this.state, null, 2), 'utf-8')
  }
}

const commandRegistry = new Map<string, CommandHandler>()
const contextStore = new Map<string, unknown>()
commandRegistry.set('setContext', (key: unknown, value: unknown) => {
  if (typeof key === 'string') {
    contextStore.set(key, value)
  }
})

const configurationStore = new Map<string, Map<string, unknown>>()
const diagnosticCollections = new Map<string, Map<string, DiagnosticEntry[]>>()
const completionProviders = new Map<number, CompletionProviderEntry>()
const inlineCompletionProviders = new Map<number, InlineCompletionProviderEntry>()
const documents = new Map<string, TextDocument>()
const extensionsRegistry = new Map<string, ExtensionDescription>()

let providerIdCounter = 1
let workspaceRoot = process.env.LOGOS_WORKSPACE_ROOT || ''
let activeEditor: TextEditor | undefined
let activeTerminal: TerminalInstance | undefined
const terminals: TerminalInstance[] = []
let commandActivationHandler: ((command: string) => Promise<void>) | null = null
let clipboardState = ''

const onDidOpenTextDocumentEmitter = new EventEmitter<TextDocument>()
const onDidChangeTextDocumentEmitter = new EventEmitter<{ document: TextDocument; contentChanges?: unknown[] }>()
const onDidCloseTextDocumentEmitter = new EventEmitter<TextDocument>()
const onDidSaveTextDocumentEmitter = new EventEmitter<TextDocument>()
const onDidChangeActiveTextEditorEmitter = new EventEmitter<TextEditor | undefined>()
const onDidChangeTextEditorSelectionEmitter = new EventEmitter<{ textEditor: TextEditor }>()
const onDidChangeVisibleTextEditorsEmitter = new EventEmitter<TextEditor[]>()
const onDidChangeConfigurationEmitter = new EventEmitter<ConfigurationChangeEvent>()
const onDidChangeDiagnosticsEmitter = new EventEmitter<{ uris: Uri[] }>()
const onDidChangeWorkspaceFoldersEmitter = new EventEmitter<{ added: unknown[]; removed: unknown[] }>()
const onDidChangeTerminalShellIntegrationEmitter = new EventEmitter<void>()
const onDidChangeTabsEmitter = new EventEmitter<void>()
const onDidEndTaskProcessEmitter = new EventEmitter<{ execution: TaskExecution; exitCode?: number }>()
const onDidChangeActiveTerminalEmitter = new EventEmitter<TerminalInstance | undefined>()
const onDidChangeActiveColorThemeEmitter = new EventEmitter<{ kind: number }>()
const onDidChangeTelemetryEnabledEmitter = new EventEmitter<boolean>()

const tabGroups = {
  all: [] as Array<{ tabs: Array<{ input: unknown; isPreview?: boolean }> }>,
  activeTabGroup: { tabs: [] as Array<{ input: unknown; isPreview?: boolean }> },
  onDidChangeTabs: onDidChangeTabsEmitter.event
}

function sendWindowMessage(level: WindowMessageLevel, message: string): void {
  if (process.send) {
    process.send({ type: 'window:message', level, message })
  }
}

function sendExternalOpen(target: string): void {
  if (process.send) {
    process.send({ type: 'openExternal', url: target })
  }
}

function normalizeFsPath(input: unknown): string {
  if (input instanceof Uri) {
    return input.fsPath
  }
  if (typeof input === 'string') {
    return input.startsWith('file://') ? Uri.parse(input).fsPath : input
  }
  if (input && typeof input === 'object') {
    const record = input as { fsPath?: string; path?: string }
    if (record.fsPath) {
      return record.fsPath
    }
    if (record.path) {
      return record.path
    }
  }
  return ''
}

function matchesSelector(selector: DocumentSelector, document: TextDocument): boolean {
  if (!selector) {
    return true
  }
  if (Array.isArray(selector)) {
    return selector.some(entry => matchesSelector(entry, document))
  }
  if (typeof selector === 'string') {
    return selector === '*' || selector === document.languageId
  }
  const languageOk = !selector.language || selector.language === document.languageId
  const schemeOk = !selector.scheme || selector.scheme === document.uri.scheme
  const patternOk = !selector.pattern || minimatch(document.uri.fsPath.replace(/\\/g, '/'), selector.pattern, { dot: true })
  return languageOk && schemeOk && patternOk
}

class WorkspaceConfiguration {
  private section: string

  constructor(section: string) {
    this.section = section
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    const sectionStore = configurationStore.get(this.section)
    if (!sectionStore) {
      return defaultValue
    }
    return (sectionStore.get(key) as T | undefined) ?? defaultValue
  }

  has(key: string): boolean {
    const sectionStore = configurationStore.get(this.section)
    if (!sectionStore) {
      return false
    }
    return sectionStore.has(key)
  }

  inspect(key: string): { key: string; defaultValue?: unknown; globalValue?: unknown; workspaceValue?: unknown } {
    const sectionStore = configurationStore.get(this.section)
    const value = sectionStore?.get(key)
    return {
      key,
      defaultValue: undefined,
      globalValue: value,
      workspaceValue: value
    }
  }

  update(key: string, value: unknown, _target?: number | boolean, _overrideInLanguage?: boolean): Promise<void> {
    const sectionStore = configurationStore.get(this.section) ?? new Map<string, unknown>()
    sectionStore.set(key, value)
    configurationStore.set(this.section, sectionStore)
    const changedKey = this.section ? `${this.section}.${key}` : key
    onDidChangeConfigurationEmitter.fire({
      affectsConfiguration: (section?: string) => {
        if (!section) {
          return true
        }
        return section === changedKey || section.startsWith(`${changedKey}.`) || changedKey.startsWith(`${section}.`)
      }
    })
    return Promise.resolve()
  }
}

class FileSystemWatcher {
  private onDidCreateEmitter = new EventEmitter<Uri>()
  private onDidChangeEmitter = new EventEmitter<Uri>()
  private onDidDeleteEmitter = new EventEmitter<Uri>()

  onDidCreate = this.onDidCreateEmitter.event
  onDidChange = this.onDidChangeEmitter.event
  onDidDelete = this.onDidDeleteEmitter.event

  dispose(): void {
    this.onDidCreateEmitter.dispose()
    this.onDidChangeEmitter.dispose()
    this.onDidDeleteEmitter.dispose()
  }
}

class TextEditorDecorationType {
  dispose(): void {
    // noop
  }
}

class TextEditorEdit {
  private edits: Array<{ range: Range; newText: string }> = []

  replace(range: Range, newText: string): void {
    this.edits.push({ range, newText })
  }

  insert(position: Position, newText: string): void {
    this.replace(new Range(position.line, position.character, position.line, position.character), newText)
  }

  delete(range: Range): void {
    this.replace(range, '')
  }

  getEdits(): Array<{ range: Range; newText: string }> {
    return this.edits.slice()
  }
}

class TextEditor {
  document: TextDocument
  selections: Selection[]
  viewColumn?: number

  private _selection: Selection

  constructor(document: TextDocument, selection: Selection, viewColumn?: number) {
    this.document = document
    this._selection = selection
    this.selections = [selection]
    this.viewColumn = viewColumn
  }

  get selection(): Selection {
    return this._selection
  }

  set selection(selection: Selection) {
    this._selection = selection
    this.selections = [selection]
    onDidChangeTextEditorSelectionEmitter.fire({ textEditor: this })
  }

  updateSelection(selection: Selection): void {
    this.selection = selection
  }

  async edit(callback: (editBuilder: TextEditorEdit) => void): Promise<boolean> {
    const builder = new TextEditorEdit()
    callback(builder)
    return applyTextEdits(this.document, builder.getEdits())
  }

  revealRange(_range: Range, _revealType?: number): void {
    // noop
  }

  setDecorations(_decorationType: TextEditorDecorationType, _rangesOrOptions: Range[] | Array<{ range: Range }>): void {
    // noop
  }
}

class TabInputText {
  uri: Uri

  constructor(uri: Uri) {
    this.uri = uri
  }
}

class TabInputCustom extends TabInputText {
  viewType: string

  constructor(uri: Uri, viewType = '') {
    super(uri)
    this.viewType = viewType
  }
}

class ShellExecution {
  commandLine: string
  args?: string[]

  constructor(commandLine: string, args?: string[]) {
    this.commandLine = commandLine
    this.args = args
  }
}

class Task {
  definition: unknown
  scope?: number
  name: string
  source: string
  execution?: ShellExecution

  constructor(definition: unknown, scope: number | undefined, name: string, source: string, execution?: ShellExecution) {
    this.definition = definition
    this.scope = scope
    this.name = name
    this.source = source
    this.execution = execution
  }
}

class TaskExecution {
  task: Task

  constructor(task: Task) {
    this.task = task
  }

  terminate(): void {
    onDidEndTaskProcessEmitter.fire({ execution: this })
  }
}

const commands = {
  registerCommand: (command: string, callback: CommandHandler): Disposable => {
    commandRegistry.set(command, callback)
    return new Disposable(() => {
      commandRegistry.delete(command)
    })
  },
  registerTextEditorCommand: (command: string, callback: (editor: TextEditor | undefined, ...args: unknown[]) => unknown): Disposable => {
    return commands.registerCommand(command, (...args: unknown[]) => callback(activeEditor, ...args))
  },
  executeCommand: async <T>(command: string, ...args: unknown[]): Promise<T> => {
    const handler = commandRegistry.get(command)
    if (!handler && commandActivationHandler) {
      await commandActivationHandler(command)
    }
    const resolved = commandRegistry.get(command)
    if (!resolved) {
      const fallback = builtinCommandFallbacks.get(command)
      if (fallback) {
        return (typeof fallback === 'function' ? (fallback as (...args: unknown[]) => unknown)(...args) : fallback) as T
      }
      console.warn(`[extension-host] command not found: ${command}`)
      return undefined as T
    }
    return resolved(...args) as T
  },
  getCommands: async (): Promise<string[]> => {
    return Array.from(commandRegistry.keys())
  }
}

const tasks = {
  executeTask: async (task: Task): Promise<TaskExecution> => {
    return new TaskExecution(task)
  },
  onDidEndTaskProcess: onDidEndTaskProcessEmitter.event
}

const chat = {
  registerChatSessionItemProvider: (): Disposable => {
    return new Disposable(() => undefined)
  }
}

const builtinCommandFallbacks = new Map<string, unknown>([
  ['vscode.executeReferenceProvider', []],
  ['vscode.executeDefinitionProvider', []],
  ['vscode.executeDeclarationProvider', []],
  ['vscode.executeTypeDefinitionProvider', []],
  ['vscode.executeImplementationProvider', []],
  ['vscode.executeHoverProvider', []],
  ['vscode.executeDocumentSymbolProvider', []],
  ['vscode.executeWorkspaceSymbolProvider', []],
  ['vscode.executeCompletionItemProvider', []],
  ['vscode.executeCodeActionProvider', []],
  ['vscode.executeRenameProvider', []],
  ['vscode.executeSignatureHelpProvider', []],
  ['vscode.openWith', () => undefined],
  ['workbench.action.reloadWindow', () => undefined],
  ['workbench.action.showCommands', () => undefined],
  ['workbench.view.extension.codexViewContainer', () => undefined]
])

const windowApi = {
  showInformationMessage: async (message: string, ..._items: string[]): Promise<string | undefined> => {
    sendWindowMessage('info', message)
    return undefined
  },
  showWarningMessage: async (message: string, ..._items: string[]): Promise<string | undefined> => {
    sendWindowMessage('warning', message)
    return undefined
  },
  showErrorMessage: async (message: string, ..._items: string[]): Promise<string | undefined> => {
    sendWindowMessage('error', message)
    return undefined
  },
  showInputBox: async (): Promise<string | undefined> => {
    sendWindowMessage('info', 'showInputBox is not implemented yet.')
    return undefined
  },
  showQuickPick: async (): Promise<string | undefined> => {
    sendWindowMessage('info', 'showQuickPick is not implemented yet.')
    return undefined
  },
  createOutputChannel: (name: string) => {
    const log = (level: string, value: string) => {
      if (value) {
        console.log(`[output:${name}:${level}] ${value}`)
      }
    }
    return {
      name,
      append: (value: string) => {
        log('append', value)
      },
      appendLine: (value: string) => {
        log('line', value)
      },
      trace: (value: string) => {
        log('trace', value)
      },
      debug: (value: string) => {
        log('debug', value)
      },
      info: (value: string) => {
        log('info', value)
      },
      warn: (value: string) => {
        log('warn', value)
      },
      error: (value: string) => {
        log('error', value)
      },
      clear: () => {
        console.log(`[output:${name}] cleared`)
      },
      show: () => {
        console.log(`[output:${name}] show`)
      },
      hide: () => {
        console.log(`[output:${name}] hide`)
      },
      dispose: () => {
        console.log(`[output:${name}] disposed`)
      }
    }
  },
  createTerminal: (options?: { name?: string }) => {
    const terminalName = options?.name || 'Terminal'
    const terminal: TerminalInstance = {
      name: terminalName,
      sendText: (text: string) => {
        console.log(`[terminal:${terminalName}] ${text}`)
      },
      show: () => {
        console.log(`[terminal:${terminalName}] show`)
      },
      shellIntegration: undefined,
      dispose: () => {
        console.log(`[terminal:${terminalName}] disposed`)
      }
    }
    terminals.push(terminal)
    activeTerminal = terminal
    onDidChangeActiveTerminalEmitter.fire(activeTerminal)
    return terminal
  },
  get activeTextEditor(): TextEditor | undefined {
    return activeEditor
  },
  get visibleTextEditors(): TextEditor[] {
    return activeEditor ? [activeEditor] : []
  },
  get activeColorTheme(): { kind: number } {
    return { kind: ColorThemeKind.Dark }
  },
  get terminals(): TerminalInstance[] {
    return terminals.slice()
  },
  get activeTerminal(): TerminalInstance | undefined {
    return activeTerminal
  },
  onDidChangeActiveTextEditor: onDidChangeActiveTextEditorEmitter.event,
  onDidChangeTextEditorSelection: onDidChangeTextEditorSelectionEmitter.event,
  onDidChangeVisibleTextEditors: onDidChangeVisibleTextEditorsEmitter.event,
  onDidChangeActiveTerminal: onDidChangeActiveTerminalEmitter.event,
  onDidChangeActiveColorTheme: onDidChangeActiveColorThemeEmitter.event,
  tabGroups,
  createStatusBarItem: (_alignment?: number, _priority?: number) => {
    return {
      text: '',
      tooltip: '',
      command: undefined,
      show: () => undefined,
      hide: () => undefined,
      dispose: () => undefined
    }
  },
  createTextEditorDecorationType: (_options: unknown): TextEditorDecorationType => {
    return new TextEditorDecorationType()
  },
  createWebviewPanel: (_viewType: string, _title: string, _showOptions?: unknown, options?: { enableScripts?: boolean }) => {
    const onDidDisposeEmitter = new EventEmitter<void>()
    const onDidReceiveMessageEmitter = new EventEmitter<unknown>()
    const webview = {
      html: '',
      options,
      asWebviewUri: (uri: Uri) => uri,
      postMessage: async () => false,
      onDidReceiveMessage: onDidReceiveMessageEmitter.event
    }
    return {
      webview,
      onDidDispose: onDidDisposeEmitter.event,
      reveal: () => undefined,
      dispose: () => onDidDisposeEmitter.fire()
    }
  },
  registerUriHandler: (): Disposable => {
    return new Disposable(() => undefined)
  },
  registerWebviewViewProvider: (): Disposable => {
    return new Disposable(() => undefined)
  },
  registerCustomEditorProvider: (): Disposable => {
    return new Disposable(() => undefined)
  },
  createTreeView: (_viewId: string) => {
    const onDidChangeSelectionEmitter = new EventEmitter<void>()
    return {
      onDidChangeSelection: onDidChangeSelectionEmitter.event,
      dispose: () => onDidChangeSelectionEmitter.dispose()
    }
  },
  registerTreeDataProvider: (): Disposable => {
    return new Disposable(() => undefined)
  },
  showTextDocument: async (documentOrUri: TextDocument | Uri | string, options?: { selection?: Range; viewColumn?: number }): Promise<TextEditor> => {
    const document = documentOrUri instanceof TextDocument
      ? documentOrUri
      : await workspaceApi.openTextDocument(documentOrUri)
    const selection = options?.selection
      ? new Selection(options.selection.start, options.selection.end)
      : new Selection(new Position(0, 0), new Position(0, 0))
    activeEditor = new TextEditor(document, selection, options?.viewColumn)
    onDidChangeActiveTextEditorEmitter.fire(activeEditor)
    onDidChangeVisibleTextEditorsEmitter.fire(activeEditor ? [activeEditor] : [])
    return activeEditor
  },
  withProgress: async <T>(_options: { location: number; cancellable?: boolean; title?: string }, task: (progress: { report: (value: unknown) => void }, token: CancellationToken) => Promise<T> | T): Promise<T> => {
    const tokenSource = new CancellationTokenSource()
    const progress = { report: () => undefined }
    return await Promise.resolve(task(progress, tokenSource.token))
  },
  onDidChangeTerminalShellIntegration: onDidChangeTerminalShellIntegrationEmitter.event
}

const workspaceApi = {
  get rootPath(): string | undefined {
    return workspaceRoot || undefined
  },
  isTrusted: true,
  get name(): string | undefined {
    return workspaceRoot ? path.basename(workspaceRoot) : undefined
  },
  get workspaceFolders(): Array<{ uri: Uri; name: string; index: number }> | undefined {
    if (!workspaceRoot) {
      return undefined
    }
    return [{ uri: Uri.file(workspaceRoot), name: path.basename(workspaceRoot), index: 0 }]
  },
  getConfiguration: (section?: string): WorkspaceConfiguration => {
    return new WorkspaceConfiguration(section ?? '')
  },
  getWorkspaceFolder: (uri: Uri | string): { uri: Uri; name: string; index: number } | undefined => {
    if (!workspaceRoot) {
      return undefined
    }
    const fsPath = normalizeFsPath(uri)
    if (!fsPath.startsWith(workspaceRoot)) {
      return undefined
    }
    return { uri: Uri.file(workspaceRoot), name: path.basename(workspaceRoot), index: 0 }
  },
  onDidChangeConfiguration: onDidChangeConfigurationEmitter.event,
  onDidChangeWorkspaceFolders: onDidChangeWorkspaceFoldersEmitter.event,
  onDidOpenTextDocument: onDidOpenTextDocumentEmitter.event,
  onDidChangeTextDocument: onDidChangeTextDocumentEmitter.event,
  onDidCloseTextDocument: onDidCloseTextDocumentEmitter.event,
  onDidSaveTextDocument: onDidSaveTextDocumentEmitter.event,
  get textDocuments(): TextDocument[] {
    return Array.from(documents.values())
  },
  openTextDocument: async (uriOrPath: string | Uri | { language?: string; content?: string }): Promise<TextDocument> => {
    if (typeof uriOrPath === 'object' && !(uriOrPath instanceof Uri) && ('content' in uriOrPath || 'language' in uriOrPath)) {
      const content = uriOrPath.content ?? ''
      const language = uriOrPath.language ?? 'plaintext'
      const virtualPath = path.join(workspaceRoot || process.cwd(), `.virtual-${Date.now()}.txt`)
      const document = new TextDocument(Uri.file(virtualPath), language, content, 1)
      documents.set(virtualPath, document)
      onDidOpenTextDocumentEmitter.fire(document)
      return document
    }
    const fsPath = normalizeFsPath(uriOrPath)
    const raw = await fs.readFile(fsPath, 'utf-8')
    const existing = documents.get(fsPath)
    if (existing) {
      existing.updateText(raw, existing.version + 1)
      return existing
    }
    const document = new TextDocument(Uri.file(fsPath), 'plaintext', raw, 1)
    documents.set(fsPath, document)
    onDidOpenTextDocumentEmitter.fire(document)
    return document
  },
  findFiles: async (include?: string, exclude?: string, maxResults?: number): Promise<Uri[]> => {
    if (!workspaceRoot || !include) {
      return []
    }
    const results: Uri[] = []
    const root = workspaceRoot
    const excludePattern = exclude

    const walk = async (dir: string) => {
      if (typeof maxResults === 'number' && results.length >= maxResults) {
        return
      }
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue
        }
        if (typeof maxResults === 'number' && results.length >= maxResults) {
          return
        }
        const entryPath = path.join(dir, entry.name)
        const relativePath = path.relative(root, entryPath).replace(/\\/g, '/')
        if (excludePattern && minimatch(relativePath, excludePattern, { dot: true })) {
          continue
        }
        if (entry.isDirectory()) {
          await walk(entryPath)
        } else if (minimatch(relativePath, include, { dot: true })) {
          results.push(Uri.file(entryPath))
        }
      }
    }

    await walk(root)
    return results
  },
  asRelativePath: (target: string | Uri): string => {
    const fsPath = normalizeFsPath(target)
    if (!workspaceRoot) {
      return fsPath
    }
    return path.relative(workspaceRoot, fsPath)
  },
  createFileSystemWatcher: (): FileSystemWatcher => {
    return new FileSystemWatcher()
  },
  registerTextDocumentContentProvider: (): Disposable => {
    return new Disposable(() => undefined)
  },
  fs: {
    readFile: async (uri: Uri | string): Promise<Uint8Array> => {
      const fsPath = normalizeFsPath(uri)
      const data = await fs.readFile(fsPath)
      return new Uint8Array(data)
    },
    writeFile: async (uri: Uri | string, content: Uint8Array): Promise<void> => {
      const fsPath = normalizeFsPath(uri)
      await fs.writeFile(fsPath, Buffer.from(content))
    },
    createDirectory: async (uri: Uri | string): Promise<void> => {
      const fsPath = normalizeFsPath(uri)
      await fs.mkdir(fsPath, { recursive: true })
    },
    delete: async (uri: Uri | string): Promise<void> => {
      const fsPath = normalizeFsPath(uri)
      await fs.rm(fsPath, { recursive: true, force: true })
    },
    rename: async (oldUri: Uri | string, newUri: Uri | string): Promise<void> => {
      const oldPath = normalizeFsPath(oldUri)
      const newPath = normalizeFsPath(newUri)
      await fs.rename(oldPath, newPath)
    },
    copy: async (source: Uri | string, target: Uri | string): Promise<void> => {
      const sourcePath = normalizeFsPath(source)
      const targetPath = normalizeFsPath(target)
      await fs.cp(sourcePath, targetPath, { recursive: true })
    },
    stat: async (uri: Uri | string): Promise<{ type: number; ctime: number; mtime: number; size: number }> => {
      const fsPath = normalizeFsPath(uri)
      const stats = await fs.stat(fsPath)
      return {
        type: stats.isDirectory() ? 2 : 1,
        ctime: stats.ctimeMs,
        mtime: stats.mtimeMs,
        size: stats.size
      }
    },
    readDirectory: async (uri: Uri | string): Promise<Array<[string, number]>> => {
      const fsPath = normalizeFsPath(uri)
      const entries = await fs.readdir(fsPath, { withFileTypes: true })
      return entries.map(entry => [entry.name, entry.isDirectory() ? 2 : 1])
    }
  },
  applyEdit: async (edit?: WorkspaceEdit): Promise<boolean> => {
    if (!edit) {
      return false
    }
    let applied = false
    for (const [uri, edits] of edit.entries()) {
      const fsPath = uri.fsPath
      const document = documents.get(fsPath)
      if (!document) {
        continue
      }
      if (applyTextEdits(document, edits)) {
        applied = true
      }
    }
    return applied
  }
}

function createCancellationToken(): CancellationToken {
  const emitter = new EventEmitter<void>()
  return {
    isCancellationRequested: false,
    onCancellationRequested: emitter.event
  }
}

const languages = {
  createDiagnosticCollection: (name = 'default') => {
    if (!diagnosticCollections.has(name)) {
      diagnosticCollections.set(name, new Map())
    }
    const collection = diagnosticCollections.get(name) as Map<string, DiagnosticEntry[]>

    return {
      name,
      set: (uriOrEntries: unknown, diagnostics?: DiagnosticEntry[]) => {
        if (Array.isArray(uriOrEntries)) {
          for (const entry of uriOrEntries) {
            if (!Array.isArray(entry) || entry.length < 2) {
              continue
            }
            const uri = normalizeFsPath(entry[0])
            const items = entry[1] as DiagnosticEntry[]
            if (uri) {
              collection.set(uri, items ?? [])
            }
          }
          onDidChangeDiagnosticsEmitter.fire({ uris: Array.from(collection.keys()).map(value => Uri.file(value)) })
          return
        }

        const uri = normalizeFsPath(uriOrEntries)
        if (uri) {
          collection.set(uri, diagnostics ?? [])
          onDidChangeDiagnosticsEmitter.fire({ uris: [Uri.file(uri)] })
        }
      },
      delete: (uri: unknown) => {
        const key = normalizeFsPath(uri)
        if (key) {
          collection.delete(key)
          onDidChangeDiagnosticsEmitter.fire({ uris: [Uri.file(key)] })
        }
      },
      clear: () => {
        collection.clear()
        onDidChangeDiagnosticsEmitter.fire({ uris: [] })
      },
      dispose: () => {
        collection.clear()
        diagnosticCollections.delete(name)
        onDidChangeDiagnosticsEmitter.fire({ uris: [] })
      }
    }
  },
  registerHoverProvider: () => new Disposable(() => undefined),
  registerDefinitionProvider: () => new Disposable(() => undefined),
  registerReferenceProvider: () => new Disposable(() => undefined),
  registerImplementationProvider: () => new Disposable(() => undefined),
  registerTypeDefinitionProvider: () => new Disposable(() => undefined),
  registerCodeLensProvider: () => new Disposable(() => undefined),
  registerCodeActionProvider: () => new Disposable(() => undefined),
  registerDocumentFormattingEditProvider: () => new Disposable(() => undefined),
  registerDocumentRangeFormattingEditProvider: () => new Disposable(() => undefined),
  registerOnTypeFormattingEditProvider: () => new Disposable(() => undefined),
  registerDocumentSymbolProvider: () => new Disposable(() => undefined),
  registerInlayHintsProvider: () => new Disposable(() => undefined),
  registerSignatureHelpProvider: () => new Disposable(() => undefined),
  registerRenameProvider: () => new Disposable(() => undefined),
  registerFoldingRangeProvider: () => new Disposable(() => undefined),
  registerColorProvider: () => new Disposable(() => undefined),
  registerLinkProvider: () => new Disposable(() => undefined),
  registerDocumentHighlightProvider: () => new Disposable(() => undefined),
  registerDeclarationProvider: () => new Disposable(() => undefined),
  registerSelectionRangeProvider: () => new Disposable(() => undefined),
  match: (selector: DocumentSelector, document: TextDocument): number => {
    return matchesSelector(selector, document) ? 1 : 0
  },
  getDiagnostics: (uri?: Uri): Array<[Uri, DiagnosticEntry[]]> | DiagnosticEntry[] => {
    if (uri) {
      const fsPath = normalizeFsPath(uri)
      const entries: DiagnosticEntry[] = []
      for (const collection of diagnosticCollections.values()) {
        const items = collection.get(fsPath)
        if (items) {
          entries.push(...items)
        }
      }
      return entries
    }

    const results: Array<[Uri, DiagnosticEntry[]]> = []
    const aggregate = new Map<string, DiagnosticEntry[]>()

    for (const collection of diagnosticCollections.values()) {
      for (const [key, items] of collection.entries()) {
        const existing = aggregate.get(key) ?? []
        aggregate.set(key, existing.concat(items))
      }
    }

    for (const [key, items] of aggregate.entries()) {
      results.push([Uri.file(key), items])
    }
    return results
  },
  onDidChangeDiagnostics: onDidChangeDiagnosticsEmitter.event,
  registerCompletionItemProvider: (
    selector: DocumentSelector,
    provider: CompletionItemProvider,
    ...triggerCharacters: string[]
  ): Disposable => {
    const id = providerIdCounter++
    completionProviders.set(id, { selector, provider, triggerCharacters })
    return new Disposable(() => {
      completionProviders.delete(id)
    })
  },
  registerInlineCompletionItemProvider: (
    selector: DocumentSelector,
    provider: InlineCompletionItemProvider
  ): Disposable => {
    const id = providerIdCounter++
    inlineCompletionProviders.set(id, { selector, provider })
    return new Disposable(() => {
      inlineCompletionProviders.delete(id)
    })
  },
  createLanguageStatusItem: (_id: string, _selector: DocumentSelector) => {
    return {
      text: '',
      detail: '',
      command: undefined,
      show: () => undefined,
      hide: () => undefined,
      dispose: () => undefined
    }
  }
}

const DiagnosticSeverity = {
  Error: 0,
  Warning: 1,
  Information: 2,
  Hint: 3
} as const

const FileType = {
  File: 1,
  Directory: 2,
  SymbolicLink: 64,
  Unknown: 0
} as const

const ConfigurationTarget = {
  Global: 1,
  Workspace: 2,
  WorkspaceFolder: 3
} as const

const TaskScope = {
  Global: 1,
  Workspace: 2,
  WorkspaceFolder: 3
} as const

const StatusBarAlignment = {
  Left: 1,
  Right: 2
} as const

const ExtensionKind = {
  UI: 1,
  Workspace: 2
} as const

const ExtensionMode = {
  Production: 1,
  Development: 2,
  Test: 3
} as const

const ViewColumn = {
  Active: -1,
  Beside: -2,
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5
} as const

const TextEditorRevealType = {
  Default: 0,
  InCenter: 1,
  InCenterIfOutsideViewport: 2,
  AtTop: 3
} as const

const QuickPickItemKind = {
  Separator: -1,
  Default: 0
} as const

const ColorThemeKind = {
  Light: 1,
  Dark: 2,
  HighContrast: 3,
  HighContrastLight: 4
} as const

const UIKind = {
  Desktop: 1,
  Web: 2
} as const

const ProgressLocation = {
  Window: 10,
  Notification: 15,
  SourceControl: 20
} as const

const SymbolKind = {
  File: 0,
  Module: 1,
  Namespace: 2,
  Package: 3,
  Class: 4,
  Method: 5,
  Property: 6,
  Field: 7,
  Constructor: 8,
  Enum: 9,
  Interface: 10,
  Function: 11,
  Variable: 12,
  Constant: 13,
  String: 14,
  Number: 15,
  Boolean: 16,
  Array: 17,
  Object: 18,
  Key: 19,
  Null: 20,
  EnumMember: 21,
  Struct: 22,
  Event: 23,
  Operator: 24,
  TypeParameter: 25
} as const

const LanguageStatusSeverity = {
  Information: 0,
  Warning: 1,
  Error: 2
} as const

const CompletionItemKind = {
  Text: 1,
  Method: 2,
  Function: 3,
  Constructor: 4,
  Field: 5,
  Variable: 6,
  Class: 7,
  Interface: 8,
  Module: 9,
  Property: 10,
  Unit: 11,
  Value: 12,
  Enum: 13,
  Keyword: 14,
  Snippet: 15,
  Color: 16,
  File: 17,
  Reference: 18,
  Folder: 19,
  EnumMember: 20,
  Constant: 21,
  Struct: 22,
  Event: 23,
  Operator: 24,
  TypeParameter: 25
} as const

const env = {
  appName: 'Logos',
  appRoot: process.cwd(),
  language: process.env.LANG?.split('.')[0] || 'en',
  machineId: crypto.createHash('sha256').update(process.env.HOSTNAME || 'logos').digest('hex'),
  sessionId: crypto.randomUUID(),
  uiKind: 1,
  isTelemetryEnabled: true,
  onDidChangeTelemetryEnabled: onDidChangeTelemetryEnabledEmitter.event,
  createTelemetryLogger: () => {
    return {
      logUsage: () => undefined,
      logError: () => undefined,
      dispose: () => undefined,
      onDidChangeEnableStates: new EventEmitter<void>().event,
      isUsageEnabled: true,
      isErrorsEnabled: true
    }
  },
  clipboard: {
    readText: async (): Promise<string> => clipboardState,
    writeText: async (value: string): Promise<void> => {
      clipboardState = value
    }
  },
  openExternal: async (target: Uri | string): Promise<boolean> => {
    const value = target instanceof Uri ? target.toString() : target
    sendExternalOpen(value)
    return true
  }
}

interface ExtensionDescription {
  id: string
  extensionPath: string
  extensionUri: Uri
  packageJSON: Record<string, unknown>
  isActive: boolean
  exports?: unknown
  activate: () => Promise<unknown>
}

const extensionsApi = {
  get all(): ExtensionDescription[] {
    return Array.from(extensionsRegistry.values())
  },
  getExtension: (id: string): ExtensionDescription | undefined => {
    return extensionsRegistry.get(id)
  }
}

const authenticationEmitter = new EventEmitter<void>()

const authentication = {
  onDidChangeSessions: authenticationEmitter.event,
  getSession: async (providerId: string, scopes: string[], options?: { createIfNone?: boolean }): Promise<{ id: string; accessToken: string; account: { id: string; label: string }; scopes: string[] } | undefined> => {
    const token = providerId === 'github' ? process.env.GITHUB_TOKEN || process.env.LOGOS_GITHUB_TOKEN : undefined
    if (!token) {
      if (options?.createIfNone) {
        sendWindowMessage('warning', `Authentication for ${providerId} is not configured.`)
      }
      return undefined
    }
    return {
      id: `${providerId}:${scopes.join(',')}`,
      accessToken: token,
      account: { id: providerId, label: providerId },
      scopes
    }
  },
  getSessions: async (providerId: string, scopes: string[]): Promise<Array<{ id: string; accessToken: string; account: { id: string; label: string }; scopes: string[] }>> => {
    const session = await authentication.getSession(providerId, scopes)
    return session ? [session] : []
  }
}

const vscodeApi = {
  commands,
  window: windowApi,
  workspace: workspaceApi,
  languages,
  tasks,
  chat,
  DiagnosticSeverity,
  FileType,
  ConfigurationTarget,
  TaskScope,
  StatusBarAlignment,
  ExtensionKind,
  ExtensionMode,
  ViewColumn,
  TextEditorRevealType,
  QuickPickItemKind,
  ColorThemeKind,
  UIKind,
  ProgressLocation,
  SymbolKind,
  LanguageStatusSeverity,
  CompletionItemKind,
  Disposable,
  EventEmitter,
  Uri,
  Position,
  Range,
  Selection,
  TextDocument,
  TextEditor,
  TextEditorDecorationType,
  SnippetString,
  MarkdownString,
  CompletionItem,
  CompletionList,
  InlineCompletionItem,
  InlineCompletionList,
  TextEdit,
  WorkspaceEdit,
  CancellationTokenSource,
  CancellationError,
  Location,
  CodeLens,
  DocumentLink,
  SymbolInformation,
  InlayHint,
  CallHierarchyItem,
  TypeHierarchyItem,
  FileSystemWatcher,
  TabInputText,
  TabInputCustom,
  ShellExecution,
  Task,
  TaskExecution,
  Diagnostic,
  CodeAction,
  CodeActionKind,
  CodeActionTriggerKind,
  env,
  extensions: extensionsApi,
  authentication,
  version: '1.103.0'
}

let moduleRegistered = false

export function registerVscodeModule(): void {
  if (moduleRegistered) {
    return
  }
  moduleRegistered = true
  const Module = require('module') as {
    _load: (request: string, parent: NodeModule | null, isMain: boolean) => unknown
  }
  const originalLoad = Module._load
  Module._load = function (request: string, parent: NodeModule | null, isMain: boolean) {
    if (request === 'vscode') {
      return vscodeApi
    }
    return originalLoad(request, parent, isMain)
  }
}

export function setWorkspaceRoot(root: string | null): void {
  workspaceRoot = root ?? ''
}

export function setCommandActivationHandler(handler: (command: string) => Promise<void>): void {
  commandActivationHandler = handler
}

export function registerExtensionDescription(id: string, extensionPath: string, packageJSON: Record<string, unknown>): void {
  const existing = extensionsRegistry.get(id)
  const extensionUri = Uri.file(extensionPath)
  const activate = async (): Promise<unknown> => extensionsRegistry.get(id)?.exports
  extensionsRegistry.set(id, {
    id,
    extensionPath,
    extensionUri,
    packageJSON,
    isActive: existing?.isActive ?? false,
    exports: existing?.exports,
    activate
  })
}

export function updateExtensionActivation(id: string, isActive: boolean, exportsValue?: unknown): void {
  const existing = extensionsRegistry.get(id)
  if (existing) {
    existing.isActive = isActive
    existing.exports = exportsValue
    extensionsRegistry.set(id, existing)
  }
}

export function createExtensionContext(storagePath: string): { globalState: Memento; workspaceState: Memento; secrets: SecretStorage } {
  return {
    globalState: new Memento(storagePath, 'globalState'),
    workspaceState: new Memento(storagePath, 'workspaceState'),
    secrets: new SecretStorage(storagePath)
  }
}

export function openTextDocumentFromHost(payload: { uri: string; languageId: string; content: string; version: number }): TextDocument {
  const fsPath = normalizeFsPath(payload.uri)
  const existing = documents.get(fsPath)
  if (existing) {
    existing.updateText(payload.content, payload.version)
    onDidChangeTextDocumentEmitter.fire({ document: existing })
    return existing
  }
  const document = new TextDocument(Uri.file(fsPath), payload.languageId || 'plaintext', payload.content, payload.version)
  documents.set(fsPath, document)
  onDidOpenTextDocumentEmitter.fire(document)
  return document
}

export function updateTextDocumentFromHost(payload: { uri: string; languageId: string; content: string; version: number }): TextDocument | undefined {
  const fsPath = normalizeFsPath(payload.uri)
  const document = documents.get(fsPath)
  if (!document) {
    return openTextDocumentFromHost({
      uri: fsPath,
      languageId: payload.languageId || 'plaintext',
      content: payload.content,
      version: payload.version
    })
  }
  document.updateText(payload.content, payload.version)
  onDidChangeTextDocumentEmitter.fire({ document, contentChanges: [] })
  return document
}

export function closeTextDocumentFromHost(payload: { uri: string }): void {
  const fsPath = normalizeFsPath(payload.uri)
  const document = documents.get(fsPath)
  if (!document) {
    return
  }
  document.isClosed = true
  documents.delete(fsPath)
  onDidCloseTextDocumentEmitter.fire(document)
}

export function setActiveTextEditorFromHost(payload: { uri: string | null; selection?: { start: Position; end: Position } }): void {
  if (!payload.uri) {
    activeEditor = undefined
    onDidChangeActiveTextEditorEmitter.fire(undefined)
    onDidChangeVisibleTextEditorsEmitter.fire([])
    return
  }
  const fsPath = normalizeFsPath(payload.uri)
  const document = documents.get(fsPath)
  if (!document) {
    return
  }
  const selection = payload.selection
    ? new Selection(payload.selection.start, payload.selection.end)
    : new Selection(new Position(0, 0), new Position(0, 0))
  if (activeEditor && activeEditor.document.uri.fsPath === fsPath) {
    activeEditor.updateSelection(selection)
  } else {
    activeEditor = new TextEditor(document, selection)
  }
  onDidChangeActiveTextEditorEmitter.fire(activeEditor)
  onDidChangeVisibleTextEditorsEmitter.fire(activeEditor ? [activeEditor] : [])
}

export function updateActiveEditorSelectionFromHost(payload: { uri: string; selection: { start: Position; end: Position } }): void {
  if (!activeEditor) {
    return
  }
  if (activeEditor.document.uri.fsPath !== normalizeFsPath(payload.uri)) {
    return
  }
  activeEditor.updateSelection(new Selection(payload.selection.start, payload.selection.end))
}

function serializeCompletionItem(item: CompletionItem): Record<string, unknown> {
  const label = typeof item.label === 'string' ? item.label : item.label.label
  const insertText = item.insertText instanceof SnippetString ? item.insertText.value : item.insertText
  const documentation = item.documentation instanceof MarkdownString ? item.documentation.value : item.documentation
  return {
    label,
    kind: item.kind,
    detail: item.detail,
    documentation,
    insertText,
    insertTextFormat: item.insertTextFormat,
    textEdit: item.textEdit
      ? {
        range: item.textEdit.range,
        newText: item.textEdit.newText
      }
      : undefined
  }
}

function serializeInlineCompletionItem(item: InlineCompletionItem): Record<string, unknown> {
  const insertText = item.insertText instanceof SnippetString ? item.insertText.value : item.insertText
  return {
    insertText,
    range: item.range
  }
}

export async function provideCompletions(payload: { uri: string; position: { line: number; character: number }; context?: CompletionContext }): Promise<{ items: Record<string, unknown>[]; isIncomplete: boolean }> {
  const fsPath = normalizeFsPath(payload.uri)
  const document = documents.get(fsPath)
  if (!document) {
    return { items: [], isIncomplete: false }
  }
  const position = new Position(payload.position.line, payload.position.character)
  const token = createCancellationToken()
  const items: Record<string, unknown>[] = []
  let isIncomplete = false

  for (const entry of completionProviders.values()) {
    if (!matchesSelector(entry.selector, document)) {
      continue
    }
    const result = await Promise.resolve(entry.provider.provideCompletionItems(document, position, payload.context ?? {}, token))
    if (!result) {
      continue
    }
    if (Array.isArray(result)) {
      items.push(...result.map(serializeCompletionItem))
    } else {
      isIncomplete = isIncomplete || Boolean(result.isIncomplete)
      items.push(...(result.items || []).map(serializeCompletionItem))
    }
  }

  return { items, isIncomplete }
}

export async function provideInlineCompletions(payload: { uri: string; position: { line: number; character: number } }): Promise<{ items: Record<string, unknown>[] }> {
  const fsPath = normalizeFsPath(payload.uri)
  const document = documents.get(fsPath)
  if (!document) {
    return { items: [] }
  }
  const position = new Position(payload.position.line, payload.position.character)
  const token = createCancellationToken()
  const items: Record<string, unknown>[] = []

  for (const entry of inlineCompletionProviders.values()) {
    if (!matchesSelector(entry.selector, document)) {
      continue
    }
    const result = await Promise.resolve(entry.provider.provideInlineCompletionItems(document, position, {}, token))
    if (!result) {
      continue
    }
    const list = Array.isArray(result) ? result : result.items
    if (Array.isArray(list)) {
      items.push(...list.map(serializeInlineCompletionItem))
    }
  }

  return { items }
}

export { vscodeApi }
