import type { Router } from 'vue-router'
import type { Command } from '@/components/CommandPalette.vue'
import { useEditorStore } from '@/stores/editor'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useThemeStore } from '@/stores/theme'
import { useNotificationStore } from '@/stores/notification'

export interface CommandDependencies {
  router: Router
  editorStore: ReturnType<typeof useEditorStore>
  fileExplorerStore: ReturnType<typeof useFileExplorerStore>
  themeStore: ReturnType<typeof useThemeStore>
  notificationStore: ReturnType<typeof useNotificationStore>
  toggleSidebar: () => void
  toggleTerminalPanel: () => void
  openCommandPalette: () => void
  openQuickOpen: () => void
}

export function createAppCommands(deps: CommandDependencies): Command[] {
  const hasActiveTab = () => Boolean(deps.editorStore.activeTabId)
  const hasMultipleTabs = () => deps.editorStore.tabs.length > 1
  const hasDirtyTabs = () => deps.editorStore.dirtyTabs.length > 0
  const hasTabs = () => deps.editorStore.tabs.length > 0

  return [
    {
      id: 'workbench.action.showCommands',
      title: '显示命令面板',
      description: '搜索并运行命令',
      category: '搜索',
      shortcut: 'Cmd+Shift+P',
      action: () => deps.openCommandPalette()
    },
    {
      id: 'workbench.action.quickOpen',
      title: '快速打开文件',
      description: '按名称搜索并打开文件',
      category: '搜索',
      shortcut: 'Cmd+P',
      action: () => deps.openQuickOpen()
    },
    {
      id: 'file.openFolder',
      title: '打开文件夹',
      description: '选择并打开一个工作区文件夹',
      category: '文件',
      shortcut: 'Cmd+O',
      action: () => deps.fileExplorerStore.openFolder()
    },
    {
      id: 'file.save',
      title: '保存文件',
      description: '保存当前打开的文件',
      category: '文件',
      shortcut: 'Cmd+S',
      when: hasActiveTab,
      action: () => deps.editorStore.saveCurrentFile()
    },
    {
      id: 'file.saveAll',
      title: '保存全部文件',
      description: '保存所有已修改的文件',
      category: '文件',
      shortcut: 'Cmd+Shift+S',
      when: hasDirtyTabs,
      action: () => deps.editorStore.saveAllFiles()
    },
    {
      id: 'file.clearRecentFiles',
      title: '清除最近文件',
      description: '清空最近打开的文件记录',
      category: '文件',
      action: () => {
        deps.editorStore.clearRecentFiles()
        deps.notificationStore.success('已清除最近文件')
      }
    },
    {
      id: 'file.closeTab',
      title: '关闭当前标签页',
      description: '关闭当前打开的文件标签',
      category: '文件',
      shortcut: 'Cmd+W',
      when: hasActiveTab,
      action: () => {
        if (deps.editorStore.activeTabId) {
          deps.editorStore.closeTab(deps.editorStore.activeTabId)
        }
      }
    },
    {
      id: 'file.closeAllTabs',
      title: '关闭所有标签页',
      description: '关闭所有打开的文件',
      category: '文件',
      shortcut: 'Cmd+K Cmd+W',
      when: hasTabs,
      action: () => deps.editorStore.closeAllTabs()
    },
    {
      id: 'view.toggleSidebar',
      title: '切换侧边栏',
      description: '显示或隐藏侧边栏',
      category: '视图',
      shortcut: 'Cmd+B',
      action: () => deps.toggleSidebar()
    },
    {
      id: 'view.toggleTerminal',
      title: '切换终端面板',
      description: '显示或隐藏底部终端',
      category: '视图',
      shortcut: 'Ctrl+`',
      action: () => deps.toggleTerminalPanel()
    },
    {
      id: 'view.openSettings',
      title: '打开设置',
      description: '进入设置页面',
      category: '视图',
      shortcut: 'Cmd+,',
      action: () => deps.router.push('/settings')
    },
    {
      id: 'view.openDevOps',
      title: '打开 DevOps',
      description: '进入 DevOps 面板',
      category: '视图',
      shortcut: 'Cmd+Shift+D',
      action: () => deps.router.push('/devops')
    },
    {
      id: 'view.toggleTheme',
      title: '切换深浅色主题',
      description: '在深色/浅色模式之间切换',
      category: '视图',
      shortcut: 'Cmd+K Cmd+T',
      action: () => deps.themeStore.toggleTheme()
    },
    {
      id: 'view.nextTab',
      title: '下一个标签页',
      description: '切换到下一个打开的标签页',
      category: '导航',
      shortcut: 'Ctrl+Tab',
      when: hasMultipleTabs,
      action: () => deps.editorStore.nextTab()
    },
    {
      id: 'view.prevTab',
      title: '上一个标签页',
      description: '切换到上一个打开的标签页',
      category: '导航',
      shortcut: 'Ctrl+Shift+Tab',
      when: hasMultipleTabs,
      action: () => deps.editorStore.prevTab()
    }
  ]
}
