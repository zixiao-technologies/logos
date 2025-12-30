@echo off
REM Local build script for Logos IDE (Windows)
REM This script builds the complete application locally

setlocal enabledelayedexpansion

echo ========================================
echo   Logos IDE - Local Build Script
echo ========================================
echo.

REM Parse arguments
set BUILD_WASM=true
set BUILD_APP=true
set SKIP_TYPECHECK=false

:parse_args
if "%~1"=="" goto :done_args
if "%~1"=="--skip-wasm" (
    set BUILD_WASM=false
    shift
    goto :parse_args
)
if "%~1"=="--skip-app" (
    set BUILD_APP=false
    shift
    goto :parse_args
)
if "%~1"=="--skip-typecheck" (
    set SKIP_TYPECHECK=true
    shift
    goto :parse_args
)
if "%~1"=="--help" (
    echo Usage: %0 [options]
    echo.
    echo Options:
    echo   --skip-wasm       Skip WASM build ^(use existing pkg/^)
    echo   --skip-app        Skip Electron app build
    echo   --skip-typecheck  Skip TypeScript type checking
    echo   --help            Show this help message
    exit /b 0
)
shift
goto :parse_args
:done_args

REM Check prerequisites
echo [1/5] Checking prerequisites...

where node >nul 2>&1
if errorlevel 1 (
    echo Error: node is not installed
    echo Please install Node.js first
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not installed
    echo Please install Node.js first
    exit /b 1
)

if "%BUILD_WASM%"=="true" (
    where cargo >nul 2>&1
    if errorlevel 1 (
        echo Error: cargo is not installed
        echo Please install Rust first: https://rustup.rs
        exit /b 1
    )
)

for /f "tokens=*" %%i in ('node --version') do echo   - Node.js: %%i
for /f "tokens=*" %%i in ('npm --version') do echo   - npm: %%i
if "%BUILD_WASM%"=="true" (
    for /f "tokens=*" %%i in ('rustc --version') do echo   - Rust: %%i
)
echo.

REM Install npm dependencies
echo [2/5] Installing npm dependencies...
call npm ci --include=dev
if errorlevel 1 (
    echo Error: npm ci failed
    exit /b 1
)
echo.

REM Build WASM
if "%BUILD_WASM%"=="true" (
    echo [3/5] Building WASM ^(logos-lang^)...

    REM Check/install wasm-pack
    where wasm-pack >nul 2>&1
    if errorlevel 1 (
        echo   Installing wasm-pack...
        cargo install wasm-pack --locked
    )

    pushd logos-lang

    REM Set up WASI SDK environment if available
    if defined WASI_SDK_PATH (
        echo   Using WASI SDK from: %WASI_SDK_PATH%
        set "CC_wasm32_unknown_unknown=%WASI_SDK_PATH%\bin\clang.exe"
        set "CFLAGS_wasm32_unknown_unknown=--target=wasm32-wasi --sysroot=%WASI_SDK_PATH%\share\wasi-sysroot -fno-exceptions"
    ) else (
        echo   Note: WASI_SDK_PATH not set. If build fails, install WASI SDK:
        echo         https://github.com/WebAssembly/wasi-sdk/releases
    )

    wasm-pack build crates/logos-wasm --target web --release --out-dir ../../pkg --out-name logos-lang
    if errorlevel 1 (
        echo Error: wasm-pack build failed
        popd
        exit /b 1
    )

    popd
    echo   WASM build complete: pkg/
) else (
    echo [3/5] Skipping WASM build ^(--skip-wasm^)
)
echo.

REM TypeScript type check
if "%SKIP_TYPECHECK%"=="true" (
    echo [4/5] Skipping TypeScript type check ^(--skip-typecheck^)
) else (
    echo [4/5] Running TypeScript type check...
    call npm run typecheck
    if errorlevel 1 (
        echo Error: TypeScript type check failed
        exit /b 1
    )
)
echo.

REM Build Electron app
if "%BUILD_APP%"=="true" (
    echo [5/5] Building Electron application...

    call npx vite build
    if errorlevel 1 (
        echo Error: Vite build failed
        exit /b 1
    )

    call npx electron-builder
    if errorlevel 1 (
        echo Error: electron-builder failed
        exit /b 1
    )

    echo.
    echo ========================================
    echo   Build Complete!
    echo ========================================
    echo.
    echo Output directory: release\
    echo.
    dir release\ 2>nul || echo   ^(No release files found^)
) else (
    echo [5/5] Skipping Electron app build ^(--skip-app^)
)

echo.
echo Done!