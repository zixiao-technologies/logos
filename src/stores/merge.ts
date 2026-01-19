/**
 * Merge Store - 合并冲突解决状态管理
 */

import { defineStore } from 'pinia'
import type {
  MergeState,
  ConflictedFile,
  ConflictHunk,
  ConflictResolution
} from '@/types/merge'

/** 默认状态 */
const DEFAULT_STATE: MergeState = {
  isInMerge: false,
  status: null,
  conflictedFiles: [],
  currentFile: null,
  hunks: [],
  originalContent: null,
  mergedContent: '',
  isLoading: false,
  error: null
}

export const useMergeStore = defineStore('merge', {
  state: (): MergeState => ({ ...DEFAULT_STATE }),

  getters: {
    /** 是否有冲突 */
    hasConflicts(): boolean {
      return this.conflictedFiles.some(f => !f.resolved)
    },

    /** 未解决的冲突文件数量 */
    unresolvedCount(): number {
      return this.conflictedFiles.filter(f => !f.resolved).length
    },

    /** 已解决的冲突文件数量 */
    resolvedCount(): number {
      return this.conflictedFiles.filter(f => f.resolved).length
    },

    /** 当前文件信息 */
    currentFileInfo(): ConflictedFile | null {
      if (!this.currentFile) return null
      return this.conflictedFiles.find(f => f.path === this.currentFile) || null
    },

    /** 当前文件是否已解决 */
    isCurrentFileResolved(): boolean {
      return this.currentFileInfo?.resolved ?? false
    },

    /** 是否所有冲突都已解决 */
    allResolved(): boolean {
      return this.conflictedFiles.length > 0 && this.conflictedFiles.every(f => f.resolved)
    }
  },

  actions: {
    /**
     * 检查并加载合并状态
     */
    async checkMergeStatus(repoPath: string): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        const status = await window.electronAPI.git.getMergeStatus(repoPath)
        this.status = status
        this.isInMerge = status.inMerge

        if (status.inMerge && status.conflictCount > 0) {
          await this.loadConflictedFiles(repoPath)
        } else {
          this.conflictedFiles = []
        }
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 加载冲突文件列表
     */
    async loadConflictedFiles(repoPath: string): Promise<void> {
      try {
        const files = await window.electronAPI.git.getConflictedFiles(repoPath)
        this.conflictedFiles = files
      } catch (error) {
        this.error = (error as Error).message
      }
    },

    /**
     * 加载文件的冲突内容
     */
    async loadConflictContent(repoPath: string, filePath: string): Promise<void> {
      this.isLoading = true
      this.error = null
      this.currentFile = filePath

      try {
        const content = await window.electronAPI.git.getConflictContent(repoPath, filePath)
        this.originalContent = content
        this.mergedContent = content.merged

        // 解析冲突块
        this.hunks = this.parseConflictHunks(content.merged)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 解析合并文件中的冲突块
     */
    parseConflictHunks(content: string): ConflictHunk[] {
      const hunks: ConflictHunk[] = []
      const lines = content.split('\n')
      let hunkId = 0
      let i = 0

      while (i < lines.length) {
        if (lines[i].startsWith('<<<<<<<')) {
          const startLine = i
          const oursLines: string[] = []
          const baseLines: string[] = []
          const theirsLines: string[] = []
          let stage: 'ours' | 'base' | 'theirs' = 'ours'

          i++ // Skip <<<<<<< line

          while (i < lines.length && !lines[i].startsWith('>>>>>>>')) {
            if (lines[i].startsWith('|||||||')) {
              stage = 'base'
              i++
              continue
            }
            if (lines[i] === '=======') {
              stage = 'theirs'
              i++
              continue
            }

            if (stage === 'ours') {
              oursLines.push(lines[i])
            } else if (stage === 'base') {
              baseLines.push(lines[i])
            } else {
              theirsLines.push(lines[i])
            }
            i++
          }

          const endLine = i

          hunks.push({
            id: `hunk-${hunkId++}`,
            startLine,
            endLine,
            ours: oursLines.join('\n'),
            base: baseLines.join('\n'),
            theirs: theirsLines.join('\n'),
            resolution: 'unresolved'
          })
        }
        i++
      }

      return hunks
    },

    /**
     * 解决单个冲突块
     */
    resolveHunk(hunkId: string, resolution: ConflictResolution, _customContent?: string): void {
      const hunk = this.hunks.find(h => h.id === hunkId)
      if (!hunk) return

      hunk.resolution = resolution

      // 重新生成合并内容
      this.regenerateMergedContent()
    },

    /**
     * 根据冲突块解决状态重新生成合并内容
     */
    regenerateMergedContent(): void {
      if (!this.originalContent) return

      let content = this.originalContent.merged
      const lines = content.split('\n')
      const result: string[] = []
      let i = 0
      let hunkIndex = 0

      while (i < lines.length) {
        if (lines[i].startsWith('<<<<<<<') && hunkIndex < this.hunks.length) {
          const hunk = this.hunks[hunkIndex]

          // 根据解决方式添加内容
          switch (hunk.resolution) {
            case 'ours':
              result.push(hunk.ours)
              break
            case 'theirs':
              result.push(hunk.theirs)
              break
            case 'both':
              result.push(hunk.ours)
              result.push(hunk.theirs)
              break
            case 'unresolved':
              // 保留冲突标记
              while (i < lines.length && !lines[i].startsWith('>>>>>>>')) {
                result.push(lines[i])
                i++
              }
              result.push(lines[i]) // >>>>>>> line
              break
          }

          // 跳过冲突块
          while (i < lines.length && !lines[i].startsWith('>>>>>>>')) {
            i++
          }
          hunkIndex++
        } else {
          result.push(lines[i])
        }
        i++
      }

      this.mergedContent = result.join('\n')
    },

    /**
     * 直接更新合并内容 (手动编辑)
     */
    updateMergedContent(content: string): void {
      this.mergedContent = content
      // 重新解析冲突块
      this.hunks = this.parseConflictHunks(content)
    },

    /**
     * 保存解决后的内容
     */
    async saveResolution(repoPath: string): Promise<void> {
      if (!this.currentFile) return

      this.isLoading = true
      this.error = null

      try {
        await window.electronAPI.git.resolveConflict(repoPath, this.currentFile, this.mergedContent)

        // 更新文件状态
        const fileIndex = this.conflictedFiles.findIndex(f => f.path === this.currentFile)
        if (fileIndex !== -1) {
          this.conflictedFiles[fileIndex].resolved = true
          this.conflictedFiles[fileIndex].conflictCount = 0
        }
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 中止合并
     */
    async abortMerge(repoPath: string): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        await window.electronAPI.git.abortMerge(repoPath)
        this.reset()
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 继续合并
     */
    async continueMerge(repoPath: string): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        await window.electronAPI.git.continueMerge(repoPath)
        this.reset()
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 接受所有 ours
     */
    acceptAllOurs(): void {
      this.hunks.forEach(hunk => {
        hunk.resolution = 'ours'
      })
      this.regenerateMergedContent()
    },

    /**
     * 接受所有 theirs
     */
    acceptAllTheirs(): void {
      this.hunks.forEach(hunk => {
        hunk.resolution = 'theirs'
      })
      this.regenerateMergedContent()
    },

    /**
     * 重置状态
     */
    reset(): void {
      Object.assign(this, DEFAULT_STATE)
    }
  }
})
