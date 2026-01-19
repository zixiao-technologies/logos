/**
 * Reflog Types
 * 用于 reflog 查看器的类型定义
 */

/** Reflog 操作类型 */
export type ReflogOperationType =
  | 'commit'      // 提交
  | 'checkout'    // 切换分支
  | 'reset'       // 重置
  | 'merge'       // 合并
  | 'rebase'      // 变基
  | 'cherry-pick' // 摘取
  | 'pull'        // 拉取
  | 'push'        // 推送 (不常见)
  | 'stash'       // 存储
  | 'clone'       // 克隆
  | 'branch'      // 分支操作
  | 'other'       // 其他

/** Reflog 条目 */
export interface ReflogEntry {
  /** 条目索引 (HEAD@{n}) */
  index: number
  /** 目标 commit hash */
  hash: string
  /** 短 hash */
  shortHash: string
  /** 操作类型 */
  operationType: ReflogOperationType
  /** 原始操作描述 */
  action: string
  /** 详细消息 */
  message: string
  /** 执行时间 */
  date: Date
  /** 相对时间描述 (如 "2 hours ago") */
  relativeDate: string
  /** 执行者 */
  author: string
  /** 执行者邮箱 */
  authorEmail: string
  /** 前一个 commit hash (如果适用) */
  previousHash?: string
  /** 是否是孤儿提交 (可恢复) */
  isOrphaned?: boolean
  /** 关联的分支名 (如果适用) */
  branch?: string
}

/** 按日期分组的 Reflog 条目 */
export interface ReflogGroup {
  /** 日期标签 (如 "Today", "Yesterday", "2024-01-15") */
  label: string
  /** 该日期的条目列表 */
  entries: ReflogEntry[]
}

/** Reflog 过滤器 */
export interface ReflogFilters {
  /** 搜索关键词 */
  search: string
  /** 操作类型过滤 */
  operationTypes: ReflogOperationType[]
  /** 日期范围 */
  dateRange: {
    start?: Date
    end?: Date
  }
  /** 只显示孤儿提交 */
  orphanedOnly: boolean
}

/** Reflog 视图状态 */
export interface ReflogViewState {
  /** 选中的条目 */
  selectedEntry: ReflogEntry | null
  /** 展开的条目 (显示详情) */
  expandedEntries: number[]
  /** 过滤器 */
  filters: ReflogFilters
  /** 显示的条目数量 */
  displayCount: number
}

/** Reflog Store 状态 */
export interface ReflogState {
  /** 仓库路径 */
  repoPath: string | null
  /** 所有条目 */
  entries: ReflogEntry[]
  /** 按日期分组的条目 */
  groupedEntries: ReflogGroup[]
  /** 视图状态 */
  viewState: ReflogViewState
  /** 是否正在加载 */
  isLoading: boolean
  /** 错误信息 */
  error: string | null
}

/** Reflog API 接口 */
export interface ReflogAPI {
  /** 获取 reflog 条目 */
  getReflog: (repoPath: string, limit?: number) => Promise<ReflogEntry[]>
  /** 获取特定 ref 的 reflog */
  getReflogForRef: (repoPath: string, ref: string, limit?: number) => Promise<ReflogEntry[]>
}

/** 操作类型图标映射 */
export const REFLOG_OPERATION_ICONS: Record<ReflogOperationType, string> = {
  'commit': 'circle',
  'checkout': 'arrow_forward',
  'reset': 'arrow_back',
  'merge': 'merge_type',
  'rebase': 'swap_vert',
  'cherry-pick': 'diamond',
  'pull': 'cloud_download',
  'push': 'cloud_upload',
  'stash': 'inventory_2',
  'clone': 'content_copy',
  'branch': 'alt_route',
  'other': 'more_horiz'
}

/** 操作类型颜色映射 */
export const REFLOG_OPERATION_COLORS: Record<ReflogOperationType, string> = {
  'commit': '#4caf50',      // Green
  'checkout': '#2196f3',    // Blue
  'reset': '#ff9800',       // Orange
  'merge': '#9c27b0',       // Purple
  'rebase': '#00bcd4',      // Cyan
  'cherry-pick': '#e91e63', // Pink
  'pull': '#3f51b5',        // Indigo
  'push': '#009688',        // Teal
  'stash': '#795548',       // Brown
  'clone': '#607d8b',       // Blue Grey
  'branch': '#ff5722',      // Deep Orange
  'other': '#9e9e9e'        // Grey
}
