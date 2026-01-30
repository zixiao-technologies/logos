/**
 * Auto updater service tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

const hoisted = vi.hoisted(() => {
  const handlers = new Map<string, (...args: any[]) => any>()
  const ipcMain = {
    handle: vi.fn((channel: string, handler: (...args: any[]) => any) => {
      handlers.set(channel, handler)
    })
  }
  const autoUpdater = {
    autoDownload: false,
    autoInstallOnAppQuit: false,
    on: vi.fn(),
    checkForUpdates: vi.fn().mockResolvedValue('ok'),
    downloadUpdate: vi.fn().mockResolvedValue(undefined),
    quitAndInstall: vi.fn(),
    checkForUpdatesAndNotify: vi.fn().mockResolvedValue(undefined)
  }
  const app = { isPackaged: true }

  return { handlers, ipcMain, autoUpdater, app }
})

vi.mock('electron', () => ({
  ipcMain: hoisted.ipcMain,
  BrowserWindow: class {},
  app: hoisted.app
}))

vi.mock('electron-updater', () => ({
  autoUpdater: hoisted.autoUpdater
}))

import { initAutoUpdater, registerUpdateHandlers } from '../../../electron/services/updateService'

const { handlers, ipcMain, autoUpdater, app } = hoisted

describe('updateService', () => {
  beforeEach(() => {
    handlers.clear()
    vi.clearAllMocks()
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = false
    app.isPackaged = true
  })

  it('initializes auto updater settings and checks on packaged builds', () => {
    initAutoUpdater(() => null)

    expect(autoUpdater.autoDownload).toBe(true)
    expect(autoUpdater.autoInstallOnAppQuit).toBe(true)
    expect(autoUpdater.on).toHaveBeenCalled()
    expect(autoUpdater.checkForUpdatesAndNotify).toHaveBeenCalled()
  })

  it('skips auto check when not packaged', () => {
    app.isPackaged = false

    initAutoUpdater(() => null)

    expect(autoUpdater.checkForUpdatesAndNotify).not.toHaveBeenCalled()
  })

  it('registers IPC handlers and proxies calls', async () => {
    registerUpdateHandlers(() => null)

    expect(ipcMain.handle).toHaveBeenCalled()
    expect(handlers.has('updater:check')).toBe(true)
    expect(handlers.has('updater:download')).toBe(true)
    expect(handlers.has('updater:install')).toBe(true)
    expect(handlers.has('updater:getStatus')).toBe(true)
    expect(handlers.has('updater:setAutoDownload')).toBe(true)

    const checkResult = await handlers.get('updater:check')?.()
    expect(autoUpdater.checkForUpdates).toHaveBeenCalled()
    expect(checkResult).toEqual({ success: true, result: 'ok' })

    await handlers.get('updater:download')?.()
    expect(autoUpdater.downloadUpdate).toHaveBeenCalled()

    handlers.get('updater:install')?.()
    expect(autoUpdater.quitAndInstall).toHaveBeenCalledWith(false, true)

    const status = await handlers.get('updater:getStatus')?.()
    expect(status?.status).toBe('not-available')

    await handlers.get('updater:setAutoDownload')?.(null, true)
    expect(autoUpdater.autoDownload).toBe(true)
  })
})
