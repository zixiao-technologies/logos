<script setup lang="ts">
/**
 * Reflog 条目组件
 */

import type { ReflogEntry } from '@/types/reflog'
import { REFLOG_OPERATION_COLORS } from '@/types/reflog'

// 导入 MDUI 图标
import '@mdui/icons/circle.js'
import '@mdui/icons/arrow-forward.js'
import '@mdui/icons/arrow-back.js'
import '@mdui/icons/merge-type.js'
import '@mdui/icons/swap-vert.js'
import '@mdui/icons/content-copy.js'
import '@mdui/icons/cloud-download.js'
import '@mdui/icons/inventory-2.js'
import '@mdui/icons/alt-route.js'
import '@mdui/icons/warning.js'

interface Props {
  entry: ReflogEntry
  selected: boolean
}

defineProps<Props>()

// 获取操作类型图标
const getOperationIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'commit': 'circle',
    'checkout': 'arrow-forward',
    'reset': 'arrow-back',
    'merge': 'merge-type',
    'rebase': 'swap-vert',
    'cherry-pick': 'content-copy',
    'pull': 'cloud-download',
    'stash': 'inventory-2',
    'branch': 'alt-route',
    'other': 'circle'
  }
  return icons[type] || 'circle'
}

// 获取操作类型颜色
const getOperationColor = (type: string): string => {
  return REFLOG_OPERATION_COLORS[type as keyof typeof REFLOG_OPERATION_COLORS] || '#9e9e9e'
}
</script>

<template>
  <div
    class="reflog-entry-item"
    :class="{ selected, orphaned: entry.isOrphaned }"
  >
    <!-- 图标 -->
    <div
      class="entry-icon"
      :style="{ color: getOperationColor(entry.operationType) }"
    >
      <component :is="`mdui-icon-${getOperationIcon(entry.operationType)}`"></component>
    </div>

    <!-- 内容 -->
    <div class="entry-content">
      <div class="entry-header">
        <span class="entry-hash">{{ entry.shortHash }}</span>
        <span class="entry-message">{{ entry.message }}</span>
      </div>
      <div class="entry-meta">
        <span class="entry-time">{{ entry.relativeDate }}</span>
        <span class="entry-type">{{ entry.operationType }}</span>
        <span v-if="entry.branch" class="entry-branch">{{ entry.branch }}</span>
      </div>
    </div>

    <!-- 孤儿标记 -->
    <div v-if="entry.isOrphaned" class="orphan-badge">
      <mdui-icon-warning></mdui-icon-warning>
      orphaned
    </div>
  </div>
</template>

<style scoped>
.reflog-entry-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.reflog-entry-item:hover {
  background: var(--mdui-color-surface-container-low);
}

.reflog-entry-item.selected {
  background: var(--mdui-color-secondary-container);
}

.reflog-entry-item.orphaned {
  border: 1px dashed var(--mdui-color-error);
  opacity: 0.8;
}

.entry-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.entry-content {
  flex: 1;
  min-width: 0;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.entry-hash {
  font-family: monospace;
  font-size: 12px;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.entry-message {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}

.entry-type {
  padding: 1px 6px;
  background: var(--mdui-color-surface-variant);
  border-radius: 4px;
}

.entry-branch {
  padding: 1px 6px;
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
  border-radius: 4px;
}

.orphan-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: var(--mdui-color-error);
  padding: 2px 6px;
  background: var(--mdui-color-error-container);
  border-radius: 4px;
}

.orphan-badge mdui-icon-warning {
  font-size: 12px;
}
</style>
