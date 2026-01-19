/**
 * Interactive Rebase Types
 * 用于可视化交互式 rebase 编辑器的类型定义
 */

/** Rebase 操作类型 */
export type RebaseAction =
  | 'pick'    // 保留提交
  | 'reword'  // 修改提交消息
  | 'edit'    // 停止编辑
  | 'squash'  // 合并到上一提交 (保留消息)
  | 'fixup'   // 合并到上一提交 (丢弃消息)
  | 'drop'    // 删除提交

/** Rebase 中的单个提交操作 */
export interface RebaseCommitAction {
  /** 提交 hash */
  hash: string
  /** 短 hash */
  shortHash: string
  /** 原始提交消息 */
  message: string
  /** 操作类型 */
  action: RebaseAction
  /** 修改后的消息 (用于 reword) */
  newMessage?: string
  /** 作者 */
  author: string
  /** 作者邮箱 */
  authorEmail: string
  /** 提交日期 */
  date: string
}

/** Rebase 状态 (进行中) */
export interface RebaseStatus {
  /** 是否正在 rebase */
  inProgress: boolean
  /** 当前步骤 */
  currentStep: number
  /** 总步骤数 */
  totalSteps: number
  /** 当前正在处理的 commit hash */
  currentCommit?: string
  /** onto 目标 */
  onto?: string
  /** 原始分支 */
  originalBranch?: string
  /** 是否有冲突 */
  hasConflicts: boolean
}

/** Rebase 编辑器状态 */
export interface RebaseEditorState {
  /** 编辑器是否打开 */
  isEditorOpen: boolean
  /** onto 目标 (分支名或 commit hash) */
  onto: string
  /** 提交操作列表 */
  commits: RebaseCommitAction[]
  /** 预览图 (可选) */
  previewGraph?: RebasePreviewCommit[]
  /** 当前 rebase 状态 */
  status: RebaseStatus | null
  /** 是否正在执行 */
  isExecuting: boolean
  /** 错误信息 */
  error: string | null
}

/** Rebase 预览提交 (用于预览图) */
export interface RebasePreviewCommit {
  /** 原始 hash */
  originalHash: string
  /** 预计新 hash (如果已知) */
  newHash?: string
  /** 消息 */
  message: string
  /** 操作类型 */
  action: RebaseAction
  /** 是否会被删除 */
  willBeDropped: boolean
  /** 是否会被 squash */
  willBeSquashed: boolean
}

/** Rebase Store 状态 */
export interface RebaseState {
  /** 仓库路径 */
  repoPath: string | null
  /** 编辑器状态 */
  editor: RebaseEditorState
  /** 可用于 rebase 的提交列表 */
  availableCommits: RebaseCommitAction[]
  /** 是否正在加载 */
  isLoading: boolean
}

/** Rebase 执行选项 */
export interface RebaseExecuteOptions {
  /** 目标分支/commit */
  onto: string
  /** 提交操作列表 */
  actions: Array<{
    hash: string
    action: RebaseAction
    message?: string
  }>
}

/** Rebase API 接口 */
export interface RebaseAPI {
  /** 获取 rebase 状态 */
  getRebaseStatus: (repoPath: string) => Promise<RebaseStatus>
  /** 获取可 rebase 的提交列表 */
  getCommitsForRebase: (repoPath: string, onto: string) => Promise<RebaseCommitAction[]>
  /** 开始交互式 rebase */
  rebaseInteractiveStart: (repoPath: string, options: RebaseExecuteOptions) => Promise<{ success: boolean; error?: string }>
  /** 继续 rebase */
  rebaseContinue: (repoPath: string) => Promise<{ success: boolean; error?: string }>
  /** 跳过当前提交 */
  rebaseSkip: (repoPath: string) => Promise<{ success: boolean; error?: string }>
  /** 中止 rebase */
  rebaseAbort: (repoPath: string) => Promise<{ success: boolean; error?: string }>
}
