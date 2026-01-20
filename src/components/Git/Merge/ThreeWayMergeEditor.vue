<script setup lang="ts">
/**
 * ThreeWayMergeEditor - 三面板合并编辑器
 * JetBrains 风格的左-中-右布局
 * 左: Ours (本地)
 * 中: 合并结果 (可编辑)
 * 右: Theirs (远程)
 */

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as monaco from 'monaco-editor'
import type { ConflictHunk, ConflictResolution } from '@/types/merge'

import '@mdui/icons/chevron-left.js'
import '@mdui/icons/chevron-right.js'
import '@mdui/icons/unfold-more.js'

const props = defineProps<{
  oursContent: string
  theirsContent: string
  baseContent: string
  mergedContent: string
  hunks: ConflictHunk[]
  filePath: string
}>()

const emit = defineEmits<{
  (e: 'update:mergedContent', content: string): void
  (e: 'resolve-hunk', hunkId: string, resolution: ConflictResolution): void
}>()

// 编辑器容器引用
const oursContainer = ref<HTMLElement>()
const mergedContainer = ref<HTMLElement>()
const theirsContainer = ref<HTMLElement>()

// 编辑器实例
let oursEditor: monaco.editor.IStandaloneCodeEditor | null = null
let mergedEditor: monaco.editor.IStandaloneCodeEditor | null = null
let theirsEditor: monaco.editor.IStandaloneCodeEditor | null = null

// 冲突装饰
let mergedDecorations: string[] = []

// 当前激活的冲突块索引
const activeHunkIndex = ref(0)

/** 获取语言 ID */
const getLanguageId = (filePath: string): string => {
  const ext = filePath.split('.').pop()?.toLowerCase()
  const langMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'vue': 'vue',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'java': 'java',
    'go': 'go',
    'rs': 'rust',
    'c': 'c',
    'cpp': 'cpp',
    'h': 'c',
    'hpp': 'cpp',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'sql': 'sql',
    'sh': 'shell',
    'bash': 'shell'
  }
  return langMap[ext || ''] || 'plaintext'
}

/** 创建编辑器 */
const createEditor = (
  container: HTMLElement,
  content: string,
  readOnly: boolean
): monaco.editor.IStandaloneCodeEditor => {
  return monaco.editor.create(container, {
    value: content,
    language: getLanguageId(props.filePath),
    readOnly,
    minimap: { enabled: false },
    lineNumbers: 'on',
    glyphMargin: true,
    folding: false,
    renderLineHighlight: readOnly ? 'none' : 'line',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    fontSize: 13,
    fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
    theme: 'vs-dark',
    wordWrap: 'on',
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  })
}

/** 同步滚动 */
const syncScroll = (source: monaco.editor.IStandaloneCodeEditor) => {
  const scrollTop = source.getScrollTop()
  if (oursEditor && source !== oursEditor) {
    oursEditor.setScrollTop(scrollTop)
  }
  if (mergedEditor && source !== mergedEditor) {
    mergedEditor.setScrollTop(scrollTop)
  }
  if (theirsEditor && source !== theirsEditor) {
    theirsEditor.setScrollTop(scrollTop)
  }
}

/** 添加冲突高亮装饰 */
const updateDecorations = () => {
  if (!mergedEditor) return

  // 解析合并内容中的冲突块位置
  const lines = props.mergedContent.split('\n')
  const conflictRanges: Array<{
    startLine: number
    midLine: number
    endLine: number
    hunkId: string
  }> = []

  let hunkIndex = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('<<<<<<<')) {
      const startLine = i + 1
      let midLine = startLine
      let endLine = startLine

      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j] === '=======') {
          midLine = j + 1
        }
        if (lines[j].startsWith('>>>>>>>')) {
          endLine = j + 1
          break
        }
      }

      const hunk = props.hunks[hunkIndex]
      if (hunk) {
        conflictRanges.push({
          startLine,
          midLine,
          endLine,
          hunkId: hunk.id
        })
      }
      hunkIndex++
    }
  }

  // 创建装饰
  const newDecorations: monaco.editor.IModelDeltaDecoration[] = conflictRanges.flatMap((range, idx) => {
    const isActive = idx === activeHunkIndex.value
    const hunk = props.hunks.find(h => h.id === range.hunkId)
    const isResolved = hunk?.resolution !== 'unresolved'

    if (isResolved) {
      return []
    }

    return [
      // Ours 部分 (上半部分) - 绿色
      {
        range: new monaco.Range(range.startLine, 1, range.midLine - 1, 1),
        options: {
          isWholeLine: true,
          className: isActive ? 'conflict-ours-active' : 'conflict-ours',
          glyphMarginClassName: 'conflict-glyph-ours'
        }
      },
      // Theirs 部分 (下半部分) - 蓝色
      {
        range: new monaco.Range(range.midLine, 1, range.endLine, 1),
        options: {
          isWholeLine: true,
          className: isActive ? 'conflict-theirs-active' : 'conflict-theirs',
          glyphMarginClassName: 'conflict-glyph-theirs'
        }
      }
    ]
  })

  mergedDecorations = mergedEditor.deltaDecorations(mergedDecorations, newDecorations)
}

/** 跳转到指定冲突块 */
const goToHunk = (index: number) => {
  if (!mergedEditor || index < 0 || index >= props.hunks.length) return

  activeHunkIndex.value = index

  // 找到冲突块在合并内容中的位置
  const lines = props.mergedContent.split('\n')
  let lineNumber = 1
  let hunkCount = 0

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('<<<<<<<')) {
      if (hunkCount === index) {
        lineNumber = i + 1
        break
      }
      hunkCount++
    }
  }

  mergedEditor.revealLineInCenter(lineNumber)
  updateDecorations()
}

/** 下一个冲突 */
const nextHunk = () => {
  const unresolvedHunks = props.hunks
    .map((h, i) => ({ hunk: h, index: i }))
    .filter(({ hunk }) => hunk.resolution === 'unresolved')

  if (unresolvedHunks.length === 0) return

  const currentUnresolvedIndex = unresolvedHunks.findIndex(
    ({ index }) => index > activeHunkIndex.value
  )

  if (currentUnresolvedIndex !== -1) {
    goToHunk(unresolvedHunks[currentUnresolvedIndex].index)
  } else {
    goToHunk(unresolvedHunks[0].index)
  }
}

/** 上一个冲突 */
const prevHunk = () => {
  const unresolvedHunks = props.hunks
    .map((h, i) => ({ hunk: h, index: i }))
    .filter(({ hunk }) => hunk.resolution === 'unresolved')

  if (unresolvedHunks.length === 0) return

  const currentUnresolvedIndex = unresolvedHunks
    .slice()
    .reverse()
    .findIndex(({ index }) => index < activeHunkIndex.value)

  if (currentUnresolvedIndex !== -1) {
    goToHunk(unresolvedHunks[unresolvedHunks.length - 1 - currentUnresolvedIndex].index)
  } else {
    goToHunk(unresolvedHunks[unresolvedHunks.length - 1].index)
  }
}

/** 初始化编辑器 */
onMounted(async () => {
  await nextTick()

  if (oursContainer.value) {
    oursEditor = createEditor(oursContainer.value, props.oursContent, true)
    oursEditor.onDidScrollChange(() => syncScroll(oursEditor!))
  }

  if (mergedContainer.value) {
    mergedEditor = createEditor(mergedContainer.value, props.mergedContent, false)
    mergedEditor.onDidScrollChange(() => syncScroll(mergedEditor!))

    // 监听内容变化
    mergedEditor.onDidChangeModelContent(() => {
      const value = mergedEditor!.getValue()
      emit('update:mergedContent', value)
    })

    updateDecorations()
  }

  if (theirsContainer.value) {
    theirsEditor = createEditor(theirsContainer.value, props.theirsContent, true)
    theirsEditor.onDidScrollChange(() => syncScroll(theirsEditor!))
  }

  // 如果有未解决的冲突,跳转到第一个
  const firstUnresolved = props.hunks.findIndex(h => h.resolution === 'unresolved')
  if (firstUnresolved !== -1) {
    goToHunk(firstUnresolved)
  }
})

/** 清理编辑器 */
onUnmounted(() => {
  oursEditor?.dispose()
  mergedEditor?.dispose()
  theirsEditor?.dispose()
})

/** 监听内容变化 */
watch(() => props.mergedContent, (newContent) => {
  if (mergedEditor && mergedEditor.getValue() !== newContent) {
    mergedEditor.setValue(newContent)
    updateDecorations()
  }
})

watch(() => props.hunks, () => {
  updateDecorations()
}, { deep: true })

/** 解决当前冲突块 */
const resolveCurrentHunk = (resolution: ConflictResolution) => {
  const hunk = props.hunks[activeHunkIndex.value]
  if (hunk) {
    emit('resolve-hunk', hunk.id, resolution)
  }
}

// 暴露方法给父组件
defineExpose({
  nextHunk,
  prevHunk,
  goToHunk
})
</script>

<template>
  <div class="three-way-merge-editor">
    <!-- 面板标题 -->
    <div class="panel-headers">
      <div class="panel-header ours">
        <span class="label">本地 (Ours)</span>
        <span class="sublabel">HEAD</span>
      </div>
      <div class="panel-header merged">
        <span class="label">合并结果</span>
        <span class="sublabel">可编辑</span>
      </div>
      <div class="panel-header theirs">
        <span class="label">远程 (Theirs)</span>
        <span class="sublabel">Incoming</span>
      </div>
    </div>

    <!-- 编辑器区域 -->
    <div class="editors-container">
      <!-- Ours 编辑器 -->
      <div class="editor-panel ours">
        <div ref="oursContainer" class="editor-container"></div>
      </div>

      <!-- 中间控制条 -->
      <div class="merge-controls left">
        <mdui-tooltip content="接受本地" placement="right">
          <mdui-button-icon
            @click="resolveCurrentHunk('ours')"
            :disabled="hunks.length === 0 || hunks[activeHunkIndex]?.resolution !== 'unresolved'"
          >
            <mdui-icon-chevron-right></mdui-icon-chevron-right>
          </mdui-button-icon>
        </mdui-tooltip>
      </div>

      <!-- Merged 编辑器 -->
      <div class="editor-panel merged">
        <div ref="mergedContainer" class="editor-container"></div>
      </div>

      <!-- 右侧控制条 -->
      <div class="merge-controls right">
        <mdui-tooltip content="接受远程" placement="left">
          <mdui-button-icon
            @click="resolveCurrentHunk('theirs')"
            :disabled="hunks.length === 0 || hunks[activeHunkIndex]?.resolution !== 'unresolved'"
          >
            <mdui-icon-chevron-left></mdui-icon-chevron-left>
          </mdui-button-icon>
        </mdui-tooltip>
        <mdui-tooltip content="接受两者" placement="left">
          <mdui-button-icon
            @click="resolveCurrentHunk('both')"
            :disabled="hunks.length === 0 || hunks[activeHunkIndex]?.resolution !== 'unresolved'"
          >
            <mdui-icon-unfold-more></mdui-icon-unfold-more>
          </mdui-button-icon>
        </mdui-tooltip>
      </div>

      <!-- Theirs 编辑器 -->
      <div class="editor-panel theirs">
        <div ref="theirsContainer" class="editor-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.three-way-merge-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.panel-headers {
  display: flex;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.panel-header {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--mdui-color-surface-container);
}

.panel-header.ours {
  background: rgba(76, 175, 80, 0.1);
  border-right: 1px solid var(--mdui-color-outline-variant);
}

.panel-header.merged {
  background: var(--mdui-color-surface-container-high);
}

.panel-header.theirs {
  background: rgba(33, 150, 243, 0.1);
  border-left: 1px solid var(--mdui-color-outline-variant);
}

.panel-header .label {
  font-size: 12px;
  font-weight: 600;
  color: var(--mdui-color-on-surface);
}

.panel-header .sublabel {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
}

.editors-container {
  flex: 1;
  display: flex;
  min-height: 0;
}

.editor-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.editor-panel.ours {
  border-right: 1px solid var(--mdui-color-outline-variant);
}

.editor-panel.theirs {
  border-left: 1px solid var(--mdui-color-outline-variant);
}

.editor-container {
  flex: 1;
  min-height: 0;
}

.merge-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px;
  background: var(--mdui-color-surface-container-low);
}

.merge-controls mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}
</style>

<style>
/* 全局样式 - 冲突高亮 */
.conflict-ours {
  background: rgba(76, 175, 80, 0.15) !important;
}

.conflict-ours-active {
  background: rgba(76, 175, 80, 0.3) !important;
}

.conflict-theirs {
  background: rgba(33, 150, 243, 0.15) !important;
}

.conflict-theirs-active {
  background: rgba(33, 150, 243, 0.3) !important;
}

.conflict-glyph-ours {
  background: #4caf50;
  width: 4px !important;
  margin-left: 3px;
  border-radius: 2px;
}

.conflict-glyph-theirs {
  background: #2196f3;
  width: 4px !important;
  margin-left: 3px;
  border-radius: 2px;
}
</style>
