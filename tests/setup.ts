/**
 * Vitest Test Setup
 * 全局测试配置和模拟
 */

import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// 模拟 window.electronAPI
const mockElectronAPI = {
  fileSystem: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    readDirectory: vi.fn(),
    createDirectory: vi.fn(),
    deleteFile: vi.fn(),
    rename: vi.fn(),
    exists: vi.fn(),
    stat: vi.fn(),
    watch: vi.fn(),
    unwatch: vi.fn()
  },
  git: {
    // 基础 Git 操作
    getStatus: vi.fn(),
    getBranches: vi.fn(),
    getCurrentBranch: vi.fn(),
    checkout: vi.fn(),
    commit: vi.fn(),
    push: vi.fn(),
    pull: vi.fn(),
    fetch: vi.fn(),
    stageFile: vi.fn(),
    unstageFile: vi.fn(),
    getLog: vi.fn(),
    getDiff: vi.fn(),

    // Merge 相关
    getMergeStatus: vi.fn().mockResolvedValue({
      inMerge: false,
      mergeHead: null,
      mergeMessage: null,
      conflictCount: 0
    }),
    hasConflicts: vi.fn().mockResolvedValue(false),
    getConflictedFiles: vi.fn().mockResolvedValue([]),
    getConflictContent: vi.fn().mockResolvedValue({
      ours: '',
      theirs: '',
      base: '',
      merged: ''
    }),
    resolveConflict: vi.fn().mockResolvedValue(undefined),
    abortMerge: vi.fn().mockResolvedValue(undefined),
    continueMerge: vi.fn().mockResolvedValue(undefined),

    // Rebase 相关
    getRebaseStatus: vi.fn().mockResolvedValue({
      inProgress: false,
      currentStep: 0,
      totalSteps: 0,
      currentCommit: null,
      hasConflicts: false,
      onto: null
    }),
    getCommitsForRebase: vi.fn().mockResolvedValue([]),
    rebaseInteractiveStart: vi.fn().mockResolvedValue({ success: true }),
    rebaseContinue: vi.fn().mockResolvedValue({ success: true }),
    rebaseSkip: vi.fn().mockResolvedValue({ success: true }),
    rebaseAbort: vi.fn().mockResolvedValue({ success: true }),

    // Cherry-pick 相关
    cherryPickMultiple: vi.fn().mockResolvedValue({ success: true }),
    cherryPickPreview: vi.fn().mockResolvedValue({
      commits: [],
      affectedFiles: [],
      totalAdditions: 0,
      totalDeletions: 0
    }),

    // Reflog 相关
    getReflog: vi.fn().mockResolvedValue([]),
    getReflogForRef: vi.fn().mockResolvedValue([])
  },
  terminal: {
    create: vi.fn(),
    write: vi.fn(),
    resize: vi.fn(),
    destroy: vi.fn(),
    onData: vi.fn(),
    onExit: vi.fn()
  },
  feedback: {
    submit: vi.fn(),
    getSystemState: vi.fn()
  }
}

// 设置全局 window.electronAPI 模拟
Object.defineProperty(window, 'electronAPI', {
  value: mockElectronAPI,
  writable: true
})

// 配置 Vue Test Utils
config.global.stubs = {
  // MDUI 组件存根
  'mdui-button': true,
  'mdui-button-icon': true,
  'mdui-icon': true,
  'mdui-select': true,
  'mdui-menu': true,
  'mdui-menu-item': true,
  'mdui-checkbox': true,
  'mdui-dropdown': true,
  'mdui-divider': true,
  'mdui-dialog': true,
  'mdui-text-field': true,
  'mdui-circular-progress': true,
  'mdui-linear-progress': true,
  'mdui-chip': true,
  'mdui-tooltip': true,
  // MDUI 图标存根
  'mdui-icon-refresh': true,
  'mdui-icon-search': true,
  'mdui-icon-filter-list': true,
  'mdui-icon-close': true,
  'mdui-icon-check': true,
  'mdui-icon-edit': true,
  'mdui-icon-delete': true,
  'mdui-icon-drag-indicator': true,
  'mdui-icon-compress': true,
  'mdui-icon-pause': true,
  'mdui-icon-play-arrow': true,
  'mdui-icon-stop': true,
  'mdui-icon-skip-next': true,
  'mdui-icon-undo': true,
  'mdui-icon-redo': true,
  'mdui-icon-content-copy': true,
  'mdui-icon-save': true,
  'mdui-icon-keyboard-arrow-down': true,
  'mdui-icon-keyboard-arrow-right': true
}

// 导出模拟对象供测试使用
export { mockElectronAPI }

// 重置所有模拟
export function resetAllMocks(): void {
  vi.clearAllMocks()
}

// 创建模拟的 Pinia store 辅助函数
export function createTestingPinia() {
  const { createPinia, setActivePinia } = require('pinia')
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}
