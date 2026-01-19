<script setup lang="ts">
/**
 * Reflog 主视图组件
 * 时间线视图显示所有 HEAD 移动记录
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useReflogStore } from '@/stores/reflog'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useGitStore } from '@/stores/git'
import ReflogToolbar from './ReflogToolbar.vue'
import ReflogTimeline from './ReflogTimeline.vue'
import ReflogEntryDetails from './ReflogEntryDetails.vue'
import type { ReflogEntry } from '@/types/reflog'

// 导入 MDUI 图标
import '@mdui/icons/history.js'
import '@mdui/icons/info.js'

const reflogStore = useReflogStore()
const fileExplorerStore = useFileExplorerStore()
const gitStore = useGitStore()

// 当前仓库路径
const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 详情面板是否展开
const showDetails = ref(false)

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await reflogStore.loadReflog(repoPath.value)
  }
})

// 监听仓库路径变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await reflogStore.loadReflog(newPath)
  }
})

// 刷新
const refresh = async () => {
  if (repoPath.value) {
    await reflogStore.loadReflog(repoPath.value)
  }
}

// 选择条目
const selectEntry = (entry: ReflogEntry) => {
  reflogStore.selectEntry(entry)
  showDetails.value = true
}

// 关闭详情面板
const closeDetails = () => {
  showDetails.value = false
  reflogStore.selectEntry(null)
}

// 执行操作
const handleAction = async (action: string, entry: ReflogEntry) => {
  if (!repoPath.value) return

  try {
    switch (action) {
      case 'checkout':
        await window.electronAPI.git.checkout(repoPath.value, entry.hash)
        break
      case 'cherryPick':
        await window.electronAPI.git.cherryPick(repoPath.value, entry.hash)
        break
      case 'createBranch':
        // 弹出对话框让用户输入分支名
        const branchName = prompt('输入新分支名:')
        if (branchName) {
          await window.electronAPI.git.createBranch(repoPath.value, branchName, true)
          await window.electronAPI.git.reset(repoPath.value, entry.hash, 'hard')
        }
        break
      case 'resetHard':
        await window.electronAPI.git.reset(repoPath.value, entry.hash, 'hard')
        break
      case 'resetSoft':
        await window.electronAPI.git.reset(repoPath.value, entry.hash, 'soft')
        break
      case 'resetMixed':
        await window.electronAPI.git.reset(repoPath.value, entry.hash, 'mixed')
        break
    }

    // 刷新 Git 状态
    await gitStore.refresh(repoPath.value)
    await refresh()
  } catch (error) {
    console.error('Action failed:', error)
  }
}

// 加载更多
const loadMore = () => {
  reflogStore.loadMore()
}
</script>

<template>
  <div class="reflog-view">
    <!-- 工具栏 -->
    <ReflogToolbar
      :loading="reflogStore.isLoading"
      :total-count="reflogStore.totalCount"
      :filtered-count="reflogStore.filteredCount"
      @refresh="refresh"
      @search="reflogStore.setSearch"
      @filter="reflogStore.setOperationTypeFilter"
      @clear-filters="reflogStore.clearFilters"
    />

    <div class="reflog-content">
      <!-- 时间线 -->
      <div class="timeline-panel">
        <ReflogTimeline
          v-if="reflogStore.filteredGroupedEntries.length > 0"
          :groups="reflogStore.filteredGroupedEntries"
          :selected-entry="reflogStore.viewState.selectedEntry"
          :loading="reflogStore.isLoading"
          @select="selectEntry"
          @load-more="loadMore"
        />

        <!-- 空状态 -->
        <div v-else-if="!reflogStore.isLoading" class="empty-state">
          <mdui-icon-history></mdui-icon-history>
          <h3>没有 Reflog 记录</h3>
          <p v-if="reflogStore.viewState.filters.search">
            没有找到匹配 "{{ reflogStore.viewState.filters.search }}" 的记录
          </p>
          <p v-else>
            Reflog 记录了 HEAD 的所有移动历史
          </p>
        </div>

        <!-- 加载中 -->
        <div v-else class="loading-state">
          <mdui-circular-progress></mdui-circular-progress>
          <span>加载 Reflog...</span>
        </div>
      </div>

      <!-- 详情面板 -->
      <ReflogEntryDetails
        v-if="showDetails && reflogStore.viewState.selectedEntry"
        :entry="reflogStore.viewState.selectedEntry"
        @close="closeDetails"
        @action="handleAction"
      />
    </div>

    <!-- 错误消息 -->
    <div v-if="reflogStore.error" class="error-banner">
      {{ reflogStore.error }}
    </div>
  </div>
</template>

<style scoped>
.reflog-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.reflog-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.timeline-panel {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

.empty-state,
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
  color: var(--mdui-color-on-surface-variant);
}

.empty-state mdui-icon-history {
  font-size: 64px;
  opacity: 0.3;
}

.empty-state h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.empty-state p {
  margin: 0;
  font-size: 13px;
  text-align: center;
  max-width: 300px;
}

.error-banner {
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  font-size: 13px;
}
</style>
