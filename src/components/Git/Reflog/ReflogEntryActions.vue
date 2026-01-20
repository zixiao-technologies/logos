<script setup lang="ts">
/**
 * ReflogEntryActions - Reflog 条目操作面板
 * 提供恢复和导航操作
 */

import type { ReflogEntry } from '@/types/reflog'

import '@mdui/icons/call-made.js'
import '@mdui/icons/content-copy.js'
import '@mdui/icons/alt-route.js'
import '@mdui/icons/restart-alt.js'

const props = defineProps<{
  entry: ReflogEntry
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'checkout', entry: ReflogEntry): void
  (e: 'cherry-pick', entry: ReflogEntry): void
  (e: 'create-branch', entry: ReflogEntry): void
  (e: 'reset', entry: ReflogEntry, mode: 'soft' | 'mixed' | 'hard'): void
  (e: 'copy-hash', hash: string): void
}>()

// 复制 Hash
const copyHash = () => {
  navigator.clipboard.writeText(props.entry.hash)
  emit('copy-hash', props.entry.hash)
}
</script>

<template>
  <div class="reflog-entry-actions">
    <div class="actions-header">
      <span class="hash">{{ entry.shortHash }}</span>
      <span class="message">{{ entry.message }}</span>
    </div>

    <div class="actions-grid">
      <mdui-button
        variant="tonal"
        @click="emit('checkout', entry)"
        :disabled="isLoading"
      >
        <mdui-icon-call-made slot="icon"></mdui-icon-call-made>
        Checkout
      </mdui-button>

      <mdui-button
        variant="tonal"
        @click="emit('cherry-pick', entry)"
        :disabled="isLoading"
      >
        <mdui-icon-content-copy slot="icon"></mdui-icon-content-copy>
        Cherry-pick
      </mdui-button>

      <mdui-button
        variant="tonal"
        @click="emit('create-branch', entry)"
        :disabled="isLoading"
      >
        <mdui-icon-alt-route slot="icon"></mdui-icon-alt-route>
        创建分支
      </mdui-button>

      <mdui-dropdown>
        <mdui-button slot="trigger" variant="tonal" :disabled="isLoading">
          <mdui-icon-restart-alt slot="icon"></mdui-icon-restart-alt>
          Reset
        </mdui-button>
        <mdui-menu>
          <mdui-menu-item @click="emit('reset', entry, 'soft')">
            Soft (保留更改)
          </mdui-menu-item>
          <mdui-menu-item @click="emit('reset', entry, 'mixed')">
            Mixed (保留工作目录)
          </mdui-menu-item>
          <mdui-menu-item @click="emit('reset', entry, 'hard')">
            Hard (丢弃所有更改)
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
    </div>

    <div class="secondary-actions">
      <mdui-button variant="text" @click="copyHash">
        复制完整 Hash
      </mdui-button>
    </div>
  </div>
</template>

<style scoped>
.reflog-entry-actions {
  padding: 16px;
  background: var(--mdui-color-surface-container-low);
  border-top: 1px solid var(--mdui-color-outline-variant);
}

.actions-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.actions-header .hash {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--mdui-color-primary);
}

.actions-header .message {
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.actions-grid mdui-button {
  --mdui-comp-button-container-height: 36px;
  font-size: 13px;
}

.secondary-actions {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}
</style>
