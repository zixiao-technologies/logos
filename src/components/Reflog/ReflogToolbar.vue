<script setup lang="ts">
/**
 * Reflog 工具栏组件
 */

import { ref } from 'vue'
import type { ReflogOperationType } from '@/types/reflog'

// 导入 MDUI 图标
import '@mdui/icons/refresh.js'
import '@mdui/icons/search.js'
import '@mdui/icons/filter-list.js'
import '@mdui/icons/close.js'

interface Props {
  loading: boolean
  totalCount: number
  filteredCount: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'search', query: string): void
  (e: 'filter', types: ReflogOperationType[]): void
  (e: 'clearFilters'): void
}>()

// 搜索关键词
const searchQuery = ref('')

// 选中的操作类型
const selectedTypes = ref<ReflogOperationType[]>([])

// 可用的操作类型
const operationTypes: { value: ReflogOperationType; label: string }[] = [
  { value: 'commit', label: '提交' },
  { value: 'checkout', label: '切换分支' },
  { value: 'reset', label: '重置' },
  { value: 'merge', label: '合并' },
  { value: 'rebase', label: '变基' },
  { value: 'cherry-pick', label: 'Cherry-pick' },
  { value: 'pull', label: '拉取' },
  { value: 'stash', label: '存储' }
]

// 执行搜索
const handleSearch = () => {
  emit('search', searchQuery.value)
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}

// 切换类型过滤
const toggleType = (type: ReflogOperationType) => {
  const index = selectedTypes.value.indexOf(type)
  if (index === -1) {
    selectedTypes.value.push(type)
  } else {
    selectedTypes.value.splice(index, 1)
  }
  emit('filter', [...selectedTypes.value])
}

// 清除所有过滤
const clearAllFilters = () => {
  searchQuery.value = ''
  selectedTypes.value = []
  emit('clearFilters')
}

// 是否有活动的过滤器
const hasActiveFilters = () => {
  return searchQuery.value || selectedTypes.value.length > 0
}
</script>

<template>
  <div class="reflog-toolbar">
    <div class="toolbar-left">
      <span class="title">Reflog</span>
      <span class="count">
        {{ filteredCount === totalCount ? totalCount : `${filteredCount} / ${totalCount}` }}
      </span>
    </div>

    <div class="toolbar-center">
      <!-- 搜索框 -->
      <div class="search-box">
        <mdui-icon-search></mdui-icon-search>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索..."
          @input="handleSearch"
          @keyup.enter="handleSearch"
        />
        <mdui-button-icon
          v-if="searchQuery"
          @click="clearSearch"
        >
          <mdui-icon-close></mdui-icon-close>
        </mdui-button-icon>
      </div>
    </div>

    <div class="toolbar-right">
      <!-- 过滤器按钮 -->
      <mdui-dropdown>
        <mdui-button-icon slot="trigger">
          <mdui-icon-filter-list></mdui-icon-filter-list>
        </mdui-button-icon>
        <mdui-menu>
          <mdui-menu-item
            v-for="type in operationTypes"
            :key="type.value"
            @click="toggleType(type.value)"
          >
            <mdui-checkbox
              slot="icon"
              :checked="selectedTypes.includes(type.value)"
            ></mdui-checkbox>
            {{ type.label }}
          </mdui-menu-item>
          <mdui-divider></mdui-divider>
          <mdui-menu-item
            v-if="hasActiveFilters()"
            @click="clearAllFilters"
          >
            清除所有过滤
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>

      <!-- 刷新按钮 -->
      <mdui-button-icon
        @click="emit('refresh')"
        :disabled="loading"
      >
        <mdui-icon-refresh :class="{ 'rotating': loading }"></mdui-icon-refresh>
      </mdui-button-icon>
    </div>
  </div>
</template>

<style scoped>
.reflog-toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: var(--mdui-color-surface-container);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.count {
  font-size: 11px;
  color: var(--mdui-color-on-surface-variant);
  padding: 2px 6px;
  background: var(--mdui-color-surface-variant);
  border-radius: 10px;
}

.toolbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: var(--mdui-color-surface);
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 20px;
  width: 300px;
  max-width: 100%;
}

.search-box mdui-icon-search {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
}

.search-box input::placeholder {
  color: var(--mdui-color-on-surface-variant);
}

.search-box mdui-button-icon {
  --mdui-comp-button-icon-size: 24px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
