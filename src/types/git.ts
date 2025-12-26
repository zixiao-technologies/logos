/**
 * Git 相关类型定义
 */

/** Git 文件状态 */
export type GitFileStatus = 'modified' | 'added' | 'deleted' | 'untracked' | 'renamed' | 'copied'

/** Git 变更文件 */
export interface GitFile {
  /** 文件路径 */
  path: string
  /** 文件状态 */
  status: GitFileStatus
  /** 是否已暂存 */
  staged: boolean
  /** 原路径 (用于 renamed) */
  oldPath?: string
}

/** Git 分支 */
export interface GitBranch {
  /** 分支名称 */
  name: string
  /** 是否是当前分支 */
  current: boolean
  /** 远程分支 */
  remote?: string
  /** 上游分支 */
  upstream?: string
  /** 领先提交数 */
  ahead?: number
  /** 落后提交数 */
  behind?: number
}

/** Git 提交 */
export interface GitCommit {
  /** 提交哈希 */
  hash: string
  /** 简短哈希 */
  shortHash: string
  /** 提交信息 */
  message: string
  /** 作者 */
  author: string
  /** 作者邮箱 */
  authorEmail: string
  /** 提交时间 */
  date: string
}

/** Git 状态摘要 */
export interface GitStatus {
  /** 当前分支 */
  branch: string
  /** 已暂存的文件 */
  staged: GitFile[]
  /** 未暂存的文件 */
  unstaged: GitFile[]
  /** 是否有未提交的更改 */
  hasChanges: boolean
  /** 是否有未推送的提交 */
  hasUnpushed: boolean
  /** 远程仓库状态 */
  remote?: {
    ahead: number
    behind: number
  }
}

/** Git IPC API 接口 */
export interface GitAPI {
  /** 检查是否是 Git 仓库 */
  isRepo: (path: string) => Promise<boolean>
  /** 获取 Git 状态 */
  status: (repoPath: string) => Promise<GitStatus>
  /** 暂存文件 */
  stage: (repoPath: string, filePath: string) => Promise<void>
  /** 取消暂存文件 */
  unstage: (repoPath: string, filePath: string) => Promise<void>
  /** 暂存所有文件 */
  stageAll: (repoPath: string) => Promise<void>
  /** 取消暂存所有文件 */
  unstageAll: (repoPath: string) => Promise<void>
  /** 提交 */
  commit: (repoPath: string, message: string) => Promise<void>
  /** 放弃更改 */
  discard: (repoPath: string, filePath: string) => Promise<void>
  /** 获取分支列表 */
  branches: (repoPath: string) => Promise<GitBranch[]>
  /** 切换分支 */
  checkout: (repoPath: string, branchName: string) => Promise<void>
  /** 创建分支 */
  createBranch: (repoPath: string, branchName: string) => Promise<void>
  /** 删除分支 */
  deleteBranch: (repoPath: string, branchName: string) => Promise<void>
  /** 获取文件差异 */
  diff: (repoPath: string, filePath: string, staged: boolean) => Promise<string>
  /** 获取提交历史 */
  log: (repoPath: string, limit?: number) => Promise<GitCommit[]>
  /** 推送 */
  push: (repoPath: string) => Promise<void>
  /** 拉取 */
  pull: (repoPath: string) => Promise<void>
}

/** Git Store 状态 */
export interface GitState {
  /** 是否是 Git 仓库 */
  isRepo: boolean
  /** 当前分支 */
  currentBranch: string
  /** 分支列表 */
  branches: GitBranch[]
  /** 已暂存的文件 */
  stagedFiles: GitFile[]
  /** 未暂存的文件 */
  unstagedFiles: GitFile[]
  /** 提交信息 */
  commitMessage: string
  /** 是否正在加载 */
  loading: boolean
  /** 上次刷新时间 */
  lastRefresh: number
  /** 错误信息 */
  error: string | null
}
