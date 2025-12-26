"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs/promises");
const fsSync = require("fs");
const child_process = require("child_process");
const util = require("util");
const pty = require("node-pty");
const os = require("os");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const fsSync__namespace = /* @__PURE__ */ _interopNamespaceDefault(fsSync);
const pty__namespace = /* @__PURE__ */ _interopNamespaceDefault(pty);
const os__namespace = /* @__PURE__ */ _interopNamespaceDefault(os);
const IGNORED_PATTERNS = [
  "node_modules",
  ".git",
  ".DS_Store",
  "Thumbs.db",
  ".idea",
  ".vscode",
  "__pycache__",
  ".pytest_cache",
  ".mypy_cache",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  ".nyc_output"
];
function shouldIgnore(name) {
  return IGNORED_PATTERNS.includes(name) || name.startsWith(".");
}
async function readDirectoryRecursive(dirPath, depth = 0, maxDepth = 2) {
  const nodes = [];
  try {
    const entries = await fs__namespace.readdir(dirPath, { withFileTypes: true });
    const sortedEntries = entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
    for (const entry of sortedEntries) {
      if (shouldIgnore(entry.name)) continue;
      const fullPath = path__namespace.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        const node = {
          path: fullPath,
          name: entry.name,
          type: "directory",
          children: depth < maxDepth ? await readDirectoryRecursive(fullPath, depth + 1, maxDepth) : []
        };
        nodes.push(node);
      } else if (entry.isFile()) {
        try {
          const stat = await fs__namespace.stat(fullPath);
          nodes.push({
            path: fullPath,
            name: entry.name,
            type: "file",
            size: stat.size,
            modifiedAt: stat.mtimeMs
          });
        } catch {
          nodes.push({
            path: fullPath,
            name: entry.name,
            type: "file"
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  return nodes;
}
async function readDirectorySingle(dirPath) {
  const nodes = [];
  try {
    const entries = await fs__namespace.readdir(dirPath, { withFileTypes: true });
    const sortedEntries = entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
    for (const entry of sortedEntries) {
      if (shouldIgnore(entry.name)) continue;
      const fullPath = path__namespace.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        nodes.push({
          path: fullPath,
          name: entry.name,
          type: "directory",
          children: []
          // 空数组表示未展开
        });
      } else if (entry.isFile()) {
        try {
          const stat = await fs__namespace.stat(fullPath);
          nodes.push({
            path: fullPath,
            name: entry.name,
            type: "file",
            size: stat.size,
            modifiedAt: stat.mtimeMs
          });
        } catch {
          nodes.push({
            path: fullPath,
            name: entry.name,
            type: "file"
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  return nodes;
}
function registerFileSystemHandlers() {
  electron.ipcMain.handle("fs:openFolderDialog", async () => {
    const result = await electron.dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: "选择项目文件夹"
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });
  electron.ipcMain.handle("fs:openFileDialog", async (_, options) => {
    const result = await electron.dialog.showOpenDialog({
      properties: (options == null ? void 0 : options.multiple) ? ["openFile", "multiSelections"] : ["openFile"],
      filters: options == null ? void 0 : options.filters,
      title: "选择文件"
    });
    if (result.canceled) {
      return (options == null ? void 0 : options.multiple) ? [] : null;
    }
    return (options == null ? void 0 : options.multiple) ? result.filePaths : result.filePaths[0];
  });
  electron.ipcMain.handle("fs:saveFileDialog", async (_, options) => {
    const result = await electron.dialog.showSaveDialog({
      defaultPath: options == null ? void 0 : options.defaultPath,
      filters: options == null ? void 0 : options.filters,
      title: "保存文件"
    });
    if (result.canceled) {
      return null;
    }
    return result.filePath;
  });
  electron.ipcMain.handle("fs:readDirectory", async (_, dirPath, recursive = false) => {
    if (recursive) {
      return readDirectoryRecursive(dirPath);
    }
    return readDirectorySingle(dirPath);
  });
  electron.ipcMain.handle("fs:readFile", async (_, filePath) => {
    try {
      const content = await fs__namespace.readFile(filePath, "utf-8");
      return content;
    } catch (error) {
      throw new Error(`无法读取文件: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:readFileBuffer", async (_, filePath) => {
    try {
      const buffer = await fs__namespace.readFile(filePath);
      return buffer;
    } catch (error) {
      throw new Error(`无法读取文件: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:writeFile", async (_, filePath, content) => {
    try {
      const dir = path__namespace.dirname(filePath);
      await fs__namespace.mkdir(dir, { recursive: true });
      await fs__namespace.writeFile(filePath, content, "utf-8");
    } catch (error) {
      throw new Error(`无法写入文件: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:createFile", async (_, filePath, content = "") => {
    try {
      try {
        await fs__namespace.access(filePath);
        throw new Error("文件已存在");
      } catch (e) {
        if (e.code !== "ENOENT") {
          throw e;
        }
      }
      const dir = path__namespace.dirname(filePath);
      await fs__namespace.mkdir(dir, { recursive: true });
      await fs__namespace.writeFile(filePath, content, "utf-8");
    } catch (error) {
      throw new Error(`无法创建文件: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:createDirectory", async (_, dirPath) => {
    try {
      await fs__namespace.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new Error(`无法创建目录: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:deleteItem", async (_, itemPath) => {
    try {
      const stat = await fs__namespace.stat(itemPath);
      if (stat.isDirectory()) {
        await fs__namespace.rm(itemPath, { recursive: true, force: true });
      } else {
        await fs__namespace.unlink(itemPath);
      }
    } catch (error) {
      throw new Error(`无法删除: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:renameItem", async (_, oldPath, newPath) => {
    try {
      await fs__namespace.rename(oldPath, newPath);
    } catch (error) {
      throw new Error(`无法重命名: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:moveItem", async (_, sourcePath, targetPath) => {
    try {
      await fs__namespace.rename(sourcePath, targetPath);
    } catch (error) {
      throw new Error(`无法移动: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:copyItem", async (_, sourcePath, targetPath) => {
    try {
      const stat = await fs__namespace.stat(sourcePath);
      if (stat.isDirectory()) {
        await fs__namespace.cp(sourcePath, targetPath, { recursive: true });
      } else {
        await fs__namespace.copyFile(sourcePath, targetPath);
      }
    } catch (error) {
      throw new Error(`无法复制: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:exists", async (_, itemPath) => {
    try {
      await fs__namespace.access(itemPath);
      return true;
    } catch {
      return false;
    }
  });
  electron.ipcMain.handle("fs:stat", async (_, itemPath) => {
    try {
      const stat = await fs__namespace.stat(itemPath);
      return {
        isFile: stat.isFile(),
        isDirectory: stat.isDirectory(),
        size: stat.size,
        modifiedAt: stat.mtimeMs
      };
    } catch (error) {
      throw new Error(`无法获取文件信息: ${error.message}`);
    }
  });
  electron.ipcMain.handle("fs:getHomeDir", () => {
    return process.env.HOME || process.env.USERPROFILE || "/";
  });
  electron.ipcMain.handle("fs:getPathSeparator", () => {
    return path__namespace.sep;
  });
  electron.ipcMain.handle("fs:joinPath", (_, ...parts) => {
    return path__namespace.join(...parts);
  });
  electron.ipcMain.handle("fs:dirname", (_, filePath) => {
    return path__namespace.dirname(filePath);
  });
  electron.ipcMain.handle("fs:basename", (_, filePath) => {
    return path__namespace.basename(filePath);
  });
  electron.ipcMain.handle("fs:extname", (_, filePath) => {
    return path__namespace.extname(filePath);
  });
}
const watchers = /* @__PURE__ */ new Map();
function registerFileWatcherHandlers(getMainWindow2) {
  electron.ipcMain.handle("fs:watchDirectory", (_, dirPath) => {
    if (watchers.has(dirPath)) {
      return;
    }
    try {
      const watcher = fsSync__namespace.watch(dirPath, { recursive: true }, (eventType, filename) => {
        const mainWindow2 = getMainWindow2();
        if (mainWindow2 && filename) {
          mainWindow2.webContents.send("fs:change", {
            type: eventType,
            path: path__namespace.join(dirPath, filename)
          });
        }
      });
      watchers.set(dirPath, watcher);
    } catch (error) {
      console.error(`无法监听目录 ${dirPath}:`, error);
    }
  });
  electron.ipcMain.handle("fs:unwatchDirectory", (_, dirPath) => {
    const watcher = watchers.get(dirPath);
    if (watcher) {
      watcher.close();
      watchers.delete(dirPath);
    }
  });
  electron.ipcMain.handle("fs:unwatchAll", () => {
    for (const watcher of watchers.values()) {
      watcher.close();
    }
    watchers.clear();
  });
}
function cleanupFileWatchers() {
  for (const watcher of watchers.values()) {
    watcher.close();
  }
  watchers.clear();
}
const execAsync = util.promisify(child_process.exec);
async function execGit(repoPath, args) {
  try {
    const { stdout } = await execAsync(`git ${args}`, {
      cwd: repoPath,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024
      // 10MB
    });
    return stdout;
  } catch (error) {
    const err = error;
    throw new Error(err.stderr || err.message);
  }
}
function parseGitStatus(output) {
  const staged = [];
  const unstaged = [];
  const lines = output.trim().split("\n").filter(Boolean);
  for (const line of lines) {
    if (line.length < 3) continue;
    const x = line[0];
    const y = line[1];
    let filePath = line.slice(3);
    let oldPath;
    if (filePath.includes(" -> ")) {
      const parts = filePath.split(" -> ");
      oldPath = parts[0];
      filePath = parts[1];
    }
    const parseStatus = (char) => {
      switch (char) {
        case "M":
          return "modified";
        case "A":
          return "added";
        case "D":
          return "deleted";
        case "R":
          return "renamed";
        case "C":
          return "copied";
        case "?":
          return "untracked";
        default:
          return "modified";
      }
    };
    if (x !== " " && x !== "?") {
      staged.push({
        path: filePath,
        status: parseStatus(x),
        staged: true,
        oldPath
      });
    }
    if (y !== " " || x === "?") {
      unstaged.push({
        path: filePath,
        status: parseStatus(y === " " ? x : y),
        staged: false,
        oldPath
      });
    }
  }
  return { staged, unstaged };
}
function parseBranches(output, currentBranch) {
  const branches = [];
  const lines = output.trim().split("\n").filter(Boolean);
  for (const line of lines) {
    const isCurrent = line.startsWith("*");
    const name = line.replace(/^\*?\s+/, "").trim();
    if (name.startsWith("(HEAD")) continue;
    branches.push({
      name,
      current: isCurrent || name === currentBranch
    });
  }
  return branches;
}
function parseLog(output) {
  const commits = [];
  const entries = output.trim().split("\n\n").filter(Boolean);
  for (const entry of entries) {
    const [hash, shortHash, author, authorEmail, date, ...messageParts] = entry.split("\n");
    commits.push({
      hash,
      shortHash,
      author,
      authorEmail,
      date,
      message: messageParts.join("\n")
    });
  }
  return commits;
}
function registerGitHandlers() {
  electron.ipcMain.handle("git:isRepo", async (_, repoPath) => {
    try {
      await execGit(repoPath, "rev-parse --git-dir");
      return true;
    } catch {
      return false;
    }
  });
  electron.ipcMain.handle("git:status", async (_, repoPath) => {
    let branch = "HEAD";
    try {
      branch = (await execGit(repoPath, "branch --show-current")).trim() || "HEAD";
    } catch {
    }
    const statusOutput = await execGit(repoPath, "status --porcelain=v1");
    const { staged, unstaged } = parseGitStatus(statusOutput);
    let remote;
    let hasUnpushed = false;
    try {
      const aheadBehind = await execGit(repoPath, "rev-list --left-right --count HEAD...@{u}");
      const [ahead, behind] = aheadBehind.trim().split(/\s+/).map(Number);
      remote = { ahead, behind };
      hasUnpushed = ahead > 0;
    } catch {
    }
    return {
      branch,
      staged,
      unstaged,
      hasChanges: staged.length > 0 || unstaged.length > 0,
      hasUnpushed,
      remote
    };
  });
  electron.ipcMain.handle("git:stage", async (_, repoPath, filePath) => {
    await execGit(repoPath, `add "${filePath}"`);
  });
  electron.ipcMain.handle("git:unstage", async (_, repoPath, filePath) => {
    await execGit(repoPath, `reset HEAD "${filePath}"`);
  });
  electron.ipcMain.handle("git:stageAll", async (_, repoPath) => {
    await execGit(repoPath, "add -A");
  });
  electron.ipcMain.handle("git:unstageAll", async (_, repoPath) => {
    await execGit(repoPath, "reset HEAD");
  });
  electron.ipcMain.handle("git:commit", async (_, repoPath, message) => {
    const escapedMessage = message.replace(/"/g, '\\"');
    await execGit(repoPath, `commit -m "${escapedMessage}"`);
  });
  electron.ipcMain.handle("git:discard", async (_, repoPath, filePath) => {
    await execGit(repoPath, `checkout -- "${filePath}"`);
  });
  electron.ipcMain.handle("git:discardAll", async (_, repoPath) => {
    await execGit(repoPath, "checkout -- .");
  });
  electron.ipcMain.handle("git:branches", async (_, repoPath) => {
    const currentBranch = (await execGit(repoPath, "branch --show-current")).trim();
    const output = await execGit(repoPath, "branch -a");
    return parseBranches(output, currentBranch);
  });
  electron.ipcMain.handle("git:checkout", async (_, repoPath, branchName) => {
    await execGit(repoPath, `checkout "${branchName}"`);
  });
  electron.ipcMain.handle("git:createBranch", async (_, repoPath, branchName, checkout = true) => {
    if (checkout) {
      await execGit(repoPath, `checkout -b "${branchName}"`);
    } else {
      await execGit(repoPath, `branch "${branchName}"`);
    }
  });
  electron.ipcMain.handle("git:deleteBranch", async (_, repoPath, branchName, force = false) => {
    const flag = force ? "-D" : "-d";
    await execGit(repoPath, `branch ${flag} "${branchName}"`);
  });
  electron.ipcMain.handle("git:diff", async (_, repoPath, filePath, staged) => {
    const stagedFlag = staged ? "--staged" : "";
    return await execGit(repoPath, `diff ${stagedFlag} "${filePath}"`);
  });
  electron.ipcMain.handle("git:showFile", async (_, repoPath, filePath, ref = "HEAD") => {
    return await execGit(repoPath, `show "${ref}:${filePath}"`);
  });
  electron.ipcMain.handle("git:log", async (_, repoPath, limit = 50) => {
    const format = "%H%n%h%n%an%n%ae%n%ci%n%s";
    const output = await execGit(repoPath, `log --format="${format}" -n ${limit}`);
    return parseLog(output);
  });
  electron.ipcMain.handle("git:logFile", async (_, repoPath, filePath, limit = 20) => {
    const format = "%H%n%h%n%an%n%ae%n%ci%n%s";
    const output = await execGit(repoPath, `log --format="${format}" -n ${limit} --follow -- "${filePath}"`);
    return parseLog(output);
  });
  electron.ipcMain.handle("git:push", async (_, repoPath, remote = "origin", branch) => {
    const branchArg = branch ? ` "${branch}"` : "";
    await execGit(repoPath, `push "${remote}"${branchArg}`);
  });
  electron.ipcMain.handle("git:pull", async (_, repoPath, remote = "origin", branch) => {
    const branchArg = branch ? ` "${branch}"` : "";
    await execGit(repoPath, `pull "${remote}"${branchArg}`);
  });
  electron.ipcMain.handle("git:remotes", async (_, repoPath) => {
    const output = await execGit(repoPath, "remote");
    return output.trim().split("\n").filter(Boolean);
  });
  electron.ipcMain.handle("git:init", async (_, repoPath) => {
    await execGit(repoPath, "init");
  });
  electron.ipcMain.handle("git:clone", async (_, url, targetPath) => {
    await execAsync(`git clone "${url}" "${targetPath}"`);
  });
  electron.ipcMain.handle("git:getConfig", async (_, repoPath, key) => {
    try {
      const output = await execGit(repoPath, `config --get ${key}`);
      return output.trim();
    } catch {
      return null;
    }
  });
  electron.ipcMain.handle("git:setConfig", async (_, repoPath, key, value) => {
    await execGit(repoPath, `config ${key} "${value}"`);
  });
  electron.ipcMain.handle("git:blame", async (_, repoPath, filePath) => {
    return await execGit(repoPath, `blame "${filePath}"`);
  });
  electron.ipcMain.handle("git:stash", async (_, repoPath, message) => {
    const msgArg = message ? ` -m "${message}"` : "";
    await execGit(repoPath, `stash${msgArg}`);
  });
  electron.ipcMain.handle("git:stashPop", async (_, repoPath) => {
    await execGit(repoPath, "stash pop");
  });
  electron.ipcMain.handle("git:stashList", async (_, repoPath) => {
    const output = await execGit(repoPath, "stash list");
    return output.trim().split("\n").filter(Boolean);
  });
}
const terminals = /* @__PURE__ */ new Map();
let getMainWindow$1 = () => null;
function getDefaultShell() {
  if (os__namespace.platform() === "win32") {
    return process.env.COMSPEC || "cmd.exe";
  }
  return process.env.SHELL || "/bin/bash";
}
function getDefaultEnv() {
  const env = { ...process.env };
  env.TERM = "xterm-256color";
  env.COLORTERM = "truecolor";
  return env;
}
function createTerminal(id, options = {}) {
  if (terminals.has(id)) {
    destroyTerminal(id);
  }
  const cols = options.cols || 80;
  const rows = options.rows || 24;
  const shell = options.shell || getDefaultShell();
  const cwd = options.cwd || os__namespace.homedir();
  const env = { ...getDefaultEnv(), ...options.env };
  try {
    const ptyProcess = pty__namespace.spawn(shell, [], {
      name: "xterm-256color",
      cols,
      rows,
      cwd,
      env
    });
    terminals.set(id, {
      pty: ptyProcess,
      cols,
      rows
    });
    ptyProcess.onData((data) => {
      const mainWindow2 = getMainWindow$1();
      if (mainWindow2 && !mainWindow2.isDestroyed()) {
        mainWindow2.webContents.send("terminal:data", { id, data });
      }
    });
    ptyProcess.onExit(({ exitCode, signal }) => {
      const mainWindow2 = getMainWindow$1();
      if (mainWindow2 && !mainWindow2.isDestroyed()) {
        mainWindow2.webContents.send("terminal:exit", { id, exitCode, signal });
      }
      terminals.delete(id);
    });
    console.log(`Terminal ${id} created with shell: ${shell}`);
  } catch (error) {
    console.error(`Failed to create terminal ${id}:`, error);
    throw error;
  }
}
function writeToTerminal(id, data) {
  const session = terminals.get(id);
  if (session) {
    session.pty.write(data);
  }
}
function resizeTerminal(id, cols, rows) {
  const session = terminals.get(id);
  if (session) {
    session.pty.resize(cols, rows);
    session.cols = cols;
    session.rows = rows;
  }
}
function destroyTerminal(id) {
  const session = terminals.get(id);
  if (session) {
    try {
      session.pty.kill();
    } catch (error) {
      console.error(`Error killing terminal ${id}:`, error);
    }
    terminals.delete(id);
    console.log(`Terminal ${id} destroyed`);
  }
}
function destroyAllTerminals() {
  for (const id of terminals.keys()) {
    destroyTerminal(id);
  }
}
function getTerminalInfo(id) {
  const session = terminals.get(id);
  if (session) {
    return { cols: session.cols, rows: session.rows };
  }
  return null;
}
function registerTerminalHandlers(getWindow) {
  getMainWindow$1 = getWindow;
  electron.ipcMain.handle("terminal:create", (_, id, options) => {
    try {
      createTerminal(id, options);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.on("terminal:write", (_, id, data) => {
    writeToTerminal(id, data);
  });
  electron.ipcMain.on("terminal:resize", (_, id, cols, rows) => {
    resizeTerminal(id, cols, rows);
  });
  electron.ipcMain.handle("terminal:destroy", (_, id) => {
    destroyTerminal(id);
    return { success: true };
  });
  electron.ipcMain.handle("terminal:info", (_, id) => {
    return getTerminalInfo(id);
  });
  electron.ipcMain.handle("terminal:list", () => {
    return Array.from(terminals.keys());
  });
}
function cleanupTerminals() {
  destroyAllTerminals();
}
const isDev = process.env.NODE_ENV === "development" || !electron.app.isPackaged;
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "Logos IDE",
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    show: false,
    backgroundColor: "#1e1e1e"
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow == null ? void 0 : mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
function getMainWindow() {
  return mainWindow;
}
function registerAllHandlers() {
  electron.ipcMain.handle("app:version", () => {
    return electron.app.getVersion();
  });
  electron.ipcMain.handle("app:platform", () => {
    return process.platform;
  });
  electron.ipcMain.handle("shell:openExternal", (_event, url) => {
    return electron.shell.openExternal(url);
  });
  electron.ipcMain.on("window:minimize", () => {
    mainWindow == null ? void 0 : mainWindow.minimize();
  });
  electron.ipcMain.on("window:maximize", () => {
    if (mainWindow == null ? void 0 : mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow == null ? void 0 : mainWindow.maximize();
    }
  });
  electron.ipcMain.on("window:close", () => {
    mainWindow == null ? void 0 : mainWindow.close();
  });
  registerFileSystemHandlers();
  registerFileWatcherHandlers(getMainWindow);
  registerGitHandlers();
  registerTerminalHandlers(getMainWindow);
}
electron.app.whenReady().then(() => {
  registerAllHandlers();
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("before-quit", () => {
  cleanupFileWatchers();
  cleanupTerminals();
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
