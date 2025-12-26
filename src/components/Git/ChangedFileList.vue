<script setup lang="ts">
/**
 * 变更文件列表组件
 */

import { computed } from 'vue'
import type { GitFile } from '@/types'
import ChangedFileItem from './ChangedFileItem.vue'

// 导入 MDUI 图标
import '@mdui/icons/chevron-right.js'
import '@mdui/icons/add.js'
import '@mdui/icons/remove.js'

const props = defineProps<{
  /** 标题 */
  title: string
  /** 文件列表 */
  files: GitFile[]
  /** 是否可以暂存 */
  canStage?: boolean
  /** 是否可以取消暂存 */
  canUnstage?: boolean
  /** 是否展开 */
  expanded?: boolean
}>()

const emit = defineEmits<{
  /** 暂存文件 */
  stage: [path: string]
  /** 取消暂存文件 */
  unstage: [path: string]
  /** 暂存全部 */
  stageAll: []
  /** 取消暂存全部 */
  unstageAll: []
  /** 放弃更改 */
  discard: [path: string]
  /** 查看差异 */
  diff: [path: string, staged: boolean]
  /** 打开文件 */
  open: [path: string]
  /** 切换展开 */
  toggle: []
}>()

const isExpanded = computed(() => props.expanded ?? true)
const fileCount = computed(() => props.files.length)

const handleToggle = () => {
  emit('toggle')
}

const handleStageAll = (e: Event) => {
  e.stopPropagation()
  emit('stageAll')
}

const handleUnstageAll = (e: Event) => {
  e.stopPropagation()
  emit('unstageAll')
}
</script>

<template>
  <div class="changed-file-list" v-if="files.length > 0">
    <!-- 标题栏 -->
    <div class="list-header" @click="handleToggle">
      <span class="arrow" :class="{ expanded: isExpanded }">
        <mdui-icon-chevron-right></mdui-icon-chevron-right>
      </span>
      <span class="title">{{ title }}</span>
      <span class="count">{{ fileCount }}</span>
      <div class="header-actions">
        <!-- 暂存全部 -->
        <mdui-button-icon
          v-if="canStage"
          @click="handleStageAll"
          title="暂存全部"
        >
          <mdui-icon-add></mdui-icon-add>
        </mdui-button-icon>
        <!-- 取消暂存全部 -->
        <mdui-button-icon
          v-if="canUnstage"
          @click="handleUnstageAll"
          title="取消暂存全部"
        >
          <mdui-icon-remove></mdui-icon-remove>
        </mdui-button-icon>
      </div>
    </div>

    <!-- 文件列表 -->
    <div v-if="isExpanded" class="file-list">
      <ChangedFileItem
        v-for="file in files"
        :key="file.path"
        :file="file"
        :can-stage="canStage"
        :can-unstage="canUnstage"
        @stage="emit('stage', $event)"
        @unstage="emit('unstage', $event)"
        @discard="emit('discard', $event)"
        @diff="emit('diff', $event, file.staged)"
        @open="emit('open', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.changed-file-list {
  margin-bottom: 8px;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
}

.list-header:hover {
  background: var(--mdui-color-surface-container-high);
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.15s ease;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.arrow mdui-icon-chevron-right {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.title {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.count {
  font-size: 11px;
  background: var(--mdui-color-surface-container-high);
  color: var(--mdui-color-on-surface-variant);
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 4px;
}

.header-actions {
  margin-left: auto;
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.1s;
}

.list-header:hover .header-actions {
  opacity: 1;
}

.header-actions mdui-button-icon {
  --mdui-comp-button-icon-size: 24px;
}

.file-list {
  padding-left: 8px;
}
</style>
