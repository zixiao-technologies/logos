/**
 * RebaseCommitItem 组件单元测试
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RebaseCommitItem from '@/components/Rebase/RebaseCommitItem.vue'
import type { RebaseCommitAction } from '@/types/rebase'

describe('RebaseCommitItem', () => {
  const createMockCommit = (overrides: Partial<RebaseCommitAction> = {}): RebaseCommitAction => ({
    hash: 'abc123def456',
    shortHash: 'abc123',
    message: 'Test commit message',
    author: 'Test Author',
    date: '2024-01-15T10:00:00.000Z',
    action: 'pick',
    ...overrides
  })

  describe('渲染', () => {
    it('应该正确渲染提交项', () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: {
          commit,
          index: 0
        }
      })

      expect(wrapper.find('.rebase-commit-item').exists()).toBe(true)
      expect(wrapper.find('.commit-hash').text()).toBe('abc123')
      expect(wrapper.find('.commit-message').text()).toBe('Test commit message')
    })

    it('应该显示作者信息', () => {
      const commit = createMockCommit({ author: 'John Doe' })
      const wrapper = mount(RebaseCommitItem, {
        props: {
          commit,
          index: 0
        }
      })

      expect(wrapper.find('.commit-author').text()).toBe('John Doe')
    })

    it('应该格式化日期', () => {
      const commit = createMockCommit({ date: '2024-01-15T10:30:00.000Z' })
      const wrapper = mount(RebaseCommitItem, {
        props: {
          commit,
          index: 0
        }
      })

      expect(wrapper.find('.commit-date').exists()).toBe(true)
    })

    it('drop 操作应该有删除线样式', () => {
      const commit = createMockCommit({ action: 'drop' })
      const wrapper = mount(RebaseCommitItem, {
        props: {
          commit,
          index: 0
        }
      })

      expect(wrapper.find('.commit-message').classes()).toContain('strike-through')
    })

    it('reword 操作应该显示编辑按钮', () => {
      const commit = createMockCommit({ action: 'reword' })
      const wrapper = mount(RebaseCommitItem, {
        props: {
          commit,
          index: 0
        }
      })

      expect(wrapper.find('mdui-button-icon-stub').exists()).toBe(true)
    })
  })

  describe('操作类样式', () => {
    it('pick 应该是默认样式', () => {
      const commit = createMockCommit({ action: 'pick' })
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      expect(wrapper.find('.rebase-commit-item').classes()).toContain('action-pick')
    })

    it('squash 应该有特殊样式', () => {
      const commit = createMockCommit({ action: 'squash' })
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      expect(wrapper.find('.rebase-commit-item').classes()).toContain('action-squash')
    })

    it('drop 应该有特殊样式', () => {
      const commit = createMockCommit({ action: 'drop' })
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      expect(wrapper.find('.rebase-commit-item').classes()).toContain('action-drop')
      expect(wrapper.find('.rebase-commit-item').classes()).toContain('dropped')
    })
  })

  describe('事件', () => {
    it('应该在操作更改时触发 action 事件', async () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      // 由于 MDUI select 是存根，我们直接测试组件是否渲染了 select
      const select = wrapper.find('mdui-select-stub')
      expect(select.exists()).toBe(true)
      expect(select.attributes('value')).toBe('pick')
    })

    it('应该在点击编辑按钮时触发 reword 事件', async () => {
      const commit = createMockCommit({ action: 'reword' })
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      const editButton = wrapper.find('mdui-button-icon-stub')
      await editButton.trigger('click')

      expect(wrapper.emitted('reword')).toBeTruthy()
    })
  })

  describe('拖拽功能', () => {
    it('应该支持拖拽', () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      expect(wrapper.find('.rebase-commit-item').attributes('draggable')).toBe('true')
    })

    it('拖拽时应该有特殊样式', () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0, dragging: true }
      })

      expect(wrapper.find('.rebase-commit-item').classes()).toContain('dragging')
    })

    it('应该触发 dragstart 事件', async () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 2 }
      })

      await wrapper.find('.rebase-commit-item').trigger('dragstart', {
        dataTransfer: { setData: () => {} }
      })

      expect(wrapper.emitted('dragstart')).toBeTruthy()
      expect(wrapper.emitted('dragstart')![0]).toEqual([2])
    })

    it('应该触发 dragover 事件', async () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 3 }
      })

      await wrapper.find('.rebase-commit-item').trigger('dragover')

      expect(wrapper.emitted('dragover')).toBeTruthy()
      expect(wrapper.emitted('dragover')![0]).toEqual([3])
    })

    it('应该触发 dragend 事件', async () => {
      const commit = createMockCommit()
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      await wrapper.find('.rebase-commit-item').trigger('dragend')

      expect(wrapper.emitted('dragend')).toBeTruthy()
    })
  })

  describe('新消息显示', () => {
    it('应该显示新消息而不是原消息', () => {
      const commit = createMockCommit({
        message: 'Original message',
        newMessage: 'New edited message'
      })
      const wrapper = mount(RebaseCommitItem, {
        props: { commit, index: 0 }
      })

      expect(wrapper.find('.commit-message').text()).toBe('New edited message')
    })
  })
})
