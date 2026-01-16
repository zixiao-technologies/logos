/**
 * Code Action Provider for Refactoring
 * 提供代码重构操作（提取变量、提取方法、安全删除等）
 */

import * as monaco from 'monaco-editor'
import { daemonService } from '@/services/language/DaemonLanguageService'

// Code Action Kind constants
const CODE_ACTION_KIND = {
  Refactor: 'refactor',
  RefactorExtract: 'refactor.extract',
  RefactorRewrite: 'refactor.rewrite'
} as const

export class RefactorCodeActionProvider implements monaco.languages.CodeActionProvider {
  providedCodeActionKinds = [
    CODE_ACTION_KIND.Refactor,
    CODE_ACTION_KIND.RefactorExtract,
    CODE_ACTION_KIND.RefactorRewrite
  ]

  async provideCodeActions(
    model: monaco.editor.ITextModel,
    range: monaco.Range,
    _context: monaco.languages.CodeActionContext,
    _token: monaco.CancellationToken
  ): Promise<monaco.languages.CodeActionList | undefined> {
    const filePath = model.uri.fsPath
    const actions: monaco.languages.CodeAction[] = []

    try {
      // 从 daemon 获取可用的重构操作
      const refactorActions = await daemonService.getRefactorActions(
        filePath,
        range.startLineNumber - 1,
        range.startColumn - 1,
        range.endLineNumber - 1,
        range.endColumn - 1
      )

      // 转换为 Monaco CodeAction
      for (const action of refactorActions) {
        const monacoAction = this.convertToMonacoAction(action as RefactorAction, model, range)
        if (monacoAction) {
          actions.push(monacoAction)
        }
      }

      // 添加内置的重构操作
      if (range.isEmpty()) {
        // 光标位置的操作
        actions.push(this.createRenameAction())
      } else {
        // 选中范围的操作
        actions.push(
          this.createExtractVariableAction(model, range),
          this.createExtractMethodAction(model, range),
          this.createExtractConstantAction(model, range)
        )
      }

      // 安全删除操作（总是可用）
      actions.push(this.createSafeDeleteAction(model, range))

      return {
        actions,
        dispose: () => {}
      }
    } catch (error) {
      console.error('[RefactorCodeActionProvider] Failed to provide actions:', error)
      return undefined
    }
  }

  private convertToMonacoAction(
    action: RefactorAction,
    _model: monaco.editor.ITextModel,
    _range: monaco.Range
  ): monaco.languages.CodeAction | null {
    if (!action.isAvailable) {
      return null
    }

    return {
      title: action.title,
      kind: this.mapKind(action.kind),
      diagnostics: [],
      isPreferred: false
    }
  }

  private mapKind(kind: string): string {
    // 映射 Rust daemon 的 kind 到 Monaco kind
    if (kind.includes('Extract')) {
      return CODE_ACTION_KIND.RefactorExtract
    }
    if (kind.includes('Inline') || kind.includes('Move')) {
      return CODE_ACTION_KIND.RefactorRewrite
    }
    return CODE_ACTION_KIND.Refactor
  }

  private createRenameAction(): monaco.languages.CodeAction {
    return {
      title: '重命名符号',
      kind: CODE_ACTION_KIND.Refactor,
      diagnostics: [],
      command: {
        id: 'editor.action.rename',
        title: '重命名符号'
      },
      isPreferred: false
    }
  }

  private createExtractVariableAction(
    model: monaco.editor.ITextModel,
    range: monaco.Range
  ): monaco.languages.CodeAction {
    return {
      title: '提取变量',
      kind: CODE_ACTION_KIND.RefactorExtract,
      diagnostics: [],
      command: {
        id: 'refactor.extractVariable',
        title: '提取变量',
        arguments: [model.uri, range]
      },
      isPreferred: false
    }
  }

  private createExtractMethodAction(
    model: monaco.editor.ITextModel,
    range: monaco.Range
  ): monaco.languages.CodeAction {
    return {
      title: '提取方法',
      kind: CODE_ACTION_KIND.RefactorExtract,
      diagnostics: [],
      command: {
        id: 'refactor.extractMethod',
        title: '提取方法',
        arguments: [model.uri, range]
      },
      isPreferred: false
    }
  }

  private createExtractConstantAction(
    model: monaco.editor.ITextModel,
    range: monaco.Range
  ): monaco.languages.CodeAction {
    return {
      title: '提取常量',
      kind: CODE_ACTION_KIND.RefactorExtract,
      diagnostics: [],
      command: {
        id: 'refactor.extractConstant',
        title: '提取常量',
        arguments: [model.uri, range]
      },
      isPreferred: false
    }
  }

  private createSafeDeleteAction(
    model: monaco.editor.ITextModel,
    range: monaco.Range
  ): monaco.languages.CodeAction {
    return {
      title: '安全删除',
      kind: CODE_ACTION_KIND.Refactor,
      diagnostics: [],
      command: {
        id: 'refactor.safeDelete',
        title: '安全删除',
        arguments: [model.uri, range]
      },
      isPreferred: false
    }
  }
}

// Types
interface RefactorAction {
  id: string
  title: string
  kind: string
  isAvailable: boolean
  unavailableReason?: string
}
