<script setup lang="ts">
/**
 * ReflogViewer - Reflog 查看器主组件
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useReflogStore } from '@/stores/reflog'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useGitStore } from '@/stores/git'
import type { ReflogEntry, ReflogOperationType } from '@/types/reflog'
import ReflogToolbar from './ReflogToolbar.vue'
import ReflogTimeline from './ReflogTimeline.vue'
import ReflogEntryActions from './ReflogEntryActions.vue'

import '@mdui/icons/history.js'

const reflogStore = useReflogStore()
const fileExplorerStore = useFileExplorerStore()
const gitStore = useGitStore()

// 对话框状态
const showResetDialog = ref(false)
const showCreateBranchDialog = ref(false)
const resetMode = ref<'soft' | 'mixed' | 'hard'>('mixed')
const newBranchName = ref('')
const pendingEntry = ref<ReflogEntry | null>(null)

// 计算属性
const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await reflogStore.loadReflog(repoPath.value)
  }
})

// 监听仓库变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await reflogStore.loadReflog(newPath)
  }
})

// 刷新
const handleRefresh = async () => {
  await reflogStore.refresh()
}

// 搜索
const handleSearchUpdate = (search: string) => {
  reflogStore.setSearch(search)
}

// 操作类型过滤
const handleOperationTypesUpdate = (types: ReflogOperationType[]) => {
  reflogStore.setOperationTypeFilter(types)
}

// 孤儿过滤
const handleOrphanedOnlyUpdate = (value: boolean) => {
  reflogStore.setOrphanedOnly(value)
}

// 清除过滤
const handleClearFilters = () => {
  reflogStore.clearFilters()
}

// 选择条目
const handleSelect = (entry: ReflogEntry) => {
  reflogStore.selectEntry(entry)
}

// 展开/收起
const handleToggleExpand = (index: number) => {
  reflogStore.toggleEntryExpanded(index)
}

// 加载更多
const handleLoadMore = () => {
  reflogStore.loadMore()
}

// Checkout
const handleCheckout = async (entry: ReflogEntry) => {
  if (repoPath.value) {
    await gitStore.checkout(repoPath.value, entry.hash)
    await reflogStore.refresh()
  }
}

// Cherry-pick
const handleCherryPick = async (entry: ReflogEntry) => {
  if (repoPath.value) {
    await window.electronAPI.git.cherryPick(repoPath.value, entry.hash, {})
    await gitStore.refresh(repoPath.value)
    await reflogStore.refresh()
  }
}

// 创建分支
const handleCreateBranch = (entry: ReflogEntry) => {
  pendingEntry.value = entry
  newBranchName.value = `recovered-${entry.shortHash}`
  showCreateBranchDialog.value = true
}

const confirmCreateBranch = async () => {
  if (repoPath.value && pendingEntry.value && newBranchName.value) {
    // 使用 checkout -b 从指定 commit 创建分支
    await window.electronAPI.git.checkout(repoPath.value, `-b ${newBranchName.value} ${pendingEntry.value.hash}`)
    showCreateBranchDialog.value = false
    pendingEntry.value = null
    await gitStore.refresh(repoPath.value)
  }
}

// Reset
const handleReset = (entry: ReflogEntry, mode: 'soft' | 'mixed' | 'hard') => {
  pendingEntry.value = entry
  resetMode.value = mode
  showResetDialog.value = true
}

const confirmReset = async () => {
  if (repoPath.value && pendingEntry.value) {
    await window.electronAPI.git.reset(repoPath.value, pendingEntry.value.hash, resetMode.value)
    showResetDialog.value = false
    pendingEntry.value = null
    await gitStore.refresh(repoPath.value)
    await reflogStore.refresh()
  }
}

// 复制 Hash
const handleCopyHash = (_hash: string) => {
  // 可以显示 snackbar 通知
}
</script>

<template>
  <div class="reflog-viewer">
    <!-- 标题 -->
    <div class="viewer-header">
      <mdui-icon-history></mdui-icon-history>
      <h2>Reflog</h2>
      <span class="count">
        {{ reflogStore.filteredCount }} / {{ reflogStore.totalCount }}
      </span>
    </div>

    <!-- 工具栏 -->
    <ReflogToolbar
      :search="reflogStore.viewState.filters.search"
      :operation-types="reflogStore.viewState.filters.operationTypes"
      :orphaned-only="reflogStore.viewState.filters.orphanedOnly"
      :is-loading="reflogStore.isLoading"
      @update:search="handleSearchUpdate"
      @update:operation-types="handleOperationTypesUpdate"
      @update:orphaned-only="handleOrphanedOnlyUpdate"
      @refresh="handleRefresh"
      @clear-filters="handleClearFilters"
    />

    <!-- 主内容区 -->
    <div class="viewer-main">
      <!-- 时间线 -->
      <ReflogTimeline
        :groups="reflogStore.filteredGroupedEntries"
        :selected-entry="reflogStore.viewState.selectedEntry"
        :expanded-entries="reflogStore.viewState.expandedEntries"
        :is-loading="reflogStore.isLoading"
        @select="handleSelect"
        @toggle-expand="handleToggleExpand"
        @load-more="handleLoadMore"
      />

      <!-- 操作面板 -->
      <ReflogEntryActions
        v-if="reflogStore.viewState.selectedEntry"
        :entry="reflogStore.viewState.selectedEntry"
        :is-loading="reflogStore.isLoading"
        @checkout="handleCheckout"
        @cherry-pick="handleCherryPick"
        @create-branch="handleCreateBranch"
        @reset="handleReset"
        @copy-hash="handleCopyHash"
      />
    </div>

    <!-- 错误信息 -->
    <div v-if="reflogStore.error" class="error-banner">
      {{ reflogStore.error }}
    </div>

    <!-- 创建分支对话框 -->
    <mdui-dialog
      :open="showCreateBranchDialog"
      @closed="showCreateBranchDialog = false"
    >
      <span slot="headline">从 Reflog 创建分支</span>
      <div slot="description" class="dialog-content">
        <p>从提交 <code>{{ pendingEntry?.shortHash }}</code> 创建新分支</p>
        <mdui-text-field
          v-model="newBranchName"
          label="分支名称"
          variant="outlined"
        ></mdui-text-field>
      </div>
      <mdui-button slot="action" variant="text" @click="showCreateBranchDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmCreateBranch" :disabled="!newBranchName">
        创建分支
      </mdui-button>
    </mdui-dialog>

    <!-- Reset 确认对话框 -->
    <mdui-dialog
      :open="showResetDialog"
      @closed="showResetDialog = false"
    >
      <span slot="headline">Reset to {{ pendingEntry?.shortHash }}</span>
      <span slot="description">
        <template v-if="resetMode === 'hard'">
          <strong style="color: var(--mdui-color-error)">警告:</strong>
          Hard reset 将丢弃所有未提交的更改，此操作无法撤销。
        </template>
        <template v-else-if="resetMode === 'soft'">
          Soft reset 将保留所有更改在暂存区。
        </template>
        <template v-else>
          Mixed reset 将保留所有更改在工作目录（未暂存）。
        </template>
      </span>
      <mdui-button slot="action" variant="text" @click="showResetDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmReset">
        确认 Reset
      </mdui-button>
    </mdui-dialog>
  </div>
</template>

<style scoped>
.reflog-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.viewer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.viewer-header mdui-icon-history {
  font-size: 24px;
  color: var(--mdui-color-primary);
}

.viewer-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--mdui-color-on-surface);
}

.viewer-header .count {
  margin-left: auto;
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
  background: var(--mdui-color-surface-container);
  padding: 2px 10px;
  border-radius: 12px;
}

.viewer-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.error-banner {
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  font-size: 13px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-content p {
  margin: 0;
}

.dialog-content code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--mdui-color-surface-container);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
