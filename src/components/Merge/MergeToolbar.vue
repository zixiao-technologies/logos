<script setup lang="ts">
/**
 * 合并工具栏组件
 */

// 导入 MDUI 图标
import '@mdui/icons/check.js'
import '@mdui/icons/close.js'
import '@mdui/icons/keyboard-arrow-up.js'
import '@mdui/icons/keyboard-arrow-down.js'
import '@mdui/icons/content-copy.js'

interface Props {
  canContinue: boolean
  canAbort: boolean
  unresolvedCount: number
  loading?: boolean
  isRebase?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  isRebase: false
})

const emit = defineEmits<{
  (e: 'continue'): void
  (e: 'abort'): void
  (e: 'prevConflict'): void
  (e: 'nextConflict'): void
  (e: 'acceptAllOurs'): void
  (e: 'acceptAllTheirs'): void
}>()
</script>

<template>
  <div class="merge-toolbar">
    <div class="toolbar-left">
      <!-- 冲突导航 -->
      <div class="conflict-nav">
        <mdui-button-icon
          @click="emit('prevConflict')"
          title="上一个冲突 (⌘[)"
          :disabled="unresolvedCount === 0"
        >
          <mdui-icon-keyboard-arrow-up></mdui-icon-keyboard-arrow-up>
        </mdui-button-icon>
        <mdui-button-icon
          @click="emit('nextConflict')"
          title="下一个冲突 (⌘])"
          :disabled="unresolvedCount === 0"
        >
          <mdui-icon-keyboard-arrow-down></mdui-icon-keyboard-arrow-down>
        </mdui-button-icon>
        <span class="conflict-count" :class="{ 'all-resolved': unresolvedCount === 0 }">
          {{ unresolvedCount === 0 ? '全部已解决' : `${unresolvedCount} 个冲突待解决` }}
        </span>
      </div>
    </div>

    <div class="toolbar-center">
      <!-- 快速操作 -->
      <mdui-button
        variant="text"
        @click="emit('acceptAllOurs')"
        :disabled="unresolvedCount === 0"
        title="接受所有本地版本"
      >
        全部接受本地
      </mdui-button>
      <mdui-button
        variant="text"
        @click="emit('acceptAllTheirs')"
        :disabled="unresolvedCount === 0"
        title="接受所有远程版本"
      >
        全部接受远程
      </mdui-button>
    </div>

    <div class="toolbar-right">
      <!-- 中止按钮 -->
      <mdui-button
        variant="text"
        @click="emit('abort')"
        :disabled="!canAbort || loading"
      >
        <mdui-icon-close slot="icon"></mdui-icon-close>
        中止{{ isRebase ? ' Rebase' : '合并' }}
      </mdui-button>

      <!-- 继续按钮 -->
      <mdui-button
        variant="filled"
        @click="emit('continue')"
        :disabled="!canContinue || loading"
        :loading="loading"
      >
        <mdui-icon-check slot="icon"></mdui-icon-check>
        完成{{ isRebase ? ' Rebase' : '合并' }}
      </mdui-button>
    </div>
  </div>
</template>

<style scoped>
.merge-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
  background: var(--mdui-color-surface-container);
  border-bottom: 1px solid var(--mdui-color-outline-variant);
}

.toolbar-left,
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.conflict-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.conflict-nav mdui-button-icon {
  --mdui-comp-button-icon-size: 28px;
}

.conflict-count {
  font-size: 12px;
  color: var(--mdui-color-error);
  padding: 4px 8px;
  background: var(--mdui-color-error-container);
  border-radius: 12px;
}

.conflict-count.all-resolved {
  color: var(--mdui-color-primary);
  background: var(--mdui-color-primary-container);
}

.toolbar-center mdui-button {
  --mdui-comp-button-height: 32px;
  font-size: 12px;
}

.toolbar-right mdui-button {
  --mdui-comp-button-height: 36px;
}
</style>
