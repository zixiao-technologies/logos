/**
 * Merge Store 单元测试
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMergeStore } from '@/stores/merge'
import { mockElectronAPI, resetAllMocks } from '../../setup'

describe('Merge Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetAllMocks()
  })

  describe('初始状态', () => {
    it('应该有正确的初始状态', () => {
      const store = useMergeStore()

      expect(store.isInMerge).toBe(false)
      expect(store.status).toBeNull()
      expect(store.conflictedFiles).toEqual([])
      expect(store.currentFile).toBeNull()
      expect(store.hunks).toEqual([])
      expect(store.originalContent).toBeNull()
      expect(store.mergedContent).toBe('')
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('Getters', () => {
    it('hasConflicts 应该返回是否有未解决的冲突', () => {
      const store = useMergeStore()

      // 没有文件时
      expect(store.hasConflicts).toBe(false)

      // 有已解决的文件
      store.conflictedFiles = [
        { path: 'file1.ts', resolved: true, conflictCount: 0 }
      ]
      expect(store.hasConflicts).toBe(false)

      // 有未解决的文件
      store.conflictedFiles = [
        { path: 'file1.ts', resolved: false, conflictCount: 2 }
      ]
      expect(store.hasConflicts).toBe(true)
    })

    it('unresolvedCount 应该返回未解决的冲突数量', () => {
      const store = useMergeStore()

      store.conflictedFiles = [
        { path: 'file1.ts', resolved: false, conflictCount: 2 },
        { path: 'file2.ts', resolved: true, conflictCount: 0 },
        { path: 'file3.ts', resolved: false, conflictCount: 1 }
      ]

      expect(store.unresolvedCount).toBe(2)
    })

    it('resolvedCount 应该返回已解决的冲突数量', () => {
      const store = useMergeStore()

      store.conflictedFiles = [
        { path: 'file1.ts', resolved: false, conflictCount: 2 },
        { path: 'file2.ts', resolved: true, conflictCount: 0 },
        { path: 'file3.ts', resolved: true, conflictCount: 0 }
      ]

      expect(store.resolvedCount).toBe(2)
    })

    it('currentFileInfo 应该返回当前文件信息', () => {
      const store = useMergeStore()

      // 没有当前文件时
      expect(store.currentFileInfo).toBeNull()

      // 设置当前文件
      store.conflictedFiles = [
        { path: 'file1.ts', resolved: false, conflictCount: 2 }
      ]
      store.currentFile = 'file1.ts'

      expect(store.currentFileInfo).toEqual({
        path: 'file1.ts',
        resolved: false,
        conflictCount: 2
      })
    })

    it('allResolved 应该在所有冲突解决后返回 true', () => {
      const store = useMergeStore()

      // 没有文件时
      expect(store.allResolved).toBe(false)

      // 有未解决的
      store.conflictedFiles = [
        { path: 'file1.ts', resolved: true, conflictCount: 0 },
        { path: 'file2.ts', resolved: false, conflictCount: 1 }
      ]
      expect(store.allResolved).toBe(false)

      // 全部解决
      store.conflictedFiles = [
        { path: 'file1.ts', resolved: true, conflictCount: 0 },
        { path: 'file2.ts', resolved: true, conflictCount: 0 }
      ]
      expect(store.allResolved).toBe(true)
    })
  })

  describe('Actions', () => {
    describe('checkMergeStatus', () => {
      it('应该检查并加载合并状态', async () => {
        const store = useMergeStore()
        const repoPath = '/test/repo'

        mockElectronAPI.git.getMergeStatus.mockResolvedValue({
          inMerge: true,
          mergeHead: 'abc123',
          mergeMessage: 'Merge branch feature',
          conflictCount: 2
        })

        mockElectronAPI.git.getConflictedFiles.mockResolvedValue([
          { path: 'file1.ts', resolved: false, conflictCount: 1 },
          { path: 'file2.ts', resolved: false, conflictCount: 1 }
        ])

        await store.checkMergeStatus(repoPath)

        expect(mockElectronAPI.git.getMergeStatus).toHaveBeenCalledWith(repoPath)
        expect(store.isInMerge).toBe(true)
        expect(store.conflictedFiles).toHaveLength(2)
        expect(store.isLoading).toBe(false)
      })

      it('应该处理错误', async () => {
        const store = useMergeStore()

        mockElectronAPI.git.getMergeStatus.mockRejectedValue(new Error('Git error'))

        await store.checkMergeStatus('/test/repo')

        expect(store.error).toBe('Git error')
        expect(store.isLoading).toBe(false)
      })
    })

    describe('loadConflictContent', () => {
      it('应该加载文件冲突内容', async () => {
        const store = useMergeStore()

        const conflictContent = {
          ours: 'our content',
          theirs: 'their content',
          base: 'base content',
          merged: '<<<<<<< HEAD\nour content\n=======\ntheir content\n>>>>>>> feature'
        }

        mockElectronAPI.git.getConflictContent.mockResolvedValue(conflictContent)

        await store.loadConflictContent('/test/repo', 'file1.ts')

        expect(store.currentFile).toBe('file1.ts')
        expect(store.originalContent).toEqual(conflictContent)
        expect(store.hunks).toHaveLength(1)
      })
    })

    describe('parseConflictHunks', () => {
      it('应该正确解析冲突块', () => {
        const store = useMergeStore()

        const content = `line 1
<<<<<<< HEAD
our change
=======
their change
>>>>>>> feature
line 2`

        const hunks = store.parseConflictHunks(content)

        expect(hunks).toHaveLength(1)
        expect(hunks[0].ours).toBe('our change')
        expect(hunks[0].theirs).toBe('their change')
        expect(hunks[0].resolution).toBe('unresolved')
      })

      it('应该解析带有 base 的 diff3 格式', () => {
        const store = useMergeStore()

        const content = `<<<<<<< HEAD
our change
||||||| base
original content
=======
their change
>>>>>>> feature`

        const hunks = store.parseConflictHunks(content)

        expect(hunks).toHaveLength(1)
        expect(hunks[0].ours).toBe('our change')
        expect(hunks[0].base).toBe('original content')
        expect(hunks[0].theirs).toBe('their change')
      })

      it('应该解析多个冲突块', () => {
        const store = useMergeStore()

        const content = `<<<<<<< HEAD
first ours
=======
first theirs
>>>>>>> feature
normal line
<<<<<<< HEAD
second ours
=======
second theirs
>>>>>>> feature`

        const hunks = store.parseConflictHunks(content)

        expect(hunks).toHaveLength(2)
        expect(hunks[0].ours).toBe('first ours')
        expect(hunks[1].ours).toBe('second ours')
      })
    })

    describe('resolveHunk', () => {
      it('应该解决单个冲突块', () => {
        const store = useMergeStore()

        store.hunks = [
          { id: 'hunk-0', startLine: 0, endLine: 5, ours: 'our', base: '', theirs: 'their', resolution: 'unresolved' }
        ]
        store.originalContent = {
          ours: '',
          theirs: '',
          base: '',
          merged: '<<<<<<< HEAD\nour\n=======\ntheir\n>>>>>>> feature'
        }

        store.resolveHunk('hunk-0', 'ours')

        expect(store.hunks[0].resolution).toBe('ours')
      })
    })

    describe('saveResolution', () => {
      it('应该保存解决后的内容', async () => {
        const store = useMergeStore()
        store.currentFile = 'file1.ts'
        store.mergedContent = 'resolved content'
        store.conflictedFiles = [
          { path: 'file1.ts', resolved: false, conflictCount: 1 }
        ]

        mockElectronAPI.git.resolveConflict.mockResolvedValue(undefined)

        await store.saveResolution('/test/repo')

        expect(mockElectronAPI.git.resolveConflict).toHaveBeenCalledWith(
          '/test/repo',
          'file1.ts',
          'resolved content'
        )
        expect(store.conflictedFiles[0].resolved).toBe(true)
      })
    })

    describe('abortMerge', () => {
      it('应该中止合并并重置状态', async () => {
        const store = useMergeStore()
        store.isInMerge = true
        store.conflictedFiles = [{ path: 'file1.ts', resolved: false, conflictCount: 1 }]

        mockElectronAPI.git.abortMerge.mockResolvedValue(undefined)

        await store.abortMerge('/test/repo')

        expect(mockElectronAPI.git.abortMerge).toHaveBeenCalledWith('/test/repo')
        expect(store.isInMerge).toBe(false)
        expect(store.conflictedFiles).toEqual([])
      })
    })

    describe('acceptAllOurs / acceptAllTheirs', () => {
      it('acceptAllOurs 应该接受所有 ours', () => {
        const store = useMergeStore()
        store.hunks = [
          { id: 'hunk-0', startLine: 0, endLine: 5, ours: 'our1', base: '', theirs: 'their1', resolution: 'unresolved' },
          { id: 'hunk-1', startLine: 6, endLine: 10, ours: 'our2', base: '', theirs: 'their2', resolution: 'unresolved' }
        ]
        store.originalContent = { ours: '', theirs: '', base: '', merged: '' }

        store.acceptAllOurs()

        expect(store.hunks[0].resolution).toBe('ours')
        expect(store.hunks[1].resolution).toBe('ours')
      })

      it('acceptAllTheirs 应该接受所有 theirs', () => {
        const store = useMergeStore()
        store.hunks = [
          { id: 'hunk-0', startLine: 0, endLine: 5, ours: 'our1', base: '', theirs: 'their1', resolution: 'unresolved' },
          { id: 'hunk-1', startLine: 6, endLine: 10, ours: 'our2', base: '', theirs: 'their2', resolution: 'unresolved' }
        ]
        store.originalContent = { ours: '', theirs: '', base: '', merged: '' }

        store.acceptAllTheirs()

        expect(store.hunks[0].resolution).toBe('theirs')
        expect(store.hunks[1].resolution).toBe('theirs')
      })
    })

    describe('reset', () => {
      it('应该重置所有状态', () => {
        const store = useMergeStore()
        store.isInMerge = true
        store.currentFile = 'test.ts'
        store.conflictedFiles = [{ path: 'test.ts', resolved: false, conflictCount: 1 }]

        store.reset()

        expect(store.isInMerge).toBe(false)
        expect(store.currentFile).toBeNull()
        expect(store.conflictedFiles).toEqual([])
      })
    })
  })
})
