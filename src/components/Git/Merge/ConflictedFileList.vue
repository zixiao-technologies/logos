<script setup lang="ts">
/**
 * ConflictedFileList - 冲突文件列表组件
 * 显示所有存在冲突的文件，支持选择和状态显示
 */

import type { ConflictedFile } from '@/types/merge'

import '@mdui/icons/description.js'
import '@mdui/icons/check-circle.js'
import '@mdui/icons/error-outline.js'

defineProps<{
  files: ConflictedFile[]
  currentFile: string | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', path: string): void
}>()

/** 获取文件名 */
const getFileName = (path: string) => path.split('/').pop() || path

/** 获取文件目录 */
const getFileDir = (path: string) => {
  const parts = path.split('/')
  parts.pop()
  return parts.length > 0 ? parts.join('/') + '/' : ''
}
</script>

<template>
  <div class="conflicted-file-list">
    <div class="list-header">
      <span class="title">冲突文件</span>
      <span class="count">{{ files.filter(f => !f.resolved).length }} / {{ files.length }}</span>
    </div>

    <div v-if="loading" class="loading">
      <mdui-circular-progress></mdui-circular-progress>
    </div>

    <div v-else-if="files.length === 0" class="empty">
      <mdui-icon-check-circle></mdui-icon-check-circle>
      <span>没有冲突文件</span>
    </div>

    <div v-else class="file-list">
      <div
        v-for="file in files"
        :key="file.path"
        class="file-item"
        :class="{
          selected: currentFile === file.path,
          resolved: file.resolved
        }"
        @click="emit('select', file.path)"
      >
        <div class="file-icon">
          <mdui-icon-check-circle v-if="file.resolved" class="resolved-icon"></mdui-icon-check-circle>
          <mdui-icon-error-outline v-else class="conflict-icon"></mdui-icon-error-outline>
        </div>
        <div class="file-info">
          <span class="file-name">{{ getFileName(file.path) }}</span>
          <span class="file-path">{{ getFileDir(file.path) }}</span>
        </div>
        <span v-if="!file.resolved" class="conflict-count">
          {{ file.conflictCount }} 冲突
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conflicted-file-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface-container-low);
  border-right: 1px solid var(--mdui-color-outline-variant);
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.list-header .title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.list-header .count {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
  background: var(--mdui-color-surface-container-highest);
  padding: 2px 8px;
  border-radius: 10px;
}

.loading,
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  color: var(--mdui-color-on-surface-variant);
  font-size: 13px;
}

.empty mdui-icon-check-circle {
  font-size: 32px;
  color: var(--mdui-color-primary);
}

.file-list {
  flex: 1;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.15s;
  border-left: 3px solid transparent;
}

.file-item:hover {
  background: var(--mdui-color-surface-container);
}

.file-item.selected {
  background: var(--mdui-color-surface-container-high);
  border-left-color: var(--mdui-color-primary);
}

.file-item.resolved {
  opacity: 0.7;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.file-icon .conflict-icon {
  color: var(--mdui-color-error);
  font-size: 18px;
}

.file-icon .resolved-icon {
  color: var(--mdui-color-primary);
  font-size: 18px;
}

.file-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-path {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conflict-count {
  font-size: 11px;
  color: var(--mdui-color-error);
  background: var(--mdui-color-error-container);
  padding: 2px 6px;
  border-radius: 8px;
  white-space: nowrap;
}
</style>
