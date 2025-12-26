<script setup lang="ts">
/**
 * 文件树组件
 * 渲染整个文件树结构
 */

import type { FileNode } from '@/types'
import FileTreeItem from './FileTreeItem.vue'

defineProps<{
  /** 文件树数据 */
  tree: FileNode[]
  /** 当前选中的路径 */
  selectedPath?: string | null
}>()

const emit = defineEmits<{
  /** 选中节点 */
  select: [path: string]
  /** 展开/折叠节点 */
  toggle: [path: string]
  /** 打开文件 */
  open: [path: string]
  /** 右键菜单 */
  contextmenu: [event: MouseEvent, node: FileNode]
}>()

// 转发事件
const handleSelect = (path: string) => emit('select', path)
const handleToggle = (path: string) => emit('toggle', path)
const handleOpen = (path: string) => emit('open', path)
const handleContextMenu = (event: MouseEvent, node: FileNode) => emit('contextmenu', event, node)
</script>

<template>
  <div class="file-tree">
    <FileTreeItem
      v-for="node in tree"
      :key="node.path"
      :node="node"
      :level="0"
      :selected-path="selectedPath"
      @select="handleSelect"
      @toggle="handleToggle"
      @open="handleOpen"
      @contextmenu="handleContextMenu"
    />

    <!-- 空状态 -->
    <div v-if="tree.length === 0" class="empty-state">
      <p>此文件夹为空</p>
    </div>
  </div>
</template>

<style scoped>
.file-tree {
  padding: 4px 0;
}

.empty-state {
  padding: 16px;
  text-align: center;
  color: var(--mdui-color-on-surface-variant);
  font-size: 13px;
}
</style>
