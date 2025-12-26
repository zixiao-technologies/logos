/**
 * 语言检测工具
 * 根据文件名或扩展名检测编程语言
 */

/** 扩展名到 Monaco 语言 ID 的映射 */
const EXTENSION_LANGUAGE_MAP: Record<string, string> = {
  // TypeScript
  '.ts': 'typescript',
  '.tsx': 'typescriptreact',
  '.mts': 'typescript',
  '.cts': 'typescript',
  '.d.ts': 'typescript',

  // JavaScript
  '.js': 'javascript',
  '.jsx': 'javascriptreact',
  '.mjs': 'javascript',
  '.cjs': 'javascript',

  // Vue
  '.vue': 'vue',

  // HTML
  '.html': 'html',
  '.htm': 'html',
  '.xhtml': 'html',

  // CSS
  '.css': 'css',
  '.scss': 'scss',
  '.sass': 'scss',
  '.less': 'less',

  // JSON
  '.json': 'json',
  '.jsonc': 'jsonc',
  '.json5': 'json5',

  // YAML
  '.yaml': 'yaml',
  '.yml': 'yaml',

  // Markdown
  '.md': 'markdown',
  '.mdx': 'markdown',
  '.markdown': 'markdown',

  // XML
  '.xml': 'xml',
  '.xsl': 'xml',
  '.xslt': 'xml',
  '.svg': 'xml',

  // Python
  '.py': 'python',
  '.pyw': 'python',
  '.pyi': 'python',

  // Go
  '.go': 'go',

  // Rust
  '.rs': 'rust',

  // Java
  '.java': 'java',

  // Kotlin
  '.kt': 'kotlin',
  '.kts': 'kotlin',

  // C/C++
  '.c': 'c',
  '.h': 'c',
  '.cpp': 'cpp',
  '.cc': 'cpp',
  '.cxx': 'cpp',
  '.hpp': 'cpp',
  '.hh': 'cpp',
  '.hxx': 'cpp',

  // C#
  '.cs': 'csharp',

  // Swift
  '.swift': 'swift',

  // Ruby
  '.rb': 'ruby',
  '.erb': 'ruby',
  '.rake': 'ruby',

  // PHP
  '.php': 'php',

  // Shell
  '.sh': 'shell',
  '.bash': 'shell',
  '.zsh': 'shell',
  '.fish': 'shell',

  // PowerShell
  '.ps1': 'powershell',
  '.psm1': 'powershell',
  '.psd1': 'powershell',

  // Batch
  '.bat': 'bat',
  '.cmd': 'bat',

  // SQL
  '.sql': 'sql',

  // GraphQL
  '.graphql': 'graphql',
  '.gql': 'graphql',

  // Dockerfile
  '.dockerfile': 'dockerfile',

  // INI / TOML
  '.ini': 'ini',
  '.toml': 'ini',

  // Makefile
  '.mk': 'makefile',

  // Diff
  '.diff': 'diff',
  '.patch': 'diff',

  // Plain text
  '.txt': 'plaintext',
  '.text': 'plaintext',
  '.log': 'plaintext',
}

/** 特殊文件名到语言的映射 */
const FILENAME_LANGUAGE_MAP: Record<string, string> = {
  'Dockerfile': 'dockerfile',
  'dockerfile': 'dockerfile',
  'Makefile': 'makefile',
  'makefile': 'makefile',
  'GNUmakefile': 'makefile',
  'CMakeLists.txt': 'cmake',
  '.gitignore': 'ignore',
  '.gitattributes': 'properties',
  '.editorconfig': 'ini',
  '.npmrc': 'ini',
  '.nvmrc': 'plaintext',
  '.env': 'dotenv',
  '.env.local': 'dotenv',
  '.env.development': 'dotenv',
  '.env.production': 'dotenv',
  '.env.example': 'dotenv',
  'requirements.txt': 'pip-requirements',
  'Gemfile': 'ruby',
  'Rakefile': 'ruby',
  'Cargo.toml': 'toml',
  'Cargo.lock': 'toml',
  'go.mod': 'go.mod',
  'go.sum': 'go.sum',
  'pubspec.yaml': 'yaml',
}

/**
 * 检测文件语言
 * @param filename 文件名 (可包含路径)
 * @returns Monaco 语言 ID
 */
export function detectLanguage(filename: string): string {
  // 提取文件名
  const baseName = filename.split('/').pop() || filename

  // 检查特殊文件名
  if (FILENAME_LANGUAGE_MAP[baseName]) {
    return FILENAME_LANGUAGE_MAP[baseName]
  }

  // 检查 .d.ts 特殊扩展名
  if (baseName.endsWith('.d.ts')) {
    return 'typescript'
  }

  // 获取扩展名
  const lastDotIndex = baseName.lastIndexOf('.')
  if (lastDotIndex > 0) {
    const ext = baseName.slice(lastDotIndex).toLowerCase()
    if (EXTENSION_LANGUAGE_MAP[ext]) {
      return EXTENSION_LANGUAGE_MAP[ext]
    }
  }

  // 默认返回纯文本
  return 'plaintext'
}

/**
 * 获取语言显示名称
 * @param languageId Monaco 语言 ID
 * @returns 语言显示名称
 */
export function getLanguageDisplayName(languageId: string): string {
  const displayNames: Record<string, string> = {
    'typescript': 'TypeScript',
    'typescriptreact': 'TypeScript React',
    'javascript': 'JavaScript',
    'javascriptreact': 'JavaScript React',
    'vue': 'Vue',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'less': 'Less',
    'json': 'JSON',
    'jsonc': 'JSON with Comments',
    'yaml': 'YAML',
    'markdown': 'Markdown',
    'xml': 'XML',
    'python': 'Python',
    'go': 'Go',
    'rust': 'Rust',
    'java': 'Java',
    'kotlin': 'Kotlin',
    'c': 'C',
    'cpp': 'C++',
    'csharp': 'C#',
    'swift': 'Swift',
    'ruby': 'Ruby',
    'php': 'PHP',
    'shell': 'Shell',
    'powershell': 'PowerShell',
    'bat': 'Batch',
    'sql': 'SQL',
    'graphql': 'GraphQL',
    'dockerfile': 'Dockerfile',
    'ini': 'INI',
    'makefile': 'Makefile',
    'diff': 'Diff',
    'plaintext': 'Plain Text',
  }

  return displayNames[languageId] || languageId
}

/**
 * 获取语言的文件扩展名列表
 * @param languageId Monaco 语言 ID
 * @returns 扩展名数组
 */
export function getLanguageExtensions(languageId: string): string[] {
  const extensions: string[] = []

  for (const [ext, lang] of Object.entries(EXTENSION_LANGUAGE_MAP)) {
    if (lang === languageId) {
      extensions.push(ext)
    }
  }

  return extensions
}
