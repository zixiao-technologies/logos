<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(true)
const fontSize = ref(14)
const tabSize = ref(2)
const wordWrap = ref(true)
const autoSave = ref(true)
const minimap = ref(true)

const themeOptions = [
  { label: 'Logos Dark', value: 'logos-dark' },
  { label: 'Logos Light', value: 'logos-light' },
  { label: 'Monokai', value: 'monokai' },
  { label: 'GitHub Dark', value: 'github-dark' }
]

const selectedTheme = ref('logos-dark')
</script>

<template>
  <div class="settings-view">
    <h1>设置</h1>

    <!-- 外观设置 -->
    <mdui-card variant="outlined" class="settings-section">
      <h2>外观</h2>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">深色模式</span>
          <span class="setting-description">使用深色主题</span>
        </div>
        <mdui-switch :checked="darkMode" @change="darkMode = !darkMode"></mdui-switch>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">颜色主题</span>
          <span class="setting-description">选择编辑器配色方案</span>
        </div>
        <mdui-select :value="selectedTheme" @change="(e: any) => selectedTheme = e.target.value">
          <mdui-menu-item
            v-for="theme in themeOptions"
            :key="theme.value"
            :value="theme.value"
          >
            {{ theme.label }}
          </mdui-menu-item>
        </mdui-select>
      </div>
    </mdui-card>

    <!-- 编辑器设置 -->
    <mdui-card variant="outlined" class="settings-section">
      <h2>编辑器</h2>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">字体大小</span>
          <span class="setting-description">编辑器字体大小 (px)</span>
        </div>
        <mdui-slider
          :value="fontSize"
          :min="10"
          :max="24"
          :step="1"
          labeled
          @change="(e: any) => fontSize = e.target.value"
        ></mdui-slider>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">Tab 大小</span>
          <span class="setting-description">缩进空格数</span>
        </div>
        <mdui-segmented-button-group :value="String(tabSize)" @change="(e: any) => tabSize = Number(e.target.value)">
          <mdui-segmented-button value="2">2</mdui-segmented-button>
          <mdui-segmented-button value="4">4</mdui-segmented-button>
          <mdui-segmented-button value="8">8</mdui-segmented-button>
        </mdui-segmented-button-group>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">自动换行</span>
          <span class="setting-description">长行自动折行显示</span>
        </div>
        <mdui-switch :checked="wordWrap" @change="wordWrap = !wordWrap"></mdui-switch>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">迷你地图</span>
          <span class="setting-description">显示代码缩略图</span>
        </div>
        <mdui-switch :checked="minimap" @change="minimap = !minimap"></mdui-switch>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">自动保存</span>
          <span class="setting-description">失去焦点时自动保存</span>
        </div>
        <mdui-switch :checked="autoSave" @change="autoSave = !autoSave"></mdui-switch>
      </div>
    </mdui-card>

    <!-- DevOps 设置 -->
    <mdui-card variant="outlined" class="settings-section">
      <h2>DevOps</h2>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">API 服务器</span>
          <span class="setting-description">后端 API 地址</span>
        </div>
        <mdui-text-field
          value="http://localhost:8000"
          variant="outlined"
        ></mdui-text-field>
      </div>

      <mdui-divider></mdui-divider>

      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-label">构建通知</span>
          <span class="setting-description">流水线完成时通知</span>
        </div>
        <mdui-switch checked></mdui-switch>
      </div>
    </mdui-card>

    <!-- 关于 -->
    <mdui-card variant="outlined" class="settings-section about-section">
      <h2>关于</h2>
      <div class="about-content">
        <div class="about-logo">
          <span class="logo-text">Logos</span>
          <span class="logo-subtitle">IDE</span>
        </div>
        <div class="about-info">
          <p>PRTS DevOps Platform</p>
          <p class="version">版本 0.1.0</p>
          <p class="copyright">© 2024 Zixiao System</p>
        </div>
      </div>
    </mdui-card>
  </div>
</template>

<style scoped>
.settings-view {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
}

.settings-view h1 {
  margin-bottom: 24px;
  font-size: 1.75rem;
  font-weight: 500;
}

.settings-section {
  padding: 20px;
  margin-bottom: 16px;
}

.settings-section h2 {
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--mdui-color-primary);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-weight: 500;
}

.setting-description {
  font-size: 0.875rem;
  color: var(--mdui-color-on-surface-variant);
}

mdui-slider {
  width: 200px;
}

mdui-text-field {
  width: 300px;
}

.about-section {
  text-align: center;
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.about-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-text {
  font-size: 2rem;
  font-weight: 700;
  color: var(--mdui-color-primary);
}

.logo-subtitle {
  font-size: 1rem;
  color: var(--mdui-color-on-surface-variant);
}

.about-info {
  color: var(--mdui-color-on-surface-variant);
}

.about-info p {
  margin: 4px 0;
}

.about-info .version {
  font-weight: 500;
}

.about-info .copyright {
  font-size: 0.875rem;
}
</style>
