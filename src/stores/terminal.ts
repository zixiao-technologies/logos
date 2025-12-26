/**
 * 终端状态管理
 */

import { defineStore } from 'pinia'
import type { TerminalTab, TerminalState } from '@/types/terminal'
import { generateId } from '@/utils'

export const useTerminalStore = defineStore('terminal', {
  state: (): TerminalState => ({
    tabs: [],
    activeTabId: null
  }),

  getters: {
    /** 当前激活的标签页 */
    activeTab: (state): TerminalTab | null => {
      if (!state.activeTabId) return null
      return state.tabs.find(tab => tab.id === state.activeTabId) || null
    },

    /** 标签页数量 */
    tabCount: (state): number => {
      return state.tabs.length
    }
  },

  actions: {
    /**
     * 创建新终端标签
     */
    createTab(name?: string, cwd?: string): TerminalTab {
      const id = generateId()
      const tab: TerminalTab = {
        id,
        name: name || `终端 ${this.tabs.length + 1}`,
        cwd,
        connected: false,
        createdAt: Date.now()
      }

      this.tabs.push(tab)
      this.activeTabId = id

      return tab
    },

    /**
     * 关闭终端标签
     */
    closeTab(id: string): TerminalTab | null {
      const index = this.tabs.findIndex(tab => tab.id === id)
      if (index === -1) return null

      const [removed] = this.tabs.splice(index, 1)

      // 如果关闭的是当前激活的标签
      if (this.activeTabId === id) {
        if (this.tabs.length === 0) {
          this.activeTabId = null
        } else {
          const newIndex = Math.min(index, this.tabs.length - 1)
          this.activeTabId = this.tabs[newIndex].id
        }
      }

      return removed
    },

    /**
     * 设置激活的标签
     */
    setActiveTab(id: string): void {
      const tab = this.tabs.find(t => t.id === id)
      if (tab) {
        this.activeTabId = id
      }
    },

    /**
     * 更新标签连接状态
     */
    setConnected(id: string, connected: boolean): void {
      const tab = this.tabs.find(t => t.id === id)
      if (tab) {
        tab.connected = connected
      }
    },

    /**
     * 重命名标签
     */
    renameTab(id: string, name: string): void {
      const tab = this.tabs.find(t => t.id === id)
      if (tab) {
        tab.name = name
      }
    },

    /**
     * 清空所有标签
     */
    clearAllTabs(): void {
      this.tabs = []
      this.activeTabId = null
    }
  }
})
