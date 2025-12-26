/**
 * 文件图标映射工具
 * 根据文件名或扩展名返回对应的 Material Design 图标名称
 */

/** 文件夹图标 */
const FOLDER_ICONS: Record<string, string> = {
  'node_modules': 'folder_special',
  'src': 'folder_open',
  'dist': 'folder_zip',
  'build': 'folder_zip',
  '.git': 'source',
  '.vscode': 'settings',
  '.idea': 'settings',
  'public': 'folder_shared',
  'assets': 'perm_media',
  'images': 'image',
  'img': 'image',
  'styles': 'palette',
  'css': 'palette',
  'components': 'widgets',
  'views': 'view_module',
  'pages': 'article',
  'layouts': 'dashboard',
  'store': 'storage',
  'stores': 'storage',
  'hooks': 'code',
  'utils': 'handyman',
  'lib': 'library_books',
  'libs': 'library_books',
  'types': 'data_object',
  'models': 'data_object',
  'services': 'api',
  'api': 'api',
  'test': 'science',
  'tests': 'science',
  '__tests__': 'science',
  'spec': 'science',
  'docs': 'description',
  'config': 'settings',
  'scripts': 'terminal',
  'electron': 'computer',
}

/** 文件扩展名图标 */
const EXTENSION_ICONS: Record<string, string> = {
  // TypeScript / JavaScript
  '.ts': 'code',
  '.tsx': 'code',
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',

  // Vue
  '.vue': 'code',

  // 样式
  '.css': 'palette',
  '.scss': 'palette',
  '.sass': 'palette',
  '.less': 'palette',
  '.styl': 'palette',

  // HTML / 模板
  '.html': 'html',
  '.htm': 'html',
  '.ejs': 'html',
  '.hbs': 'html',
  '.pug': 'html',

  // 数据格式
  '.json': 'data_object',
  '.yaml': 'data_object',
  '.yml': 'data_object',
  '.toml': 'data_object',
  '.xml': 'data_object',
  '.csv': 'table_chart',

  // 文档
  '.md': 'description',
  '.mdx': 'description',
  '.txt': 'text_snippet',
  '.pdf': 'picture_as_pdf',
  '.doc': 'article',
  '.docx': 'article',

  // 配置文件
  '.env': 'lock',
  '.env.local': 'lock',
  '.env.development': 'lock',
  '.env.production': 'lock',
  '.gitignore': 'source',
  '.gitattributes': 'source',
  '.editorconfig': 'settings',
  '.prettierrc': 'settings',
  '.eslintrc': 'settings',
  '.babelrc': 'settings',

  // 图片
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.svg': 'image',
  '.ico': 'image',
  '.webp': 'image',
  '.avif': 'image',

  // 字体
  '.ttf': 'font_download',
  '.otf': 'font_download',
  '.woff': 'font_download',
  '.woff2': 'font_download',
  '.eot': 'font_download',

  // 后端语言
  '.py': 'code',
  '.go': 'code',
  '.rs': 'code',
  '.java': 'code',
  '.kt': 'code',
  '.rb': 'code',
  '.php': 'code',
  '.c': 'code',
  '.cpp': 'code',
  '.h': 'code',
  '.cs': 'code',
  '.swift': 'code',

  // 脚本
  '.sh': 'terminal',
  '.bash': 'terminal',
  '.zsh': 'terminal',
  '.fish': 'terminal',
  '.ps1': 'terminal',
  '.bat': 'terminal',
  '.cmd': 'terminal',

  // 数据库
  '.sql': 'storage',
  '.db': 'storage',
  '.sqlite': 'storage',

  // Docker / 容器
  '.dockerfile': 'sailing',

  // 其他
  '.log': 'receipt_long',
  '.lock': 'lock',
  '.wasm': 'memory',
}

/** 特殊文件名图标 */
const FILENAME_ICONS: Record<string, string> = {
  'package.json': 'inventory',
  'package-lock.json': 'lock',
  'yarn.lock': 'lock',
  'pnpm-lock.yaml': 'lock',
  'tsconfig.json': 'settings',
  'vite.config.ts': 'bolt',
  'vite.config.js': 'bolt',
  'webpack.config.js': 'settings',
  'rollup.config.js': 'settings',
  'babel.config.js': 'settings',
  '.eslintrc.js': 'rule',
  '.eslintrc.json': 'rule',
  '.prettierrc': 'format_align_left',
  '.prettierrc.json': 'format_align_left',
  'README.md': 'menu_book',
  'LICENSE': 'gavel',
  'LICENSE.md': 'gavel',
  'Dockerfile': 'sailing',
  'docker-compose.yml': 'sailing',
  'docker-compose.yaml': 'sailing',
  '.gitignore': 'source',
  '.gitattributes': 'source',
  '.npmrc': 'inventory',
  '.nvmrc': 'memory',
  'Makefile': 'build',
  'Cargo.toml': 'inventory',
  'go.mod': 'inventory',
  'requirements.txt': 'inventory',
  'pyproject.toml': 'inventory',
  '.env': 'vpn_key',
  '.env.local': 'vpn_key',
  '.env.example': 'vpn_key',
}

/**
 * 获取文件图标名称
 * @param filename 文件名
 * @param isDirectory 是否是目录
 * @param isExpanded 目录是否展开 (仅目录有效)
 * @returns Material Design 图标名称
 */
export function getFileIcon(filename: string, isDirectory: boolean, isExpanded = false): string {
  const lowerName = filename.toLowerCase()

  if (isDirectory) {
    // 检查特殊文件夹
    if (FOLDER_ICONS[lowerName]) {
      return FOLDER_ICONS[lowerName]
    }
    // 默认文件夹图标
    return isExpanded ? 'folder_open' : 'folder'
  }

  // 检查特殊文件名
  if (FILENAME_ICONS[filename]) {
    return FILENAME_ICONS[filename]
  }
  if (FILENAME_ICONS[lowerName]) {
    return FILENAME_ICONS[lowerName]
  }

  // 获取扩展名
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex > 0) {
    const ext = filename.slice(lastDotIndex).toLowerCase()
    if (EXTENSION_ICONS[ext]) {
      return EXTENSION_ICONS[ext]
    }
  }

  // 默认文件图标
  return 'insert_drive_file'
}

/**
 * 获取 Git 状态图标
 * @param status Git 文件状态
 * @returns Material Design 图标名称
 */
export function getGitStatusIcon(status: string): string {
  switch (status) {
    case 'modified':
      return 'edit'
    case 'added':
      return 'add'
    case 'deleted':
      return 'delete'
    case 'untracked':
      return 'help_outline'
    case 'renamed':
      return 'drive_file_rename_outline'
    case 'copied':
      return 'content_copy'
    default:
      return 'help_outline'
  }
}

/**
 * 获取 Git 状态颜色 CSS 类名
 * @param status Git 文件状态
 * @returns CSS 类名
 */
export function getGitStatusClass(status: string): string {
  switch (status) {
    case 'modified':
      return 'git-modified'
    case 'added':
      return 'git-added'
    case 'deleted':
      return 'git-deleted'
    case 'untracked':
      return 'git-untracked'
    case 'renamed':
      return 'git-renamed'
    default:
      return ''
  }
}

/**
 * 获取 Git 状态标签文本
 * @param status Git 文件状态
 * @returns 状态标签文本
 */
export function getGitStatusLabel(status: string): string {
  switch (status) {
    case 'modified':
      return 'M'
    case 'added':
      return 'A'
    case 'deleted':
      return 'D'
    case 'untracked':
      return 'U'
    case 'renamed':
      return 'R'
    case 'copied':
      return 'C'
    default:
      return '?'
  }
}
