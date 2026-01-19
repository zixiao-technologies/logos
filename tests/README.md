# 测试文档

本文档描述 Logos IDE 的测试架构和指南。

## 测试框架

使用 **Vitest** 作为测试框架，配合以下工具：

- **@vue/test-utils** - Vue 组件测试工具
- **happy-dom** - 轻量级 DOM 实现
- **@vitest/coverage-v8** - 代码覆盖率

## 目录结构

```
tests/
├── setup.ts                 # 全局测试配置和模拟
├── unit/                    # 单元测试
│   ├── stores/              # Store 测试
│   │   ├── merge.test.ts    # 合并 Store 测试
│   │   ├── rebase.test.ts   # Rebase Store 测试
│   │   └── reflog.test.ts   # Reflog Store 测试
│   └── components/          # 组件测试
│       ├── ReflogToolbar.test.ts
│       └── RebaseCommitItem.test.ts
├── integration/             # 集成测试
└── e2e/                     # 端到端测试
```

## 运行测试

```bash
# 运行所有测试
npm run test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage

# UI 模式
npm run test:ui
```

## 配置文件

测试配置位于 `vitest.config.ts`:

```typescript
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/stores/**/*.ts',
        'src/components/**/*.vue',
        'electron/services/**/*.ts'
      ]
    },
    setupFiles: ['./tests/setup.ts']
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  }
})
```

## 测试模拟

### window.electronAPI 模拟

`tests/setup.ts` 提供了完整的 `window.electronAPI` 模拟：

```typescript
import { mockElectronAPI, resetAllMocks } from '../setup'

beforeEach(() => {
  resetAllMocks()
})

// 自定义模拟返回值
mockElectronAPI.git.getMergeStatus.mockResolvedValue({
  inMerge: true,
  conflictCount: 2
})
```

### MDUI 组件存根

所有 MDUI 组件已在 setup.ts 中配置为存根：

```typescript
config.global.stubs = {
  'mdui-button': true,
  'mdui-select': true,
  // ...
}
```

## 编写测试指南

### Store 测试

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMyStore } from '@/stores/myStore'
import { mockElectronAPI, resetAllMocks } from '../setup'

describe('MyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetAllMocks()
  })

  it('should initialize with default state', () => {
    const store = useMyStore()
    expect(store.someValue).toBe(defaultValue)
  })

  it('should call API and update state', async () => {
    mockElectronAPI.git.someMethod.mockResolvedValue({ data: 'test' })

    const store = useMyStore()
    await store.fetchData()

    expect(store.data).toBe('test')
    expect(mockElectronAPI.git.someMethod).toHaveBeenCalled()
  })
})
```

### 组件测试

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })

    expect(wrapper.find('.title').text()).toBe('Test')
  })

  it('should emit event on click', async () => {
    const wrapper = mount(MyComponent)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## 覆盖率目标

| 类别 | 目标覆盖率 |
|------|-----------|
| Stores | 80%+ |
| Components | 70%+ |
| Services | 80%+ |
| 总体 | 75%+ |

## CI 集成

测试在每次 push 和 PR 时自动运行：

```yaml
# .github/workflows/Check.yml
- name: Run tests
  run: npm run test

- name: Run tests with coverage
  run: npm run test:coverage

- name: Upload coverage report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

## 测试的 Git 功能

### Merge Store 测试

| 测试用例 | 描述 |
|---------|------|
| 初始状态 | 验证默认状态值 |
| hasConflicts | 检测未解决冲突 |
| unresolvedCount | 计算未解决数量 |
| resolvedCount | 计算已解决数量 |
| checkMergeStatus | 检查合并状态 |
| loadConflictContent | 加载冲突内容 |
| parseConflictHunks | 解析冲突块 |
| resolveHunk | 解决单个冲突 |
| saveResolution | 保存解决结果 |
| abortMerge | 中止合并 |
| acceptAllOurs/Theirs | 批量接受 |

### Rebase Store 测试

| 测试用例 | 描述 |
|---------|------|
| 初始状态 | 验证默认状态值 |
| isInRebase | 检测 rebase 状态 |
| hasConflicts | 检测冲突 |
| progressPercent | 计算进度 |
| droppedCount | 统计 drop 数量 |
| squashedCount | 统计 squash 数量 |
| resultingCommitCount | 预计最终提交数 |
| openRebaseEditor | 打开编辑器 |
| setCommitAction | 设置操作 |
| moveCommit | 重排提交 |
| executeRebase | 执行 rebase |
| continueRebase | 继续 rebase |
| abortRebase | 中止 rebase |

### Reflog Store 测试

| 测试用例 | 描述 |
|---------|------|
| 初始状态 | 验证默认状态值 |
| filteredEntries | 过滤条目 |
| totalCount | 总数统计 |
| filteredCount | 过滤后数量 |
| hasActiveFilters | 检测活动过滤器 |
| loadReflog | 加载 reflog |
| setSearch | 设置搜索 |
| toggleOperationType | 切换类型过滤 |
| clearFilters | 清除过滤器 |
| 日期分组 | 按日期分组 |

## 故障排除

### 常见问题

1. **模块找不到错误**
   - 确保 `@/` 路径别名配置正确
   - 检查 `vitest.config.ts` 中的 alias 设置

2. **MDUI 组件错误**
   - 组件应在 setup.ts 中配置存根
   - 使用 `*-stub` 后缀查找存根元素

3. **异步测试超时**
   - 默认超时 10 秒
   - 可在 vitest.config.ts 中调整 testTimeout

### 调试技巧

```typescript
// 打印组件 HTML
console.log(wrapper.html())

// 检查所有触发的事件
console.log(wrapper.emitted())

// 检查组件内部状态
console.log(wrapper.vm.someData)
```
