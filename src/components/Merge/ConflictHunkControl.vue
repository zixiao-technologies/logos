<script setup lang="ts">
/**
 * 冲突块控制组件
 * 显示每个冲突块的接受/拒绝按钮
 */

import type { ConflictHunk, ConflictResolution } from '@/types/merge'

// 导入 MDUI 图标
import '@mdui/icons/check.js'
import '@mdui/icons/close.js'
import '@mdui/icons/unfold-more.js'

interface Props {
  hunk: ConflictHunk
  index: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'resolve', resolution: ConflictResolution): void
  (e: 'jump'): void
}>()

// 获取按钮样式
const getButtonVariant = (resolution: ConflictResolution): 'filled' | 'outlined' | 'text' => {
  return props.hunk.resolution === resolution ? 'filled' : 'outlined'
}
</script>

<template>
  <div class="conflict-hunk-control">
    <div class="hunk-header">
      <span class="hunk-label">冲突 #{{ index + 1 }}</span>
      <span class="hunk-location">第 {{ hunk.startLine + 1 }} - {{ hunk.endLine + 1 }} 行</span>
      <mdui-button-icon @click="emit('jump')" title="跳转到冲突">
        <mdui-icon-unfold-more></mdui-icon-unfold-more>
      </mdui-button-icon>
    </div>

    <div class="hunk-actions">
      <mdui-button
        :variant="getButtonVariant('ours')"
        size="small"
        @click="emit('resolve', 'ours')"
      >
        接受本地 (Ours)
      </mdui-button>

      <mdui-button
        :variant="getButtonVariant('theirs')"
        size="small"
        @click="emit('resolve', 'theirs')"
      >
        接受远程 (Theirs)
      </mdui-button>

      <mdui-button
        :variant="getButtonVariant('both')"
        size="small"
        @click="emit('resolve', 'both')"
      >
        接受两者
      </mdui-button>
    </div>

    <div v-if="hunk.resolution !== 'unresolved'" class="resolution-status">
      <mdui-icon-check></mdui-icon-check>
      <span>
        已选择:
        <template v-if="hunk.resolution === 'ours'">本地版本</template>
        <template v-else-if="hunk.resolution === 'theirs'">远程版本</template>
        <template v-else-if="hunk.resolution === 'both'">两者</template>
        <template v-else-if="hunk.resolution === 'custom'">自定义</template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.conflict-hunk-control {
  padding: 12px;
  background: var(--mdui-color-surface-container);
  border-radius: 8px;
  border: 1px solid var(--mdui-color-outline-variant);
}

.hunk-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.hunk-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--mdui-color-error);
}

.hunk-location {
  flex: 1;
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.hunk-header mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}

.hunk-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hunk-actions mdui-button {
  --mdui-comp-button-height: 28px;
  font-size: 12px;
}

.resolution-status {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--mdui-color-outline-variant);
  font-size: 12px;
  color: var(--mdui-color-primary);
}

.resolution-status mdui-icon-check {
  font-size: 16px;
}
</style>
