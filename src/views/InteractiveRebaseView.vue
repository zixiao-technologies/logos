<script setup lang="ts">
/**
 * InteractiveRebaseView - 交互式 Rebase 视图
 */

import { InteractiveRebaseEditor } from '@/components/Git/Rebase'
</script>

<template>
  <div class="interactive-rebase-view">
    <InteractiveRebaseEditor />
  </div>
</template>

<style scoped>
.interactive-rebase-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
