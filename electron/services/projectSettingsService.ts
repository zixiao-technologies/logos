/**
 * 项目级别设置服务
 * 管理每个项目的个性化配置，存储在项目根目录的 .logos/settings.json
 */

import * as fs from 'fs/promises'
import * as path from 'path'

/** 项目级别的智能模式设置 */
export interface ProjectIntelligenceSettings {
  /** 首选模式 */
  preferredMode?: 'basic' | 'smart'
  /** 是否启用自动模式选择 */
  autoSelect?: boolean
  /** Smart Mode 阈值 */
  smartModeThreshold?: {
    maxFiles?: number
    maxMemoryMB?: number
  }
  /** 是否启用自动降级 */
  autoDowngrade?: boolean
}

/** 项目设置 */
export interface ProjectSettings {
  /** 智能模式设置 */
  intelligence?: ProjectIntelligenceSettings
  /** 其他项目级别设置可以在这里扩展 */
}

class ProjectSettingsService {
  private cache: Map<string, ProjectSettings> = new Map()

  /**
   * 获取项目设置文件路径
   */
  private getSettingsPath(projectRoot: string): string {
    return path.join(projectRoot, '.logos', 'settings.json')
  }

  /**
   * 确保 .logos 目录存在
   */
  private async ensureLogosDir(projectRoot: string): Promise<void> {
    const logosDir = path.join(projectRoot, '.logos')
    try {
      await fs.mkdir(logosDir, { recursive: true })
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error
      }
    }
  }

  /**
   * 加载项目设置
   */
  async loadSettings(projectRoot: string): Promise<ProjectSettings> {
    // 检查缓存
    if (this.cache.has(projectRoot)) {
      return this.cache.get(projectRoot)!
    }

    const settingsPath = this.getSettingsPath(projectRoot)

    try {
      const content = await fs.readFile(settingsPath, 'utf-8')
      const settings: ProjectSettings = JSON.parse(content)
      this.cache.set(projectRoot, settings)
      console.log('[ProjectSettings] Loaded project settings from:', settingsPath)
      return settings
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // 文件不存在，返回空设置
        const emptySettings: ProjectSettings = {}
        this.cache.set(projectRoot, emptySettings)
        return emptySettings
      }
      console.error('[ProjectSettings] Failed to load project settings:', error)
      return {}
    }
  }

  /**
   * 保存项目设置
   */
  async saveSettings(projectRoot: string, settings: ProjectSettings): Promise<void> {
    try {
      // 确保目录存在
      await this.ensureLogosDir(projectRoot)

      const settingsPath = this.getSettingsPath(projectRoot)
      const content = JSON.stringify(settings, null, 2)
      await fs.writeFile(settingsPath, content, 'utf-8')

      // 更新缓存
      this.cache.set(projectRoot, settings)

      console.log('[ProjectSettings] Saved project settings to:', settingsPath)
    } catch (error) {
      console.error('[ProjectSettings] Failed to save project settings:', error)
      throw error
    }
  }

  /**
   * 更新项目的智能模式设置
   */
  async updateIntelligenceSettings(
    projectRoot: string,
    intelligence: Partial<ProjectIntelligenceSettings>
  ): Promise<void> {
    const settings = await this.loadSettings(projectRoot)
    settings.intelligence = {
      ...settings.intelligence,
      ...intelligence
    }
    await this.saveSettings(projectRoot, settings)
  }

  /**
   * 获取项目的智能模式设置
   */
  async getIntelligenceSettings(projectRoot: string): Promise<ProjectIntelligenceSettings> {
    const settings = await this.loadSettings(projectRoot)
    return settings.intelligence || {}
  }

  /**
   * 合并项目设置和全局设置
   * 项目设置优先级更高
   */
  mergeWithGlobalSettings(
    projectSettings: ProjectIntelligenceSettings,
    globalSettings: ProjectIntelligenceSettings
  ): ProjectIntelligenceSettings {
    return {
      preferredMode: projectSettings.preferredMode ?? globalSettings.preferredMode,
      autoSelect: projectSettings.autoSelect ?? globalSettings.autoSelect,
      smartModeThreshold: {
        maxFiles:
          projectSettings.smartModeThreshold?.maxFiles ??
          globalSettings.smartModeThreshold?.maxFiles ??
          5000,
        maxMemoryMB:
          projectSettings.smartModeThreshold?.maxMemoryMB ??
          globalSettings.smartModeThreshold?.maxMemoryMB ??
          2048
      },
      autoDowngrade: projectSettings.autoDowngrade ?? globalSettings.autoDowngrade ?? true
    }
  }

  /**
   * 清除缓存
   */
  clearCache(projectRoot?: string): void {
    if (projectRoot) {
      this.cache.delete(projectRoot)
    } else {
      this.cache.clear()
    }
  }
}

// 单例实例
const projectSettingsService = new ProjectSettingsService()

export { projectSettingsService }
