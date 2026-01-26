<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useExtensionUiStore } from '@/stores/extensionUi'
import ExtensionWebviewFrame from './ExtensionWebviewFrame.vue'

const props = defineProps<{
  containerId: string
}>()

const extensionUiStore = useExtensionUiStore()
const views = computed(() => extensionUiStore.viewsByContainer(props.containerId))
const container = computed(() => extensionUiStore.containerById(props.containerId))
const activeViewId = ref<string | null>(null)

watch(
  () => views.value,
  (nextViews) => {
    if (!activeViewId.value && nextViews.length > 0) {
      activeViewId.value = nextViews[0].id
      return
    }
    if (activeViewId.value && !nextViews.some(view => view.id === activeViewId.value)) {
      activeViewId.value = nextViews[0]?.id ?? null
    }
  },
  { immediate: true }
)

watch(
  () => activeViewId.value,
  async (viewId) => {
    if (viewId) {
      await extensionUiStore.resolveView(viewId)
    }
  },
  { immediate: true }
)

onMounted(() => {
  extensionUiStore.init()
})

onUnmounted(() => {
  for (const view of views.value) {
    extensionUiStore.disposeView(view.id)
  }
})

const viewHtml = computed(() => extensionUiStore.getViewHtml(activeViewId.value))
const viewHandle = computed(() => extensionUiStore.getViewHandle(activeViewId.value))
const viewOptions = computed(() => extensionUiStore.getViewOptions(activeViewId.value))
</script>

<template>
  <div class="extension-view-panel">
    <div class="panel-header">
      <span class="title">{{ container?.title || 'Extension View' }}</span>
      <div v-if="views.length > 1" class="view-tabs">
        <button
          v-for="view in views"
          :key="view.id"
          class="view-tab"
          :class="{ active: view.id === activeViewId }"
          @click="activeViewId = view.id"
        >
          {{ view.name }}
        </button>
      </div>
    </div>

    <div class="panel-content">
      <ExtensionWebviewFrame
        v-if="activeViewId && viewHtml"
        :handle="viewHandle"
        :html="viewHtml"
        :enable-scripts="Boolean(viewOptions?.enableScripts)"
      />
      <div v-else-if="activeViewId" class="empty-state">扩展视图尚未提供内容。</div>
      <div v-else class="empty-state">暂无扩展视图</div>
    </div>
  </div>
</template>

<style scoped>
.extension-view-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.panel-header .title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.view-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.view-tab {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
}

.view-tab.active {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.panel-content {
  flex: 1;
  min-height: 0;
}

.empty-state {
  padding: 24px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
