<script setup lang="ts">
/**
 * CherryPickDialog - Cherry-pick 对话框
 * 提供预览和选项配置
 */

import { ref, computed, watch } from 'vue'
import CherryPickPreview from './CherryPickPreview.vue'

import '@mdui/icons/content-copy.js'

const props = defineProps<{
  open: boolean
  commits: Array<{
    hash: string
    shortHash: string
    message: string
    author: string
    date: string
  }>
  repoPath: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', options: { noCommit: boolean; recordOrigin: boolean }): void
}>()

// 选项
const noCommit = ref(false)
const recordOrigin = ref(true)

// 预览数据
const previewFiles = ref<Array<{
  path: string
  additions: number
  deletions: number
  status: 'added' | 'modified' | 'deleted' | 'renamed'
}>>([])
const isLoadingPreview = ref(false)

// 单个提交时加载预览
watch([() => props.open, () => props.commits], async ([open, commits]) => {
  if (open && commits.length === 1 && props.repoPath) {
    isLoadingPreview.value = true
    try {
      const preview = await window.electronAPI.git.cherryPickPreview(
        props.repoPath,
        commits[0].hash
      )
      // 转换文件格式，添加默认的 additions/deletions
      previewFiles.value = (preview.files || []).map(f => ({
        path: f.path,
        additions: 0,
        deletions: 0,
        status: f.status === 'copied' ? 'added' : f.status
      })) as typeof previewFiles.value
    } catch {
      previewFiles.value = []
    } finally {
      isLoadingPreview.value = false
    }
  } else {
    previewFiles.value = []
  }
}, { immediate: true })

// 确认
const handleConfirm = () => {
  emit('confirm', {
    noCommit: noCommit.value,
    recordOrigin: recordOrigin.value
  })
}

// 关闭
const handleClose = () => {
  emit('close')
}

// 是否多选
const isMultiple = computed(() => props.commits.length > 1)
</script>

<template>
  <mdui-dialog :open="open" @closed="handleClose">
    <span slot="icon">
      <mdui-icon-content-copy></mdui-icon-content-copy>
    </span>
    <span slot="headline">
      Cherry-pick {{ isMultiple ? `${commits.length} 个提交` : '提交' }}
    </span>

    <div slot="description" class="dialog-content">
      <!-- 预览 -->
      <CherryPickPreview
        :commits="commits"
        :files="previewFiles"
        :is-loading="isLoadingPreview"
      />

      <!-- 选项 -->
      <div class="options-section">
        <div class="section-header">选项</div>

        <label class="option-item">
          <mdui-checkbox v-model="noCommit"></mdui-checkbox>
          <div class="option-info">
            <span class="option-label">不自动提交 (-n)</span>
            <span class="option-desc">将更改添加到暂存区，但不创建提交</span>
          </div>
        </label>

        <label class="option-item">
          <mdui-checkbox v-model="recordOrigin"></mdui-checkbox>
          <div class="option-info">
            <span class="option-label">记录来源 (-x)</span>
            <span class="option-desc">在提交消息中附加原始提交的 hash</span>
          </div>
        </label>
      </div>

      <!-- 警告 -->
      <div v-if="isMultiple" class="warning-box">
        <strong>注意:</strong> 多个提交将按顺序依次 cherry-pick。
        如果某个提交产生冲突，操作将暂停等待解决。
      </div>
    </div>

    <mdui-button slot="action" variant="text" @click="handleClose">
      取消
    </mdui-button>
    <mdui-button slot="action" @click="handleConfirm">
      Cherry-pick
    </mdui-button>
  </mdui-dialog>
</template>

<style scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
  max-width: 600px;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  margin-bottom: 4px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 12px;
  background: var(--mdui-color-surface-container-low);
  border-radius: 6px;
  cursor: pointer;
}

.option-item:hover {
  background: var(--mdui-color-surface-container);
}

.option-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-size: 13px;
  color: var(--mdui-color-on-surface);
}

.option-desc {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}

.warning-box {
  padding: 12px;
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
  border-radius: 6px;
  font-size: 12px;
}

.warning-box strong {
  font-weight: 600;
}
</style>
