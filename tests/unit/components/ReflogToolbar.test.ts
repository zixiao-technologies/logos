/**
 * ReflogToolbar 组件单元测试
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ReflogToolbar from '@/components/Reflog/ReflogToolbar.vue'

describe('ReflogToolbar', () => {
  const defaultProps = {
    loading: false,
    totalCount: 100,
    filteredCount: 100
  }

  beforeEach(() => {
    // 重置环境
  })

  describe('渲染', () => {
    it('应该正确渲染工具栏', () => {
      const wrapper = mount(ReflogToolbar, {
        props: defaultProps
      })

      expect(wrapper.find('.reflog-toolbar').exists()).toBe(true)
      expect(wrapper.find('.title').text()).toBe('Reflog')
    })

    it('应该显示总数', () => {
      const wrapper = mount(ReflogToolbar, {
        props: defaultProps
      })

      expect(wrapper.find('.count').text()).toBe('100')
    })

    it('应该显示过滤后的数量', () => {
      const wrapper = mount(ReflogToolbar, {
        props: {
          ...defaultProps,
          filteredCount: 50
        }
      })

      expect(wrapper.find('.count').text()).toBe('50 / 100')
    })
  })

  describe('搜索功能', () => {
    it('应该触发搜索事件', async () => {
      const wrapper = mount(ReflogToolbar, {
        props: defaultProps
      })

      const input = wrapper.find('.search-box input')
      await input.setValue('test query')
      await input.trigger('input')

      expect(wrapper.emitted('search')).toBeTruthy()
      expect(wrapper.emitted('search')![0]).toEqual(['test query'])
    })

    it('应该在按回车时触发搜索', async () => {
      const wrapper = mount(ReflogToolbar, {
        props: defaultProps
      })

      const input = wrapper.find('.search-box input')
      await input.setValue('test')
      await input.trigger('keyup.enter')

      expect(wrapper.emitted('search')).toBeTruthy()
    })
  })

  describe('刷新按钮', () => {
    it('应该触发刷新事件', async () => {
      const wrapper = mount(ReflogToolbar, {
        props: defaultProps
      })

      const refreshButton = wrapper.findAll('mdui-button-icon-stub').at(-1)
      await refreshButton?.trigger('click')

      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('加载时应该禁用刷新按钮', () => {
      const wrapper = mount(ReflogToolbar, {
        props: {
          ...defaultProps,
          loading: true
        }
      })

      const refreshButton = wrapper.findAll('mdui-button-icon-stub').at(-1)
      expect(refreshButton?.attributes('disabled')).toBeDefined()
    })
  })
})
