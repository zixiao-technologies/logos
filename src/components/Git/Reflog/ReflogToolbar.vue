<script setup lang="ts">
/**
 * ReflogToolbar - Reflog 工具栏
 * 搜索、过滤、刷新
 */

import { ref, computed } from 'vue'
import type { ReflogOperationType } from '@/types/reflog'

import '@mdui/icons/search.js'
import '@mdui/icons/filter-list.js'
import '@mdui/icons/refresh.js'
import '@mdui/icons/close.js'

const props = defineProps<{
  search: string
  operationTypes: ReflogOperationType[]
  orphanedOnly: boolean
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:operation-types', value: ReflogOperationType[]): void
  (e: 'update:orphaned-only', value: boolean): void
  (e: 'refresh'): void
  (e: 'clear-filters'): void
}>()

// 过滤面板显示
const showFilters = ref(false)

// 所有操作类型
const allOperationTypes: { value: ReflogOperationType; label: string }[] = [
  { value: 'commit', label: '提交' },
  { value: 'checkout', label: '切换' },
  { value: 'reset', label: '重置' },
  { value: 'merge', label: '合并' },
  { value: 'rebase', label: '变基' },
  { value: 'cherry-pick', label: '摘取' },
  { value: 'pull', label: '拉取' },
  { value: 'stash', label: '存储' },
  { value: 'branch', label: '分支' },
  { value: 'other', label: '其他' }
]

// 是否有活动过滤器
const hasActiveFilters = computed(() => {
  return props.search.length > 0 ||
    props.operationTypes.length > 0 ||
    props.orphanedOnly
})

// 切换操作类型
const toggleOperationType = (type: ReflogOperationType) => {
  const current = [...props.operationTypes]
  const index = current.indexOf(type)
  if (index === -1) {
    current.push(type)
  } else {
    current.splice(index, 1)
  }
  emit('update:operation-types', current)
}

// 更新搜索
const handleSearchInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:search', target.value)
}

// 清除过滤
const handleClearFilters = () => {
  emit('clear-filters')
}
</script>

<template>
  <div class="reflog-toolbar">
    <div class="toolbar-main">
      <!-- 搜索框 -->
      <div class="search-box">
        <mdui-icon-search></mdui-icon-search>
        <input
          type="text"
          :value="search"
          @input="handleSearchInput"
          placeholder="搜索提交消息、Hash、作者..."
        />
        <mdui-button-icon
          v-if="search"
          @click="emit('update:search', '')"
          title="清除搜索"
        >
          <mdui-icon-close></mdui-icon-close>
        </mdui-button-icon>
      </div>

      <!-- 过滤按钮 -->
      <mdui-button-icon
        @click="showFilters = !showFilters"
        :class="{ active: showFilters || hasActiveFilters }"
        title="过滤"
      >
        <mdui-icon-filter-list></mdui-icon-filter-list>
      </mdui-button-icon>

      <!-- 刷新按钮 -->
      <mdui-button-icon
        @click="emit('refresh')"
        :disabled="isLoading"
        title="刷新"
      >
        <mdui-icon-refresh></mdui-icon-refresh>
      </mdui-button-icon>
    </div>

    <!-- 过滤面板 -->
    <div v-if="showFilters" class="filter-panel">
      <div class="filter-section">
        <span class="filter-label">操作类型</span>
        <div class="filter-chips">
          <mdui-chip
            v-for="type in allOperationTypes"
            :key="type.value"
            :selected="operationTypes.includes(type.value)"
            @click="toggleOperationType(type.value)"
          >
            {{ type.label }}
          </mdui-chip>
        </div>
      </div>

      <div class="filter-section">
        <label class="checkbox-label">
          <mdui-checkbox
            :checked="orphanedOnly"
            @change="emit('update:orphaned-only', !orphanedOnly)"
          ></mdui-checkbox>
          <span>只显示孤儿提交 (可恢复)</span>
        </label>
      </div>

      <div v-if="hasActiveFilters" class="filter-actions">
        <mdui-button variant="text" @click="handleClearFilters">
          清除所有过滤
        </mdui-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reflog-toolbar {
  background: var(--mdui-color-surface-container);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.toolbar-main {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 36px;
  background: var(--mdui-color-surface);
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 18px;
  transition: border-color 0.15s;
}

.search-box:focus-within {
  border-color: var(--mdui-color-primary);
}

.search-box mdui-icon-search {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  outline: none;
}

.search-box input::placeholder {
  color: var(--mdui-color-on-surface-variant);
}

.search-box mdui-button-icon {
  --mdui-comp-button-icon-size: 24px;
  margin-right: -8px;
}

.toolbar-main > mdui-button-icon {
  --mdui-comp-button-icon-size: 36px;
}

.toolbar-main > mdui-button-icon.active {
  color: var(--mdui-color-primary);
  background: var(--mdui-color-primary-container);
  border-radius: 50%;
}

.filter-panel {
  padding: 12px 16px;
  background: var(--mdui-color-surface-container-low);
  border-top: 1px solid var(--mdui-color-outline-variant);
}

.filter-section {
  margin-bottom: 12px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  margin-bottom: 8px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-chips mdui-chip {
  --mdui-comp-chip-container-height: 28px;
  font-size: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  cursor: pointer;
}

.filter-actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--mdui-color-outline-variant);
}
</style>
