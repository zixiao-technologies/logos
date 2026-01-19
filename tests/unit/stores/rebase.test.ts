/**
 * Rebase Store 单元测试
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRebaseStore } from '@/stores/rebase'
import { mockElectronAPI, resetAllMocks } from '../../setup'

describe('Rebase Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetAllMocks()
  })

  describe('初始状态', () => {
    it('应该有正确的初始状态', () => {
      const store = useRebaseStore()

      expect(store.repoPath).toBeNull()
      expect(store.editor.isEditorOpen).toBe(false)
      expect(store.editor.onto).toBe('')
      expect(store.editor.commits).toEqual([])
      expect(store.editor.status).toBeNull()
      expect(store.editor.isExecuting).toBe(false)
      expect(store.editor.error).toBeNull()
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Getters', () => {
    it('isInRebase 应该返回是否正在 rebase', () => {
      const store = useRebaseStore()

      expect(store.isInRebase).toBe(false)

      store.editor.status = {
        inProgress: true,
        currentStep: 1,
        totalSteps: 3,
        currentCommit: 'abc123',
        hasConflicts: false,
        onto: 'main'
      }

      expect(store.isInRebase).toBe(true)
    })

    it('hasConflicts 应该返回是否有冲突', () => {
      const store = useRebaseStore()

      expect(store.hasConflicts).toBe(false)

      store.editor.status = {
        inProgress: true,
        currentStep: 1,
        totalSteps: 3,
        currentCommit: 'abc123',
        hasConflicts: true,
        onto: 'main'
      }

      expect(store.hasConflicts).toBe(true)
    })

    it('progressPercent 应该计算正确的进度百分比', () => {
      const store = useRebaseStore()

      // 确保 status 为 null 时返回 0
      store.editor.status = null
      expect(store.progressPercent).toBe(0)

      // totalSteps 为 0 时也返回 0
      store.editor.status = {
        inProgress: true,
        currentStep: 0,
        totalSteps: 0,
        currentCommit: null,
        hasConflicts: false,
        onto: 'main'
      }
      expect(store.progressPercent).toBe(0)

      // 有进度时
      store.editor.status = {
        inProgress: true,
        currentStep: 2,
        totalSteps: 4,
        currentCommit: 'abc123',
        hasConflicts: false,
        onto: 'main'
      }

      expect(store.progressPercent).toBe(50)
    })

    it('droppedCount 应该返回将被删除的提交数量', () => {
      const store = useRebaseStore()

      store.editor.commits = [
        { hash: 'abc', shortHash: 'abc', message: 'msg1', author: 'user', date: '2024-01-01', action: 'pick' },
        { hash: 'def', shortHash: 'def', message: 'msg2', author: 'user', date: '2024-01-01', action: 'drop' },
        { hash: 'ghi', shortHash: 'ghi', message: 'msg3', author: 'user', date: '2024-01-01', action: 'drop' }
      ]

      expect(store.droppedCount).toBe(2)
    })

    it('squashedCount 应该返回将被 squash 的提交数量', () => {
      const store = useRebaseStore()

      store.editor.commits = [
        { hash: 'abc', shortHash: 'abc', message: 'msg1', author: 'user', date: '2024-01-01', action: 'pick' },
        { hash: 'def', shortHash: 'def', message: 'msg2', author: 'user', date: '2024-01-01', action: 'squash' },
        { hash: 'ghi', shortHash: 'ghi', message: 'msg3', author: 'user', date: '2024-01-01', action: 'fixup' }
      ]

      expect(store.squashedCount).toBe(2)
    })

    it('resultingCommitCount 应该计算最终提交数量', () => {
      const store = useRebaseStore()

      store.editor.commits = [
        { hash: 'abc', shortHash: 'abc', message: 'msg1', author: 'user', date: '2024-01-01', action: 'pick' },
        { hash: 'def', shortHash: 'def', message: 'msg2', author: 'user', date: '2024-01-01', action: 'squash' },
        { hash: 'ghi', shortHash: 'ghi', message: 'msg3', author: 'user', date: '2024-01-01', action: 'pick' },
        { hash: 'jkl', shortHash: 'jkl', message: 'msg4', author: 'user', date: '2024-01-01', action: 'drop' }
      ]

      // pick + squash -> 1 commit, pick -> 1 commit, drop -> 0 commits = 2 total
      expect(store.resultingCommitCount).toBe(2)
    })
  })

  describe('Actions', () => {
    describe('checkRebaseStatus', () => {
      it('应该检查 rebase 状态', async () => {
        const store = useRebaseStore()
        const repoPath = '/test/repo'

        mockElectronAPI.git.getRebaseStatus.mockResolvedValue({
          inProgress: true,
          currentStep: 2,
          totalSteps: 5,
          currentCommit: 'abc123',
          hasConflicts: false,
          onto: 'main'
        })

        await store.checkRebaseStatus(repoPath)

        expect(store.repoPath).toBe(repoPath)
        expect(store.editor.status?.inProgress).toBe(true)
        expect(store.editor.status?.currentStep).toBe(2)
        expect(store.isLoading).toBe(false)
      })

      it('应该处理错误', async () => {
        const store = useRebaseStore()

        mockElectronAPI.git.getRebaseStatus.mockRejectedValue(new Error('Git error'))

        await store.checkRebaseStatus('/test/repo')

        expect(store.editor.error).toBe('Git error')
      })
    })

    describe('openRebaseEditor', () => {
      it('应该打开 rebase 编辑器并加载提交', async () => {
        const store = useRebaseStore()

        const commits = [
          { hash: 'abc123', shortHash: 'abc', message: 'First commit', author: 'user', date: '2024-01-01' },
          { hash: 'def456', shortHash: 'def', message: 'Second commit', author: 'user', date: '2024-01-02' }
        ]

        mockElectronAPI.git.getCommitsForRebase.mockResolvedValue(commits)

        await store.openRebaseEditor('/test/repo', 'main')

        expect(store.editor.isEditorOpen).toBe(true)
        expect(store.editor.onto).toBe('main')
        expect(store.editor.commits).toHaveLength(2)
        expect(store.editor.commits[0].action).toBe('pick')
        expect(store.editor.commits[1].action).toBe('pick')
      })
    })

    describe('closeRebaseEditor', () => {
      it('应该关闭编辑器并重置状态', () => {
        const store = useRebaseStore()
        store.editor.isEditorOpen = true
        store.editor.onto = 'main'
        store.editor.commits = [{ hash: 'abc', shortHash: 'abc', message: 'msg', author: 'user', date: '2024-01-01', action: 'pick' }]

        store.closeRebaseEditor()

        expect(store.editor.isEditorOpen).toBe(false)
        expect(store.editor.onto).toBe('')
        expect(store.editor.commits).toEqual([])
      })
    })

    describe('setCommitAction', () => {
      it('应该设置提交的操作', () => {
        const store = useRebaseStore()
        store.editor.commits = [
          { hash: 'abc123', shortHash: 'abc', message: 'msg', author: 'user', date: '2024-01-01', action: 'pick' }
        ]

        store.setCommitAction('abc123', 'squash')

        expect(store.editor.commits[0].action).toBe('squash')
      })
    })

    describe('setCommitMessage', () => {
      it('应该设置提交的新消息', () => {
        const store = useRebaseStore()
        store.editor.commits = [
          { hash: 'abc123', shortHash: 'abc', message: 'old msg', author: 'user', date: '2024-01-01', action: 'reword' }
        ]

        store.setCommitMessage('abc123', 'new msg')

        expect(store.editor.commits[0].newMessage).toBe('new msg')
      })
    })

    describe('moveCommit', () => {
      it('应该移动提交到新位置', () => {
        const store = useRebaseStore()
        store.editor.commits = [
          { hash: 'a', shortHash: 'a', message: 'A', author: 'user', date: '2024-01-01', action: 'pick' },
          { hash: 'b', shortHash: 'b', message: 'B', author: 'user', date: '2024-01-01', action: 'pick' },
          { hash: 'c', shortHash: 'c', message: 'C', author: 'user', date: '2024-01-01', action: 'pick' }
        ]

        store.moveCommit(0, 2)

        expect(store.editor.commits[0].hash).toBe('b')
        expect(store.editor.commits[1].hash).toBe('c')
        expect(store.editor.commits[2].hash).toBe('a')
      })
    })

    describe('executeRebase', () => {
      it('应该执行 rebase', async () => {
        const store = useRebaseStore()
        store.repoPath = '/test/repo'
        store.editor.onto = 'main'
        store.editor.commits = [
          { hash: 'abc', shortHash: 'abc', message: 'msg', author: 'user', date: '2024-01-01', action: 'pick' }
        ]

        mockElectronAPI.git.rebaseInteractiveStart.mockResolvedValue({ success: true })
        mockElectronAPI.git.getRebaseStatus.mockResolvedValue({
          inProgress: false,
          currentStep: 0,
          totalSteps: 0,
          currentCommit: null,
          hasConflicts: false,
          onto: null
        })

        const result = await store.executeRebase()

        expect(result.success).toBe(true)
        expect(mockElectronAPI.git.rebaseInteractiveStart).toHaveBeenCalledWith(
          '/test/repo',
          expect.objectContaining({
            onto: 'main',
            actions: expect.any(Array)
          })
        )
      })

      it('应该处理没有 repoPath 的情况', async () => {
        const store = useRebaseStore()
        store.repoPath = null

        const result = await store.executeRebase()

        expect(result.success).toBe(false)
        expect(result.error).toBe('No repo path')
      })
    })

    describe('continueRebase', () => {
      it('应该继续 rebase', async () => {
        const store = useRebaseStore()
        store.repoPath = '/test/repo'

        mockElectronAPI.git.rebaseContinue.mockResolvedValue({ success: true })
        mockElectronAPI.git.getRebaseStatus.mockResolvedValue({
          inProgress: false,
          currentStep: 0,
          totalSteps: 0,
          currentCommit: null,
          hasConflicts: false,
          onto: null
        })

        const result = await store.continueRebase()

        expect(result.success).toBe(true)
        expect(mockElectronAPI.git.rebaseContinue).toHaveBeenCalledWith('/test/repo')
      })
    })

    describe('skipCommit', () => {
      it('应该跳过当前提交', async () => {
        const store = useRebaseStore()
        store.repoPath = '/test/repo'

        mockElectronAPI.git.rebaseSkip.mockResolvedValue({ success: true })
        mockElectronAPI.git.getRebaseStatus.mockResolvedValue({
          inProgress: false,
          currentStep: 0,
          totalSteps: 0,
          currentCommit: null,
          hasConflicts: false,
          onto: null
        })

        const result = await store.skipCommit()

        expect(result.success).toBe(true)
        expect(mockElectronAPI.git.rebaseSkip).toHaveBeenCalledWith('/test/repo')
      })
    })

    describe('abortRebase', () => {
      it('应该中止 rebase', async () => {
        const store = useRebaseStore()
        store.repoPath = '/test/repo'
        store.editor.isEditorOpen = true

        mockElectronAPI.git.rebaseAbort.mockResolvedValue({ success: true })

        const result = await store.abortRebase()

        expect(result.success).toBe(true)
        expect(mockElectronAPI.git.rebaseAbort).toHaveBeenCalledWith('/test/repo')
        expect(store.editor.isEditorOpen).toBe(false)
      })
    })

    describe('reset', () => {
      it('应该重置所有状态', () => {
        const store = useRebaseStore()
        store.repoPath = '/test/repo'
        store.isLoading = true
        store.availableCommits = [{ hash: 'abc', shortHash: 'abc', message: 'msg', author: 'user', date: '2024-01-01' }]

        store.reset()

        expect(store.repoPath).toBeNull()
        expect(store.isLoading).toBe(false)
        expect(store.availableCommits).toEqual([])
      })
    })
  })
})
