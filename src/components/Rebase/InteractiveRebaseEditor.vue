<script setup lang="ts">
/**
 * 交互式 Rebase 编辑器组件
 * 可视化 rebase 编辑器，支持拖拽重排序
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRebaseStore } from '@/stores/rebase'
import { useMergeStore } from '@/stores/merge'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useGitStore } from '@/stores/git'
import RebaseCommitItem from './RebaseCommitItem.vue'
import type { RebaseAction } from '@/types/rebase'

// 导入 MDUI 图标
import '@mdui/icons/swap-vert.js'
import '@mdui/icons/play-arrow.js'
import '@mdui/icons/stop.js'
import '@mdui/icons/skip-next.js'
import '@mdui/icons/warning.js'
import '@mdui/icons/info.js'

const router = useRouter()
const rebaseStore = useRebaseStore()
const mergeStore = useMergeStore()
const fileExplorerStore = useFileExplorerStore()
const gitStore = useGitStore()

// 当前仓库路径
const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 拖拽状态
const dragFromIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

// Reword 对话框
const showRewordDialog = ref(false)
const rewordCommitHash = ref('')
const rewordMessage = ref('')

// 是否正在执行中的 rebase
const isInProgress = computed(() => rebaseStore.isInRebase)

// 是否有冲突
const hasConflicts = computed(() => rebaseStore.hasConflicts)

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await rebaseStore.checkRebaseStatus(repoPath.value)
  }
})

// 监听仓库路径变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await rebaseStore.checkRebaseStatus(newPath)
  }
})

// 设置提交操作
const setAction = (hash: string, action: RebaseAction) => {
  rebaseStore.setCommitAction(hash, action)
}

// 打开 reword 对话框
const openRewordDialog = (hash: string, message: string) => {
  rewordCommitHash.value = hash
  rewordMessage.value = message
  showRewordDialog.value = true
}

// 保存 reword
const saveReword = () => {
  rebaseStore.setCommitMessage(rewordCommitHash.value, rewordMessage.value)
  showRewordDialog.value = false
}

// 拖拽处理
const handleDragStart = (index: number) => {
  dragFromIndex.value = index
}

const handleDragOver = (index: number) => {
  dragOverIndex.value = index
}

const handleDragEnd = () => {
  if (dragFromIndex.value !== null && dragOverIndex.value !== null && dragFromIndex.value !== dragOverIndex.value) {
    rebaseStore.moveCommit(dragFromIndex.value, dragOverIndex.value)
  }
  dragFromIndex.value = null
  dragOverIndex.value = null
}

// 执行 rebase
const executeRebase = async () => {
  const result = await rebaseStore.executeRebase()

  if (result.success) {
    // 检查是否有冲突
    if (hasConflicts.value) {
      // 跳转到合并冲突视图
      await mergeStore.checkMergeStatus(repoPath.value)
      router.push('/merge')
    } else {
      // 刷新 Git 状态
      await gitStore.refresh(repoPath.value)
    }
  }
}

// 继续 rebase
const continueRebase = async () => {
  const result = await rebaseStore.continueRebase()

  if (result.success) {
    if (hasConflicts.value) {
      await mergeStore.checkMergeStatus(repoPath.value)
      router.push('/merge')
    } else {
      await gitStore.refresh(repoPath.value)
    }
  }
}

// 跳过当前提交
const skipCommit = async () => {
  await rebaseStore.skipCommit()
}

// 中止 rebase
const abortRebase = async () => {
  await rebaseStore.abortRebase()
  await gitStore.refresh(repoPath.value)
}

// 关闭编辑器
const closeEditor = () => {
  rebaseStore.closeRebaseEditor()
  router.push('/')
}
</script>

<template>
  <div class="interactive-rebase-editor">
    <!-- 工具栏 -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <mdui-icon-swap-vert></mdui-icon-swap-vert>
        <span class="title">交互式 Rebase</span>
        <span v-if="rebaseStore.editor.onto" class="onto-label">
          onto: <code>{{ rebaseStore.editor.onto }}</code>
        </span>
      </div>

      <div class="toolbar-right">
        <!-- 进行中的 rebase 操作 -->
        <template v-if="isInProgress">
          <span class="progress-label">
            步骤 {{ rebaseStore.editor.status?.currentStep }} / {{ rebaseStore.editor.status?.totalSteps }}
          </span>

          <mdui-button
            v-if="hasConflicts"
            variant="text"
            @click="() => router.push('/merge')"
          >
            <mdui-icon-warning slot="icon"></mdui-icon-warning>
            解决冲突
          </mdui-button>

          <mdui-button
            variant="text"
            @click="skipCommit"
            :disabled="rebaseStore.editor.isExecuting"
          >
            <mdui-icon-skip-next slot="icon"></mdui-icon-skip-next>
            跳过
          </mdui-button>

          <mdui-button
            variant="text"
            @click="abortRebase"
            :disabled="rebaseStore.editor.isExecuting"
          >
            <mdui-icon-stop slot="icon"></mdui-icon-stop>
            中止
          </mdui-button>

          <mdui-button
            variant="filled"
            @click="continueRebase"
            :disabled="rebaseStore.editor.isExecuting || hasConflicts"
            :loading="rebaseStore.editor.isExecuting"
          >
            继续
          </mdui-button>
        </template>

        <!-- 编辑器操作 -->
        <template v-else-if="rebaseStore.editor.isEditorOpen">
          <mdui-button variant="text" @click="closeEditor">
            取消
          </mdui-button>

          <mdui-button
            variant="filled"
            @click="executeRebase"
            :disabled="rebaseStore.editor.isExecuting || rebaseStore.editor.commits.length === 0"
            :loading="rebaseStore.editor.isExecuting"
          >
            <mdui-icon-play-arrow slot="icon"></mdui-icon-play-arrow>
            开始 Rebase
          </mdui-button>
        </template>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="editor-content">
      <!-- 提交列表 -->
      <div class="commits-panel">
        <div class="panel-header">
          <span>提交 ({{ rebaseStore.editor.commits.length }})</span>
          <span class="hint">拖拽可重新排序</span>
        </div>

        <div class="commits-list">
          <RebaseCommitItem
            v-for="(commit, index) in rebaseStore.editor.commits"
            :key="commit.hash"
            :commit="commit"
            :index="index"
            :dragging="dragFromIndex === index"
            :class="{ 'drag-over': dragOverIndex === index }"
            @action="(action) => setAction(commit.hash, action)"
            @reword="(msg) => openRewordDialog(commit.hash, msg)"
            @dragstart="handleDragStart"
            @dragover="handleDragOver"
            @dragend="handleDragEnd"
          />

          <!-- 空状态 -->
          <div v-if="rebaseStore.editor.commits.length === 0" class="empty-state">
            <mdui-icon-info></mdui-icon-info>
            <p>没有可 rebase 的提交</p>
          </div>
        </div>
      </div>

      <!-- 统计面板 -->
      <div v-if="rebaseStore.editor.commits.length > 0" class="stats-panel">
        <div class="stat-item">
          <span class="stat-value">{{ rebaseStore.resultingCommitCount }}</span>
          <span class="stat-label">最终提交数</span>
        </div>
        <div v-if="rebaseStore.droppedCount > 0" class="stat-item dropped">
          <span class="stat-value">{{ rebaseStore.droppedCount }}</span>
          <span class="stat-label">将被删除</span>
        </div>
        <div v-if="rebaseStore.squashedCount > 0" class="stat-item squashed">
          <span class="stat-value">{{ rebaseStore.squashedCount }}</span>
          <span class="stat-label">将被合并</span>
        </div>
      </div>
    </div>

    <!-- 错误消息 -->
    <div v-if="rebaseStore.editor.error" class="error-banner">
      {{ rebaseStore.editor.error }}
    </div>

    <!-- Reword 对话框 -->
    <mdui-dialog
      :open="showRewordDialog"
      @closed="showRewordDialog = false"
    >
      <span slot="headline">修改提交消息</span>
      <div slot="description">
        <mdui-text-field
          v-model="rewordMessage"
          rows="4"
          label="提交消息"
          style="width: 100%"
        ></mdui-text-field>
      </div>
      <mdui-button slot="action" variant="text" @click="showRewordDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" variant="filled" @click="saveReword">
        保存
      </mdui-button>
    </mdui-dialog>
  </div>
</template>

<style scoped>
.interactive-rebase-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--mdui-color-surface-container);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-left .title {
  font-size: 14px;
  font-weight: 600;
}

.onto-label {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.onto-label code {
  font-family: monospace;
  background: var(--mdui-color-surface-variant);
  padding: 2px 6px;
  border-radius: 4px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-label {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
  padding: 4px 8px;
  background: var(--mdui-color-surface-variant);
  border-radius: 12px;
}

.editor-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.commits-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.panel-header .hint {
  font-weight: 400;
  font-size: 11px;
  text-transform: none;
}

.commits-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.commits-list .drag-over {
  border-top: 2px solid var(--mdui-color-primary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  color: var(--mdui-color-on-surface-variant);
}

.empty-state mdui-icon-info {
  font-size: 32px;
  opacity: 0.5;
}

.stats-panel {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--mdui-color-surface-container-low);
  border-left: 1px solid var(--mdui-color-outline-variant);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
}

.stat-label {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.stat-item.dropped .stat-value {
  color: var(--mdui-color-error);
}

.stat-item.squashed .stat-value {
  color: #ff9800;
}

.error-banner {
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  font-size: 13px;
}
</style>
