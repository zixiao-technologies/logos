<script setup lang="ts">
/**
 * Reflog 时间线组件
 */

import type { ReflogEntry, ReflogGroup } from '@/types/reflog'
import ReflogEntryItem from './ReflogEntryItem.vue'

interface Props {
  groups: ReflogGroup[]
  selectedEntry: ReflogEntry | null
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', entry: ReflogEntry): void
  (e: 'loadMore'): void
}>()
</script>

<template>
  <div class="reflog-timeline">
    <div
      v-for="group in groups"
      :key="group.label"
      class="timeline-group"
    >
      <div class="group-header">
        <span class="group-label">{{ group.label }}</span>
        <span class="group-count">{{ group.entries.length }}</span>
      </div>

      <div class="group-entries">
        <ReflogEntryItem
          v-for="entry in group.entries"
          :key="entry.index"
          :entry="entry"
          :selected="selectedEntry?.index === entry.index"
          @click="emit('select', entry)"
        />
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <div class="load-more">
      <mdui-button
        variant="text"
        @click="emit('loadMore')"
        :disabled="loading"
      >
        加载更多
      </mdui-button>
    </div>
  </div>
</template>

<style scoped>
.reflog-timeline {
  padding: 12px;
}

.timeline-group {
  margin-bottom: 16px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  position: sticky;
  top: 0;
  background: var(--mdui-color-surface);
  z-index: 1;
}

.group-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.group-count {
  font-size: 10px;
  color: var(--mdui-color-on-surface-variant);
  padding: 2px 6px;
  background: var(--mdui-color-surface-variant);
  border-radius: 8px;
}

.group-entries {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 12px;
  border-left: 2px solid var(--mdui-color-outline-variant);
  margin-left: 16px;
}

.load-more {
  display: flex;
  justify-content: center;
  padding: 16px;
}
</style>
