<script setup lang="ts">
/**
 * 搜索面板
 * 工作区内容搜索 + 文件名过滤
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { FileNode } from '@/types'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useEditorStore } from '@/stores/editor'

import '@mdui/icons/search.js'
import '@mdui/icons/refresh.js'
import '@mdui/icons/close.js'
import '@mdui/icons/cases.js'
import '@mdui/icons/code.js'
import '@mdui/icons/segment.js'

interface SearchMatch {
  line: number
  column: number
  preview: string
  highlightStart: number
  highlightLength: number
}

interface SearchResult {
  path: string
  relativePath: string
  matches: SearchMatch[]
}

const fileExplorerStore = useFileExplorerStore()
const editorStore = useEditorStore()

const query = ref('')
const includePattern = ref('')
const excludePattern = ref('')
const fileTypes = ref('')
const matchCase = ref(false)
const useRegex = ref(false)
const wholeWord = ref(false)
const results = ref<SearchResult[]>([])
const isSearching = ref(false)
const errorMessage = ref<string | null>(null)
const indexStatus = ref<'idle' | 'building' | 'ready' | 'dirty'>('idle')

const expandedFiles = ref<Set<string>>(new Set())
let searchTimer: ReturnType<typeof setTimeout> | null = null
let activeSearchToken = 0
let unsubscribeFileChanges: (() => void) | null = null

const fileIndexCache = ref<{ root: string; files: FileNode[] } | null>(null)
const contentCache = new Map<string, { content: string; size: number; lastAccess: number }>()
let contentCacheBytes = 0
const MAX_CONTENT_CACHE_BYTES = 5_000_000
const MAX_FILE_SIZE = 2_000_000

const handleExternalQuery = (event: Event) => {
  const detail = (event as CustomEvent<{ query?: string }>).detail
  if (detail?.query !== undefined) {
    query.value = detail.query
    scheduleSearch()
  }
}

const hasWorkspace = computed(() => Boolean(fileExplorerStore.rootPath))

const matchCount = computed(() => {
  return results.value.reduce((sum, item) => sum + item.matches.length, 0)
})

const fileCount = computed(() => results.value.length)

const buildRegex = () => {
  if (!query.value.trim()) return null
  const flags = matchCase.value ? 'g' : 'gi'
  try {
    if (useRegex.value) {
      return new RegExp(query.value, flags)
    }
    const escaped = query.value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
    const body = wholeWord.value ? `\\b${escaped}\\b` : escaped
    return new RegExp(body, flags)
  } catch (error) {
    errorMessage.value = (error as Error).message
    return null
  }
}

const parseFileTypes = () => {
  return fileTypes.value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => (item.startsWith('.') ? item.toLowerCase() : `.${item.toLowerCase()}`))
}

const fileTypeMatches = (path: string) => {
  const types = parseFileTypes()
  if (types.length === 0) return true
  const lower = path.toLowerCase()
  return types.some(ext => lower.endsWith(ext))
}

const pathMatches = (path: string) => {
  const includeTokens = includePattern.value.split(',').map(item => item.trim()).filter(Boolean)
  const excludeTokens = excludePattern.value.split(',').map(item => item.trim()).filter(Boolean)
  const lowerPath = path.toLowerCase()

  if (includeTokens.length > 0 && !includeTokens.some(token => lowerPath.includes(token.toLowerCase()))) {
    return false
  }
  if (excludeTokens.length > 0 && excludeTokens.some(token => lowerPath.includes(token.toLowerCase()))) {
    return false
  }
  return fileTypeMatches(path)
}

const flattenFiles = (nodes: FileNode[]): FileNode[] => {
  const files: FileNode[] = []
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'file') {
      files.push(node)
    } else if (node.children && node.children.length) {
      stack.push(...node.children)
    }
  }
  return files
}

const getRelativePath = (path: string) => {
  const root = fileExplorerStore.rootPath
  if (!root) return path
  const normalizedRoot = root.replace(/\\/g, '/')
  const normalizedPath = path.replace(/\\/g, '/')
  if (normalizedPath.startsWith(normalizedRoot)) {
    return normalizedPath.slice(normalizedRoot.length + 1)
  }
  return path
}

const buildPreview = (line: string, matchIndex: number, matchLength: number) => {
  const maxLength = 160
  if (line.length <= maxLength) {
    return { preview: line, offset: 0, prefix: 0 }
  }
  const context = 40
  const start = Math.max(0, matchIndex - context)
  const end = Math.min(line.length, matchIndex + matchLength + context)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < line.length ? '…' : ''
  return {
    preview: `${prefix}${line.slice(start, end)}${suffix}`,
    offset: start,
    prefix: prefix.length
  }
}

const getFileIndex = async (force = false) => {
  const rootPath = fileExplorerStore.rootPath
  if (!rootPath) return []
  if (!force && fileIndexCache.value?.root === rootPath && indexStatus.value !== 'dirty') {
    return fileIndexCache.value.files
  }

  indexStatus.value = 'building'
  const tree = await window.electronAPI.fileSystem.readDirectory(rootPath, true)
  const files = flattenFiles(tree)
  fileIndexCache.value = { root: rootPath, files }
  indexStatus.value = 'ready'
  return files
}

const getCachedContent = async (path: string) => {
  const cached = contentCache.get(path)
  if (cached) {
    cached.lastAccess = Date.now()
    return cached.content
  }
  const content = await window.electronAPI.fileSystem.readFile(path)
  const size = content.length
  if (size <= MAX_FILE_SIZE) {
    while (contentCacheBytes + size > MAX_CONTENT_CACHE_BYTES && contentCache.size > 0) {
      const oldest = [...contentCache.entries()].sort((a, b) => a[1].lastAccess - b[1].lastAccess)[0]
      contentCache.delete(oldest[0])
      contentCacheBytes -= oldest[1].size
    }
    contentCache.set(path, { content, size, lastAccess: Date.now() })
    contentCacheBytes += size
  }
  return content
}

const searchWorkspace = async (forceIndex = false) => {
  const token = ++activeSearchToken
  results.value = []
  errorMessage.value = null

  if (!hasWorkspace.value || !query.value.trim()) {
    return
  }

  isSearching.value = true
  try {
    const regex = buildRegex()
    if (!regex) {
      isSearching.value = false
      return
    }
    const files = (await getFileIndex(forceIndex)).filter(file => pathMatches(file.path))
    const maxResults = 200
    const maxMatchesPerFile = 20

    for (const file of files) {
      if (token !== activeSearchToken) return
      const content = await getCachedContent(file.path)
      if (token !== activeSearchToken) return
      if (content.length > MAX_FILE_SIZE) continue

      const lines = content.split(/\r?\n/)
      const matches: SearchMatch[] = []
      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i]
        regex.lastIndex = 0
        let match = regex.exec(line)
        while (match) {
          if (match[0].length === 0) {
            regex.lastIndex += 1
            match = regex.exec(line)
            continue
          }
          const previewData = buildPreview(line, match.index, match[0].length)
          matches.push({
            line: i + 1,
            column: match.index + 1,
            preview: previewData.preview,
            highlightStart: match.index - previewData.offset + previewData.prefix,
            highlightLength: match[0].length
          })
          if (matches.length >= maxMatchesPerFile) break
          match = regex.exec(line)
        }
        if (matches.length >= maxMatchesPerFile) break
      }

      if (matches.length > 0) {
        results.value.push({
          path: file.path,
          relativePath: getRelativePath(file.path),
          matches
        })
        expandedFiles.value.add(file.path)
      }

      if (results.value.length >= maxResults) break
    }
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    if (token === activeSearchToken) {
      isSearching.value = false
    }
  }
}

const scheduleSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    searchWorkspace()
  }, 250)
}

const clearSearch = () => {
  query.value = ''
  results.value = []
  errorMessage.value = null
}

const toggleFile = (path: string) => {
  if (expandedFiles.value.has(path)) {
    expandedFiles.value.delete(path)
  } else {
    expandedFiles.value.add(path)
  }
}

const openMatch = async (result: SearchResult, match: SearchMatch) => {
  await editorStore.navigateToLocation(result.path, match.line, match.column)
}

const highlightSegments = (match: SearchMatch) => {
  const { preview, highlightStart, highlightLength } = match
  if (highlightStart < 0 || highlightLength <= 0 || highlightStart >= preview.length) {
    return [{ text: preview, highlight: false }]
  }
  return [
    { text: preview.slice(0, highlightStart), highlight: false },
    { text: preview.slice(highlightStart, highlightStart + highlightLength), highlight: true },
    { text: preview.slice(highlightStart + highlightLength), highlight: false }
  ]
}

watch([query, includePattern, excludePattern, fileTypes, matchCase, useRegex, wholeWord], () => {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  scheduleSearch()
})

watch(() => fileExplorerStore.rootPath, () => {
  results.value = []
  expandedFiles.value.clear()
  fileIndexCache.value = null
  indexStatus.value = 'idle'
  contentCache.clear()
  contentCacheBytes = 0
  if (query.value.trim()) {
    scheduleSearch()
  }
})

onMounted(() => {
  if (window.electronAPI?.fileSystem?.onFileChange) {
    unsubscribeFileChanges = window.electronAPI.fileSystem.onFileChange(() => {
      indexStatus.value = 'dirty'
    })
  }
  window.addEventListener('search-panel:set-query', handleExternalQuery)
})

onUnmounted(() => {
  if (unsubscribeFileChanges) {
    unsubscribeFileChanges()
    unsubscribeFileChanges = null
  }
  window.removeEventListener('search-panel:set-query', handleExternalQuery)
})
</script>

<template>
  <div class="search-panel">
    <div class="panel-header">
      <span class="title">搜索</span>
    </div>

    <div class="panel-content">
      <div class="search-controls">
        <div class="search-input">
          <mdui-text-field
            v-model="query"
            placeholder="在工作区中搜索"
            variant="outlined"
          >
            <mdui-icon-search slot="icon"></mdui-icon-search>
            <mdui-button-icon slot="end-icon" @click="clearSearch" title="清空" v-if="query">
              <mdui-icon-close></mdui-icon-close>
            </mdui-button-icon>
          </mdui-text-field>
        </div>
        <div class="search-options">
          <mdui-button-icon :class="{ active: matchCase }" @click="matchCase = !matchCase" title="区分大小写">
            <mdui-icon-cases></mdui-icon-cases>
          </mdui-button-icon>
          <mdui-button-icon :class="{ active: wholeWord }" @click="wholeWord = !wholeWord" title="全词匹配">
            <mdui-icon-segment></mdui-icon-segment>
          </mdui-button-icon>
          <mdui-button-icon :class="{ active: useRegex }" @click="useRegex = !useRegex" title="正则表达式">
            <mdui-icon-code></mdui-icon-code>
          </mdui-button-icon>
        </div>
        <div class="search-input">
          <mdui-text-field v-model="includePattern" placeholder="包含文件 (逗号分隔)" variant="outlined"></mdui-text-field>
        </div>
        <div class="search-input">
          <mdui-text-field v-model="excludePattern" placeholder="排除文件 (逗号分隔)" variant="outlined"></mdui-text-field>
        </div>
        <div class="search-input">
          <mdui-text-field v-model="fileTypes" placeholder="文件类型 (如: ts,tsx,md)" variant="outlined"></mdui-text-field>
        </div>
      </div>

      <div class="search-status" v-if="query">
        <span v-if="isSearching">搜索中…</span>
        <span v-else-if="errorMessage">{{ errorMessage }}</span>
        <span v-else>
          {{ fileCount }} 个文件，{{ matchCount }} 处匹配
        </span>
        <span v-if="indexStatus === 'dirty'" class="status-tag">索引需刷新</span>
        <mdui-button-icon @click="searchWorkspace(true)" title="刷新索引" :disabled="!hasWorkspace || !query">
          <mdui-icon-refresh></mdui-icon-refresh>
        </mdui-button-icon>
      </div>

      <div v-if="!hasWorkspace" class="empty-state">
        <p>请先打开文件夹</p>
      </div>
      <div v-else-if="!query" class="empty-state">
        <p>输入关键字开始搜索</p>
      </div>
      <div v-else-if="results.length === 0 && !isSearching" class="empty-state">
        <p>没有找到匹配结果</p>
      </div>
      <div v-else class="results">
        <div v-for="result in results" :key="result.path" class="result-group">
          <div class="result-header" @click="toggleFile(result.path)">
            <span class="path">{{ result.relativePath }}</span>
            <span class="count">{{ result.matches.length }}</span>
          </div>
          <div v-show="expandedFiles.has(result.path)" class="match-list">
            <div
              v-for="match in result.matches"
              :key="`${match.line}-${match.column}`"
              class="match-item"
              @click="openMatch(result, match)"
            >
              <span class="location">{{ match.line }}:{{ match.column }}</span>
              <span class="preview">
                <template v-for="segment in highlightSegments(match)" :key="`${segment.text}-${segment.highlight ? '1' : '0'}`">
                  <span :class="{ highlight: segment.highlight }">{{ segment.text }}</span>
                </template>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.panel-header .title {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  height: 100%;
  overflow: hidden;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input :deep(.mdui-text-field) {
  width: 100%;
}

.search-options {
  display: flex;
  gap: 6px;
}

.search-options mdui-button-icon {
  --mdui-comp-button-icon-size: 30px;
}

.search-options mdui-button-icon.active {
  background: var(--mdui-color-secondary-container);
  color: var(--mdui-color-on-secondary-container);
  border-radius: 6px;
}

.search-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.status-tag {
  margin-left: auto;
  margin-right: 8px;
  padding: 2px 6px;
  border-radius: 10px;
  background: var(--mdui-color-surface-container-high);
  font-size: 11px;
}

.results {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-group {
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 8px;
  overflow: hidden;
}

.result-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background: var(--mdui-color-surface-container-high);
  cursor: pointer;
}

.result-header .path {
  font-size: 12px;
}

.result-header .count {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  background: var(--mdui-color-surface-container);
}

.match-list {
  display: flex;
  flex-direction: column;
}

.match-item {
  display: flex;
  gap: 8px;
  padding: 6px 10px;
  border-top: 1px solid var(--mdui-color-outline-variant);
  cursor: pointer;
}

.match-item:hover {
  background: var(--mdui-color-surface-container);
}

.match-item .location {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  flex-shrink: 0;
  width: 60px;
}

.match-item .preview {
  font-size: 12px;
  color: var(--mdui-color-on-surface);
}

.match-item .preview .highlight {
  background: rgba(255, 214, 0, 0.3);
  border-radius: 2px;
  padding: 0 2px;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mdui-color-on-surface-variant);
}
</style>
