import { defineStore } from 'pinia'
import type { ExtensionStatusBarItem } from '@/types'

let unsubscribeStatusBar: (() => void) | null = null

export const useExtensionStatusBarStore = defineStore('extensionStatusBar', {
  state: () => ({
    items: [] as ExtensionStatusBarItem[]
  }),

  getters: {
    visibleItems: (state) => state.items.filter(item => item.visible !== false),
    leftItems: (state) => {
      return state.items
        .filter(item => item.visible !== false && item.alignment !== 2)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    },
    rightItems: (state) => {
      return state.items
        .filter(item => item.visible !== false && item.alignment === 2)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    }
  },

  actions: {
    init() {
      if (!window.electronAPI?.extensions?.onStatusBarItem) {
        return
      }
      if (!unsubscribeStatusBar) {
        unsubscribeStatusBar = window.electronAPI.extensions.onStatusBarItem((payload: ExtensionStatusBarItem) => {
          this.applyUpdate(payload)
        })
      }
    },

    applyUpdate(payload: ExtensionStatusBarItem) {
      const index = this.items.findIndex(item => item.id === payload.id)
      if (payload.action === 'dispose') {
        if (index >= 0) {
          this.items.splice(index, 1)
        }
        return
      }

      const next: ExtensionStatusBarItem = {
        ...this.items[index],
        ...payload
      }

      if (index >= 0) {
        this.items.splice(index, 1, next)
      } else {
        this.items.push(next)
      }
    }
  }
})
