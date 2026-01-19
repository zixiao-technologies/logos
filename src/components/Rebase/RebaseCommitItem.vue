<script setup lang="ts">
/**
 * Rebase 提交项组件
 * 显示单个提交及其操作下拉菜单
 */

import { computed } from 'vue'
import type { RebaseCommitAction, RebaseAction } from '@/types/rebase'

// 导入 MDUI 图标
import '@mdui/icons/drag-indicator.js'
import '@mdui/icons/check.js'
import '@mdui/icons/edit.js'
import '@mdui/icons/compress.js'
import '@mdui/icons/delete.js'
import '@mdui/icons/pause.js'

interface Props {
  commit: RebaseCommitAction
  index: number
  dragging?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dragging: false
})

const emit = defineEmits<{
  (e: 'action', action: RebaseAction): void
  (e: 'reword', message: string): void
  (e: 'dragstart', index: number): void
  (e: 'dragover', index: number): void
  (e: 'dragend'): void
}>()

// 操作选项
const actions: Array<{ value: RebaseAction; label: string; icon: string; color?: string }> = [
  { value: 'pick', label: 'Pick', icon: 'check' },
  { value: 'reword', label: 'Reword', icon: 'edit', color: '#2196f3' },
  { value: 'edit', label: 'Edit', icon: 'pause', color: '#ff9800' },
  { value: 'squash', label: 'Squash', icon: 'compress', color: '#ff9800' },
  { value: 'fixup', label: 'Fixup', icon: 'compress', color: '#ff9800' },
  { value: 'drop', label: 'Drop', icon: 'delete', color: '#f44336' }
]

// 获取操作颜色类
const actionClass = computed(() => {
  return `action-${props.commit.action}`
})

// 格式化日期
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 拖拽处理
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData('text/plain', String(props.index))
  emit('dragstart', props.index)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  emit('dragover', props.index)
}

const handleDragEnd = () => {
  emit('dragend')
}
</script>

<template>
  <div
    class="rebase-commit-item"
    :class="[actionClass, { dragging, dropped: commit.action === 'drop' }]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @dragend="handleDragEnd"
  >
    <!-- 拖拽手柄 -->
    <div class="drag-handle">
      <mdui-icon-drag-indicator></mdui-icon-drag-indicator>
    </div>

    <!-- 操作选择器 -->
    <mdui-select
      :value="commit.action"
      @change="(e: Event) => emit('action', (e.target as HTMLSelectElement).value as RebaseAction)"
      class="action-select"
    >
      <mdui-menu-item
        v-for="action in actions"
        :key="action.value"
        :value="action.value"
      >
        {{ action.label }}
      </mdui-menu-item>
    </mdui-select>

    <!-- 提交信息 -->
    <div class="commit-info">
      <span class="commit-hash">{{ commit.shortHash }}</span>
      <span class="commit-message" :class="{ 'strike-through': commit.action === 'drop' }">
        {{ commit.newMessage || commit.message }}
      </span>
    </div>

    <!-- 作者和日期 -->
    <div class="commit-meta">
      <span class="commit-author">{{ commit.author }}</span>
      <span class="commit-date">{{ formatDate(commit.date) }}</span>
    </div>

    <!-- Reword 编辑按钮 -->
    <mdui-button-icon
      v-if="commit.action === 'reword'"
      @click="emit('reword', commit.newMessage || commit.message)"
      title="编辑提交消息"
    >
      <mdui-icon-edit></mdui-icon-edit>
    </mdui-button-icon>
  </div>
</template>

<style scoped>
.rebase-commit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--mdui-color-surface);
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 8px;
  transition: all 0.15s;
  cursor: grab;
}

.rebase-commit-item:hover {
  background: var(--mdui-color-surface-container);
}

.rebase-commit-item.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.rebase-commit-item.dropped {
  opacity: 0.5;
  background: var(--mdui-color-error-container);
}

.rebase-commit-item.action-reword {
  border-left: 3px solid #2196f3;
}

.rebase-commit-item.action-squash,
.rebase-commit-item.action-fixup {
  border-left: 3px solid #ff9800;
}

.rebase-commit-item.action-edit {
  border-left: 3px solid #ff9800;
}

.rebase-commit-item.action-drop {
  border-left: 3px solid #f44336;
}

.drag-handle {
  display: flex;
  align-items: center;
  color: var(--mdui-color-on-surface-variant);
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.action-select {
  width: 100px;
  --mdui-comp-text-field-height: 32px;
  font-size: 12px;
}

.commit-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.commit-hash {
  font-family: monospace;
  font-size: 12px;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.commit-message {
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commit-message.strike-through {
  text-decoration: line-through;
  color: var(--mdui-color-on-surface-variant);
}

.commit-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
}

.commit-author {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}

.commit-date {
  font-size: 10px;
  color: var(--mdui-color-on-surface-variant);
  opacity: 0.7;
}

.rebase-commit-item mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}
</style>
