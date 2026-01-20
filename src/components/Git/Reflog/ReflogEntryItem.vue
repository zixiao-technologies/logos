<script setup lang="ts">
/**
 * ReflogEntryItem - 单个 Reflog 条目
 */

import { computed } from 'vue'
import type { ReflogEntry, ReflogOperationType } from '@/types/reflog'
import { REFLOG_OPERATION_ICONS, REFLOG_OPERATION_COLORS } from '@/types/reflog'

// 动态导入图标
import '@mdui/icons/circle.js'
import '@mdui/icons/arrow-forward.js'
import '@mdui/icons/arrow-back.js'
import '@mdui/icons/merge-type.js'
import '@mdui/icons/swap-vert.js'
import '@mdui/icons/diamond.js'
import '@mdui/icons/cloud-download.js'
import '@mdui/icons/cloud-upload.js'
import '@mdui/icons/inventory-2.js'
import '@mdui/icons/content-copy.js'
import '@mdui/icons/alt-route.js'
import '@mdui/icons/more-horiz.js'
import '@mdui/icons/warning.js'

const props = defineProps<{
  entry: ReflogEntry
  isSelected: boolean
  isExpanded: boolean
}>()

const emit = defineEmits<{
  (e: 'select', entry: ReflogEntry): void
  (e: 'toggle-expand', index: number): void
}>()

// 获取图标组件名
const iconName = computed(() => {
  const icon = REFLOG_OPERATION_ICONS[props.entry.operationType]
  return `mdui-icon-${icon.replace(/_/g, '-')}`
})

// 获取颜色
const iconColor = computed(() => {
  return REFLOG_OPERATION_COLORS[props.entry.operationType]
})

// 操作类型显示名
const operationLabel = computed(() => {
  const labels: Record<ReflogOperationType, string> = {
    'commit': '提交',
    'checkout': '切换',
    'reset': '重置',
    'merge': '合并',
    'rebase': '变基',
    'cherry-pick': '摘取',
    'pull': '拉取',
    'push': '推送',
    'stash': '存储',
    'clone': '克隆',
    'branch': '分支',
    'other': '其他'
  }
  return labels[props.entry.operationType]
})
</script>

<template>
  <div
    class="reflog-entry-item"
    :class="{
      selected: isSelected,
      orphaned: entry.isOrphaned,
      expanded: isExpanded
    }"
    @click="emit('select', entry)"
  >
    <!-- 时间线连接 -->
    <div class="timeline">
      <div class="timeline-line top"></div>
      <div
        class="timeline-dot"
        :style="{ backgroundColor: iconColor }"
      ></div>
      <div class="timeline-line bottom"></div>
    </div>

    <!-- 内容区 -->
    <div class="entry-content">
      <!-- 主信息行 -->
      <div class="main-row">
        <!-- 操作图标和类型 -->
        <div class="operation-badge" :style="{ borderColor: iconColor }">
          <component :is="iconName" :style="{ color: iconColor }"></component>
          <span class="operation-label">{{ operationLabel }}</span>
        </div>

        <!-- 提交 Hash -->
        <span class="commit-hash">{{ entry.shortHash }}</span>

        <!-- 消息 -->
        <span class="message">{{ entry.message }}</span>

        <!-- 孤儿标记 -->
        <span v-if="entry.isOrphaned" class="orphan-badge">
          <mdui-icon-warning></mdui-icon-warning>
          孤儿
        </span>

        <!-- 时间 -->
        <span class="relative-time">{{ entry.relativeDate }}</span>
      </div>

      <!-- 展开的详情 -->
      <div v-if="isExpanded" class="detail-row">
        <div class="detail-item">
          <span class="detail-label">完整 Hash:</span>
          <span class="detail-value monospace">{{ entry.hash }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">操作:</span>
          <span class="detail-value">{{ entry.action }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">执行者:</span>
          <span class="detail-value">{{ entry.author }} &lt;{{ entry.authorEmail }}&gt;</span>
        </div>
        <div v-if="entry.previousHash" class="detail-item">
          <span class="detail-label">前一个:</span>
          <span class="detail-value monospace">{{ entry.previousHash?.substring(0, 7) }}</span>
        </div>
        <div v-if="entry.branch" class="detail-item">
          <span class="detail-label">分支:</span>
          <span class="detail-value">{{ entry.branch }}</span>
        </div>
      </div>
    </div>

    <!-- 展开按钮 -->
    <mdui-button-icon
      class="expand-btn"
      @click.stop="emit('toggle-expand', entry.index)"
      :title="isExpanded ? '收起' : '展开'"
    >
      <mdui-icon-keyboard-arrow-down
        :style="{ transform: isExpanded ? 'rotate(180deg)' : 'none' }"
      ></mdui-icon-keyboard-arrow-down>
    </mdui-button-icon>
  </div>
</template>

<style scoped>
.reflog-entry-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 16px 8px 0;
  cursor: pointer;
  transition: background-color 0.15s;
}

.reflog-entry-item:hover {
  background: var(--mdui-color-surface-container-low);
}

.reflog-entry-item.selected {
  background: var(--mdui-color-surface-container);
}

.reflog-entry-item.orphaned {
  opacity: 0.8;
}

.reflog-entry-item.orphaned .entry-content {
  border-left: 2px dashed var(--mdui-color-error);
  padding-left: 8px;
  margin-left: -10px;
}

/* 时间线 */
.timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  padding-top: 4px;
}

.timeline-line {
  width: 2px;
  background: var(--mdui-color-outline-variant);
}

.timeline-line.top {
  height: 8px;
}

.timeline-line.bottom {
  flex: 1;
  min-height: 16px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 内容 */
.entry-content {
  flex: 1;
  min-width: 0;
}

.main-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 28px;
}

.operation-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: var(--mdui-color-surface-container);
  border: 1px solid;
  border-radius: 12px;
  flex-shrink: 0;
}

.operation-badge mdui-icon-circle,
.operation-badge mdui-icon-arrow-forward,
.operation-badge mdui-icon-arrow-back,
.operation-badge mdui-icon-merge-type,
.operation-badge mdui-icon-swap-vert,
.operation-badge mdui-icon-diamond,
.operation-badge mdui-icon-cloud-download,
.operation-badge mdui-icon-cloud-upload,
.operation-badge mdui-icon-inventory-2,
.operation-badge mdui-icon-content-copy,
.operation-badge mdui-icon-alt-route,
.operation-badge mdui-icon-more-horiz {
  font-size: 14px;
}

.operation-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--mdui-color-on-surface);
}

.commit-hash {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.message {
  flex: 1;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.orphan-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  border-radius: 8px;
  font-size: 10px;
  flex-shrink: 0;
}

.orphan-badge mdui-icon-warning {
  font-size: 12px;
}

.relative-time {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  flex-shrink: 0;
}

/* 详情行 */
.detail-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
  padding: 10px;
  background: var(--mdui-color-surface-container-low);
  border-radius: 6px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-label {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  min-width: 70px;
}

.detail-value {
  font-size: 12px;
  color: var(--mdui-color-on-surface);
}

.detail-value.monospace {
  font-family: 'JetBrains Mono', monospace;
}

/* 展开按钮 */
.expand-btn {
  --mdui-comp-button-icon-size: 24px;
  opacity: 0;
  transition: opacity 0.15s;
}

.reflog-entry-item:hover .expand-btn,
.reflog-entry-item.expanded .expand-btn {
  opacity: 1;
}

.expand-btn mdui-icon-keyboard-arrow-down {
  transition: transform 0.2s;
}
</style>
