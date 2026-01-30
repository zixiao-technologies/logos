/**
 * 问题面板状态管理
 * 从 Monaco markers 聚合诊断数据
 */

import { defineStore } from 'pinia'
import * as monaco from 'monaco-editor'

export type ProblemSeverity = 'error' | 'warning' | 'info' | 'hint'

export interface ProblemItem {
  id: string
  uri: string
  path: string
  message: string
  severity: ProblemSeverity
  line: number
  column: number
  endLine: number
  endColumn: number
  source?: string
  code?: string | number
}

interface ProblemsState {
  items: ProblemItem[]
  lastUpdated: number | null
}

function toSeverity(severity: monaco.MarkerSeverity): ProblemSeverity {
  switch (severity) {
    case monaco.MarkerSeverity.Error:
      return 'error'
    case monaco.MarkerSeverity.Warning:
      return 'warning'
    case monaco.MarkerSeverity.Info:
      return 'info'
    case monaco.MarkerSeverity.Hint:
      return 'hint'
    default:
      return 'info'
  }
}

export const useProblemsStore = defineStore('problems', {
  state: (): ProblemsState => ({
    items: [],
    lastUpdated: null
  }),

  getters: {
    errorCount: (state): number => state.items.filter(item => item.severity === 'error').length,
    warningCount: (state): number => state.items.filter(item => item.severity === 'warning').length,
    infoCount: (state): number => state.items.filter(item => item.severity === 'info').length,
    hintCount: (state): number => state.items.filter(item => item.severity === 'hint').length,
    totalCount(): number {
      return this.items.length
    }
  },

  actions: {
    refreshFromMonaco() {
      const models = monaco.editor.getModels()
      const items: ProblemItem[] = []

      for (const model of models) {
        const markers = monaco.editor.getModelMarkers({ resource: model.uri })
        for (const marker of markers) {
          if (!marker.message) continue
          const id = `${model.uri.toString()}:${marker.startLineNumber}:${marker.startColumn}:${marker.message}`
          const code = typeof marker.code === 'object' && marker.code
            ? marker.code.value
            : marker.code
          items.push({
            id,
            uri: model.uri.toString(),
            path: model.uri.fsPath,
            message: marker.message,
            severity: toSeverity(marker.severity),
            line: marker.startLineNumber,
            column: marker.startColumn,
            endLine: marker.endLineNumber,
            endColumn: marker.endColumn,
            source: marker.source,
            code
          })
        }
      }

      items.sort((a, b) => {
        const severityOrder: Record<ProblemSeverity, number> = {
          error: 0,
          warning: 1,
          info: 2,
          hint: 3
        }
        const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
        if (severityDiff !== 0) return severityDiff
        if (a.path !== b.path) return a.path.localeCompare(b.path)
        if (a.line !== b.line) return a.line - b.line
        return a.column - b.column
      })

      this.items = items
      this.lastUpdated = Date.now()
    },

    clear() {
      this.items = []
      this.lastUpdated = Date.now()
    }
  }
})
