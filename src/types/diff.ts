/**
 * 差异视图相关类型定义
 */

/** 差异视图状态 */
export interface DiffState {
  /** 是否打开 */
  isOpen: boolean
  /** 文件路径 (相对路径) */
  filePath: string
  /** 完整文件路径 */
  fullPath: string
  /** 是否为暂存文件 */
  staged: boolean
  /** 原始内容 (HEAD 版本) */
  originalContent: string
  /** 修改后内容 (工作区或暂存区) */
  modifiedContent: string
  /** 语言类型 */
  language: string
  /** 加载状态 */
  loading: boolean
  /** 错误信息 */
  error: string | null
}

/** 差异编辑器配置 */
export interface DiffEditorConfig {
  /** 是否并排显示 */
  renderSideBySide: boolean
  /** 是否只读 */
  readOnly: boolean
  /** 是否显示行内差异 */
  renderIndicators: boolean
  /** 是否忽略空白变化 */
  ignoreTrimWhitespace: boolean
}

/** 默认差异编辑器配置 */
export const DEFAULT_DIFF_EDITOR_CONFIG: DiffEditorConfig = {
  renderSideBySide: true,
  readOnly: true,
  renderIndicators: true,
  ignoreTrimWhitespace: false
}
