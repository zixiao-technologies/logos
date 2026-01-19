<script setup lang="ts">
/**
 * Cherry-pick 对话框组件
 * 显示选中的提交预览和 cherry-pick 选项
 */

import { ref, computed, watch } from 'vue'
import type { GraphCommit } from '@/types/gitGraph'

// 导入 MDUI 图标
import '@mdui/icons/content-copy.js'
import '@mdui/icons/info.js'
import '@mdui/icons/warning.js'

interface Props {
  open: boolean
  commits: GraphCommit[]
  repoPath: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'execute', options: { noCommit: boolean; recordOrigin: boolean }): void
  (e: 'close'): void
}>()

// 选项
const noCommit = ref(false)
const recordOrigin = ref(true)

// 预览数据
const previewData = ref<{
  files: Array<{
    path: string
    status: string
    oldPath?: string
  }>
  stats: { additions: number; deletions: number; filesChanged: number }
} | null>(null)
const isLoadingPreview = ref(false)
const previewError = ref<string | null>(null)

// 计算总统计
const totalStats = computed(() => {
  if (!previewData.value) return { additions: 0, deletions: 0, filesChanged: 0 }
  return previewData.value.stats
})

// 加载预览
const loadPreview = async () => {
  if (props.commits.length === 0 || !props.repoPath) return

  isLoadingPreview.value = true
  previewError.value = null

  try {
    // 只预览第一个 commit
    const result = await window.electronAPI.git.cherryPickPreview(
      props.repoPath,
      props.commits[0].hash
    )
    previewData.value = result
  } catch (error) {
    previewError.value = (error as Error).message
  } finally {
    isLoadingPreview.value = false
  }
}

// 监听打开状态
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    loadPreview()
  } else {
    previewData.value = null
    previewError.value = null
  }
})

// 执行 cherry-pick
const execute = () => {
  emit('execute', {
    noCommit: noCommit.value,
    recordOrigin: recordOrigin.value
  })
}

// 关闭对话框
const close = () => {
  emit('update:open', false)
  emit('close')
}

// 获取状态颜色
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'added': return 'var(--mdui-color-primary)'
    case 'modified': return 'var(--mdui-color-tertiary)'
    case 'deleted': return 'var(--mdui-color-error)'
    case 'renamed': return '#9c27b0'
    default: return 'var(--mdui-color-on-surface)'
  }
}

// 获取状态标签
const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'added': return 'A'
    case 'modified': return 'M'
    case 'deleted': return 'D'
    case 'renamed': return 'R'
    case 'copied': return 'C'
    default: return '?'
  }
}
</script>

<template>
  <mdui-dialog
    :open="open"
    @closed="close"
    class="cherry-pick-dialog"
  >
    <span slot="headline">
      <mdui-icon-content-copy></mdui-icon-content-copy>
      Cherry-pick {{ commits.length }} commit{{ commits.length > 1 ? 's' : '' }}
    </span>

    <div slot="description" class="dialog-content">
      <!-- 选中的提交列表 -->
      <div class="commits-section">
        <h4>选中的提交</h4>
        <div class="commit-list">
          <div v-for="commit in commits" :key="commit.hash" class="commit-item">
            <span class="commit-hash">{{ commit.shortHash }}</span>
            <span class="commit-message">{{ commit.message }}</span>
            <span class="commit-author">{{ commit.author.name }}</span>
          </div>
        </div>
      </div>

      <!-- 预览 -->
      <div class="preview-section">
        <h4>受影响的文件</h4>

        <div v-if="isLoadingPreview" class="loading">
          <mdui-circular-progress></mdui-circular-progress>
        </div>

        <div v-else-if="previewError" class="error">
          <mdui-icon-warning></mdui-icon-warning>
          {{ previewError }}
        </div>

        <template v-else-if="previewData">
          <div class="stats">
            <span class="stat additions">+{{ totalStats.additions }}</span>
            <span class="stat deletions">-{{ totalStats.deletions }}</span>
            <span class="stat files">{{ totalStats.filesChanged }} files</span>
          </div>

          <div class="file-list">
            <div
              v-for="file in previewData.files"
              :key="file.path"
              class="file-item"
            >
              <span
                class="status-badge"
                :style="{ color: getStatusColor(file.status) }"
              >
                {{ getStatusLabel(file.status) }}
              </span>
              <span class="file-path">{{ file.path }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- 选项 -->
      <div class="options-section">
        <h4>选项</h4>

        <mdui-checkbox v-model="noCommit">
          不自动提交 (-n)
          <span class="option-desc">将更改应用到工作目录但不创建提交</span>
        </mdui-checkbox>

        <mdui-checkbox v-model="recordOrigin">
          记录来源 (-x)
          <span class="option-desc">在提交信息中添加 "(cherry picked from commit ...)"</span>
        </mdui-checkbox>
      </div>

      <!-- 警告 -->
      <div v-if="commits.length > 1" class="warning">
        <mdui-icon-info></mdui-icon-info>
        <span>多个提交将按顺序依次 cherry-pick。如果发生冲突,将在第一个冲突处暂停。</span>
      </div>
    </div>

    <mdui-button slot="action" variant="text" @click="close">
      取消
    </mdui-button>
    <mdui-button slot="action" variant="filled" @click="execute">
      Cherry-pick
    </mdui-button>
  </mdui-dialog>
</template>

<style scoped>
.cherry-pick-dialog {
  --mdui-dialog-min-width: 500px;
  --mdui-dialog-max-width: 700px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-content h4 {
  margin: 0 0 8px 0;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.commits-section .commit-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 120px;
  overflow-y: auto;
}

.commit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--mdui-color-surface-variant);
  border-radius: 4px;
  font-size: 12px;
}

.commit-hash {
  font-family: monospace;
  color: var(--mdui-color-primary);
  flex-shrink: 0;
}

.commit-message {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commit-author {
  color: var(--mdui-color-on-surface-variant);
  flex-shrink: 0;
}

.preview-section .loading,
.preview-section .error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  color: var(--mdui-color-on-surface-variant);
}

.preview-section .error {
  color: var(--mdui-color-error);
}

.stats {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 12px;
}

.stat.additions {
  color: var(--mdui-color-primary);
}

.stat.deletions {
  color: var(--mdui-color-error);
}

.stat.files {
  color: var(--mdui-color-on-surface-variant);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  background: var(--mdui-color-surface-container);
  border-radius: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-family: monospace;
}

.status-badge {
  font-weight: 600;
  width: 16px;
  text-align: center;
}

.file-path {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.options-section mdui-checkbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.option-desc {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  margin-left: 32px;
}

.warning {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
  border-radius: 8px;
  font-size: 12px;
}

.warning mdui-icon-info {
  flex-shrink: 0;
  font-size: 18px;
}
</style>
