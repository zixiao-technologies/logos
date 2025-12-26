"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // ============ 应用信息 ============
  getVersion: () => electron.ipcRenderer.invoke("app:version"),
  getPlatform: () => electron.ipcRenderer.invoke("app:platform"),
  platform: process.platform,
  // ============ Shell 操作 ============
  openExternal: (url) => electron.ipcRenderer.invoke("shell:openExternal", url),
  // ============ 窗口控制 ============
  minimize: () => electron.ipcRenderer.send("window:minimize"),
  maximize: () => electron.ipcRenderer.send("window:maximize"),
  close: () => electron.ipcRenderer.send("window:close"),
  // ============ 文件系统操作 ============
  fileSystem: {
    // 对话框
    openFolderDialog: () => electron.ipcRenderer.invoke("fs:openFolderDialog"),
    openFileDialog: (options) => electron.ipcRenderer.invoke("fs:openFileDialog", options),
    saveFileDialog: (options) => electron.ipcRenderer.invoke("fs:saveFileDialog", options),
    // 读取操作
    readDirectory: (dirPath, recursive) => electron.ipcRenderer.invoke("fs:readDirectory", dirPath, recursive),
    readFile: (filePath) => electron.ipcRenderer.invoke("fs:readFile", filePath),
    readFileBuffer: (filePath) => electron.ipcRenderer.invoke("fs:readFileBuffer", filePath),
    // 写入操作
    writeFile: (filePath, content) => electron.ipcRenderer.invoke("fs:writeFile", filePath, content),
    createFile: (filePath, content) => electron.ipcRenderer.invoke("fs:createFile", filePath, content),
    createDirectory: (dirPath) => electron.ipcRenderer.invoke("fs:createDirectory", dirPath),
    // 文件操作
    deleteItem: (itemPath) => electron.ipcRenderer.invoke("fs:deleteItem", itemPath),
    renameItem: (oldPath, newPath) => electron.ipcRenderer.invoke("fs:renameItem", oldPath, newPath),
    moveItem: (sourcePath, targetPath) => electron.ipcRenderer.invoke("fs:moveItem", sourcePath, targetPath),
    copyItem: (sourcePath, targetPath) => electron.ipcRenderer.invoke("fs:copyItem", sourcePath, targetPath),
    // 信息查询
    exists: (itemPath) => electron.ipcRenderer.invoke("fs:exists", itemPath),
    stat: (itemPath) => electron.ipcRenderer.invoke("fs:stat", itemPath),
    // 路径操作
    getHomeDir: () => electron.ipcRenderer.invoke("fs:getHomeDir"),
    getPathSeparator: () => electron.ipcRenderer.invoke("fs:getPathSeparator"),
    joinPath: (...parts) => electron.ipcRenderer.invoke("fs:joinPath", ...parts),
    dirname: (filePath) => electron.ipcRenderer.invoke("fs:dirname", filePath),
    basename: (filePath) => electron.ipcRenderer.invoke("fs:basename", filePath),
    extname: (filePath) => electron.ipcRenderer.invoke("fs:extname", filePath),
    // 文件监听
    watchDirectory: (dirPath) => electron.ipcRenderer.invoke("fs:watchDirectory", dirPath),
    unwatchDirectory: (dirPath) => electron.ipcRenderer.invoke("fs:unwatchDirectory", dirPath),
    unwatchAll: () => electron.ipcRenderer.invoke("fs:unwatchAll"),
    onFileChange: (callback) => {
      const handler = (_, event) => callback(event);
      electron.ipcRenderer.on("fs:change", handler);
      return () => electron.ipcRenderer.removeListener("fs:change", handler);
    }
  },
  // ============ Git 操作 ============
  git: {
    // 仓库操作
    isRepo: (repoPath) => electron.ipcRenderer.invoke("git:isRepo", repoPath),
    init: (repoPath) => electron.ipcRenderer.invoke("git:init", repoPath),
    clone: (url, targetPath) => electron.ipcRenderer.invoke("git:clone", url, targetPath),
    // 状态查询
    status: (repoPath) => electron.ipcRenderer.invoke("git:status", repoPath),
    // 暂存操作
    stage: (repoPath, filePath) => electron.ipcRenderer.invoke("git:stage", repoPath, filePath),
    unstage: (repoPath, filePath) => electron.ipcRenderer.invoke("git:unstage", repoPath, filePath),
    stageAll: (repoPath) => electron.ipcRenderer.invoke("git:stageAll", repoPath),
    unstageAll: (repoPath) => electron.ipcRenderer.invoke("git:unstageAll", repoPath),
    // 提交操作
    commit: (repoPath, message) => electron.ipcRenderer.invoke("git:commit", repoPath, message),
    // 更改操作
    discard: (repoPath, filePath) => electron.ipcRenderer.invoke("git:discard", repoPath, filePath),
    discardAll: (repoPath) => electron.ipcRenderer.invoke("git:discardAll", repoPath),
    // 分支操作
    branches: (repoPath) => electron.ipcRenderer.invoke("git:branches", repoPath),
    checkout: (repoPath, branchName) => electron.ipcRenderer.invoke("git:checkout", repoPath, branchName),
    createBranch: (repoPath, branchName, checkout) => electron.ipcRenderer.invoke("git:createBranch", repoPath, branchName, checkout),
    deleteBranch: (repoPath, branchName, force) => electron.ipcRenderer.invoke("git:deleteBranch", repoPath, branchName, force),
    // 差异查看
    diff: (repoPath, filePath, staged) => electron.ipcRenderer.invoke("git:diff", repoPath, filePath, staged),
    showFile: (repoPath, filePath, ref) => electron.ipcRenderer.invoke("git:showFile", repoPath, filePath, ref),
    // 历史记录
    log: (repoPath, limit) => electron.ipcRenderer.invoke("git:log", repoPath, limit),
    logFile: (repoPath, filePath, limit) => electron.ipcRenderer.invoke("git:logFile", repoPath, filePath, limit),
    // 远程操作
    push: (repoPath, remote, branch) => electron.ipcRenderer.invoke("git:push", repoPath, remote, branch),
    pull: (repoPath, remote, branch) => electron.ipcRenderer.invoke("git:pull", repoPath, remote, branch),
    remotes: (repoPath) => electron.ipcRenderer.invoke("git:remotes", repoPath),
    // 配置
    getConfig: (repoPath, key) => electron.ipcRenderer.invoke("git:getConfig", repoPath, key),
    setConfig: (repoPath, key, value) => electron.ipcRenderer.invoke("git:setConfig", repoPath, key, value),
    // Blame
    blame: (repoPath, filePath) => electron.ipcRenderer.invoke("git:blame", repoPath, filePath),
    // Stash
    stash: (repoPath, message) => electron.ipcRenderer.invoke("git:stash", repoPath, message),
    stashPop: (repoPath) => electron.ipcRenderer.invoke("git:stashPop", repoPath),
    stashList: (repoPath) => electron.ipcRenderer.invoke("git:stashList", repoPath)
  },
  // ============ 终端操作 ============
  terminal: {
    // 创建终端
    create: (id, options) => electron.ipcRenderer.invoke("terminal:create", id, options),
    // 写入数据
    write: (id, data) => electron.ipcRenderer.send("terminal:write", id, data),
    // 调整大小
    resize: (id, cols, rows) => electron.ipcRenderer.send("terminal:resize", id, cols, rows),
    // 销毁终端
    destroy: (id) => electron.ipcRenderer.invoke("terminal:destroy", id),
    // 获取终端信息
    info: (id) => electron.ipcRenderer.invoke("terminal:info", id),
    // 获取所有终端 ID
    list: () => electron.ipcRenderer.invoke("terminal:list"),
    // 监听终端数据
    onData: (callback) => {
      const handler = (_, event) => callback(event);
      electron.ipcRenderer.on("terminal:data", handler);
      return () => electron.ipcRenderer.removeListener("terminal:data", handler);
    },
    // 监听终端退出
    onExit: (callback) => {
      const handler = (_, event) => callback(event);
      electron.ipcRenderer.on("terminal:exit", handler);
      return () => electron.ipcRenderer.removeListener("terminal:exit", handler);
    }
  }
});
