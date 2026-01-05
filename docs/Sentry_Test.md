测试 Sentry 错误收集功能

1. 启动开发服务器

cd /Users/logos/WebstormProjects/logos-ide
npm run dev

2. 测试首次启动对话框

- 清除 localStorage 模拟首次启动：打开 DevTools → Application → Local Storage → 删除 lsp-ide-settings
- 刷新页面，应该看到隐私同意对话框
- 测试两个按钮：
    - "同意并开始使用" → 对话框关闭，正常进入应用
    - "不同意并退出" → 窗口关闭

3. 测试设置页面

- 导航到设置页面 (点击左下角齿轮图标)
- 找到"隐私"设置区域
- 切换"发送错误报告"开关，验证状态保存

4. 测试 Sentry 是否正常工作

在 DevTools Console 中手动触发错误：

Then in DevTools console:
// Verify telemetry is enabled
await window.electronAPI.telemetry.isEnabled()  // should return true

// Test error capture
Sentry.captureException(new Error('Test Sentry Error'))

Or trigger an uncaught error:
setTimeout(() => { throw new Error('Test Uncaught Error') }, 0)
5. 验证持久化

- 同意遥测后关闭应用
- 重新启动，确认：
    - 不再显示同意对话框
    - 设置页面显示遥测已启用

6. 在 Sentry 后台验证

登录 https://sentry.io 检查是否收到测试错误事件。