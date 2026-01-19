<script setup lang="ts">
/**
 * 合并冲突解决主视图
 * 整合冲突文件列表、三面板编辑器和工具栏
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMergeStore } from '@/stores/merge'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useGitStore } from '@/stores/git'
import ConflictedFileList from './ConflictedFileList.vue'
import ThreeWayMergeEditor from './ThreeWayMergeEditor.vue'
import MergeToolbar from './MergeToolbar.vue'
import type { ConflictResolution } from '@/types/merge'

// 导入 MDUI 图标
import '@mdui/icons/merge-type.js'
import '@mdui/icons/warning.js'
import '@mdui/icons/check-circle.js'

const router = useRouter()
const mergeStore = useMergeStore()
const fileExplorerStore = useFileExplorerStore()
const gitStore = useGitStore()

// 编辑器引用
const editorRef = ref<InstanceType<typeof ThreeWayMergeEditor> | null>(null)

// 当前仓库路径
const repoPath = computed(() => fileExplorerStore.rootPath || '')

// 是否可以继续合并
const canContinue = computed(() => mergeStore.allResolved && !mergeStore.isLoading)

// 是否可以中止
const canAbort = computed(() => mergeStore.isInMerge)

// 当前冲突索引
const currentHunkIndex = ref(0)

// 初始化
onMounted(async () => {
  if (repoPath.value) {
    await mergeStore.checkMergeStatus(repoPath.value)

    // 自动选择第一个冲突文件
    if (mergeStore.conflictedFiles.length > 0) {
      await selectFile(mergeStore.conflictedFiles[0].path)
    }
  }
})

// 监听仓库路径变化
watch(repoPath, async (newPath) => {
  if (newPath) {
    await mergeStore.checkMergeStatus(newPath)
  }
})

// 选择文件
const selectFile = async (path: string) => {
  if (repoPath.value) {
    await mergeStore.loadConflictContent(repoPath.value, path)
    currentHunkIndex.value = 0
  }
}

// 更新合并内容
const updateMergedContent = (content: string) => {
  mergeStore.updateMergedContent(content)
}

// 解决冲突块
const resolveHunk = (hunkId: string, resolution: ConflictResolution) => {
  mergeStore.resolveHunk(hunkId, resolution)
}

// 保存当前文件解决方案
const saveCurrentFile = async () => {
  if (repoPath.value) {
    await mergeStore.saveResolution(repoPath.value)

    // 如果还有未解决的文件,切换到下一个
    const unresolvedFile = mergeStore.conflictedFiles.find(f => !f.resolved)
    if (unresolvedFile) {
      await selectFile(unresolvedFile.path)
    }
  }
}

// 上一个冲突
const prevConflict = () => {
  if (mergeStore.hunks.length === 0) return
  currentHunkIndex.value = (currentHunkIndex.value - 1 + mergeStore.hunks.length) % mergeStore.hunks.length
  editorRef.value?.jumpToHunk(mergeStore.hunks[currentHunkIndex.value])
}

// 下一个冲突
const nextConflict = () => {
  if (mergeStore.hunks.length === 0) return
  currentHunkIndex.value = (currentHunkIndex.value + 1) % mergeStore.hunks.length
  editorRef.value?.jumpToHunk(mergeStore.hunks[currentHunkIndex.value])
}

// 接受所有本地
const acceptAllOurs = () => {
  mergeStore.acceptAllOurs()
}

// 接受所有远程
const acceptAllTheirs = () => {
  mergeStore.acceptAllTheirs()
}

// 继续合并
const continueMerge = async () => {
  try {
    // 先保存当前文件
    if (mergeStore.currentFile && !mergeStore.isCurrentFileResolved) {
      await saveCurrentFile()
    }

    // 继续合并
    await mergeStore.continueMerge(repoPath.value)

    // 刷新 Git 状态
    await gitStore.refresh(repoPath.value)

    // 返回编辑器
    router.push('/')
  } catch (error) {
    // 错误已在 store 中处理
  }
}

// 中止合并
const abortMerge = async () => {
  try {
    await mergeStore.abortMerge(repoPath.value)
    await gitStore.refresh(repoPath.value)
    router.push('/')
  } catch (error) {
    // 错误已在 store 中处理
  }
}

// 快捷键处理
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.metaKey || e.ctrlKey) {
    if (e.key === '[') {
      e.preventDefault()
      prevConflict()
    } else if (e.key === ']') {
      e.preventDefault()
      nextConflict()
    } else if (e.key === 's') {
      e.preventDefault()
      saveCurrentFile()
    } else if (e.key === '1') {
      e.preventDefault()
      if (mergeStore.hunks[currentHunkIndex.value]) {
        resolveHunk(mergeStore.hunks[currentHunkIndex.value].id, 'ours')
      }
    } else if (e.key === '2') {
      e.preventDefault()
      if (mergeStore.hunks[currentHunkIndex.value]) {
        resolveHunk(mergeStore.hunks[currentHunkIndex.value].id, 'theirs')
      }
    } else if (e.key === '3') {
      e.preventDefault()
      if (mergeStore.hunks[currentHunkIndex.value]) {
        resolveHunk(mergeStore.hunks[currentHunkIndex.value].id, 'both')
      }
    }
  }
}

// 注册快捷键
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

// 清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="merge-conflict-view">
    <!-- 不在合并状态 -->
    <div v-if="!mergeStore.isInMerge" class="no-merge">
      <mdui-icon-merge-type></mdui-icon-merge-type>
      <h3>没有正在进行的合并</h3>
      <p>当发生合并冲突时,此视图将显示冲突解决工具。</p>
      <mdui-button variant="filled" @click="router.push('/')">
        返回编辑器
      </mdui-button>
    </div>

    <!-- 合并冲突解决界面 -->
    <template v-else>
      <!-- 工具栏 -->
      <MergeToolbar
        :can-continue="canContinue"
        :can-abort="canAbort"
        :unresolved-count="mergeStore.unresolvedCount"
        :loading="mergeStore.isLoading"
        :is-rebase="mergeStore.status?.isRebaseConflict"
        @continue="continueMerge"
        @abort="abortMerge"
        @prev-conflict="prevConflict"
        @next-conflict="nextConflict"
        @accept-all-ours="acceptAllOurs"
        @accept-all-theirs="acceptAllTheirs"
      />

      <div class="merge-content">
        <!-- 侧边栏: 冲突文件列表 -->
        <aside class="sidebar">
          <ConflictedFileList
            :files="mergeStore.conflictedFiles"
            :current-file="mergeStore.currentFile"
            :loading="mergeStore.isLoading"
            @select="selectFile"
          />

          <!-- 保存按钮 -->
          <div v-if="mergeStore.currentFile" class="save-section">
            <mdui-button
              variant="tonal"
              full-width
              @click="saveCurrentFile"
              :disabled="mergeStore.isLoading || mergeStore.isCurrentFileResolved"
            >
              <mdui-icon-check-circle slot="icon"></mdui-icon-check-circle>
              {{ mergeStore.isCurrentFileResolved ? '已保存' : '保存此文件' }}
            </mdui-button>
          </div>
        </aside>

        <!-- 主区域: 三面板编辑器 -->
        <main class="editor-area">
          <template v-if="mergeStore.currentFile && mergeStore.originalContent">
            <ThreeWayMergeEditor
              ref="editorRef"
              :ours-content="mergeStore.originalContent.ours"
              :theirs-content="mergeStore.originalContent.theirs"
              :base-content="mergeStore.originalContent.base"
              :merged-content="mergeStore.mergedContent"
              :hunks="mergeStore.hunks"
              :file-name="mergeStore.currentFile"
              @update:merged-content="updateMergedContent"
              @resolve-hunk="resolveHunk"
            />
          </template>

          <!-- 未选择文件 -->
          <div v-else class="no-file-selected">
            <mdui-icon-warning></mdui-icon-warning>
            <p>选择一个冲突文件开始解决</p>
          </div>
        </main>
      </div>

      <!-- 错误消息 -->
      <div v-if="mergeStore.error" class="error-banner">
        {{ mergeStore.error }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.merge-conflict-view {
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

.no-merge mdui-icon-merge-type {
  font-size: 64px;
  opacity: 0.5;
}

.no-merge h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.no-merge p {
  margin: 0;
  font-size: 14px;
  max-width: 400px;
  text-align: center;
}

.merge-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--mdui-color-outline-variant);
}

.save-section {
  padding: 12px;
  border-top: 1px solid var(--mdui-color-outline-variant);
}

.editor-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.no-file-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
  color: var(--mdui-color-on-surface-variant);
}

.no-file-selected mdui-icon-warning {
  font-size: 48px;
  opacity: 0.5;
}

.error-banner {
  padding: 12px 16px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  font-size: 13px;
}
</style>
