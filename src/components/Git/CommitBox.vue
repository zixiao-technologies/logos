<script setup lang="ts">
/**
 * 提交信息输入框组件
 */

import { computed } from 'vue'

// 导入 MDUI 图标
import '@mdui/icons/check.js'

const props = defineProps<{
  /** 提交信息 */
  message: string
  /** 是否可以提交 */
  canCommit: boolean
  /** 是否正在加载 */
  loading?: boolean
}>()

const emit = defineEmits<{
  /** 更新提交信息 */
  'update:message': [value: string]
  /** 提交 */
  commit: []
}>()

const messageValue = computed({
  get: () => props.message,
  set: (value: string) => emit('update:message', value)
})

const handleCommit = () => {
  if (props.canCommit && !props.loading) {
    emit('commit')
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  // Ctrl/Cmd + Enter 提交
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    handleCommit()
  }
}
</script>

<template>
  <div class="commit-box">
    <!-- 提交信息输入 -->
    <textarea
      v-model="messageValue"
      class="commit-input"
      placeholder="提交信息 (Ctrl+Enter 提交)"
      @keydown="handleKeydown"
      :disabled="loading"
    ></textarea>

    <!-- 提交按钮 -->
    <mdui-button
      class="commit-button"
      :disabled="!canCommit || loading"
      @click="handleCommit"
    >
      <mdui-icon-check slot="icon"></mdui-icon-check>
      {{ loading ? '提交中...' : '提交' }}
    </mdui-button>
  </div>
</template>

<style scoped>
.commit-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

.commit-input {
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  font-size: 13px;
  font-family: inherit;
  color: var(--mdui-color-on-surface);
  background: var(--mdui-color-surface-container);
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 8px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.commit-input:focus {
  border-color: var(--mdui-color-primary);
}

.commit-input::placeholder {
  color: var(--mdui-color-on-surface-variant);
}

.commit-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.commit-button {
  width: 100%;
}
</style>
