import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'editor',
    component: () => import('@/views/EditorView.vue'),
    meta: { title: 'Editor' }
  },
  {
    path: '/terminal',
    name: 'terminal',
    component: () => import('@/views/TerminalView.vue'),
    meta: { title: 'Terminal' }
  },
  {
    path: '/devops',
    name: 'devops',
    component: () => import('@/views/DevOpsView.vue'),
    meta: { title: 'DevOps' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: 'Settings' }
  },
  {
    path: '/diff',
    name: 'diff',
    component: () => import('@/views/DiffEditorView.vue'),
    meta: { title: 'Diff' }
  },
  {
    path: '/merge',
    name: 'merge',
    component: () => import('@/views/MergeConflictView.vue'),
    meta: { title: 'Merge Conflicts' }
  },
  {
    path: '/rebase',
    name: 'rebase',
    component: () => import('@/views/InteractiveRebaseView.vue'),
    meta: { title: 'Interactive Rebase' }
  },
  {
    path: '/reflog',
    name: 'reflog',
    component: () => import('@/views/ReflogView.vue'),
    meta: { title: 'Reflog' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
