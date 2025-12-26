/**
 * 终端服务
 * 在 Electron 主进程中管理 PTY 实例
 */

import { ipcMain, BrowserWindow } from 'electron'
import * as pty from 'node-pty'
import * as os from 'os'

/** 终端会话接口 */
interface TerminalSession {
  pty: pty.IPty
  cols: number
  rows: number
}

/** 终端创建选项 */
interface TerminalCreateOptions {
  cols?: number
  rows?: number
  cwd?: string
  env?: Record<string, string>
  shell?: string
}

// 存储所有终端会话
const terminals = new Map<string, TerminalSession>()

// 获取主窗口的函数引用
let getMainWindow: () => BrowserWindow | null = () => null

/**
 * 获取默认 shell
 */
function getDefaultShell(): string {
  if (os.platform() === 'win32') {
    return process.env.COMSPEC || 'cmd.exe'
  }
  return process.env.SHELL || '/bin/bash'
}

/**
 * 获取默认环境变量
 */
function getDefaultEnv(): Record<string, string> {
  const env = { ...process.env } as Record<string, string>

  // 设置 TERM 变量以支持颜色
  env.TERM = 'xterm-256color'

  // 设置 COLORTERM
  env.COLORTERM = 'truecolor'

  return env
}

/**
 * 创建终端会话
 */
function createTerminal(id: string, options: TerminalCreateOptions = {}): void {
  // 如果已存在，先销毁
  if (terminals.has(id)) {
    destroyTerminal(id)
  }

  const cols = options.cols || 80
  const rows = options.rows || 24
  const shell = options.shell || getDefaultShell()
  const cwd = options.cwd || os.homedir()
  const env = { ...getDefaultEnv(), ...options.env }

  try {
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-256color',
      cols,
      rows,
      cwd,
      env
    })

    // 存储会话
    terminals.set(id, {
      pty: ptyProcess,
      cols,
      rows
    })

    // 监听 PTY 输出
    ptyProcess.onData((data: string) => {
      const mainWindow = getMainWindow()
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('terminal:data', { id, data })
      }
    })

    // 监听 PTY 退出
    ptyProcess.onExit(({ exitCode, signal }) => {
      const mainWindow = getMainWindow()
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('terminal:exit', { id, exitCode, signal })
      }
      terminals.delete(id)
    })

    console.log(`Terminal ${id} created with shell: ${shell}`)
  } catch (error) {
    console.error(`Failed to create terminal ${id}:`, error)
    throw error
  }
}

/**
 * 向终端写入数据
 */
function writeToTerminal(id: string, data: string): void {
  const session = terminals.get(id)
  if (session) {
    session.pty.write(data)
  }
}

/**
 * 调整终端大小
 */
function resizeTerminal(id: string, cols: number, rows: number): void {
  const session = terminals.get(id)
  if (session) {
    session.pty.resize(cols, rows)
    session.cols = cols
    session.rows = rows
  }
}

/**
 * 销毁终端会话
 */
function destroyTerminal(id: string): void {
  const session = terminals.get(id)
  if (session) {
    try {
      session.pty.kill()
    } catch (error) {
      console.error(`Error killing terminal ${id}:`, error)
    }
    terminals.delete(id)
    console.log(`Terminal ${id} destroyed`)
  }
}

/**
 * 销毁所有终端会话
 */
function destroyAllTerminals(): void {
  for (const id of terminals.keys()) {
    destroyTerminal(id)
  }
}

/**
 * 获取终端信息
 */
function getTerminalInfo(id: string): { cols: number; rows: number } | null {
  const session = terminals.get(id)
  if (session) {
    return { cols: session.cols, rows: session.rows }
  }
  return null
}

/**
 * 注册终端 IPC 处理程序
 */
export function registerTerminalHandlers(getWindow: () => BrowserWindow | null): void {
  getMainWindow = getWindow

  // 创建终端
  ipcMain.handle('terminal:create', (_, id: string, options?: TerminalCreateOptions) => {
    try {
      createTerminal(id, options)
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  })

  // 写入数据
  ipcMain.on('terminal:write', (_, id: string, data: string) => {
    writeToTerminal(id, data)
  })

  // 调整大小
  ipcMain.on('terminal:resize', (_, id: string, cols: number, rows: number) => {
    resizeTerminal(id, cols, rows)
  })

  // 销毁终端
  ipcMain.handle('terminal:destroy', (_, id: string) => {
    destroyTerminal(id)
    return { success: true }
  })

  // 获取终端信息
  ipcMain.handle('terminal:info', (_, id: string) => {
    return getTerminalInfo(id)
  })

  // 获取所有终端 ID
  ipcMain.handle('terminal:list', () => {
    return Array.from(terminals.keys())
  })
}

/**
 * 清理所有终端
 */
export function cleanupTerminals(): void {
  destroyAllTerminals()
}
