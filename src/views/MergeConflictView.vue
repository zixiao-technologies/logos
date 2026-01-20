<script setup lang="ts">
/**
 * MergeConflictView - 合并冲突解决视图
 */

import { MergeConflictPanel } from '@/components/Git/Merge'
</script>

<template>
  <div class="merge-conflict-view">
    <MergeConflictPanel />
  </div>
</template>

<style scoped>
.merge-conflict-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
