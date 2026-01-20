<script setup lang="ts">
/**
 * GitAdvancedPanel - Git 高级功能面板
 * 提供快捷入口到 Merge、Rebase、Reflog
 */

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMergeStore } from '@/stores/merge'
import { useRebaseStore } from '@/stores/rebase'

import '@mdui/icons/call-merge.js'
import '@mdui/icons/swap-vert.js'
import '@mdui/icons/history.js'
import '@mdui/icons/content-copy.js'
import '@mdui/icons/warning.js'
import '@mdui/icons/check-circle.js'

const router = useRouter()
const mergeStore = useMergeStore()
const rebaseStore = useRebaseStore()

// 展开状态
const isExpanded = ref(true)

// 状态计算
const hasMergeConflict = computed(() => mergeStore.isInMerge && mergeStore.hasConflicts)
const isInRebase = computed(() => rebaseStore.isInRebase)
const hasRebaseConflict = computed(() => rebaseStore.hasConflicts)

// 导航
const goToMerge = () => router.push('/merge')
const goToRebase = () => router.push('/rebase')
const goToReflog = () => router.push('/reflog')
</script>

<template>
  <div class="git-advanced-panel">
    <!-- 标题 -->
    <div class="panel-header" @click="isExpanded = !isExpanded">
      <span class="title">高级 Git 操作</span>
      <mdui-icon-keyboard-arrow-down
        :style="{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }"
      ></mdui-icon-keyboard-arrow-down>
    </div>

    <div v-if="isExpanded" class="panel-content">
      <!-- 当前状态 -->
      <div v-if="hasMergeConflict || isInRebase" class="status-section">
        <!-- 合并冲突状态 -->
        <div v-if="hasMergeConflict" class="status-item conflict" @click="goToMerge">
          <mdui-icon-warning></mdui-icon-warning>
          <div class="status-info">
            <span class="status-title">合并冲突</span>
            <span class="status-desc">{{ mergeStore.unresolvedCount }} 个文件需要解决</span>
          </div>
          <mdui-button variant="filled" size="small">
            解决冲突
          </mdui-button>
        </div>

        <!-- Rebase 状态 -->
        <div v-if="isInRebase" class="status-item" :class="{ conflict: hasRebaseConflict }" @click="goToRebase">
          <mdui-icon-swap-vert></mdui-icon-swap-vert>
          <div class="status-info">
            <span class="status-title">Rebase 进行中</span>
            <span class="status-desc">
              步骤 {{ rebaseStore.editor.status?.currentStep }}/{{ rebaseStore.editor.status?.totalSteps }}
              <template v-if="hasRebaseConflict"> - 有冲突</template>
            </span>
          </div>
          <mdui-button variant="filled" size="small">
            {{ hasRebaseConflict ? '解决冲突' : '继续' }}
          </mdui-button>
        </div>
      </div>

      <!-- 操作列表 -->
      <div class="actions-list">
        <div class="action-item" @click="goToMerge" :disabled="hasMergeConflict">
          <mdui-icon-call-merge></mdui-icon-call-merge>
          <span class="action-label">合并分支</span>
          <span class="action-shortcut">解决冲突</span>
        </div>

        <div class="action-item" @click="goToRebase" :disabled="isInRebase">
          <mdui-icon-swap-vert></mdui-icon-swap-vert>
          <span class="action-label">交互式 Rebase</span>
          <span class="action-shortcut">重写历史</span>
        </div>

        <div class="action-item" @click="goToReflog">
          <mdui-icon-history></mdui-icon-history>
          <span class="action-label">Reflog</span>
          <span class="action-shortcut">恢复提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.git-advanced-panel {
  border-top: 1px solid var(--mdui-color-outline-variant);
  margin-top: 8px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
}

.panel-header:hover {
  background: var(--mdui-color-surface-container-low);
}

.panel-header .title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.panel-header mdui-icon-keyboard-arrow-down {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
  transition: transform 0.2s;
}

.panel-content {
  padding: 0 8px 8px;
}

.status-section {
  margin-bottom: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
}

.status-item.conflict {
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
}

.status-item mdui-icon-warning,
.status-item mdui-icon-swap-vert {
  font-size: 24px;
}

.status-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-title {
  font-size: 13px;
  font-weight: 500;
}

.status-desc {
  font-size: 11px;
  opacity: 0.8;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.action-item:hover {
  background: var(--mdui-color-surface-container-low);
}

.action-item[disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.action-item mdui-icon-call-merge,
.action-item mdui-icon-swap-vert,
.action-item mdui-icon-history,
.action-item mdui-icon-content-copy {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.action-label {
  flex: 1;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
}

.action-shortcut {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}
</style>
