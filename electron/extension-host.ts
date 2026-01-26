import {
  registerVscodeModule,
  openTextDocumentFromHost,
  updateTextDocumentFromHost,
  closeTextDocumentFromHost,
  setActiveTextEditorFromHost,
  updateActiveEditorSelectionFromHost,
  provideCompletions,
  provideInlineCompletions,
  provideHover,
  provideDefinition,
  provideReferences,
  provideImplementation,
  provideTypeDefinition,
  provideDeclaration,
  provideDocumentSymbols,
  provideSignatureHelp,
  provideRenameEdits,
  prepareRename,
  provideCodeActions,
  provideFormattingEdits,
  provideRangeFormattingEdits,
  provideOnTypeFormattingEdits,
  resolveWebviewView,
  postWebviewMessage,
  disposeWebviewView,
  handleUiResponse,
  vscodeApi
} from './extension-host/vscode'
import { ExtensionHost } from './extension-host/loader'

type HostMessage =
  | { type: 'ping' }
  | { type: 'shutdown' }
  | { type: 'setWorkspaceRoot'; root?: string | null }
  | { type: 'reloadExtensions' }
  | { type: 'documentOpen'; document: { uri: string; languageId: string; content: string; version: number } }
  | { type: 'documentChange'; document: { uri: string; languageId: string; content: string; version: number } }
  | { type: 'documentClose'; uri: string }
  | { type: 'activeEditorChange'; uri: string | null; selection?: { start: { line: number; character: number }; end: { line: number; character: number } } }
  | { type: 'selectionChange'; uri: string; selection: { start: { line: number; character: number }; end: { line: number; character: number } } }
  | { type: 'provideCompletions'; requestId: string; payload: { uri: string; position: { line: number; character: number }; context?: { triggerKind?: number; triggerCharacter?: string } } }
  | { type: 'provideInlineCompletions'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideHover'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideDefinition'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideReferences'; requestId: string; payload: { uri: string; position: { line: number; character: number }; context?: { includeDeclaration?: boolean } } }
  | { type: 'provideImplementation'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideTypeDefinition'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideDeclaration'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideDocumentSymbols'; requestId: string; payload: { uri: string } }
  | { type: 'provideSignatureHelp'; requestId: string; payload: { uri: string; position: { line: number; character: number }; context?: { triggerKind?: number; triggerCharacter?: string; isRetrigger?: boolean } } }
  | { type: 'provideRenameEdits'; requestId: string; payload: { uri: string; position: { line: number; character: number }; newName: string } }
  | { type: 'prepareRename'; requestId: string; payload: { uri: string; position: { line: number; character: number } } }
  | { type: 'provideCodeActions'; requestId: string; payload: { uri: string; range: { start: { line: number; character: number }; end: { line: number; character: number } }; context?: { only?: string; triggerKind?: number } } }
  | { type: 'provideFormattingEdits'; requestId: string; payload: { uri: string; options?: { tabSize: number; insertSpaces: boolean } } }
  | { type: 'provideRangeFormattingEdits'; requestId: string; payload: { uri: string; range: { start: { line: number; character: number }; end: { line: number; character: number } }; options?: { tabSize: number; insertSpaces: boolean } } }
  | { type: 'provideOnTypeFormattingEdits'; requestId: string; payload: { uri: string; position: { line: number; character: number }; ch: string; options?: { tabSize: number; insertSpaces: boolean } } }
  | { type: 'executeCommand'; requestId: string; payload: { command: string; args?: unknown[] } }
  | { type: 'uiResponse'; requestId: string; ok: boolean; result?: unknown; error?: string }
  | { type: 'resolveWebviewView'; requestId: string; payload: { viewId: string } }
  | { type: 'webviewPostMessage'; requestId: string; payload: { handle: string; message: unknown } }
  | { type: 'webviewDispose'; requestId: string; payload: { handle: string } }

type HostEvent =
  | { type: 'ready'; pid: number }
  | { type: 'pong'; pid: number }
  | { type: 'rpcResponse'; requestId: string; ok: boolean; payload?: unknown; error?: string }

registerVscodeModule()

const extensionsRoot = process.env.LOGOS_EXTENSIONS_DIR || ''
const host = new ExtensionHost(extensionsRoot)
host.start().catch((error) => {
  console.error('[extension-host] startup failed:', error)
})

function sendEvent(event: HostEvent): void {
  if (process.send) {
    process.send(event)
  }
}

process.on('message', (message: unknown) => {
  if (!message || typeof message !== 'object') {
    return
  }

  const typedMessage = message as HostMessage

  switch (typedMessage.type) {
    case 'ping':
      sendEvent({ type: 'pong', pid: process.pid })
      break
    case 'shutdown':
      host.shutdown().finally(() => {
        process.exit(0)
      })
      break
    case 'setWorkspaceRoot':
      host.setWorkspaceRoot(typedMessage.root ?? null)
      break
    case 'reloadExtensions':
      host.reload().catch((error) => {
        console.error('[extension-host] reload failed:', error)
      })
      break
    case 'documentOpen': {
      const document = openTextDocumentFromHost(typedMessage.document)
      host.handleDocumentOpened(document.languageId)
      break
    }
    case 'documentChange':
      {
        const document = updateTextDocumentFromHost(typedMessage.document)
        if (document) {
          host.handleDocumentOpened(document.languageId)
        }
      }
      break
    case 'documentClose':
      closeTextDocumentFromHost({ uri: typedMessage.uri })
      break
    case 'activeEditorChange':
      setActiveTextEditorFromHost({ uri: typedMessage.uri, selection: typedMessage.selection })
      break
    case 'selectionChange':
      updateActiveEditorSelectionFromHost({ uri: typedMessage.uri, selection: typedMessage.selection })
      break
    case 'provideCompletions':
      provideCompletions(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Completion failed' }))
      break
    case 'provideInlineCompletions':
      provideInlineCompletions(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Inline completion failed' }))
      break
    case 'provideHover':
      provideHover(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Hover failed' }))
      break
    case 'provideDefinition':
      provideDefinition(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Definition failed' }))
      break
    case 'provideReferences':
      provideReferences(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'References failed' }))
      break
    case 'provideImplementation':
      provideImplementation(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Implementation failed' }))
      break
    case 'provideTypeDefinition':
      provideTypeDefinition(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Type definition failed' }))
      break
    case 'provideDeclaration':
      provideDeclaration(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Declaration failed' }))
      break
    case 'provideDocumentSymbols':
      provideDocumentSymbols(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Document symbols failed' }))
      break
    case 'provideSignatureHelp':
      provideSignatureHelp(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Signature help failed' }))
      break
    case 'provideRenameEdits':
      provideRenameEdits(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Rename failed' }))
      break
    case 'prepareRename':
      prepareRename(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Prepare rename failed' }))
      break
    case 'provideCodeActions':
      provideCodeActions(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Code actions failed' }))
      break
    case 'provideFormattingEdits':
      provideFormattingEdits(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Formatting failed' }))
      break
    case 'provideRangeFormattingEdits':
      provideRangeFormattingEdits(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Range formatting failed' }))
      break
    case 'provideOnTypeFormattingEdits':
      provideOnTypeFormattingEdits(typedMessage.payload)
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'On-type formatting failed' }))
      break
    case 'resolveWebviewView':
      host.handleViewActivated(typedMessage.payload.viewId)
        .then(() => resolveWebviewView(typedMessage.payload))
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Resolve webview view failed' }))
      break
    case 'webviewPostMessage':
      postWebviewMessage(typedMessage.payload)
        .then(() => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Webview message failed' }))
      break
    case 'webviewDispose':
      disposeWebviewView(typedMessage.payload)
        .then(() => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Webview dispose failed' }))
      break
    case 'executeCommand':
      vscodeApi.commands.executeCommand(typedMessage.payload.command, ...(typedMessage.payload.args ?? []))
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Command failed' }))
      break
    case 'uiResponse':
      handleUiResponse(typedMessage)
      break
    default:
      break
  }
})

sendEvent({ type: 'ready', pid: process.pid })
