<script setup lang="ts">
/**
 * RebaseCommitItem - 单个 Rebase 提交项
 * 支持拖拽、操作选择和消息编辑
 */

import { ref, computed } from 'vue'
import type { RebaseCommitAction, RebaseAction } from '@/types/rebase'

import '@mdui/icons/drag-indicator.js'
import '@mdui/icons/edit.js'
import '@mdui/icons/check.js'
import '@mdui/icons/close.js'

const props = defineProps<{
  commit: RebaseCommitAction
  index: number
  isDragging?: boolean
  isDropTarget?: boolean
}>()

const emit = defineEmits<{
  (e: 'action-change', hash: string, action: RebaseAction): void
  (e: 'message-change', hash: string, message: string): void
  (e: 'drag-start', index: number): void
  (e: 'drag-end'): void
  (e: 'drag-over', index: number): void
  (e: 'drop', index: number): void
}>()

// 编辑状态
const isEditing = ref(false)
const editMessage = ref('')

// 操作选项
const actionOptions: { value: RebaseAction; label: string; color: string }[] = [
  { value: 'pick', label: 'pick', color: 'transparent' },
  { value: 'reword', label: 'reword', color: '#2196f3' },
  { value: 'edit', label: 'edit', color: '#ff9800' },
  { value: 'squash', label: 'squash', color: '#9c27b0' },
  { value: 'fixup', label: 'fixup', color: '#795548' },
  { value: 'drop', label: 'drop', color: '#f44336' }
]

// 当前操作颜色
const actionColor = computed(() => {
  return actionOptions.find(o => o.value === props.commit.action)?.color || 'transparent'
})

// 是否被删除
const isDropped = computed(() => props.commit.action === 'drop')

// 是否需要编辑消息
const needsMessage = computed(() =>
  props.commit.action === 'reword' || props.commit.action === 'squash'
)

// 处理操作变更
const handleActionChange = (e: Event) => {
  const select = e.target as HTMLSelectElement
  const action = select.value as RebaseAction
  emit('action-change', props.commit.hash, action)

  // 如果是 reword,自动打开编辑
  if (action === 'reword' && !props.commit.newMessage) {
    startEdit()
  }
}

// 开始编辑
const startEdit = () => {
  editMessage.value = props.commit.newMessage || props.commit.message
  isEditing.value = true
}

// 保存编辑
const saveEdit = () => {
  emit('message-change', props.commit.hash, editMessage.value)
  isEditing.value = false
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
}

// 拖拽事件
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move'
  e.dataTransfer!.setData('text/plain', String(props.index))
  emit('drag-start', props.index)
}

const handleDragEnd = () => {
  emit('drag-end')
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'move'
  emit('drag-over', props.index)
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  emit('drop', props.index)
}
</script>

<template>
  <div
    class="rebase-commit-item"
    :class="{
      dropped: isDropped,
      dragging: isDragging,
      'drop-target': isDropTarget
    }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <!-- 拖拽手柄 -->
    <div class="drag-handle">
      <mdui-icon-drag-indicator></mdui-icon-drag-indicator>
    </div>

    <!-- 操作选择器 -->
    <div class="action-selector" :style="{ borderColor: actionColor }">
      <select :value="commit.action" @change="handleActionChange">
        <option v-for="opt in actionOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- 提交信息 -->
    <div class="commit-info">
      <span class="commit-hash">{{ commit.shortHash }}</span>

      <!-- 消息显示/编辑 -->
      <template v-if="isEditing">
        <input
          v-model="editMessage"
          class="message-input"
          placeholder="输入新的提交消息..."
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
        />
        <div class="edit-actions">
          <mdui-button-icon @click="saveEdit" title="保存">
            <mdui-icon-check></mdui-icon-check>
          </mdui-button-icon>
          <mdui-button-icon @click="cancelEdit" title="取消">
            <mdui-icon-close></mdui-icon-close>
          </mdui-button-icon>
        </div>
      </template>

      <template v-else>
        <span class="commit-message" :class="{ 'has-new': commit.newMessage }">
          {{ commit.newMessage || commit.message }}
        </span>
        <mdui-button-icon
          v-if="needsMessage"
          class="edit-btn"
          @click="startEdit"
          title="编辑消息"
        >
          <mdui-icon-edit></mdui-icon-edit>
        </mdui-button-icon>
      </template>
    </div>

    <!-- 作者和日期 -->
    <div class="commit-meta">
      <span class="author">{{ commit.author }}</span>
      <span class="date">{{ commit.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.rebase-commit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--mdui-color-surface);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
  cursor: grab;
  transition: all 0.15s ease;
}

.rebase-commit-item:hover {
  background: var(--mdui-color-surface-container-low);
}

.rebase-commit-item.dropped {
  opacity: 0.5;
  text-decoration: line-through;
}

.rebase-commit-item.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.rebase-commit-item.drop-target {
  border-top: 2px solid var(--mdui-color-primary);
}

.drag-handle {
  display: flex;
  align-items: center;
  color: var(--mdui-color-on-surface-variant);
  cursor: grab;
}

.drag-handle mdui-icon-drag-indicator {
  font-size: 20px;
}

.action-selector {
  flex-shrink: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
}

.action-selector select {
  padding: 4px 8px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  background: var(--mdui-color-surface-container);
  color: var(--mdui-color-on-surface);
  border: none;
  cursor: pointer;
  outline: none;
}

.commit-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.commit-hash {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.commit-message {
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.commit-message.has-new {
  color: var(--mdui-color-tertiary);
  font-style: italic;
}

.message-input {
  flex: 1;
  padding: 6px 10px;
  font-size: 13px;
  background: var(--mdui-color-surface-container);
  color: var(--mdui-color-on-surface);
  border: 1px solid var(--mdui-color-outline);
  border-radius: 4px;
  outline: none;
}

.message-input:focus {
  border-color: var(--mdui-color-primary);
}

.edit-actions {
  display: flex;
  gap: 2px;
}

.edit-actions mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}

.edit-btn {
  --mdui-comp-button-icon-size: 24px;
  opacity: 0;
  transition: opacity 0.15s;
}

.rebase-commit-item:hover .edit-btn {
  opacity: 1;
}

.commit-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
}

.author {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}

.date {
  font-size: 10px;
  color: var(--mdui-color-on-surface-variant);
  opacity: 0.7;
}
</style>
