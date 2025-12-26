<script setup lang="ts">
/**
 * 文件树节点组件
 * 递归渲染文件树的每个节点
 */

import { computed } from 'vue'
import type { FileNode } from '@/types'
import FileIcon from './FileIcon.vue'

// 导入 MDUI 图标
import '@mdui/icons/chevron-right.js'

const props = defineProps<{
  /** 节点数据 */
  node: FileNode
  /** 缩进层级 */
  level?: number
  /** 当前选中的路径 */
  selectedPath?: string | null
}>()

const emit = defineEmits<{
  /** 选中节点 */
  select: [path: string]
  /** 展开/折叠节点 */
  toggle: [path: string]
  /** 打开文件 (单击触发) */
  open: [path: string]
  /** 右键菜单 */
  contextmenu: [event: MouseEvent, node: FileNode]
}>()

const level = computed(() => props.level ?? 0)

const isDirectory = computed(() => props.node.type === 'directory')
const isExpanded = computed(() => isDirectory.value && props.node.expanded)
const isSelected = computed(() => props.selectedPath === props.node.path)

const paddingLeft = computed(() => `${level.value * 16 + 8}px`)

const handleClick = () => {
  emit('select', props.node.path)

  // 目录点击时展开/折叠，文件点击时打开（VS Code 风格）
  if (isDirectory.value) {
    emit('toggle', props.node.path)
  } else {
    emit('open', props.node.path)
  }
}

const handleDoubleClick = () => {
  // 双击目录时展开/折叠（保留双击行为作为备选）
  if (isDirectory.value) {
    emit('toggle', props.node.path)
  }
}

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  emit('contextmenu', event, props.node)
}

// 转发子节点事件
const handleChildSelect = (path: string) => emit('select', path)
const handleChildToggle = (path: string) => emit('toggle', path)
const handleChildOpen = (path: string) => emit('open', path)
const handleChildContextMenu = (event: MouseEvent, node: FileNode) => emit('contextmenu', event, node)
</script>

<template>
  <div class="file-tree-item">
    <!-- 节点内容 -->
    <div
      class="item-content"
      :class="{ selected: isSelected, directory: isDirectory }"
      :style="{ paddingLeft }"
      @click="handleClick"
      @dblclick="handleDoubleClick"
      @contextmenu="handleContextMenu"
    >
      <!-- 展开/折叠箭头 (仅目录显示) -->
      <span class="arrow" :class="{ expanded: isExpanded, hidden: !isDirectory }">
        <mdui-icon-chevron-right></mdui-icon-chevron-right>
      </span>

      <!-- 文件图标 -->
      <FileIcon
        :filename="node.name"
        :is-directory="isDirectory"
        :is-expanded="isExpanded"
        :size="18"
      />

      <!-- 文件名 -->
      <span class="item-name">{{ node.name }}</span>
    </div>

    <!-- 子节点 (仅展开的目录显示) -->
    <div v-if="isDirectory && isExpanded && node.children" class="children">
      <FileTreeItem
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        :level="level + 1"
        :selected-path="selectedPath"
        @select="handleChildSelect"
        @toggle="handleChildToggle"
        @open="handleChildOpen"
        @contextmenu="handleChildContextMenu"
      />
    </div>
  </div>
</template>

<style scoped>
.file-tree-item {
  user-select: none;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding-right: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.1s;
}

.item-content:hover {
  background: var(--mdui-color-surface-container-high);
}

.item-content.selected {
  background: var(--mdui-color-secondary-container);
  color: var(--mdui-color-on-secondary-container);
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.arrow.hidden {
  visibility: hidden;
}

.arrow mdui-icon {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 28px;
}

.children {
  /* 子节点容器 */
}
</style>
