# Logos IDE 本地打包指南

本文档介绍如何在本地构建和打包 Logos IDE。

## 系统要求

### 所有平台
- **Node.js** 18.x 或更高版本
- **npm** 9.x 或更高版本
- **Rust** (stable) - 用于构建 WASM 语言服务
- **wasm-pack** - 自动安装

### 平台特定要求

#### macOS
- Xcode Command Line Tools: `xcode-select --install`

#### Windows
- Visual Studio Build Tools (C++ 工作负载)
- Windows SDK

#### Linux
- `build-essential` 包
- `libsecret-1-dev` (用于 keytar)
- `libgtk-3-dev`

## 快速开始

### 使用构建脚本

**macOS / Linux:**
```bash
chmod +x scripts/build-local.sh
./scripts/build-local.sh
```

**Windows:**
```cmd
scripts\build-local.cmd
```

### 构建选项

| 选项 | 说明 |
|------|------|
| `--skip-wasm` | 跳过 WASM 构建，使用已有的 `pkg/` |
| `--skip-app` | 跳过 Electron 应用打包 |
| `--skip-typecheck` | 跳过 TypeScript 类型检查 |
| `--help` | 显示帮助信息 |

示例：
```bash
# 仅构建 WASM
./scripts/build-local.sh --skip-app

# 仅打包应用（使用已构建的 WASM）
./scripts/build-local.sh --skip-wasm

# 快速构建（跳过类型检查）
./scripts/build-local.sh --skip-typecheck
```

## 手动构建步骤

如果需要手动执行各步骤：

### 1. 安装依赖

```bash
npm ci --include=dev
```

### 2. 构建 WASM 语言服务

首先安装 wasm-pack（如果没有）：
```bash
cargo install wasm-pack --locked
```

构建 WASM：
```bash
cd logos-lang
wasm-pack build crates/logos-wasm --target web --release --out-dir ../../pkg --out-name logos-lang
cd ..
```

> **注意**: 如果构建失败并提示找不到 `stdio.h`，需要安装 WASI SDK。参见下方"WASI SDK 安装"章节。

### 3. 类型检查

```bash
npm run typecheck
```

### 4. 构建应用

```bash
npm run build
```

输出文件位于 `release/` 目录。

## WASI SDK 安装

WASM 构建依赖 WASI SDK 来编译 C 代码（如 tree-sitter）。

### 下载地址

从 [WASI SDK Releases](https://github.com/WebAssembly/wasi-sdk/releases) 下载对应平台的版本：

- **Linux x64**: `wasi-sdk-24.0-x86_64-linux.tar.gz`
- **macOS ARM**: `wasi-sdk-24.0-arm64-macos.tar.gz`
- **macOS Intel**: `wasi-sdk-24.0-x86_64-macos.tar.gz`
- **Windows**: `wasi-sdk-24.0-x86_64-windows.tar.gz`

### 安装步骤

**macOS / Linux:**
```bash
# 下载并解压
curl -LO https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-24/wasi-sdk-24.0-x86_64-linux.tar.gz
tar xzf wasi-sdk-24.0-x86_64-linux.tar.gz

# 设置环境变量（添加到 ~/.bashrc 或 ~/.zshrc）
export WASI_SDK_PATH="$HOME/wasi-sdk-24.0-x86_64-linux"
```

**Windows (PowerShell):**
```powershell
# 下载并解压
Invoke-WebRequest -Uri "https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-24/wasi-sdk-24.0-x86_64-windows.tar.gz" -OutFile "wasi-sdk.tar.gz"
tar xzf wasi-sdk.tar.gz

# 设置环境变量
$env:WASI_SDK_PATH = "$PWD\wasi-sdk-24.0-x86_64-windows"
# 或永久设置：
[Environment]::SetEnvironmentVariable("WASI_SDK_PATH", "C:\path\to\wasi-sdk-24.0-x86_64-windows", "User")
```

## 构建产物

构建完成后，`release/` 目录包含：

### macOS
- `Logos-{version}-arm64.dmg` - Apple Silicon DMG 安装包
- `Logos-{version}-x64.dmg` - Intel DMG 安装包
- `Logos-{version}-arm64-mac.zip` - Apple Silicon ZIP 包
- `Logos-{version}-x64-mac.zip` - Intel ZIP 包

### Windows
- `Logos Setup {version}.exe` - NSIS 安装程序
- `Logos {version}.exe` - 便携版

### Linux
- `Logos-{version}.AppImage` - AppImage 便携包
- `logos_{version}_amd64.deb` - Debian/Ubuntu 包
- `logos-{version}.x86_64.rpm` - RHEL/Fedora 包

## 开发构建

如果只是开发调试，不需要完整打包：

```bash
# 开发模式（热重载）
npm run dev

# 仅构建前端
npx vite build

# 仅构建 Electron
npx vite build && npx electron .
```

## 常见问题

### Q: WASM 构建失败，提示 `stdio.h` not found

**A:** 需要安装 WASI SDK 并设置 `WASI_SDK_PATH` 环境变量。参见上方"WASI SDK 安装"章节。

### Q: `node-pty` 编译失败

**A:** 确保已安装平台对应的编译工具：
- macOS: `xcode-select --install`
- Windows: Visual Studio Build Tools
- Linux: `sudo apt install build-essential`

### Q: electron-builder 签名失败

**A:** 本地开发可以跳过签名。设置环境变量：
```bash
export CSC_IDENTITY_AUTO_DISCOVERY=false  # macOS
```

### Q: Windows 上脚本执行权限问题

**A:** 以管理员身份运行 PowerShell，或直接使用：
```cmd
cmd /c scripts\build-local.cmd
```

## 相关链接

- [Electron Builder 文档](https://www.electron.build/)
- [wasm-pack 文档](https://rustwasm.github.io/wasm-pack/)
- [WASI SDK](https://github.com/WebAssembly/wasi-sdk)