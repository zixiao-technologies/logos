<script setup lang="ts">
/**
 * ReflogView - Reflog 查看器视图
 */

import { ReflogViewer } from '@/components/Git/Reflog'
</script>

<template>
  <div class="reflog-view">
    <ReflogViewer />
  </div>
</template>

<style scoped>
.reflog-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
