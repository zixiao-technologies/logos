import { registerVscodeModule, openTextDocumentFromHost, updateTextDocumentFromHost, closeTextDocumentFromHost, setActiveTextEditorFromHost, updateActiveEditorSelectionFromHost, provideCompletions, provideInlineCompletions, vscodeApi } from './extension-host/vscode'
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
  | { type: 'executeCommand'; requestId: string; payload: { command: string; args?: unknown[] } }

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
    case 'executeCommand':
      vscodeApi.commands.executeCommand(typedMessage.payload.command, ...(typedMessage.payload.args ?? []))
        .then((result) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: true, payload: result }))
        .catch((error) => sendEvent({ type: 'rpcResponse', requestId: typedMessage.requestId, ok: false, error: error?.message || 'Command failed' }))
      break
    default:
      break
  }
})

sendEvent({ type: 'ready', pid: process.pid })
