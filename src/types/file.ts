/**
 * 文件系统相关类型定义
 */

/** 文件节点类型 */
export interface FileNode {
  /** 文件/目录完整路径 */
  path: string
  /** 文件/目录名称 */
  name: string
  /** 节点类型 */
  type: 'file' | 'directory'
  /** 子节点 (仅目录有效) */
  children?: FileNode[]
  /** 是否展开 (仅目录有效) */
  expanded?: boolean
  /** 文件大小 (字节) */
  size?: number
  /** 最后修改时间 */
  modifiedAt?: number
}

/** 文件系统变更事件类型 */
export type FileChangeType = 'add' | 'change' | 'delete' | 'rename'

/** 文件系统变更事件 */
export interface FileChangeEvent {
  type: FileChangeType
  path: string
  oldPath?: string // 用于 rename 事件
}

/** 文件系统 IPC API 接口 */
export interface FileSystemAPI {
  /** 打开文件夹选择对话框 */
  openFolderDialog: () => Promise<string | null>
  /** 读取目录内容 */
  readDirectory: (path: string) => Promise<FileNode[]>
  /** 创建文件 */
  createFile: (path: string, content?: string) => Promise<void>
  /** 创建目录 */
  createDirectory: (path: string) => Promise<void>
  /** 删除文件或目录 */
  deleteItem: (path: string) => Promise<void>
  /** 重命名文件或目录 */
  renameItem: (oldPath: string, newPath: string) => Promise<void>
  /** 移动文件或目录 */
  moveItem: (sourcePath: string, targetPath: string) => Promise<void>
  /** 读取文件内容 */
  readFile: (path: string) => Promise<string>
  /** 写入文件内容 */
  writeFile: (path: string, content: string) => Promise<void>
  /** 检查文件/目录是否存在 */
  exists: (path: string) => Promise<boolean>
  /** 获取文件信息 */
  stat: (path: string) => Promise<{ isFile: boolean; isDirectory: boolean; size: number; modifiedAt: number }>
}

/** 文件资源管理器 Store 状态 */
export interface FileExplorerState {
  /** 根目录路径 */
  rootPath: string | null
  /** 文件树 */
  tree: FileNode[]
  /** 当前选中的路径 */
  selectedPath: string | null
  /** 是否正在加载 */
  loading: boolean
  /** 错误信息 */
  error: string | null
}
