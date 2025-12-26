<script setup lang="ts">
/**
 * 文件资源管理器主组件
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useEditorStore } from '@/stores/editor'
import type { FileNode } from '@/types'
import FileTree from './FileTree.vue'

// 导入 MDUI 图标
import '@mdui/icons/note-add.js'
import '@mdui/icons/create-new-folder.js'
import '@mdui/icons/refresh.js'
import '@mdui/icons/unfold-less.js'
import '@mdui/icons/folder-open.js'
import '@mdui/icons/edit.js'
import '@mdui/icons/delete.js'
import '@mdui/icons/content-copy.js'

const fileExplorerStore = useFileExplorerStore()
const editorStore = useEditorStore()
const router = useRouter()

// 右键菜单状态
const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const contextMenuNode = ref<FileNode | null>(null)

// 新建文件/文件夹对话框
const showNewDialog = ref(false)
const newItemType = ref<'file' | 'directory'>('file')
const newItemName = ref('')
const newItemParentPath = ref('')

// 重命名对话框
const showRenameDialog = ref(false)
const renameItemPath = ref('')
const renameItemName = ref('')

// 删除确认对话框
const showDeleteDialog = ref(false)
const deleteItemPath = ref('')
const deleteItemName = ref('')

// 打开文件夹
const handleOpenFolder = async () => {
  await fileExplorerStore.openFolder()
}

// 刷新
const handleRefresh = () => {
  fileExplorerStore.refreshTree()
}

// 折叠全部
const handleCollapseAll = () => {
  fileExplorerStore.collapseAll()
}

// 选中节点
const handleSelect = (path: string) => {
  fileExplorerStore.selectNode(path)
}

// 展开/折叠节点
const handleToggle = (path: string) => {
  fileExplorerStore.toggleNode(path)
}

// 打开文件
const handleOpen = async (path: string) => {
  try {
    await editorStore.openFile(path)
    // 导航到编辑器视图
    router.push('/')
  } catch (error) {
    console.error('打开文件失败:', error)
  }
}

// 右键菜单
const handleContextMenu = (event: MouseEvent, node: FileNode) => {
  contextMenuNode.value = node
  contextMenuPosition.value = { x: event.clientX, y: event.clientY }
  showContextMenu.value = true
}

// 关闭右键菜单
const closeContextMenu = () => {
  showContextMenu.value = false
  contextMenuNode.value = null
}

// 新建文件
const handleNewFile = () => {
  if (!contextMenuNode.value && !fileExplorerStore.rootPath) return

  const parentPath = contextMenuNode.value?.type === 'directory'
    ? contextMenuNode.value.path
    : contextMenuNode.value
      ? contextMenuNode.value.path.substring(0, contextMenuNode.value.path.lastIndexOf('/'))
      : fileExplorerStore.rootPath

  newItemType.value = 'file'
  newItemParentPath.value = parentPath || ''
  newItemName.value = ''
  showNewDialog.value = true
  closeContextMenu()
}

// 新建文件夹
const handleNewFolder = () => {
  if (!contextMenuNode.value && !fileExplorerStore.rootPath) return

  const parentPath = contextMenuNode.value?.type === 'directory'
    ? contextMenuNode.value.path
    : contextMenuNode.value
      ? contextMenuNode.value.path.substring(0, contextMenuNode.value.path.lastIndexOf('/'))
      : fileExplorerStore.rootPath

  newItemType.value = 'directory'
  newItemParentPath.value = parentPath || ''
  newItemName.value = ''
  showNewDialog.value = true
  closeContextMenu()
}

// 确认新建
const handleConfirmNew = async () => {
  if (!newItemName.value.trim()) return

  if (newItemType.value === 'file') {
    const success = await fileExplorerStore.createFile(newItemParentPath.value, newItemName.value.trim())
    if (success) {
      // 自动打开新建的文件
      const newPath = `${newItemParentPath.value}/${newItemName.value.trim()}`
      await editorStore.openFile(newPath)
      // 导航到编辑器视图
      router.push('/')
    }
  } else {
    await fileExplorerStore.createDirectory(newItemParentPath.value, newItemName.value.trim())
  }

  showNewDialog.value = false
}

// 重命名
const handleRename = () => {
  if (!contextMenuNode.value) return

  renameItemPath.value = contextMenuNode.value.path
  renameItemName.value = contextMenuNode.value.name
  showRenameDialog.value = true
  closeContextMenu()
}

// 确认重命名
const handleConfirmRename = async () => {
  if (!renameItemName.value.trim()) return

  const result = await fileExplorerStore.renameItem(renameItemPath.value, renameItemName.value.trim())

  if (result && typeof result === 'object' && result.success) {
    // 更新编辑器中已打开文件的路径
    editorStore.handleFileRename(renameItemPath.value, result.newPath)
  }

  showRenameDialog.value = false
}

// 删除
const handleDelete = () => {
  if (!contextMenuNode.value) return

  deleteItemPath.value = contextMenuNode.value.path
  deleteItemName.value = contextMenuNode.value.name
  showDeleteDialog.value = true
  closeContextMenu()
}

// 确认删除
const handleConfirmDelete = async () => {
  const success = await fileExplorerStore.deleteItem(deleteItemPath.value)

  if (success) {
    // 关闭编辑器中已打开的文件
    editorStore.handleFileDelete(deleteItemPath.value)
  }

  showDeleteDialog.value = false
}

// 复制路径
const handleCopyPath = async () => {
  if (!contextMenuNode.value) return

  try {
    await navigator.clipboard.writeText(contextMenuNode.value.path)
  } catch (error) {
    console.error('复制失败:', error)
  }

  closeContextMenu()
}

// 监听文件变化
let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = window.electronAPI.fileSystem.onFileChange((event) => {
    fileExplorerStore.handleFileChange(event)
  })
})

onUnmounted(() => {
  unsubscribe?.()
})

// 点击其他区域关闭右键菜单
const handleClickOutside = () => {
  if (showContextMenu.value) {
    closeContextMenu()
  }
}
</script>

<template>
  <div class="file-explorer" @click="handleClickOutside">
    <!-- 头部工具栏 -->
    <div class="explorer-header">
      <span class="title">资源管理器</span>
      <div class="actions">
        <mdui-button-icon @click="handleNewFile" title="新建文件">
          <mdui-icon-note-add></mdui-icon-note-add>
        </mdui-button-icon>
        <mdui-button-icon @click="handleNewFolder" title="新建文件夹">
          <mdui-icon-create-new-folder></mdui-icon-create-new-folder>
        </mdui-button-icon>
        <mdui-button-icon @click="handleRefresh" title="刷新">
          <mdui-icon-refresh></mdui-icon-refresh>
        </mdui-button-icon>
        <mdui-button-icon @click="handleCollapseAll" title="折叠全部">
          <mdui-icon-unfold-less></mdui-icon-unfold-less>
        </mdui-button-icon>
      </div>
    </div>

    <!-- 文件夹名称 -->
    <div v-if="fileExplorerStore.hasOpenFolder" class="folder-name">
      <mdui-icon-folder-open></mdui-icon-folder-open>
      <span>{{ fileExplorerStore.rootFolderName }}</span>
    </div>

    <!-- 文件树 -->
    <div v-if="fileExplorerStore.hasOpenFolder" class="tree-container">
      <div v-if="fileExplorerStore.loading" class="loading">
        <mdui-circular-progress></mdui-circular-progress>
      </div>
      <FileTree
        v-else
        :tree="fileExplorerStore.tree"
        :selected-path="fileExplorerStore.selectedPath"
        @select="handleSelect"
        @toggle="handleToggle"
        @open="handleOpen"
        @contextmenu="handleContextMenu"
      />
    </div>

    <!-- 未打开文件夹 -->
    <div v-else class="no-folder">
      <p>尚未打开文件夹</p>
      <mdui-button variant="tonal" @click="handleOpenFolder">
        <mdui-icon-folder-open slot="icon"></mdui-icon-folder-open>
        打开文件夹
      </mdui-button>
    </div>

    <!-- 右键菜单 -->
    <mdui-menu
      v-if="showContextMenu"
      :style="{
        position: 'fixed',
        left: contextMenuPosition.x + 'px',
        top: contextMenuPosition.y + 'px',
        zIndex: 1000
      }"
      @closed="closeContextMenu"
    >
      <mdui-menu-item @click="handleNewFile">
        <mdui-icon-note-add slot="icon"></mdui-icon-note-add>
        新建文件
      </mdui-menu-item>
      <mdui-menu-item @click="handleNewFolder">
        <mdui-icon-create-new-folder slot="icon"></mdui-icon-create-new-folder>
        新建文件夹
      </mdui-menu-item>
      <mdui-divider></mdui-divider>
      <mdui-menu-item @click="handleRename">
        <mdui-icon-edit slot="icon"></mdui-icon-edit>
        重命名
      </mdui-menu-item>
      <mdui-menu-item @click="handleDelete">
        <mdui-icon-delete slot="icon"></mdui-icon-delete>
        删除
      </mdui-menu-item>
      <mdui-divider></mdui-divider>
      <mdui-menu-item @click="handleCopyPath">
        <mdui-icon-content-copy slot="icon"></mdui-icon-content-copy>
        复制路径
      </mdui-menu-item>
    </mdui-menu>

    <!-- 新建对话框 -->
    <mdui-dialog
      :open="showNewDialog"
      @closed="showNewDialog = false"
    >
      <span slot="headline">
        {{ newItemType === 'file' ? '新建文件' : '新建文件夹' }}
      </span>
      <mdui-text-field
        slot="description"
        :label="newItemType === 'file' ? '文件名' : '文件夹名'"
        v-model="newItemName"
        @keydown.enter="handleConfirmNew"
      ></mdui-text-field>
      <mdui-button slot="action" variant="text" @click="showNewDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="handleConfirmNew">
        创建
      </mdui-button>
    </mdui-dialog>

    <!-- 重命名对话框 -->
    <mdui-dialog
      :open="showRenameDialog"
      @closed="showRenameDialog = false"
    >
      <span slot="headline">重命名</span>
      <mdui-text-field
        slot="description"
        label="新名称"
        v-model="renameItemName"
        @keydown.enter="handleConfirmRename"
      ></mdui-text-field>
      <mdui-button slot="action" variant="text" @click="showRenameDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="handleConfirmRename">
        重命名
      </mdui-button>
    </mdui-dialog>

    <!-- 删除确认对话框 -->
    <mdui-dialog
      :open="showDeleteDialog"
      @closed="showDeleteDialog = false"
    >
      <span slot="headline">确认删除</span>
      <span slot="description">
        确定要删除 "{{ deleteItemName }}" 吗？此操作无法撤销。
      </span>
      <mdui-button slot="action" variant="text" @click="showDeleteDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="handleConfirmDelete">
        删除
      </mdui-button>
    </mdui-dialog>
  </div>
</template>

<style scoped>
.file-explorer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.explorer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.explorer-header .title {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.explorer-header .actions {
  display: flex;
  gap: 2px;
}

.explorer-header mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}

.folder-name {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--mdui-color-on-surface);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.folder-name mdui-icon-folder-open {
  font-size: 18px;
  color: var(--mdui-color-primary);
}

.tree-container {
  flex: 1;
  overflow: auto;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.no-folder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  text-align: center;
  color: var(--mdui-color-on-surface-variant);
  flex: 1;
}

.no-folder p {
  margin: 0;
  font-size: 14px;
}
</style>
