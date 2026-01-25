import * as monaco from 'monaco-editor'
import type {
  ExtensionCompletionItem,
  ExtensionCompletionRequest,
  ExtensionCompletionResult,
  ExtensionInlineCompletionItem,
  ExtensionInlineCompletionRequest,
  ExtensionInlineCompletionResult,
  ExtensionRange
} from '@/types'

let registered = false

function toMonacoRange(range: ExtensionRange): monaco.IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1
  }
}

function toMonacoCompletionItem(item: ExtensionCompletionItem): monaco.languages.CompletionItem {
  const insertText = item.textEdit?.newText || item.insertText || item.label
  const range = item.textEdit?.range ? toMonacoRange(item.textEdit.range) : undefined
  const insertTextRules = item.insertTextFormat === 2
    ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    : undefined

  return {
    label: item.label,
    kind: item.kind as monaco.languages.CompletionItemKind,
    detail: item.detail,
    documentation: item.documentation,
    insertText,
    insertTextRules,
    range
  }
}

function toMonacoInlineCompletion(item: ExtensionInlineCompletionItem, fallbackRange: monaco.IRange): monaco.languages.InlineCompletion {
  return {
    insertText: item.insertText,
    range: item.range ? toMonacoRange(item.range) : fallbackRange
  }
}

function buildCompletionRequest(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext): ExtensionCompletionRequest {
  return {
    uri: model.uri.fsPath,
    position: { line: position.lineNumber - 1, character: position.column - 1 },
    context: {
      triggerKind: context.triggerKind,
      triggerCharacter: context.triggerCharacter
    }
  }
}

function buildInlineCompletionRequest(model: monaco.editor.ITextModel, position: monaco.Position): ExtensionInlineCompletionRequest {
  return {
    uri: model.uri.fsPath,
    position: { line: position.lineNumber - 1, character: position.column - 1 }
  }
}

async function fetchCompletions(request: ExtensionCompletionRequest): Promise<ExtensionCompletionResult | null> {
  if (!window.electronAPI?.extensions?.provideCompletions) {
    return null
  }
  try {
    return await window.electronAPI.extensions.provideCompletions(request)
  } catch (error) {
    console.error('[extensions] completion request failed:', error)
    return null
  }
}

async function fetchInlineCompletions(request: ExtensionInlineCompletionRequest): Promise<ExtensionInlineCompletionResult | null> {
  if (!window.electronAPI?.extensions?.provideInlineCompletions) {
    return null
  }
  try {
    return await window.electronAPI.extensions.provideInlineCompletions(request)
  } catch (error) {
    console.error('[extensions] inline completion request failed:', error)
    return null
  }
}

export function registerExtensionProviders(): void {
  if (registered) {
    return
  }
  registered = true

  const languageIds = Array.from(new Set(monaco.languages.getLanguages().map(language => language.id)))

  for (const languageId of languageIds) {
    monaco.languages.registerCompletionItemProvider(languageId, {
      provideCompletionItems: async (model, position, context) => {
        const request = buildCompletionRequest(model, position, context)
        const response = await fetchCompletions(request)
        if (!response) {
          return { suggestions: [], incomplete: false }
        }
        const suggestions = response.items.map(toMonacoCompletionItem)
        return { suggestions, incomplete: response.isIncomplete ?? false }
      }
    })

    monaco.languages.registerInlineCompletionsProvider(languageId, {
      provideInlineCompletions: async (model, position) => {
        const request = buildInlineCompletionRequest(model, position)
        const response = await fetchInlineCompletions(request)
        if (!response) {
          return { items: [], dispose: () => undefined }
        }
        const fallbackRange = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column)
        const items = response.items.map(item => toMonacoInlineCompletion(item, fallbackRange))
        return { items, dispose: () => undefined }
      },
      freeInlineCompletions: () => undefined
    })
  }
}
