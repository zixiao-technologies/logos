<script setup lang="ts">
/**
 * GitOperationIndicator - Git 操作状态指示器
 * 在状态栏显示合并/Rebase 进度
 */

import { computed, onMounted, watch } from 'vue'
import { useMergeStore } from '@/stores/merge'
import { useRebaseStore } from '@/stores/rebase'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useRouter } from 'vue-router'

import '@mdui/icons/call-merge.js'
import '@mdui/icons/swap-vert.js'
import '@mdui/icons/warning.js'

const mergeStore = useMergeStore()
const rebaseStore = useRebaseStore()
const fileExplorerStore = useFileExplorerStore()
const router = useRouter()

const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 初始化时检查状态
onMounted(async () => {
  if (repoPath.value) {
    await mergeStore.checkMergeStatus(repoPath.value)
    await rebaseStore.checkRebaseStatus(repoPath.value)
  }
})

// 监听仓库变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await mergeStore.checkMergeStatus(newPath)
    await rebaseStore.checkRebaseStatus(newPath)
  }
})

// 是否有合并冲突
const hasMergeConflict = computed(() => mergeStore.isInMerge && mergeStore.hasConflicts)

// 是否正在 rebase
const isInRebase = computed(() => rebaseStore.isInRebase)

// rebase 进度
const rebaseProgress = computed(() => {
  const status = rebaseStore.editor.status
  if (!status) return ''
  return `${status.currentStep}/${status.totalSteps}`
})

// 是否有 rebase 冲突
const hasRebaseConflict = computed(() => rebaseStore.hasConflicts)

// 点击跳转
const handleClick = () => {
  if (hasMergeConflict.value) {
    router.push('/merge')
  } else if (isInRebase.value) {
    router.push('/rebase')
  }
}
</script>

<template>
  <!-- 合并冲突指示器 -->
  <div
    v-if="hasMergeConflict"
    class="git-operation-indicator merge"
    @click="handleClick"
    title="点击解决合并冲突"
  >
    <mdui-icon-call-merge></mdui-icon-call-merge>
    <span class="label">合并冲突</span>
    <span class="count">{{ mergeStore.unresolvedCount }}</span>
  </div>

  <!-- Rebase 指示器 -->
  <div
    v-else-if="isInRebase"
    class="git-operation-indicator rebase"
    :class="{ conflict: hasRebaseConflict }"
    @click="handleClick"
    title="点击查看 Rebase 状态"
  >
    <mdui-icon-swap-vert></mdui-icon-swap-vert>
    <span class="label">Rebase</span>
    <span class="progress">{{ rebaseProgress }}</span>
    <mdui-icon-warning v-if="hasRebaseConflict"></mdui-icon-warning>
  </div>
</template>

<style scoped>
.git-operation-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.15s;
  font-size: 12px;
}

.git-operation-indicator:hover {
  background: var(--mdui-color-surface-container-high);
}

.git-operation-indicator.merge {
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
}

.git-operation-indicator.rebase {
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
}

.git-operation-indicator.rebase.conflict {
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
}

.git-operation-indicator mdui-icon-call-merge,
.git-operation-indicator mdui-icon-swap-vert {
  font-size: 14px;
}

.git-operation-indicator mdui-icon-warning {
  font-size: 12px;
}

.label {
  font-weight: 500;
}

.count,
.progress {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  opacity: 0.8;
}
</style>
