<script setup lang="ts">
/**
 * RebaseCommitList - 可拖拽的 Rebase 提交列表
 */

import { ref } from 'vue'
import type { RebaseCommitAction, RebaseAction } from '@/types/rebase'
import RebaseCommitItem from './RebaseCommitItem.vue'

defineProps<{
  commits: RebaseCommitAction[]
}>()

const emit = defineEmits<{
  (e: 'reorder', fromIndex: number, toIndex: number): void
  (e: 'action-change', hash: string, action: RebaseAction): void
  (e: 'message-change', hash: string, message: string): void
}>()

// 拖拽状态
const dragIndex = ref<number | null>(null)
const dropTargetIndex = ref<number | null>(null)

const handleDragStart = (index: number) => {
  dragIndex.value = index
}

const handleDragEnd = () => {
  dragIndex.value = null
  dropTargetIndex.value = null
}

const handleDragOver = (index: number) => {
  if (dragIndex.value !== null && dragIndex.value !== index) {
    dropTargetIndex.value = index
  }
}

const handleDrop = (index: number) => {
  if (dragIndex.value !== null && dragIndex.value !== index) {
    emit('reorder', dragIndex.value, index)
  }
  dragIndex.value = null
  dropTargetIndex.value = null
}

const handleActionChange = (hash: string, action: RebaseAction) => {
  emit('action-change', hash, action)
}

const handleMessageChange = (hash: string, message: string) => {
  emit('message-change', hash, message)
}
</script>

<template>
  <div class="rebase-commit-list">
    <div class="list-header">
      <span class="col-action">操作</span>
      <span class="col-commit">提交</span>
      <span class="col-meta">信息</span>
    </div>

    <div class="list-body">
      <RebaseCommitItem
        v-for="(commit, index) in commits"
        :key="commit.hash"
        :commit="commit"
        :index="index"
        :is-dragging="dragIndex === index"
        :is-drop-target="dropTargetIndex === index"
        @drag-start="handleDragStart"
        @drag-end="handleDragEnd"
        @drag-over="handleDragOver"
        @drop="handleDrop"
        @action-change="handleActionChange"
        @message-change="handleMessageChange"
      />
    </div>

    <div v-if="commits.length === 0" class="empty-state">
      没有可用于 rebase 的提交
    </div>
  </div>
</template>

<style scoped>
.rebase-commit-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.list-header {
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  padding-left: 48px; /* Account for drag handle */
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  background: var(--mdui-color-surface-container);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.col-action {
  width: 80px;
  flex-shrink: 0;
}

.col-commit {
  flex: 1;
}

.col-meta {
  width: 120px;
  text-align: right;
  flex-shrink: 0;
}

.list-body {
  flex: 1;
  overflow-y: auto;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--mdui-color-on-surface-variant);
  font-size: 14px;
}
</style>
