/**
 * Merge Conflict Resolution Types
 * 用于三面板合并编辑器的类型定义
 */

/** 冲突文件信息 */
export interface ConflictedFile {
  /** 文件路径 */
  path: string
  /** 是否已解决 */
  resolved: boolean
  /** 冲突块数量 */
  conflictCount: number
}

/** 冲突块 */
export interface ConflictHunk {
  /** 块 ID */
  id: string
  /** 在原始文件中的起始行 */
  startLine: number
  /** 在原始文件中的结束行 */
  endLine: number
  /** Our (local) 版本内容 */
  ours: string
  /** Base (共同祖先) 版本内容 */
  base: string
  /** Theirs (remote) 版本内容 */
  theirs: string
  /** 当前解决状态 */
  resolution: ConflictResolution
}

/** 冲突解决方式 */
export type ConflictResolution =
  | 'unresolved'  // 未解决
  | 'ours'        // 接受本地
  | 'theirs'      // 接受远程
  | 'both'        // 接受两者
  | 'custom'      // 自定义编辑

/** 冲突内容 (三方内容) */
export interface ConflictContent {
  /** Our (HEAD/local) 版本 */
  ours: string
  /** Base (共同祖先) 版本 */
  base: string
  /** Theirs (incoming/remote) 版本 */
  theirs: string
  /** 当前工作目录中的内容 (带冲突标记) */
  merged: string
}

/** 合并状态 */
export interface MergeStatus {
  /** 是否正在合并中 */
  inMerge: boolean
  /** 正在合并的分支 */
  mergeHead?: string
  /** 合并消息 */
  mergeMessage?: string
  /** 冲突文件数量 */
  conflictCount: number
  /** 是否是 rebase 中的冲突 */
  isRebaseConflict?: boolean
}

/** Merge Store 状态 */
export interface MergeState {
  /** 是否正在合并中 */
  isInMerge: boolean
  /** 合并状态 */
  status: MergeStatus | null
  /** 冲突文件列表 */
  conflictedFiles: ConflictedFile[]
  /** 当前正在解决的文件路径 */
  currentFile: string | null
  /** 当前文件的冲突块 */
  hunks: ConflictHunk[]
  /** 当前文件的原始内容 */
  originalContent: ConflictContent | null
  /** 当前编辑的合并结果 */
  mergedContent: string
  /** 是否正在加载 */
  isLoading: boolean
  /** 错误信息 */
  error: string | null
}

/** 解决冲突的操作 */
export interface ResolveConflictAction {
  /** 文件路径 */
  filePath: string
  /** 解决后的内容 */
  content: string
}

/** Merge API 接口 */
export interface MergeAPI {
  /** 检查是否有未解决的冲突 */
  hasConflicts: (repoPath: string) => Promise<boolean>
  /** 获取合并状态 */
  getMergeStatus: (repoPath: string) => Promise<MergeStatus>
  /** 获取冲突文件列表 */
  getConflictedFiles: (repoPath: string) => Promise<ConflictedFile[]>
  /** 获取冲突内容 (ours/base/theirs/merged) */
  getConflictContent: (repoPath: string, filePath: string) => Promise<ConflictContent>
  /** 解决冲突 (保存解决后的内容) */
  resolveConflict: (repoPath: string, filePath: string, content: string) => Promise<void>
  /** 中止合并 */
  abortMerge: (repoPath: string) => Promise<void>
  /** 继续合并 (所有冲突解决后) */
  continueMerge: (repoPath: string) => Promise<void>
}
