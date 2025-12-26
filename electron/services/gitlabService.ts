/**
 * GitLab CI 服务
 * 提供与 GitLab CI/CD API 的交互
 */

import { ipcMain } from 'electron'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

/** GitLab Pipeline */
interface GitLabPipeline {
  id: number
  iid: number
  project_id: number
  sha: string
  ref: string
  status: string
  source: string
  created_at: string
  updated_at: string
  web_url: string
  user: {
    id: number
    username: string
    name: string
    avatar_url: string
  }
  duration: number | null
}

/** GitLab Job */
interface GitLabJob {
  id: number
  name: string
  stage: string
  status: string
  created_at: string
  started_at: string | null
  finished_at: string | null
  duration: number | null
  web_url: string
  pipeline: {
    id: number
    project_id: number
    ref: string
    sha: string
    status: string
  }
}

/**
 * 从 git remote 获取 GitLab 项目信息
 */
async function getGitLabProjectInfo(repoPath: string, baseUrl: string): Promise<{ projectPath: string } | null> {
  try {
    const { stdout } = await execAsync('git remote get-url origin', { cwd: repoPath })
    const url = stdout.trim()

    // 从 baseUrl 提取 host
    const baseHost = new URL(baseUrl).host

    // 支持 HTTPS 和 SSH 格式
    // https://gitlab.com/owner/repo.git
    // git@gitlab.com:owner/repo.git
    const httpsPattern = new RegExp(`${baseHost}/(.+?)(\\.git)?$`)
    const sshPattern = new RegExp(`${baseHost}:(.+?)(\\.git)?$`)

    let match = url.match(httpsPattern) || url.match(sshPattern)
    if (match) {
      return { projectPath: match[1] }
    }

    return null
  } catch {
    return null
  }
}

/**
 * 获取 Token (优先级: 传入参数 > 环境变量)
 */
function getToken(providedToken?: string): string | null {
  if (providedToken) {
    return providedToken
  }

  if (process.env.GITLAB_TOKEN) {
    return process.env.GITLAB_TOKEN
  }

  return null
}

/**
 * 发送 GitLab API 请求
 */
async function gitlabRequest<T>(
  baseUrl: string,
  endpoint: string,
  token: string,
  method: string = 'GET',
  body?: unknown
): Promise<T> {
  const url = `${baseUrl}/api/v4${endpoint}`

  const response = await fetch(url, {
    method,
    headers: {
      'PRIVATE-TOKEN': token,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`GitLab API error: ${response.status} - ${error}`)
  }

  return response.json()
}

/**
 * 注册 GitLab CI IPC handlers
 */
export function registerGitLabHandlers() {
  // 获取项目信息
  ipcMain.handle('gitlab:getProjectInfo', async (_event, repoPath: string, baseUrl: string) => {
    return await getGitLabProjectInfo(repoPath, baseUrl)
  })

  // 获取 pipelines
  ipcMain.handle('gitlab:getPipelines', async (
    _event,
    repoPath: string,
    baseUrl: string,
    token?: string,
    perPage: number = 20
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const pipelines = await gitlabRequest<GitLabPipeline[]>(
      baseUrl,
      `/projects/${encodedPath}/pipelines?per_page=${perPage}`,
      resolvedToken
    )

    return pipelines
  })

  // 获取 pipeline jobs
  ipcMain.handle('gitlab:getPipelineJobs', async (
    _event,
    repoPath: string,
    baseUrl: string,
    pipelineId: number,
    token?: string
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const jobs = await gitlabRequest<GitLabJob[]>(
      baseUrl,
      `/projects/${encodedPath}/pipelines/${pipelineId}/jobs`,
      resolvedToken
    )

    return jobs
  })

  // 触发 pipeline
  ipcMain.handle('gitlab:triggerPipeline', async (
    _event,
    repoPath: string,
    baseUrl: string,
    ref: string = 'main',
    token?: string,
    variables?: Array<{ key: string; value: string }>
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const body: any = { ref }
    if (variables && variables.length > 0) {
      body.variables = variables
    }

    const pipeline = await gitlabRequest<GitLabPipeline>(
      baseUrl,
      `/projects/${encodedPath}/pipeline`,
      resolvedToken,
      'POST',
      body
    )

    return pipeline
  })

  // 取消 pipeline
  ipcMain.handle('gitlab:cancelPipeline', async (
    _event,
    repoPath: string,
    baseUrl: string,
    pipelineId: number,
    token?: string
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const pipeline = await gitlabRequest<GitLabPipeline>(
      baseUrl,
      `/projects/${encodedPath}/pipelines/${pipelineId}/cancel`,
      resolvedToken,
      'POST'
    )

    return pipeline
  })

  // 重试 pipeline
  ipcMain.handle('gitlab:retryPipeline', async (
    _event,
    repoPath: string,
    baseUrl: string,
    pipelineId: number,
    token?: string
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const pipeline = await gitlabRequest<GitLabPipeline>(
      baseUrl,
      `/projects/${encodedPath}/pipelines/${pipelineId}/retry`,
      resolvedToken,
      'POST'
    )

    return pipeline
  })

  // 获取 job 日志
  ipcMain.handle('gitlab:getJobLog', async (
    _event,
    repoPath: string,
    baseUrl: string,
    jobId: number,
    token?: string
  ) => {
    const projectInfo = await getGitLabProjectInfo(repoPath, baseUrl)
    if (!projectInfo) {
      throw new Error('Cannot determine GitLab project from remote URL')
    }

    const resolvedToken = getToken(token)
    if (!resolvedToken) {
      throw new Error('GitLab token not found. Please configure it in settings.')
    }

    const encodedPath = encodeURIComponent(projectInfo.projectPath)
    const url = `${baseUrl}/api/v4/projects/${encodedPath}/jobs/${jobId}/trace`

    const response = await fetch(url, {
      headers: {
        'PRIVATE-TOKEN': resolvedToken
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab API error: ${response.status}`)
    }

    return response.text()
  })
}
