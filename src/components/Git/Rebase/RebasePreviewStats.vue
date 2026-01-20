<script setup lang="ts">
/**
 * RebasePreviewStats - Rebase 预览统计
 * 显示操作后的提交统计
 */

import { computed } from 'vue'
import type { RebaseCommitAction } from '@/types/rebase'

import '@mdui/icons/delete-outline.js'
import '@mdui/icons/compress.js'
import '@mdui/icons/edit-note.js'
import '@mdui/icons/commit.js'

const props = defineProps<{
  commits: RebaseCommitAction[]
}>()

// 统计
const stats = computed(() => {
  const total = props.commits.length
  const picked = props.commits.filter(c => c.action === 'pick').length
  const rewording = props.commits.filter(c => c.action === 'reword').length
  const editing = props.commits.filter(c => c.action === 'edit').length
  const squashing = props.commits.filter(c => c.action === 'squash' || c.action === 'fixup').length
  const dropping = props.commits.filter(c => c.action === 'drop').length

  // 计算最终提交数
  let resulting = 0
  for (let i = 0; i < props.commits.length; i++) {
    const action = props.commits[i].action
    if (action === 'drop') continue
    if (action === 'squash' || action === 'fixup') continue
    resulting++
  }

  return {
    total,
    picked,
    rewording,
    editing,
    squashing,
    dropping,
    resulting
  }
})
</script>

<template>
  <div class="rebase-preview-stats">
    <div class="stats-header">操作预览</div>

    <div class="stats-grid">
      <div class="stat-item">
        <mdui-icon-commit></mdui-icon-commit>
        <span class="label">原始提交</span>
        <span class="value">{{ stats.total }}</span>
      </div>

      <div class="stat-item resulting">
        <mdui-icon-commit></mdui-icon-commit>
        <span class="label">最终提交</span>
        <span class="value">{{ stats.resulting }}</span>
      </div>

      <div v-if="stats.rewording > 0" class="stat-item reword">
        <mdui-icon-edit-note></mdui-icon-edit-note>
        <span class="label">修改消息</span>
        <span class="value">{{ stats.rewording }}</span>
      </div>

      <div v-if="stats.squashing > 0" class="stat-item squash">
        <mdui-icon-compress></mdui-icon-compress>
        <span class="label">合并</span>
        <span class="value">{{ stats.squashing }}</span>
      </div>

      <div v-if="stats.dropping > 0" class="stat-item drop">
        <mdui-icon-delete-outline></mdui-icon-delete-outline>
        <span class="label">删除</span>
        <span class="value">{{ stats.dropping }}</span>
      </div>
    </div>

    <div v-if="stats.dropping > 0" class="warning">
      <strong>警告:</strong> {{ stats.dropping }} 个提交将被永久删除
    </div>
  </div>
</template>

<style scoped>
.rebase-preview-stats {
  background: var(--mdui-color-surface-container-low);
  border-radius: 8px;
  padding: 16px;
}

.stats-header {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--mdui-color-surface);
  border-radius: 6px;
  border-left: 3px solid var(--mdui-color-outline-variant);
}

.stat-item mdui-icon-commit,
.stat-item mdui-icon-edit-note,
.stat-item mdui-icon-compress,
.stat-item mdui-icon-delete-outline {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.stat-item .label {
  flex: 1;
  font-size: 12px;
  color: var(--mdui-color-on-surface-variant);
}

.stat-item .value {
  font-size: 14px;
  font-weight: 600;
  color: var(--mdui-color-on-surface);
}

.stat-item.resulting {
  border-left-color: var(--mdui-color-primary);
}

.stat-item.resulting mdui-icon-commit {
  color: var(--mdui-color-primary);
}

.stat-item.reword {
  border-left-color: #2196f3;
}

.stat-item.reword mdui-icon-edit-note {
  color: #2196f3;
}

.stat-item.squash {
  border-left-color: #9c27b0;
}

.stat-item.squash mdui-icon-compress {
  color: #9c27b0;
}

.stat-item.drop {
  border-left-color: #f44336;
}

.stat-item.drop mdui-icon-delete-outline {
  color: #f44336;
}

.warning {
  margin-top: 12px;
  padding: 10px 12px;
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
  border-radius: 6px;
  font-size: 12px;
}

.warning strong {
  font-weight: 600;
}
</style>
