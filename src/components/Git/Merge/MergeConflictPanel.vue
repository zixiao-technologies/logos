<script setup lang="ts">
/**
 * MergeConflictPanel - 合并冲突解决主面板
 * 整合文件列表、工具栏和三面板编辑器
 */

import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useMergeStore } from '@/stores/merge'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import type { ConflictResolution } from '@/types/merge'
import ConflictedFileList from './ConflictedFileList.vue'
import MergeToolbar from './MergeToolbar.vue'
import ThreeWayMergeEditor from './ThreeWayMergeEditor.vue'

import '@mdui/icons/warning.js'

const mergeStore = useMergeStore()
const fileExplorerStore = useFileExplorerStore()

const editorRef = ref<InstanceType<typeof ThreeWayMergeEditor>>()

// 确认对话框
const showAbortDialog = ref(false)
const showContinueDialog = ref(false)

// 计算属性
const repoPath = computed(() => fileExplorerStore.rootPath || '')

const hasUnresolved = computed(() => mergeStore.hasConflicts)

const canContinue = computed(() => mergeStore.allResolved)

const currentFileContent = computed(() => mergeStore.originalContent)

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await mergeStore.checkMergeStatus(repoPath.value)
  }
})

// 监听仓库路径变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await mergeStore.checkMergeStatus(newPath)
  }
})

// 选择文件
const handleSelectFile = async (path: string) => {
  if (repoPath.value) {
    await mergeStore.loadConflictContent(repoPath.value, path)
  }
}

// 更新合并内容
const handleUpdateMergedContent = (content: string) => {
  mergeStore.updateMergedContent(content)
}

// 解决冲突块
const handleResolveHunk = (hunkId: string, resolution: ConflictResolution) => {
  mergeStore.resolveHunk(hunkId, resolution)
}

// 保存当前文件解决
const handleSaveResolution = async () => {
  if (repoPath.value) {
    await mergeStore.saveResolution(repoPath.value)
  }
}

// 导航
const handlePrevConflict = () => {
  editorRef.value?.prevHunk()
}

const handleNextConflict = () => {
  editorRef.value?.nextHunk()
}

// 全局操作
const handleAcceptAllOurs = () => {
  mergeStore.acceptAllOurs()
}

const handleAcceptAllTheirs = () => {
  mergeStore.acceptAllTheirs()
}

// 中止合并
const handleAbort = () => {
  showAbortDialog.value = true
}

const confirmAbort = async () => {
  if (repoPath.value) {
    await mergeStore.abortMerge(repoPath.value)
  }
  showAbortDialog.value = false
}

// 完成合并
const handleContinue = () => {
  showContinueDialog.value = true
}

const confirmContinue = async () => {
  // 先保存当前文件
  if (mergeStore.currentFile) {
    await handleSaveResolution()
  }

  if (repoPath.value) {
    await mergeStore.continueMerge(repoPath.value)
  }
  showContinueDialog.value = false
}

// 键盘快捷键
const handleKeydown = (e: KeyboardEvent) => {
  if (e.metaKey || e.ctrlKey) {
    switch (e.key) {
      case '[':
        e.preventDefault()
        handlePrevConflict()
        break
      case ']':
        e.preventDefault()
        handleNextConflict()
        break
      case '1':
        e.preventDefault()
        if (mergeStore.hunks[0]?.resolution === 'unresolved') {
          handleResolveHunk(mergeStore.hunks[0].id, 'ours')
        }
        break
      case '2':
        e.preventDefault()
        if (mergeStore.hunks[0]?.resolution === 'unresolved') {
          handleResolveHunk(mergeStore.hunks[0].id, 'theirs')
        }
        break
      case '3':
        e.preventDefault()
        if (mergeStore.hunks[0]?.resolution === 'unresolved') {
          handleResolveHunk(mergeStore.hunks[0].id, 'both')
        }
        break
      case 's':
        e.preventDefault()
        handleSaveResolution()
        break
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="merge-conflict-panel">
    <!-- 未在合并状态 -->
    <div v-if="!mergeStore.isInMerge" class="no-merge">
      <mdui-icon-warning></mdui-icon-warning>
      <p>当前没有需要解决的合并冲突</p>
    </div>

    <!-- 合并状态 -->
    <template v-else>
      <!-- 工具栏 -->
      <MergeToolbar
        :has-unresolved="hasUnresolved"
        :can-continue="canContinue"
        :is-loading="mergeStore.isLoading"
        :resolved-count="mergeStore.resolvedCount"
        :total-count="mergeStore.conflictedFiles.length"
        @continue="handleContinue"
        @abort="handleAbort"
        @accept-all-ours="handleAcceptAllOurs"
        @accept-all-theirs="handleAcceptAllTheirs"
        @prev-conflict="handlePrevConflict"
        @next-conflict="handleNextConflict"
      />

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 文件列表 -->
        <ConflictedFileList
          :files="mergeStore.conflictedFiles"
          :current-file="mergeStore.currentFile"
          :loading="mergeStore.isLoading"
          @select="handleSelectFile"
        />

        <!-- 编辑器区域 -->
        <div class="editor-area">
          <template v-if="currentFileContent && mergeStore.currentFile">
            <ThreeWayMergeEditor
              ref="editorRef"
              :ours-content="currentFileContent.ours"
              :theirs-content="currentFileContent.theirs"
              :base-content="currentFileContent.base"
              :merged-content="mergeStore.mergedContent"
              :hunks="mergeStore.hunks"
              :file-path="mergeStore.currentFile"
              @update:merged-content="handleUpdateMergedContent"
              @resolve-hunk="handleResolveHunk"
            />
          </template>
          <div v-else class="no-file-selected">
            <p>从左侧选择一个冲突文件开始解决</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 中止确认对话框 -->
    <mdui-dialog
      :open="showAbortDialog"
      @closed="showAbortDialog = false"
    >
      <span slot="headline">中止合并</span>
      <span slot="description">
        确定要中止合并吗？所有已解决的冲突将被丢弃，工作目录将恢复到合并前的状态。
      </span>
      <mdui-button slot="action" variant="text" @click="showAbortDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmAbort">
        中止合并
      </mdui-button>
    </mdui-dialog>

    <!-- 完成确认对话框 -->
    <mdui-dialog
      :open="showContinueDialog"
      @closed="showContinueDialog = false"
    >
      <span slot="headline">完成合并</span>
      <span slot="description">
        所有冲突已解决。确定要完成合并并创建合并提交吗？
      </span>
      <mdui-button slot="action" variant="text" @click="showContinueDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmContinue">
        完成合并
      </mdui-button>
    </mdui-dialog>
  </div>
</template>

<style scoped>
.merge-conflict-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.no-merge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 100%;
  color: var(--mdui-color-on-surface-variant);
}

.no-merge mdui-icon-warning {
  font-size: 64px;
  opacity: 0.5;
}

.no-merge p {
  font-size: 14px;
  margin: 0;
}

.main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

.main-content > :first-child {
  width: 240px;
  flex-shrink: 0;
}

.editor-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.no-file-selected {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mdui-color-on-surface-variant);
  font-size: 14px;
}
</style>
