/**
 * 差异视图状态管理
 * 负责 Git 差异的展示
 */

import { defineStore } from 'pinia'
import type { DiffState, DiffEditorConfig } from '@/types/diff'
import { DEFAULT_DIFF_EDITOR_CONFIG } from '@/types/diff'

// 根据文件扩展名获取语言
function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || ''
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'json': 'json',
    'vue': 'vue',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'md': 'markdown',
    'py': 'python',
    'go': 'go',
    'rs': 'rust',
    'java': 'java',
    'yml': 'yaml',
    'yaml': 'yaml',
    'xml': 'xml',
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell'
  }
  return languageMap[ext] || 'plaintext'
}

export const useDiffStore = defineStore('diff', {
  state: (): DiffState & { config: DiffEditorConfig } => ({
    isOpen: false,
    filePath: '',
    fullPath: '',
    staged: false,
    originalContent: '',
    modifiedContent: '',
    language: 'plaintext',
    loading: false,
    error: null,
    config: { ...DEFAULT_DIFF_EDITOR_CONFIG }
  }),

  getters: {
    /**
     * 是否有差异内容
     */
    hasDiff: (state): boolean => {
      return state.originalContent !== state.modifiedContent
    },

    /**
     * 获取差异标题
     */
    diffTitle: (state): string => {
      if (!state.filePath) return ''
      const filename = state.filePath.split('/').pop() || state.filePath
      return state.staged ? `${filename} (Staged)` : filename
    }
  },

  actions: {
    /**
     * 打开差异视图
     * @param repoPath 仓库路径
     * @param filePath 文件相对路径
     * @param staged 是否为暂存文件
     */
    async openDiff(repoPath: string, filePath: string, staged: boolean = false) {
      this.loading = true
      this.error = null
      this.filePath = filePath
      this.fullPath = `${repoPath}/${filePath}`
      this.staged = staged
      this.language = getLanguageFromPath(filePath)

      try {
        // 获取原始内容 (HEAD 版本)
        let originalContent = ''
        try {
          originalContent = await window.electronAPI.git.showFile(repoPath, filePath)
        } catch {
          // 文件可能是新文件，没有 HEAD 版本
          originalContent = ''
        }

        // 获取修改后内容
        let modifiedContent = ''
        if (staged) {
          // 暂存区内容需要使用 git show :filePath
          try {
            modifiedContent = await window.electronAPI.git.showFile(repoPath, `:${filePath}`)
          } catch {
            // 回退到工作区内容
            modifiedContent = await window.electronAPI.fileSystem.readFile(this.fullPath)
          }
        } else {
          // 工作区内容
          modifiedContent = await window.electronAPI.fileSystem.readFile(this.fullPath)
        }

        this.originalContent = originalContent
        this.modifiedContent = modifiedContent
        this.isOpen = true
      } catch (error) {
        this.error = (error as Error).message
        console.error('Failed to open diff:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * 打开自定义内容差异视图
     */
    openDiffWithContents(title: string, originalContent: string, modifiedContent: string, language: string) {
      this.loading = false
      this.error = null
      this.filePath = title
      this.fullPath = ''
      this.staged = false
      this.language = language
      this.originalContent = originalContent
      this.modifiedContent = modifiedContent
      this.isOpen = true
    },

    /**
     * 关闭差异视图
     */
    closeDiff() {
      this.isOpen = false
      this.filePath = ''
      this.fullPath = ''
      this.originalContent = ''
      this.modifiedContent = ''
      this.error = null
    },

    /**
     * 切换并排/行内模式
     */
    toggleSideBySide() {
      this.config.renderSideBySide = !this.config.renderSideBySide
    },

    /**
     * 更新差异编辑器配置
     */
    updateConfig(config: Partial<DiffEditorConfig>) {
      this.config = { ...this.config, ...config }
    }
  }
})
