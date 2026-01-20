<script setup lang="ts">
/**
 * InteractiveRebaseEditor - 交互式 Rebase 编辑器主组件
 * SourceTree 风格的可视化 rebase 编辑器
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useRebaseStore } from '@/stores/rebase'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import type { RebaseAction } from '@/types/rebase'
import RebaseCommitList from './RebaseCommitList.vue'
import RebasePreviewStats from './RebasePreviewStats.vue'
import RebaseProgressIndicator from './RebaseProgressIndicator.vue'

import '@mdui/icons/play-arrow.js'
import '@mdui/icons/close.js'
import '@mdui/icons/skip-next.js'
import '@mdui/icons/fast-forward.js'
import '@mdui/icons/warning.js'

const rebaseStore = useRebaseStore()
const fileExplorerStore = useFileExplorerStore()

// 对话框状态
const showAbortDialog = ref(false)
const showExecuteDialog = ref(false)

// 目标分支/提交选择
const targetBranch = ref('')

const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await rebaseStore.checkRebaseStatus(repoPath.value)
  }
})

// 监听仓库变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await rebaseStore.checkRebaseStatus(newPath)
  }
})

// 打开编辑器
const openEditor = async () => {
  if (repoPath.value && targetBranch.value) {
    await rebaseStore.openRebaseEditor(repoPath.value, targetBranch.value)
  }
}

// 关闭编辑器
const closeEditor = () => {
  rebaseStore.closeRebaseEditor()
}

// 重新排序
const handleReorder = (fromIndex: number, toIndex: number) => {
  rebaseStore.moveCommit(fromIndex, toIndex)
}

// 修改操作
const handleActionChange = (hash: string, action: RebaseAction) => {
  rebaseStore.setCommitAction(hash, action)
}

// 修改消息
const handleMessageChange = (hash: string, message: string) => {
  rebaseStore.setCommitMessage(hash, message)
}

// 执行 rebase
const handleExecute = () => {
  showExecuteDialog.value = true
}

const confirmExecute = async () => {
  showExecuteDialog.value = false
  await rebaseStore.executeRebase()
}

// 继续 rebase
const handleContinue = async () => {
  await rebaseStore.continueRebase()
}

// 跳过当前提交
const handleSkip = async () => {
  await rebaseStore.skipCommit()
}

// 中止 rebase
const handleAbort = () => {
  showAbortDialog.value = true
}

const confirmAbort = async () => {
  showAbortDialog.value = false
  await rebaseStore.abortRebase()
}

// 是否显示编辑器
const showEditor = computed(() => rebaseStore.editor.isEditorOpen)

// 是否正在 rebase
const isInRebase = computed(() => rebaseStore.isInRebase)

// 是否有冲突
const hasConflicts = computed(() => rebaseStore.hasConflicts)

// 是否正在执行
const isExecuting = computed(() => rebaseStore.editor.isExecuting)

// 是否有删除操作
const hasDrops = computed(() => rebaseStore.droppedCount > 0)
</script>

<template>
  <div class="interactive-rebase-editor">
    <!-- 进度指示器 -->
    <RebaseProgressIndicator
      v-if="isInRebase || isExecuting"
      :status="rebaseStore.editor.status"
      :is-executing="isExecuting"
    />

    <!-- 冲突状态工具栏 -->
    <div v-if="hasConflicts" class="conflict-toolbar">
      <div class="conflict-message">
        <mdui-icon-warning></mdui-icon-warning>
        <span>Rebase 遇到冲突，请解决冲突后继续</span>
      </div>
      <div class="conflict-actions">
        <mdui-button variant="text" @click="handleSkip" :disabled="isExecuting">
          <mdui-icon-skip-next slot="icon"></mdui-icon-skip-next>
          跳过此提交
        </mdui-button>
        <mdui-button variant="text" @click="handleAbort" :disabled="isExecuting">
          <mdui-icon-close slot="icon"></mdui-icon-close>
          中止 Rebase
        </mdui-button>
        <mdui-button variant="filled" @click="handleContinue" :disabled="isExecuting">
          <mdui-icon-fast-forward slot="icon"></mdui-icon-fast-forward>
          继续 Rebase
        </mdui-button>
      </div>
    </div>

    <!-- 非编辑状态: 选择目标 -->
    <div v-if="!showEditor && !isInRebase" class="target-selector">
      <div class="selector-header">
        <h3>交互式 Rebase</h3>
        <p>选择 rebase 的目标分支或提交</p>
      </div>

      <div class="selector-form">
        <mdui-text-field
          v-model="targetBranch"
          label="目标分支 / Commit"
          placeholder="例如: main, HEAD~5, abc1234"
          variant="outlined"
        ></mdui-text-field>

        <mdui-button
          variant="filled"
          @click="openEditor"
          :disabled="!targetBranch || rebaseStore.isLoading"
        >
          开始 Rebase
        </mdui-button>
      </div>
    </div>

    <!-- 编辑器状态 -->
    <template v-else-if="showEditor">
      <!-- 编辑器工具栏 -->
      <div class="editor-toolbar">
        <div class="toolbar-left">
          <span class="onto-label">Rebase onto:</span>
          <span class="onto-value">{{ rebaseStore.editor.onto }}</span>
        </div>
        <div class="toolbar-right">
          <mdui-button variant="text" @click="closeEditor" :disabled="isExecuting">
            取消
          </mdui-button>
          <mdui-button
            variant="filled"
            @click="handleExecute"
            :disabled="isExecuting || rebaseStore.editor.commits.length === 0"
          >
            <mdui-icon-play-arrow slot="icon"></mdui-icon-play-arrow>
            开始 Rebase
          </mdui-button>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="editor-main">
        <!-- 提交列表 -->
        <div class="commits-panel">
          <RebaseCommitList
            :commits="rebaseStore.editor.commits"
            @reorder="handleReorder"
            @action-change="handleActionChange"
            @message-change="handleMessageChange"
          />
        </div>

        <!-- 预览面板 -->
        <div class="preview-panel">
          <RebasePreviewStats :commits="rebaseStore.editor.commits" />

          <div class="help-section">
            <h4>操作说明</h4>
            <ul>
              <li><strong>pick</strong> - 保留提交</li>
              <li><strong>reword</strong> - 修改提交消息</li>
              <li><strong>edit</strong> - 停止以便编辑</li>
              <li><strong>squash</strong> - 合并到上一提交 (保留消息)</li>
              <li><strong>fixup</strong> - 合并到上一提交 (丢弃消息)</li>
              <li><strong>drop</strong> - 删除提交</li>
            </ul>
            <p class="tip">拖拽提交可以重新排序</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 错误信息 -->
    <div v-if="rebaseStore.editor.error" class="error-banner">
      {{ rebaseStore.editor.error }}
    </div>

    <!-- 中止确认对话框 -->
    <mdui-dialog
      :open="showAbortDialog"
      @closed="showAbortDialog = false"
    >
      <span slot="headline">中止 Rebase</span>
      <span slot="description">
        确定要中止 rebase 吗？所有更改将被丢弃，工作目录将恢复到 rebase 前的状态。
      </span>
      <mdui-button slot="action" variant="text" @click="showAbortDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmAbort">
        中止 Rebase
      </mdui-button>
    </mdui-dialog>

    <!-- 执行确认对话框 -->
    <mdui-dialog
      :open="showExecuteDialog"
      @closed="showExecuteDialog = false"
    >
      <span slot="headline">开始 Rebase</span>
      <span slot="description">
        <template v-if="hasDrops">
          <strong style="color: var(--mdui-color-error)">警告:</strong>
          {{ rebaseStore.droppedCount }} 个提交将被永久删除。
          <br /><br />
        </template>
        确定要开始交互式 rebase 吗？这将重写提交历史。
      </span>
      <mdui-button slot="action" variant="text" @click="showExecuteDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmExecute">
        开始 Rebase
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

.conflict-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  border-bottom: 1px solid var(--mdui-color-error);
}

.conflict-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mdui-color-on-error-container);
}

.conflict-message mdui-icon-warning {
  font-size: 20px;
}

.conflict-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.target-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 100%;
  padding: 32px;
}

.selector-header {
  text-align: center;
}

.selector-header h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 500;
  color: var(--mdui-color-on-surface);
}

.selector-header p {
  margin: 0;
  font-size: 14px;
  color: var(--mdui-color-on-surface-variant);
}

.selector-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
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

.onto-label {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.onto-value {
  font-size: 13px;
  font-weight: 500;
  font-family: 'JetBrains Mono', monospace;
  color: var(--mdui-color-primary);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-main {
  flex: 1;
  display: flex;
  min-height: 0;
}

.commits-panel {
  flex: 1;
  min-width: 0;
  border-right: 1px solid var(--mdui-color-outline-variant);
}

.preview-panel {
  width: 280px;
  flex-shrink: 0;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.help-section {
  background: var(--mdui-color-surface-container-low);
  border-radius: 8px;
  padding: 16px;
}

.help-section h4 {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.help-section ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.help-section li {
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
  margin-bottom: 6px;
}

.help-section li strong {
  font-family: 'JetBrains Mono', monospace;
  color: var(--mdui-color-on-surface);
}

.help-section .tip {
  margin: 12px 0 0;
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  font-style: italic;
}

.error-banner {
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  font-size: 13px;
}
</style>
