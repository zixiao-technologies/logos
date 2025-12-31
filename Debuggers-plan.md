# 调试器集成计划

## 目标

- 提供对主流调试器的集成支持，以提升开发者的调试体验
- 支持多种编程语言和平台，满足不同开发需求
- 采用 DAP (Debug Adapter Protocol) 标准协议，实现统一的调试体验

## 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Logos IDE - Debugger Layer                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Debug UI Layer                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │   │
│  │  │Breakpoint│  │ Call     │  │Variables │  │   Debug      │ │   │
│  │  │  Panel   │  │ Stack    │  │  Panel   │  │   Console    │ │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘ │   │
│  └───────┼─────────────┼─────────────┼───────────────┼─────────┘   │
│          └─────────────┴─────────────┴───────────────┘             │
│                                   │                                 │
│  ┌────────────────────────────────▼────────────────────────────┐   │
│  │                    DAP Client (TypeScript)                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │   │
│  │  │  Session    │  │  Message    │  │  Breakpoint         │  │   │
│  │  │  Manager    │  │  Handler    │  │  Manager            │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘  │   │
│  └────────────────────────────────┬────────────────────────────┘   │
│                                   │ DAP Protocol (JSON-RPC)        │
│  ┌────────────────────────────────▼────────────────────────────┐   │
│  │                    Debug Adapters                            │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │   GDB   │  │  LLDB   │  │  Node   │  │     Chrome      │ │   │
│  │  │ Adapter │  │ Adapter │  │ Adapter │  │     Adapter     │ │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────────┬────────┘ │   │
│  └───────┼────────────┼────────────┼────────────────┼──────────┘   │
│          │            │            │                │              │
└──────────┼────────────┼────────────┼────────────────┼──────────────┘
           │            │            │                │
     ┌─────▼─────┐ ┌────▼────┐ ┌────▼─────┐  ┌───────▼───────┐
     │    GDB    │ │  LLDB   │ │ Node.js  │  │ Chrome/V8     │
     │  Process  │ │ Process │ │ Runtime  │  │ DevTools      │
     └───────────┘ └─────────┘ └──────────┘  └───────────────┘
```

## 支持的调试器

| 调试器 | 语言支持 | DAP Adapter | 状态 |
|--------|---------|-------------|------|
| GDB | C/C++, Rust, Go | cppdbg | 计划中 |
| LLDB | C/C++, Swift, Rust | lldb-vscode | 计划中 |
| Node.js | JavaScript, TypeScript | node-debug | 优先 |
| Chrome DevTools | JavaScript, TypeScript | chrome-debug | 优先 |
| Python (debugpy) | Python | debugpy | 计划中 |
| Delve | Go | dlv-dap | 计划中 |
| JDB | Java | java-debug | 未来 |

## Phase 1: DAP 协议实现

### 1.1 DAP Client 核心

```typescript
// src/services/debug/DAPClient.ts
import { EventEmitter } from 'events'

interface DAPMessage {
  seq: number
  type: 'request' | 'response' | 'event'
}

interface DAPRequest extends DAPMessage {
  type: 'request'
  command: string
  arguments?: any
}

interface DAPResponse extends DAPMessage {
  type: 'response'
  request_seq: number
  success: boolean
  command: string
  body?: any
  message?: string
}

interface DAPEvent extends DAPMessage {
  type: 'event'
  event: string
  body?: any
}

export class DAPClient extends EventEmitter {
  private seq: number = 1
  private pendingRequests: Map<number, {
    resolve: (response: DAPResponse) => void
    reject: (error: Error) => void
  }> = new Map()

  async initialize(): Promise<Capabilities> {
    return this.sendRequest('initialize', {
      clientID: 'logos-ide',
      clientName: 'Logos IDE',
      adapterID: this.adapterType,
      pathFormat: 'path',
      linesStartAt1: true,
      columnsStartAt1: true,
      supportsVariableType: true,
      supportsVariablePaging: true,
      supportsRunInTerminalRequest: true,
    })
  }

  async launch(config: LaunchConfig): Promise<void> {
    await this.sendRequest('launch', config)
  }

  async attach(config: AttachConfig): Promise<void> {
    await this.sendRequest('attach', config)
  }

  async setBreakpoints(source: Source, breakpoints: SourceBreakpoint[]): Promise<Breakpoint[]> {
    const response = await this.sendRequest('setBreakpoints', {
      source,
      breakpoints,
    })
    return response.body.breakpoints
  }

  async continue(threadId: number): Promise<void> {
    await this.sendRequest('continue', { threadId })
  }

  async stepOver(threadId: number): Promise<void> {
    await this.sendRequest('next', { threadId })
  }

  async stepInto(threadId: number): Promise<void> {
    await this.sendRequest('stepIn', { threadId })
  }

  async stepOut(threadId: number): Promise<void> {
    await this.sendRequest('stepOut', { threadId })
  }

  async getStackTrace(threadId: number): Promise<StackFrame[]> {
    const response = await this.sendRequest('stackTrace', {
      threadId,
      startFrame: 0,
      levels: 20,
    })
    return response.body.stackFrames
  }

  async getScopes(frameId: number): Promise<Scope[]> {
    const response = await this.sendRequest('scopes', { frameId })
    return response.body.scopes
  }

  async getVariables(variablesReference: number): Promise<Variable[]> {
    const response = await this.sendRequest('variables', { variablesReference })
    return response.body.variables
  }

  async evaluate(expression: string, frameId?: number): Promise<EvaluateResult> {
    const response = await this.sendRequest('evaluate', {
      expression,
      frameId,
      context: 'repl',
    })
    return response.body
  }
}
```

### 1.2 调试会话管理

```typescript
// src/services/debug/DebugSessionManager.ts
export interface DebugSession {
  id: string
  name: string
  type: DebuggerType
  state: SessionState
  client: DAPClient
  config: LaunchConfig | AttachConfig
  breakpoints: Map<string, Breakpoint[]>  // file path -> breakpoints
  threads: Thread[]
  currentThreadId?: number
  currentFrameId?: number
}

export enum SessionState {
  Initializing = 'initializing',
  Running = 'running',
  Stopped = 'stopped',    // 命中断点或暂停
  Terminated = 'terminated',
}

export class DebugSessionManager {
  private sessions: Map<string, DebugSession> = new Map()
  private activeSessionId?: string

  async startSession(config: DebugConfig): Promise<DebugSession> {
    const session = await this.createSession(config)

    // 设置事件监听
    session.client.on('stopped', (event) => this.handleStopped(session.id, event))
    session.client.on('continued', () => this.handleContinued(session.id))
    session.client.on('terminated', () => this.handleTerminated(session.id))
    session.client.on('output', (event) => this.handleOutput(session.id, event))
    session.client.on('breakpoint', (event) => this.handleBreakpointEvent(session.id, event))

    // 初始化并启动
    await session.client.initialize()
    if (config.request === 'launch') {
      await session.client.launch(config)
    } else {
      await session.client.attach(config)
    }

    return session
  }

  async stopSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (session) {
      await session.client.disconnect()
      this.sessions.delete(sessionId)
    }
  }

  // 支持多会话并行调试
  getActiveSession(): DebugSession | undefined {
    return this.activeSessionId ? this.sessions.get(this.activeSessionId) : undefined
  }

  setActiveSession(sessionId: string): void {
    this.activeSessionId = sessionId
  }
}
```

## Phase 2: 调试器适配层

### 2.1 适配器接口

```typescript
// src/services/debug/adapters/DebugAdapter.ts
export interface DebugAdapter {
  type: DebuggerType
  name: string

  // 适配器可执行文件路径
  getAdapterPath(): string

  // 启动适配器进程
  start(): Promise<void>

  // 停止适配器
  stop(): Promise<void>

  // 获取默认启动配置
  getDefaultLaunchConfig(workspaceFolder: string): LaunchConfig

  // 验证配置
  validateConfig(config: DebugConfig): ValidationResult
}

export type DebuggerType =
  | 'node'
  | 'chrome'
  | 'gdb'
  | 'lldb'
  | 'python'
  | 'go'
```

### 2.2 Node.js 调试适配器

```typescript
// src/services/debug/adapters/NodeDebugAdapter.ts
export class NodeDebugAdapter implements DebugAdapter {
  type: DebuggerType = 'node'
  name = 'Node.js Debugger'

  getDefaultLaunchConfig(workspaceFolder: string): LaunchConfig {
    return {
      type: 'node',
      request: 'launch',
      name: 'Launch Program',
      program: '${workspaceFolder}/index.js',
      cwd: workspaceFolder,
      runtimeExecutable: 'node',
      runtimeArgs: ['--inspect-brk'],
      console: 'integratedTerminal',
      skipFiles: ['<node_internals>/**'],
    }
  }

  async start(): Promise<void> {
    // Node.js 使用内置调试协议，无需单独启动适配器
    // 通过 --inspect 或 --inspect-brk 启动 Node 进程
  }
}
```

### 2.3 GDB/LLDB 调试适配器

```typescript
// src/services/debug/adapters/NativeDebugAdapter.ts
export class GDBDebugAdapter implements DebugAdapter {
  type: DebuggerType = 'gdb'
  name = 'GDB (GNU Debugger)'

  getAdapterPath(): string {
    // 使用 cpptools 或 codelldb 适配器
    return this.findAdapter(['cppdbg', 'codelldb'])
  }

  getDefaultLaunchConfig(workspaceFolder: string): LaunchConfig {
    return {
      type: 'cppdbg',
      request: 'launch',
      name: 'Debug C/C++',
      program: '${workspaceFolder}/build/main',
      args: [],
      cwd: workspaceFolder,
      environment: [],
      externalConsole: false,
      MIMode: 'gdb',
      miDebuggerPath: '/usr/bin/gdb',
      setupCommands: [
        {
          description: 'Enable pretty-printing for gdb',
          text: '-enable-pretty-printing',
          ignoreFailures: true,
        }
      ],
    }
  }
}

export class LLDBDebugAdapter implements DebugAdapter {
  type: DebuggerType = 'lldb'
  name = 'LLDB (LLVM Debugger)'

  getDefaultLaunchConfig(workspaceFolder: string): LaunchConfig {
    return {
      type: 'lldb',
      request: 'launch',
      name: 'Debug with LLDB',
      program: '${workspaceFolder}/build/main',
      args: [],
      cwd: workspaceFolder,
      initCommands: [],
      preRunCommands: [],
      stopOnEntry: false,
    }
  }
}
```

### 2.4 Python 调试适配器

```typescript
// src/services/debug/adapters/PythonDebugAdapter.ts
export class PythonDebugAdapter implements DebugAdapter {
  type: DebuggerType = 'python'
  name = 'Python Debugger (debugpy)'

  getDefaultLaunchConfig(workspaceFolder: string): LaunchConfig {
    return {
      type: 'python',
      request: 'launch',
      name: 'Python: Current File',
      program: '${file}',
      console: 'integratedTerminal',
      cwd: workspaceFolder,
      env: {},
      python: this.getPythonPath(),
      justMyCode: true,  // 只调试用户代码
    }
  }

  private getPythonPath(): string {
    // 自动检测 Python 解释器
    // 优先级: 虚拟环境 > pyenv > 系统 Python
    return 'python3'
  }
}
```

## Phase 3: 断点管理

### 3.1 断点数据模型

```typescript
// src/services/debug/BreakpointManager.ts
export interface Breakpoint {
  id: string
  verified: boolean       // 是否被调试器确认
  source: Source
  line: number
  column?: number
  enabled: boolean
  condition?: string      // 条件断点表达式
  hitCondition?: string   // 命中次数条件
  logMessage?: string     // 日志断点消息
}

export interface Source {
  name?: string
  path?: string
  sourceReference?: number
}

export enum BreakpointType {
  Line = 'line',           // 行断点
  Conditional = 'conditional',  // 条件断点
  Logpoint = 'logpoint',   // 日志断点 (不暂停)
  Function = 'function',   // 函数断点
  Exception = 'exception', // 异常断点
  Data = 'data',          // 数据断点 (监视变量)
}

export class BreakpointManager {
  private breakpoints: Map<string, Breakpoint[]> = new Map()
  private exceptionBreakpoints: ExceptionBreakpoint[] = []

  // 设置行断点
  async setLineBreakpoint(
    filePath: string,
    line: number,
    options?: BreakpointOptions
  ): Promise<Breakpoint> {
    const bp: Breakpoint = {
      id: this.generateId(),
      verified: false,
      source: { path: filePath },
      line,
      enabled: true,
      ...options,
    }

    this.addBreakpoint(filePath, bp)
    await this.syncBreakpointsWithDebugger(filePath)
    return bp
  }

  // 设置条件断点
  async setConditionalBreakpoint(
    filePath: string,
    line: number,
    condition: string
  ): Promise<Breakpoint> {
    return this.setLineBreakpoint(filePath, line, { condition })
  }

  // 设置日志断点 (Logpoint)
  async setLogpoint(
    filePath: string,
    line: number,
    logMessage: string
  ): Promise<Breakpoint> {
    return this.setLineBreakpoint(filePath, line, { logMessage })
  }

  // 切换断点启用状态
  toggleBreakpoint(breakpointId: string): void {
    // ...
  }

  // 删除断点
  removeBreakpoint(breakpointId: string): void {
    // ...
  }

  // 获取文件的所有断点
  getBreakpointsForFile(filePath: string): Breakpoint[] {
    return this.breakpoints.get(filePath) || []
  }
}
```

### 3.2 断点 UI 交互

```typescript
// src/components/Debug/BreakpointGutter.vue
// Monaco Editor 断点装饰器

interface BreakpointDecoration {
  range: monaco.Range
  options: {
    isWholeLine: true
    glyphMarginClassName: string  // 断点图标样式
    glyphMarginHoverMessage: { value: string }
  }
}

// 断点图标类型
// 🔴 普通断点 (已验证)
// ⭕ 普通断点 (未验证/待确认)
// 🟡 条件断点
// 💬 日志断点
// ⛔ 禁用断点
```

## Phase 4: 变量和表达式

### 4.1 变量查看

```typescript
// src/services/debug/VariableService.ts
export interface Variable {
  name: string
  value: string
  type?: string
  variablesReference: number  // 0 表示叶子节点，>0 可展开
  namedVariables?: number     // 子变量数量
  indexedVariables?: number   // 数组元素数量
  evaluateName?: string       // 用于在 watch 中求值的表达式
  memoryReference?: string    // 内存地址
}

export interface Scope {
  name: string                // 'Locals', 'Globals', 'Closure'
  variablesReference: number
  expensive: boolean          // 是否需要延迟加载
}

export class VariableService {
  // 获取当前帧的作用域
  async getScopes(frameId: number): Promise<Scope[]> {
    const session = this.sessionManager.getActiveSession()
    return session?.client.getScopes(frameId) || []
  }

  // 获取变量列表
  async getVariables(variablesReference: number): Promise<Variable[]> {
    const session = this.sessionManager.getActiveSession()
    return session?.client.getVariables(variablesReference) || []
  }

  // 修改变量值
  async setVariable(
    variablesReference: number,
    name: string,
    value: string
  ): Promise<Variable> {
    const session = this.sessionManager.getActiveSession()
    const response = await session?.client.sendRequest('setVariable', {
      variablesReference,
      name,
      value,
    })
    return response?.body
  }
}
```

### 4.2 表达式求值

```typescript
// src/services/debug/EvaluationService.ts
export interface EvaluateResult {
  result: string
  type?: string
  variablesReference: number
  namedVariables?: number
  indexedVariables?: number
  memoryReference?: string
}

export interface WatchExpression {
  id: string
  expression: string
  result?: EvaluateResult
  error?: string
}

export class EvaluationService {
  private watchExpressions: WatchExpression[] = []

  // 在调试控制台求值
  async evaluate(expression: string, context: 'repl' | 'watch' | 'hover' = 'repl'): Promise<EvaluateResult> {
    const session = this.sessionManager.getActiveSession()
    const frameId = session?.currentFrameId

    return session?.client.evaluate(expression, frameId)
  }

  // 添加监视表达式
  addWatch(expression: string): WatchExpression {
    const watch: WatchExpression = {
      id: this.generateId(),
      expression,
    }
    this.watchExpressions.push(watch)
    return watch
  }

  // 更新所有监视表达式
  async refreshWatches(): Promise<void> {
    for (const watch of this.watchExpressions) {
      try {
        watch.result = await this.evaluate(watch.expression, 'watch')
        watch.error = undefined
      } catch (e) {
        watch.error = (e as Error).message
        watch.result = undefined
      }
    }
  }

  // 悬停提示求值
  async evaluateHover(expression: string): Promise<string | undefined> {
    try {
      const result = await this.evaluate(expression, 'hover')
      return `${expression} = ${result.result}`
    } catch {
      return undefined
    }
  }
}
```

## Phase 5: 调用堆栈导航

### 5.1 堆栈帧

```typescript
// src/services/debug/CallStackService.ts
export interface StackFrame {
  id: number
  name: string                // 函数名
  source?: Source             // 源文件
  line: number
  column: number
  endLine?: number
  endColumn?: number
  canRestart?: boolean        // 是否支持重启帧
  instructionPointerReference?: string
  moduleId?: number | string
  presentationHint?: 'normal' | 'label' | 'subtle'
}

export interface Thread {
  id: number
  name: string
}

export class CallStackService {
  // 获取所有线程
  async getThreads(): Promise<Thread[]> {
    const session = this.sessionManager.getActiveSession()
    const response = await session?.client.sendRequest('threads', {})
    return response?.body.threads || []
  }

  // 获取线程的调用堆栈
  async getStackTrace(threadId: number): Promise<StackFrame[]> {
    const session = this.sessionManager.getActiveSession()
    return session?.client.getStackTrace(threadId) || []
  }

  // 切换到指定堆栈帧
  async selectFrame(frameId: number): Promise<void> {
    const session = this.sessionManager.getActiveSession()
    if (session) {
      session.currentFrameId = frameId
      // 触发变量面板更新
      this.emit('frameChanged', frameId)
    }
  }

  // 重启帧 (Hot Reload)
  async restartFrame(frameId: number): Promise<void> {
    const session = this.sessionManager.getActiveSession()
    await session?.client.sendRequest('restartFrame', { frameId })
  }
}
```

## Phase 6: 启动配置

### 6.1 launch.json 格式

```json
// .logos/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "🚀 Launch Program",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "npm: build",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true,
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "attach",
      "name": "🔗 Attach to Process",
      "port": 9229,
      "restart": true,
      "sourceMaps": true
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "🌐 Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    },
    {
      "type": "python",
      "request": "launch",
      "name": "🐍 Python: Current File",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": true
    },
    {
      "type": "cppdbg",
      "request": "launch",
      "name": "🔧 Debug C++",
      "program": "${workspaceFolder}/build/main",
      "args": ["--verbose"],
      "cwd": "${workspaceFolder}",
      "environment": [],
      "MIMode": "gdb",
      "setupCommands": [
        {
          "description": "Enable pretty-printing",
          "text": "-enable-pretty-printing"
        }
      ]
    }
  ],
  "compounds": [
    {
      "name": "🔄 Full Stack",
      "configurations": ["Launch Program", "Launch Chrome"],
      "stopAll": true
    }
  ]
}
```

### 6.2 配置变量

```typescript
// 支持的变量替换
const configVariables = {
  '${workspaceFolder}': '/path/to/workspace',
  '${workspaceFolderBasename}': 'workspace',
  '${file}': '/path/to/current/file.ts',
  '${fileBasename}': 'file.ts',
  '${fileBasenameNoExtension}': 'file',
  '${fileDirname}': '/path/to/current',
  '${fileExtname}': '.ts',
  '${cwd}': process.cwd(),
  '${lineNumber}': '42',
  '${selectedText}': 'selected code',
  '${env:VAR_NAME}': process.env.VAR_NAME,
  '${config:setting.name}': 'setting value',
  '${command:commandId}': 'command result',
}
```

## Phase 7: 调试 UI

### 7.1 调试面板布局

```
┌─ Debug ─────────────────────────────────────────────────────────────┐
│ ▶️ Launch Program ▼        [▶] [⏸] [⏹] [↻] [⏭] [⏬] [⏫]           │
├─────────────────────────────────────────────────────────────────────┤
│ 📊 VARIABLES                                               [−][+]   │
│ ├─ 🔵 Locals                                                        │
│ │   ├─ user: {name: "John", age: 30}                    ▶         │
│ │   ├─ count: 42                                                   │
│ │   └─ items: Array(5)                                  ▶         │
│ ├─ 🟢 Closure                                                       │
│ │   └─ callback: ƒ callback()                                      │
│ └─ 🟡 Global                                                        │
│     └─ window: Window                                   ▶         │
├─────────────────────────────────────────────────────────────────────┤
│ 👁️ WATCH                                                   [+]      │
│ ├─ user.name: "John"                                               │
│ ├─ items.length: 5                                                 │
│ └─ count > 10: true                                                │
├─────────────────────────────────────────────────────────────────────┤
│ 📚 CALL STACK                                                       │
│ ├─ handleClick (app.ts:45)                             ← current   │
│ ├─ processEvent (events.ts:123)                                    │
│ ├─ dispatch (dispatcher.ts:78)                                     │
│ └─ main (index.ts:15)                                              │
├─────────────────────────────────────────────────────────────────────┤
│ 🔴 BREAKPOINTS                                             [−][+]   │
│ ├─ ✅ app.ts:45                                                     │
│ ├─ ✅ app.ts:67    condition: count > 10                           │
│ ├─ ⬜ utils.ts:23  (disabled)                                       │
│ └─ 💬 api.ts:89    log: "Request: {url}"                           │
├─────────────────────────────────────────────────────────────────────┤
│ 💬 DEBUG CONSOLE                                                    │
│ > user.name                                                        │
│ < "John"                                                           │
│ > items.map(i => i.id)                                             │
│ < [1, 2, 3, 4, 5]                                                   │
│ [Input: ________________________________________________] [Enter]   │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 工具栏控制

| 图标 | 操作 | 快捷键 | 说明 |
|------|------|--------|------|
| ▶️ | Continue | F5 | 继续执行 |
| ⏸ | Pause | F6 | 暂停执行 |
| ⏹ | Stop | Shift+F5 | 停止调试 |
| ↻ | Restart | Ctrl+Shift+F5 | 重启调试 |
| ⏭ | Step Over | F10 | 单步跳过 |
| ⏬ | Step Into | F11 | 单步进入 |
| ⏫ | Step Out | Shift+F11 | 单步跳出 |

## Phase 8: 高级功能

### 8.1 远程调试

```typescript
// src/services/debug/RemoteDebugConfig.ts
interface RemoteDebugConfig {
  type: 'ssh' | 'docker' | 'kubernetes'
  host?: string
  port?: number
  container?: string
  pod?: string
  namespace?: string
  localRoot: string
  remoteRoot: string
}

// SSH 远程调试
const sshConfig: LaunchConfig = {
  type: 'node',
  request: 'attach',
  name: 'Attach to Remote',
  address: 'user@remote-host',
  port: 9229,
  localRoot: '${workspaceFolder}',
  remoteRoot: '/app',
  sourceMaps: true,
}

// Docker 容器调试
const dockerConfig: LaunchConfig = {
  type: 'node',
  request: 'attach',
  name: 'Attach to Docker',
  port: 9229,
  localRoot: '${workspaceFolder}',
  remoteRoot: '/usr/src/app',
  sourceMapPathOverrides: {
    '/usr/src/app/*': '${workspaceFolder}/*'
  },
}
```

### 8.2 调试会话录制与回放

```typescript
// src/services/debug/DebugRecorder.ts
interface DebugRecording {
  id: string
  name: string
  startTime: Date
  endTime?: Date
  events: RecordedEvent[]
  snapshots: StateSnapshot[]
}

interface RecordedEvent {
  timestamp: number
  type: 'stopped' | 'continued' | 'output' | 'breakpoint'
  data: any
}

interface StateSnapshot {
  timestamp: number
  threadId: number
  frameId: number
  variables: Variable[]
  callStack: StackFrame[]
}

export class DebugRecorder {
  private recording?: DebugRecording
  private isRecording = false

  // 开始录制
  startRecording(name: string): void {
    this.recording = {
      id: this.generateId(),
      name,
      startTime: new Date(),
      events: [],
      snapshots: [],
    }
    this.isRecording = true
  }

  // 停止录制
  stopRecording(): DebugRecording {
    this.isRecording = false
    this.recording!.endTime = new Date()
    return this.recording!
  }

  // 回放录制
  async playback(recording: DebugRecording): Promise<void> {
    for (const snapshot of recording.snapshots) {
      await this.restoreSnapshot(snapshot)
      await this.delay(500)  // 延迟以便观察
    }
  }
}
```

### 8.3 内存查看器

```typescript
// src/services/debug/MemoryViewer.ts
interface MemoryRange {
  address: string
  offset: number
  count: number
  data: Uint8Array
}

export class MemoryViewer {
  // 读取内存
  async readMemory(
    memoryReference: string,
    offset: number,
    count: number
  ): Promise<MemoryRange> {
    const session = this.sessionManager.getActiveSession()
    const response = await session?.client.sendRequest('readMemory', {
      memoryReference,
      offset,
      count,
    })
    return {
      address: response.body.address,
      offset,
      count,
      data: Buffer.from(response.body.data, 'base64'),
    }
  }

  // 写入内存
  async writeMemory(
    memoryReference: string,
    offset: number,
    data: Uint8Array
  ): Promise<void> {
    const session = this.sessionManager.getActiveSession()
    await session?.client.sendRequest('writeMemory', {
      memoryReference,
      offset,
      data: Buffer.from(data).toString('base64'),
    })
  }
}
```

## 性能目标

| 操作 | 目标响应时间 |
|------|-------------|
| 启动调试会话 | < 2s |
| 设置断点 | < 50ms |
| 断点命中响应 | < 100ms |
| 获取变量列表 | < 200ms |
| 表达式求值 | < 300ms |
| 堆栈帧切换 | < 100ms |
| 单步执行 | < 50ms |

## 实现步骤

### 里程碑 1: DAP 核心
- [ ] 实现 DAP Client 基础协议
- [ ] 实现调试会话管理
- [ ] 实现基础的 Node.js 调试支持

### 里程碑 2: UI 集成
- [ ] 调试面板组件
- [ ] 断点管理 UI
- [ ] 变量查看器
- [ ] 调用堆栈视图
- [ ] 调试控制台

### 里程碑 3: 多语言支持
- [ ] Chrome DevTools 集成
- [ ] Python (debugpy) 适配
- [ ] GDB/LLDB 适配

### 里程碑 4: 高级功能
- [ ] 远程调试支持
- [ ] 条件断点和日志断点
- [ ] 调试会话录制
- [ ] 内存查看器

## 依赖项

```json
{
  "dependencies": {
    "@vscode/debugprotocol": "^1.65.0",
    "@vscode/debugadapter": "^1.65.0"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0"
  }
}
```

## 与 VS Code 功能对比

| 功能 | VS Code | Logos |
|------|---------|-------|
| DAP 协议 | ✅ | ✅ |
| Node.js 调试 | ✅ | 优先 |
| Chrome 调试 | ✅ | 优先 |
| Python 调试 | ✅ | 计划 |
| C/C++ 调试 | ✅ | 计划 |
| 条件断点 | ✅ | ✅ |
| 日志断点 | ✅ | ✅ |
| 远程调试 | ✅ | 计划 |
| 会话录制 | ❌ | 计划 |
| 多会话并行 | ✅ | ✅ |