/**
 * Rebase Store - 交互式 Rebase 状态管理
 */

import { defineStore } from 'pinia'
import type {
  RebaseState,
  RebaseAction,
  RebaseEditorState
} from '@/types/rebase'

/** 默认编辑器状态 */
const DEFAULT_EDITOR_STATE: RebaseEditorState = {
  isEditorOpen: false,
  onto: '',
  commits: [],
  status: null,
  isExecuting: false,
  error: null
}

/** 默认状态 */
const DEFAULT_STATE: RebaseState = {
  repoPath: null,
  editor: { ...DEFAULT_EDITOR_STATE },
  availableCommits: [],
  isLoading: false
}

export const useRebaseStore = defineStore('rebase', {
  state: (): RebaseState => ({ ...DEFAULT_STATE }),

  getters: {
    /** 是否正在 rebase */
    isInRebase(): boolean {
      return this.editor.status?.inProgress ?? false
    },

    /** 是否有冲突 */
    hasConflicts(): boolean {
      return this.editor.status?.hasConflicts ?? false
    },

    /** 进度百分比 */
    progressPercent(): number {
      const status = this.editor.status
      if (!status || status.totalSteps === 0) return 0
      return Math.round((status.currentStep / status.totalSteps) * 100)
    },

    /** 将被删除的提交数量 */
    droppedCount(): number {
      return this.editor.commits.filter(c => c.action === 'drop').length
    },

    /** 将被 squash 的提交数量 */
    squashedCount(): number {
      return this.editor.commits.filter(c => c.action === 'squash' || c.action === 'fixup').length
    },

    /** 操作后的提交数量 */
    resultingCommitCount(): number {
      const commits = this.editor.commits
      let count = 0
      for (let i = 0; i < commits.length; i++) {
        const action = commits[i].action
        if (action === 'drop') continue
        if (action === 'squash' || action === 'fixup') {
          // squash/fixup 会合并到前一个,不增加计数
          continue
        }
        count++
      }
      return count
    }
  },

  actions: {
    /**
     * 检查 rebase 状态
     */
    async checkRebaseStatus(repoPath: string): Promise<void> {
      this.repoPath = repoPath
      this.isLoading = true

      try {
        const status = await window.electronAPI.git.getRebaseStatus(repoPath)
        this.editor.status = status
      } catch (error) {
        this.editor.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 打开 rebase 编辑器
     */
    async openRebaseEditor(repoPath: string, onto: string): Promise<void> {
      this.repoPath = repoPath
      this.isLoading = true
      this.editor.error = null

      try {
        // 获取可 rebase 的提交
        const commits = await window.electronAPI.git.getCommitsForRebase(repoPath, onto)

        this.editor = {
          isEditorOpen: true,
          onto,
          commits: commits.map(c => ({
            ...c,
            action: 'pick' as RebaseAction
          })),
          status: null,
          isExecuting: false,
          error: null
        }
      } catch (error) {
        this.editor.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 关闭 rebase 编辑器
     */
    closeRebaseEditor(): void {
      this.editor = { ...DEFAULT_EDITOR_STATE }
    },

    /**
     * 设置提交的操作
     */
    setCommitAction(hash: string, action: RebaseAction): void {
      const commit = this.editor.commits.find(c => c.hash === hash)
      if (commit) {
        commit.action = action
      }
    },

    /**
     * 设置提交的新消息 (用于 reword)
     */
    setCommitMessage(hash: string, message: string): void {
      const commit = this.editor.commits.find(c => c.hash === hash)
      if (commit) {
        commit.newMessage = message
      }
    },

    /**
     * 移动提交 (重新排序)
     */
    moveCommit(fromIndex: number, toIndex: number): void {
      const commits = [...this.editor.commits]
      const [removed] = commits.splice(fromIndex, 1)
      commits.splice(toIndex, 0, removed)
      this.editor.commits = commits
    },

    /**
     * 执行 rebase
     */
    async executeRebase(): Promise<{ success: boolean; error?: string }> {
      if (!this.repoPath) {
        return { success: false, error: 'No repo path' }
      }

      this.editor.isExecuting = true
      this.editor.error = null

      try {
        const result = await window.electronAPI.git.rebaseInteractiveStart(this.repoPath, {
          onto: this.editor.onto,
          actions: this.editor.commits.map(c => ({
            hash: c.hash,
            action: c.action,
            message: c.newMessage || c.message
          }))
        })

        if (result.success) {
          // 检查 rebase 状态
          await this.checkRebaseStatus(this.repoPath)

          // 如果没有冲突,关闭编辑器
          if (!this.hasConflicts && !this.isInRebase) {
            this.closeRebaseEditor()
          }
        }

        return result
      } catch (error) {
        const errorMsg = (error as Error).message
        this.editor.error = errorMsg
        return { success: false, error: errorMsg }
      } finally {
        this.editor.isExecuting = false
      }
    },

    /**
     * 继续 rebase
     */
    async continueRebase(): Promise<{ success: boolean; error?: string }> {
      if (!this.repoPath) {
        return { success: false, error: 'No repo path' }
      }

      this.editor.isExecuting = true
      this.editor.error = null

      try {
        const result = await window.electronAPI.git.rebaseContinue(this.repoPath)

        if (result.success) {
          await this.checkRebaseStatus(this.repoPath)

          // 如果 rebase 完成,关闭编辑器
          if (!this.isInRebase) {
            this.closeRebaseEditor()
          }
        }

        return result
      } catch (error) {
        const errorMsg = (error as Error).message
        this.editor.error = errorMsg
        return { success: false, error: errorMsg }
      } finally {
        this.editor.isExecuting = false
      }
    },

    /**
     * 跳过当前提交
     */
    async skipCommit(): Promise<{ success: boolean; error?: string }> {
      if (!this.repoPath) {
        return { success: false, error: 'No repo path' }
      }

      this.editor.isExecuting = true
      this.editor.error = null

      try {
        const result = await window.electronAPI.git.rebaseSkip(this.repoPath)

        if (result.success) {
          await this.checkRebaseStatus(this.repoPath)

          if (!this.isInRebase) {
            this.closeRebaseEditor()
          }
        }

        return result
      } catch (error) {
        const errorMsg = (error as Error).message
        this.editor.error = errorMsg
        return { success: false, error: errorMsg }
      } finally {
        this.editor.isExecuting = false
      }
    },

    /**
     * 中止 rebase
     */
    async abortRebase(): Promise<{ success: boolean; error?: string }> {
      if (!this.repoPath) {
        return { success: false, error: 'No repo path' }
      }

      this.editor.isExecuting = true
      this.editor.error = null

      try {
        const result = await window.electronAPI.git.rebaseAbort(this.repoPath)

        if (result.success) {
          this.closeRebaseEditor()
        }

        return result
      } catch (error) {
        const errorMsg = (error as Error).message
        this.editor.error = errorMsg
        return { success: false, error: errorMsg }
      } finally {
        this.editor.isExecuting = false
      }
    },

    /**
     * 重置状态
     */
    reset(): void {
      Object.assign(this, DEFAULT_STATE)
    }
  }
})
