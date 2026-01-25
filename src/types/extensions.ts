export type ExtensionHostStatus = 'stopped' | 'starting' | 'running' | 'error'

export interface ExtensionHostState {
  status: ExtensionHostStatus
  pid?: number
  startedAt?: number
  error?: string
}

export interface LocalExtensionInfo {
  id: string
  name: string
  publisher?: string
  version?: string
  displayName?: string
  description?: string
  path: string
  enabled: boolean
  iconPath?: string
  categories?: string[]
}

export interface ExtensionHostMessage {
  level: 'info' | 'warning' | 'error'
  message: string
}

export interface ExtensionPosition {
  line: number
  character: number
}

export interface ExtensionRange {
  start: ExtensionPosition
  end: ExtensionPosition
}

export interface ExtensionDocumentPayload {
  uri: string
  languageId: string
  content: string
  version: number
}

export interface ExtensionDocumentChangePayload {
  uri: string
  languageId: string
  content: string
  version: number
}

export interface ExtensionCompletionRequest {
  uri: string
  position: ExtensionPosition
  context?: {
    triggerKind?: number
    triggerCharacter?: string
  }
}

export interface ExtensionCompletionItem {
  label: string
  kind?: number
  detail?: string
  documentation?: string
  insertText?: string
  insertTextFormat?: number
  textEdit?: {
    range: ExtensionRange
    newText: string
  }
}

export interface ExtensionCompletionResult {
  items: ExtensionCompletionItem[]
  isIncomplete?: boolean
}

export interface ExtensionInlineCompletionRequest {
  uri: string
  position: ExtensionPosition
}

export interface ExtensionInlineCompletionItem {
  insertText: string
  range?: ExtensionRange
}

export interface ExtensionInlineCompletionResult {
  items: ExtensionInlineCompletionItem[]
}

export interface ExtensionMarketplaceItem {
  id: string
  publisher: string
  name: string
  displayName?: string
  description?: string
  version?: string
  downloads?: number
  iconUrl?: string
  downloadUrl?: string
}
