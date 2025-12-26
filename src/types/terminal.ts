/**
 * 终端类型定义
 */

/** 终端标签页 */
export interface TerminalTab {
  /** 唯一标识 */
  id: string
  /** 标签名称 */
  name: string
  /** 当前工作目录 */
  cwd?: string
  /** 是否已连接到 PTY */
  connected: boolean
  /** 创建时间 */
  createdAt: number
}

/** 终端创建选项 */
export interface TerminalCreateOptions {
  cols?: number
  rows?: number
  cwd?: string
  env?: Record<string, string>
  shell?: string
}

/** 终端数据事件 */
export interface TerminalDataEvent {
  id: string
  data: string
}

/** 终端退出事件 */
export interface TerminalExitEvent {
  id: string
  exitCode: number
  signal?: number
}

/** 终端状态 */
export interface TerminalState {
  tabs: TerminalTab[]
  activeTabId: string | null
}
