<script setup lang="ts">
/**
 * Reflog 条目详情面板
 */

import type { ReflogEntry } from '@/types/reflog'

// 导入 MDUI 图标
import '@mdui/icons/close.js'
import '@mdui/icons/checkout.js'
import '@mdui/icons/content-copy.js'
import '@mdui/icons/alt-route.js'
import '@mdui/icons/undo.js'

interface Props {
  entry: ReflogEntry
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'action', action: string, entry: ReflogEntry): void
}>()
</script>

<template>
  <aside class="reflog-entry-details">
    <div class="details-header">
      <span class="hash">{{ entry.shortHash }}</span>
      <mdui-button-icon @click="emit('close')">
        <mdui-icon-close></mdui-icon-close>
      </mdui-button-icon>
    </div>

    <div class="details-content">
      <!-- 基本信息 -->
      <div class="info-section">
        <div class="info-row">
          <span class="label">操作</span>
          <span class="value">{{ entry.operationType }}</span>
        </div>
        <div class="info-row">
          <span class="label">作者</span>
          <span class="value">{{ entry.author }}</span>
        </div>
        <div class="info-row">
          <span class="label">时间</span>
          <span class="value">{{ new Date(entry.date).toLocaleString() }}</span>
        </div>
        <div v-if="entry.branch" class="info-row">
          <span class="label">分支</span>
          <span class="value">{{ entry.branch }}</span>
        </div>
      </div>

      <!-- 消息 -->
      <div class="message-section">
        <span class="label">消息</span>
        <p class="message">{{ entry.message }}</p>
      </div>

      <!-- 完整 hash -->
      <div class="hash-section">
        <span class="label">完整 Hash</span>
        <code class="full-hash">{{ entry.hash }}</code>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="details-actions">
      <mdui-button
        variant="tonal"
        @click="emit('action', 'checkout', entry)"
      >
        <mdui-icon-checkout slot="icon"></mdui-icon-checkout>
        Checkout
      </mdui-button>

      <mdui-button
        variant="tonal"
        @click="emit('action', 'cherryPick', entry)"
      >
        <mdui-icon-content-copy slot="icon"></mdui-icon-content-copy>
        Cherry-pick
      </mdui-button>

      <mdui-button
        variant="tonal"
        @click="emit('action', 'createBranch', entry)"
      >
        <mdui-icon-alt-route slot="icon"></mdui-icon-alt-route>
        Create Branch
      </mdui-button>

      <mdui-dropdown>
        <mdui-button slot="trigger" variant="tonal">
          <mdui-icon-undo slot="icon"></mdui-icon-undo>
          Reset
        </mdui-button>
        <mdui-menu>
          <mdui-menu-item @click="emit('action', 'resetSoft', entry)">
            Soft (保留更改)
          </mdui-menu-item>
          <mdui-menu-item @click="emit('action', 'resetMixed', entry)">
            Mixed (取消暂存)
          </mdui-menu-item>
          <mdui-menu-item @click="emit('action', 'resetHard', entry)">
            Hard (丢弃更改)
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
    </div>
  </aside>
</template>

<style scoped>
.reflog-entry-details {
  width: 320px;
  display: flex;
  flex-direction: column;
  background: var(--mdui-color-surface-container-low);
  border-left: 1px solid var(--mdui-color-outline-variant);
}

.details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.details-header .hash {
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--mdui-color-primary);
}

.details-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  min-width: 60px;
}

.value {
  font-size: 13px;
}

.message-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  margin: 0;
  font-size: 13px;
  padding: 8px;
  background: var(--mdui-color-surface);
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
}

.hash-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-hash {
  font-family: monospace;
  font-size: 11px;
  padding: 8px;
  background: var(--mdui-color-surface);
  border-radius: 8px;
  word-break: break-all;
}

.details-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--mdui-color-outline-variant);
}

.details-actions mdui-button {
  --mdui-comp-button-height: 32px;
  font-size: 12px;
}
</style>
