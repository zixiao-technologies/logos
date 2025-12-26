<script setup lang="ts">
/**
 * 文件图标组件
 * 根据文件名显示对应的 Material Design 图标
 */

import { computed } from 'vue'
import { getFileIcon } from '@/utils'

// 导入所有可能用到的 MDUI 图标
// 文件夹图标
import '@mdui/icons/folder.js'
import '@mdui/icons/folder-open.js'
import '@mdui/icons/folder-special.js'
import '@mdui/icons/folder-zip.js'
import '@mdui/icons/folder-shared.js'
import '@mdui/icons/source.js'
import '@mdui/icons/settings.js'
import '@mdui/icons/perm-media.js'
import '@mdui/icons/image.js'
import '@mdui/icons/palette.js'
import '@mdui/icons/widgets.js'
import '@mdui/icons/view-module.js'
import '@mdui/icons/article.js'
import '@mdui/icons/dashboard.js'
import '@mdui/icons/storage.js'
import '@mdui/icons/code.js'
import '@mdui/icons/handyman.js'
import '@mdui/icons/library-books.js'
import '@mdui/icons/data-object.js'
import '@mdui/icons/api.js'
import '@mdui/icons/science.js'
import '@mdui/icons/description.js'
import '@mdui/icons/terminal.js'
import '@mdui/icons/computer.js'

// 文件类型图标
import '@mdui/icons/javascript.js'
import '@mdui/icons/html.js'
import '@mdui/icons/table-chart.js'
import '@mdui/icons/text-snippet.js'
import '@mdui/icons/picture-as-pdf.js'
import '@mdui/icons/lock.js'
import '@mdui/icons/font-download.js'
import '@mdui/icons/sailing.js'
import '@mdui/icons/receipt-long.js'
import '@mdui/icons/memory.js'
import '@mdui/icons/insert-drive-file.js'

// 特殊文件图标
import '@mdui/icons/inventory.js'
import '@mdui/icons/bolt.js'
import '@mdui/icons/rule.js'
import '@mdui/icons/format-align-left.js'
import '@mdui/icons/menu-book.js'
import '@mdui/icons/gavel.js'
import '@mdui/icons/build.js'
import '@mdui/icons/vpn-key.js'

const props = defineProps<{
  /** 文件名 */
  filename: string
  /** 是否是目录 */
  isDirectory?: boolean
  /** 目录是否展开 */
  isExpanded?: boolean
  /** 图标大小 */
  size?: number
}>()

const iconName = computed(() => {
  return getFileIcon(
    props.filename,
    props.isDirectory ?? false,
    props.isExpanded ?? false
  )
})

// 将下划线转换为连字符以匹配 MDUI 图标组件名
const iconComponentName = computed(() => {
  return 'mdui-icon-' + iconName.value.replace(/_/g, '-')
})

const iconStyle = computed(() => {
  if (props.size) {
    return { fontSize: `${props.size}px` }
  }
  return {}
})
</script>

<template>
  <component
    :is="iconComponentName"
    class="file-icon"
    :style="iconStyle"
  ></component>
</template>

<style scoped>
.file-icon {
  flex-shrink: 0;
  color: var(--mdui-color-on-surface-variant);
}
</style>
