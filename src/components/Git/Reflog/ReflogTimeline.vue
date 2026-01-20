<script setup lang="ts">
/**
 * ReflogTimeline - Reflog 时间线视图
 * 按日期分组显示
 */

import type { ReflogEntry, ReflogGroup } from '@/types/reflog'
import ReflogEntryItem from './ReflogEntryItem.vue'

import '@mdui/icons/keyboard-arrow-down.js'

defineProps<{
  groups: ReflogGroup[]
  selectedEntry: ReflogEntry | null
  expandedEntries: number[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'select', entry: ReflogEntry): void
  (e: 'toggle-expand', index: number): void
  (e: 'load-more'): void
}>()
</script>

<template>
  <div class="reflog-timeline">
    <!-- 加载中 -->
    <div v-if="isLoading && groups.length === 0" class="loading-state">
      <mdui-circular-progress></mdui-circular-progress>
      <span>加载中...</span>
    </div>

    <!-- 空状态 -->
    <div v-else-if="groups.length === 0" class="empty-state">
      <span>没有找到 reflog 记录</span>
    </div>

    <!-- 时间线 -->
    <template v-else>
      <div
        v-for="group in groups"
        :key="group.label"
        class="timeline-group"
      >
        <!-- 日期标题 -->
        <div class="group-header">
          <span class="group-label">{{ group.label }}</span>
          <span class="group-count">{{ group.entries.length }}</span>
        </div>

        <!-- 条目列表 -->
        <div class="group-entries">
          <ReflogEntryItem
            v-for="entry in group.entries"
            :key="entry.index"
            :entry="entry"
            :is-selected="selectedEntry?.index === entry.index"
            :is-expanded="expandedEntries.includes(entry.index)"
            @select="emit('select', entry)"
            @toggle-expand="emit('toggle-expand', entry.index)"
          />
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more">
        <mdui-button variant="text" @click="emit('load-more')" :disabled="isLoading">
          加载更多
        </mdui-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.reflog-timeline {
  flex: 1;
  overflow-y: auto;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 200px;
  color: var(--mdui-color-on-surface-variant);
  font-size: 14px;
}

.timeline-group {
  margin-bottom: 8px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--mdui-color-surface-container-low);
  position: sticky;
  top: 0;
  z-index: 1;
}

.group-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--mdui-color-on-surface);
}

.group-count {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  background: var(--mdui-color-surface-container);
  padding: 1px 6px;
  border-radius: 8px;
}

.group-entries {
  background: var(--mdui-color-surface);
}

.load-more {
  display: flex;
  justify-content: center;
  padding: 16px;
}
</style>
