/**
 * Git 状态管理
 */

import { defineStore } from 'pinia'
import type { GitState } from '@/types'

export const useGitStore = defineStore('git', {
  state: (): GitState => ({
    isRepo: false,
    currentBranch: '',
    branches: [],
    stagedFiles: [],
    unstagedFiles: [],
    commitMessage: '',
    loading: false,
    lastRefresh: 0,
    error: null
  }),

  getters: {
    /** 是否有变更 */
    hasChanges: (state) => state.stagedFiles.length > 0 || state.unstagedFiles.length > 0,

    /** 已暂存的文件数量 */
    stagedCount: (state) => state.stagedFiles.length,

    /** 未暂存的文件数量 */
    unstagedCount: (state) => state.unstagedFiles.length,

    /** 总变更数量 */
    totalChanges: (state) => state.stagedFiles.length + state.unstagedFiles.length,

    /** 可以提交 (有暂存文件且有提交信息) */
    canCommit: (state) => state.stagedFiles.length > 0 && state.commitMessage.trim().length > 0,

    /** 当前分支对象 */
    currentBranchInfo: (state) => state.branches.find(b => b.current),

    /** 本地分支列表 */
    localBranches: (state) => state.branches.filter(b => !b.remote),

    /** 远程分支列表 */
    remoteBranches: (state) => state.branches.filter(b => b.remote)
  },

  actions: {
    /**
     * 初始化 Git 状态 (检查是否是仓库)
     */
    async init(repoPath: string) {
      this.loading = true
      this.error = null

      try {
        const isRepo = await window.electronAPI.git.isRepo(repoPath)
        this.isRepo = isRepo

        if (isRepo) {
          await this.refresh(repoPath)
        } else {
          this.reset()
        }
      } catch (error) {
        this.error = (error as Error).message
        this.isRepo = false
      } finally {
        this.loading = false
      }
    },

    /**
     * 刷新 Git 状态
     */
    async refresh(repoPath: string) {
      if (!this.isRepo) return

      this.loading = true
      this.error = null

      try {
        // 并行获取状态和分支
        const [status, branches] = await Promise.all([
          window.electronAPI.git.status(repoPath),
          window.electronAPI.git.branches(repoPath)
        ])

        this.currentBranch = status.branch
        this.stagedFiles = status.staged
        this.unstagedFiles = status.unstaged
        this.branches = branches
        this.lastRefresh = Date.now()
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },

    /**
     * 暂存文件
     */
    async stageFile(repoPath: string, filePath: string) {
      try {
        await window.electronAPI.git.stage(repoPath, filePath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 取消暂存文件
     */
    async unstageFile(repoPath: string, filePath: string) {
      try {
        await window.electronAPI.git.unstage(repoPath, filePath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 暂存所有文件
     */
    async stageAll(repoPath: string) {
      try {
        await window.electronAPI.git.stageAll(repoPath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 取消暂存所有文件
     */
    async unstageAll(repoPath: string) {
      try {
        await window.electronAPI.git.unstageAll(repoPath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 放弃文件更改
     */
    async discardFile(repoPath: string, filePath: string) {
      try {
        await window.electronAPI.git.discard(repoPath, filePath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 提交
     */
    async commit(repoPath: string) {
      if (!this.canCommit) return

      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.commit(repoPath, this.commitMessage.trim())
        this.commitMessage = ''
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取文件差异
     */
    async getDiff(repoPath: string, filePath: string, staged: boolean): Promise<string> {
      try {
        return await window.electronAPI.git.diff(repoPath, filePath, staged)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 切换分支
     */
    async checkout(repoPath: string, branchName: string) {
      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.checkout(repoPath, branchName)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 创建分支
     */
    async createBranch(repoPath: string, branchName: string) {
      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.createBranch(repoPath, branchName)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 删除分支
     */
    async deleteBranch(repoPath: string, branchName: string) {
      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.deleteBranch(repoPath, branchName)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 推送
     */
    async push(repoPath: string) {
      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.push(repoPath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 拉取
     */
    async pull(repoPath: string) {
      this.loading = true
      this.error = null

      try {
        await window.electronAPI.git.pull(repoPath)
        await this.refresh(repoPath)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取提交历史
     */
    async getLog(repoPath: string, limit = 50) {
      try {
        return await window.electronAPI.git.log(repoPath, limit)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    /**
     * 更新提交信息
     */
    setCommitMessage(message: string) {
      this.commitMessage = message
    },

    /**
     * 重置状态
     */
    reset() {
      this.isRepo = false
      this.currentBranch = ''
      this.branches = []
      this.stagedFiles = []
      this.unstagedFiles = []
      this.commitMessage = ''
      this.error = null
      this.lastRefresh = 0
    }
  }
})