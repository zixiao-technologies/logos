<script setup lang="ts">
/**
 * 分支选择器组件
 */

import { ref, computed } from 'vue'
import type { GitBranch } from '@/types'

// 导入 MDUI 图标
import '@mdui/icons/source.js'
import '@mdui/icons/arrow-drop-down.js'
import '@mdui/icons/add.js'
import '@mdui/icons/check.js'
import '@mdui/icons/delete.js'

const props = defineProps<{
  /** 当前分支 */
  currentBranch: string
  /** 分支列表 */
  branches: GitBranch[]
  /** 是否正在加载 */
  loading?: boolean
}>()

const emit = defineEmits<{
  /** 切换分支 */
  checkout: [branchName: string]
  /** 创建分支 */
  createBranch: [branchName: string]
  /** 删除分支 */
  deleteBranch: [branchName: string]
  /** 刷新 */
  refresh: []
}>()

const showMenu = ref(false)
const showCreateDialog = ref(false)
const newBranchName = ref('')

const localBranches = computed(() => props.branches.filter(b => !b.remote))
const currentBranchInfo = computed(() => props.branches.find(b => b.current))

const handleCheckout = (branchName: string) => {
  if (branchName !== props.currentBranch) {
    emit('checkout', branchName)
  }
  showMenu.value = false
}

const handleCreateBranch = () => {
  showMenu.value = false
  newBranchName.value = ''
  showCreateDialog.value = true
}

const confirmCreateBranch = () => {
  if (newBranchName.value.trim()) {
    emit('createBranch', newBranchName.value.trim())
    showCreateDialog.value = false
  }
}

const handleDeleteBranch = (branchName: string) => {
  if (branchName !== props.currentBranch) {
    emit('deleteBranch', branchName)
  }
}
</script>

<template>
  <div class="branch-selector">
    <!-- 分支按钮 -->
    <div class="branch-button" @click="showMenu = !showMenu">
      <mdui-icon-source></mdui-icon-source>
      <span class="branch-name">{{ currentBranch || 'No branch' }}</span>
      <template v-if="currentBranchInfo">
        <span v-if="currentBranchInfo.ahead" class="sync-info ahead">
          ↑{{ currentBranchInfo.ahead }}
        </span>
        <span v-if="currentBranchInfo.behind" class="sync-info behind">
          ↓{{ currentBranchInfo.behind }}
        </span>
      </template>
      <mdui-icon-arrow-drop-down class="dropdown-icon"></mdui-icon-arrow-drop-down>
    </div>

    <!-- 分支菜单 -->
    <mdui-menu
      v-if="showMenu"
      class="branch-menu"
      @closed="showMenu = false"
    >
      <!-- 创建分支 -->
      <mdui-menu-item @click="handleCreateBranch">
        <mdui-icon-add slot="icon"></mdui-icon-add>
        新建分支...
      </mdui-menu-item>

      <mdui-divider></mdui-divider>

      <!-- 本地分支 -->
      <div class="menu-section-title">本地分支</div>
      <mdui-menu-item
        v-for="branch in localBranches"
        :key="branch.name"
        :class="{ current: branch.current }"
        @click="handleCheckout(branch.name)"
      >
        <mdui-icon-check v-if="branch.current" slot="icon"></mdui-icon-check>
        <mdui-icon-source v-else slot="icon"></mdui-icon-source>
        <span class="branch-item-name">{{ branch.name }}</span>
        <template v-if="!branch.current">
          <mdui-button-icon
            slot="end-icon"
            @click.stop="handleDeleteBranch(branch.name)"
            title="删除分支"
          >
            <mdui-icon-delete></mdui-icon-delete>
          </mdui-button-icon>
        </template>
      </mdui-menu-item>
    </mdui-menu>

    <!-- 创建分支对话框 -->
    <mdui-dialog
      :open="showCreateDialog"
      @closed="showCreateDialog = false"
    >
      <span slot="headline">创建分支</span>
      <mdui-text-field
        slot="description"
        label="分支名称"
        v-model="newBranchName"
        @keydown.enter="confirmCreateBranch"
      ></mdui-text-field>
      <mdui-button slot="action" variant="text" @click="showCreateDialog = false">
        取消
      </mdui-button>
      <mdui-button slot="action" @click="confirmCreateBranch">
        创建
      </mdui-button>
    </mdui-dialog>
  </div>
</template>

<style scoped>
.branch-selector {
  position: relative;
}

.branch-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--mdui-color-surface-container);
  border: 1px solid var(--mdui-color-outline-variant);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.1s;
}

.branch-button:hover {
  background: var(--mdui-color-surface-container-high);
}

.branch-button mdui-icon-source,
.branch-button mdui-icon-arrow-drop-down {
  font-size: 18px;
  color: var(--mdui-color-on-surface-variant);
}

.branch-name {
  font-size: 13px;
  color: var(--mdui-color-on-surface);
  font-weight: 500;
}

.sync-info {
  font-size: 11px;
  padding: 1px 4px;
  border-radius: 4px;
}

.sync-info.ahead {
  background: var(--mdui-color-tertiary-container);
  color: var(--mdui-color-on-tertiary-container);
}

.sync-info.behind {
  background: var(--mdui-color-error-container);
  color: var(--mdui-color-on-error-container);
}

.dropdown-icon {
  margin-left: auto;
}

.branch-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
}

.menu-section-title {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--mdui-color-on-surface-variant);
  padding: 8px 16px 4px;
}

.branch-item-name {
  flex: 1;
}

mdui-menu-item.current {
  background: var(--mdui-color-secondary-container);
}
</style>
