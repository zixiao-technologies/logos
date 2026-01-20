<script setup lang="ts">
/**
 * CherryPickPreview - Cherry-pick 预览组件
 * 显示将要 cherry-pick 的提交信息和影响的文件
 */

import '@mdui/icons/add.js'
import '@mdui/icons/remove.js'
import '@mdui/icons/edit.js'

defineProps<{
  commits: Array<{
    hash: string
    shortHash: string
    message: string
    author: string
    date: string
  }>
  files?: Array<{
    path: string
    additions: number
    deletions: number
    status: 'added' | 'modified' | 'deleted' | 'renamed'
  }>
  isLoading?: boolean
}>()

/** 获取文件名 */
const getFileName = (path: string) => path.split('/').pop() || path

/** 获取文件目录 */
const getFileDir = (path: string) => {
  const parts = path.split('/')
  parts.pop()
  return parts.length > 0 ? parts.join('/') + '/' : ''
}

/** 获取状态图标和颜色 */
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'added':
      return { icon: 'mdui-icon-add', color: '#4caf50' }
    case 'deleted':
      return { icon: 'mdui-icon-remove', color: '#f44336' }
    case 'renamed':
      return { icon: 'mdui-icon-edit', color: '#ff9800' }
    default:
      return { icon: 'mdui-icon-edit', color: '#2196f3' }
  }
}
</script>

<template>
  <div class="cherry-pick-preview">
    <!-- 提交列表 -->
    <div class="commits-section">
      <div class="section-header">
        <span class="section-title">选中的提交</span>
        <span class="count">{{ commits.length }}</span>
      </div>
      <div class="commits-list">
        <div
          v-for="commit in commits"
          :key="commit.hash"
          class="commit-item"
        >
          <span class="commit-hash">{{ commit.shortHash }}</span>
          <span class="commit-message">{{ commit.message }}</span>
          <span class="commit-author">{{ commit.author }}</span>
        </div>
      </div>
    </div>

    <!-- 受影响的文件 -->
    <div v-if="files && files.length > 0" class="files-section">
      <div class="section-header">
        <span class="section-title">受影响的文件</span>
        <span class="count">{{ files.length }}</span>
      </div>

      <div v-if="isLoading" class="loading">
        <mdui-circular-progress></mdui-circular-progress>
      </div>

      <div v-else class="files-list">
        <div
          v-for="file in files"
          :key="file.path"
          class="file-item"
        >
          <component
            :is="getStatusInfo(file.status).icon"
            :style="{ color: getStatusInfo(file.status).color }"
          ></component>
          <div class="file-info">
            <span class="file-name">{{ getFileName(file.path) }}</span>
            <span class="file-path">{{ getFileDir(file.path) }}</span>
          </div>
          <div class="file-stats">
            <span v-if="file.additions > 0" class="additions">+{{ file.additions }}</span>
            <span v-if="file.deletions > 0" class="deletions">-{{ file.deletions }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cherry-pick-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.count {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  background: var(--mdui-color-surface-container);
  padding: 1px 6px;
  border-radius: 8px;
}

.commits-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.commit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--mdui-color-surface-container-low);
  border-radius: 6px;
}

.commit-hash {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.commit-message {
  flex: 1;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commit-author {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  flex-shrink: 0;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--mdui-color-surface-container-low);
  border-radius: 4px;
}

.file-item mdui-icon-add,
.file-item mdui-icon-remove,
.file-item mdui-icon-edit {
  font-size: 16px;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.file-name {
  font-size: 12px;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-path {
  font-size: 10px;
  color: var(--mdui-color-on-surface-variant);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-stats {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.additions {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: #4caf50;
}

.deletions {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: #f44336;
}
</style>
