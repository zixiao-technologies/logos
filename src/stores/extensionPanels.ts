import { defineStore } from 'pinia'
import type { ExtensionWebviewPanel, ExtensionWebviewHtml } from '@/types'

let unsubscribeWebviewPanel: (() => void) | null = null
let unsubscribeWebviewHtml: (() => void) | null = null

type WebviewPanelEvent = ExtensionWebviewPanel & {
  action?: 'create' | 'update' | 'reveal' | 'dispose'
}

export const useExtensionPanelsStore = defineStore('extensionPanels', {
  state: () => ({
    panels: [] as ExtensionWebviewPanel[],
    activeHandle: null as string | null,
    panelHtml: {} as Record<string, string>
  }),

  getters: {
    activePanel: (state) => {
      if (!state.activeHandle) return null
      return state.panels.find(panel => panel.handle === state.activeHandle) || null
    },
    panelByHandle: (state) => (handle: string) => {
      return state.panels.find(panel => panel.handle === handle)
    }
  },

  actions: {
    init() {
      if (!window.electronAPI?.extensions?.onWebviewPanel || !window.electronAPI.extensions.onWebviewHtml) {
        return
      }

      if (!unsubscribeWebviewPanel) {
        unsubscribeWebviewPanel = window.electronAPI.extensions.onWebviewPanel((payload: WebviewPanelEvent) => {
          this.applyPanelEvent(payload)
        })
      }

      if (!unsubscribeWebviewHtml) {
        unsubscribeWebviewHtml = window.electronAPI.extensions.onWebviewHtml((payload: ExtensionWebviewHtml) => {
          if (!this.panelByHandle(payload.handle)) {
            return
          }
          this.panelHtml = { ...this.panelHtml, [payload.handle]: payload.html }
        })
      }
    },

    applyPanelEvent(payload: WebviewPanelEvent) {
      const existingIndex = this.panels.findIndex(panel => panel.handle === payload.handle)
      const nextPanel: ExtensionWebviewPanel = {
        handle: payload.handle,
        viewType: payload.viewType,
        title: payload.title || payload.viewType,
        options: payload.options
      }

      if (payload.action === 'dispose') {
        if (existingIndex >= 0) {
          this.panels.splice(existingIndex, 1)
          const { [payload.handle]: _removed, ...rest } = this.panelHtml
          this.panelHtml = rest
        }
        if (this.activeHandle === payload.handle) {
          this.activeHandle = this.panels[0]?.handle ?? null
        }
        return
      }

      if (existingIndex >= 0) {
        this.panels.splice(existingIndex, 1, nextPanel)
      } else {
        this.panels.push(nextPanel)
      }

      if (payload.action === 'create' || payload.action === 'reveal') {
        this.activeHandle = payload.handle
      } else if (!this.activeHandle) {
        this.activeHandle = payload.handle
      }
    },

    setActive(handle: string) {
      if (this.panelByHandle(handle)) {
        this.activeHandle = handle
      }
    },

    close(handle: string) {
      if (!handle || !window.electronAPI?.extensions?.disposeWebviewPanel) {
        return
      }
      void window.electronAPI.extensions.disposeWebviewPanel({ handle })
    },

    getHtml(handle: string | null): string {
      if (!handle) return ''
      return this.panelHtml[handle] || ''
    }
  }
})
