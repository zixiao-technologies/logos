<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useExtensionPanelsStore } from '@/stores/extensionPanels'
import ExtensionWebviewFrame from '@/components/Extensions/ExtensionWebviewFrame.vue'

import '@mdui/icons/close.js'

const panelsStore = useExtensionPanelsStore()

const activePanel = computed(() => panelsStore.activePanel)
const activeHandle = computed(() => panelsStore.activeHandle)
const activeHtml = computed(() => panelsStore.getHtml(activeHandle.value))
const activeOptions = computed(() => activePanel.value?.options || {})

const closePanel = () => {
  if (activeHandle.value) {
    panelsStore.close(activeHandle.value)
  }
}

onMounted(() => {
  panelsStore.init()
})
</script>

<template>
  <div class="extension-panel-view">
    <div class="panel-toolbar">
      <div class="panel-title">
        {{ activePanel?.title || 'Extension View' }}
      </div>
      <mdui-button-icon @click="closePanel" title="关闭">
        <mdui-icon-close></mdui-icon-close>
      </mdui-button-icon>
    </div>

    <div class="panel-content">
      <ExtensionWebviewFrame
        v-if="activePanel"
        :handle="activeHandle"
        :html="activeHtml"
        :enable-scripts="activeOptions.enableScripts ?? false"
      />
      <div v-else class="panel-empty">
        暂无扩展视图
      </div>
    </div>
  </div>
</template>

<style scoped>
.extension-panel-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--mdui-color-surface);
}

.panel-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--mdui-color-outline-variant);
  background: var(--mdui-color-surface-container);
}

.panel-title {
  font-size: 13px;
  font-weight: 500;
}

.panel-content {
  flex: 1;
  min-height: 0;
}

.panel-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--mdui-color-on-surface-variant);
}
</style>
