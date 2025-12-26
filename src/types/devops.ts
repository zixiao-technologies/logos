/**
 * DevOps 相关类型定义
 */

/** 流水线状态 */
export type PipelineStatus = 'pending' | 'running' | 'success' | 'failed' | 'cancelled'

/** 流水线阶段状态 */
export type StageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped'

/** 流水线任务状态 */
export type JobStatus = 'pending' | 'running' | 'success' | 'failed'

/** 流水线任务 */
export interface PipelineJob {
  /** 任务 ID */
  id: string
  /** 任务名称 */
  name: string
  /** 任务状态 */
  status: JobStatus
  /** 开始时间 */
  startedAt?: string
  /** 结束时间 */
  finishedAt?: string
  /** 执行时长 (秒) */
  duration?: number
  /** 日志内容 */
  logs?: string[]
}

/** 流水线阶段 */
export interface PipelineStage {
  /** 阶段 ID */
  id: string
  /** 阶段名称 */
  name: string
  /** 阶段状态 */
  status: StageStatus
  /** 任务列表 */
  jobs: PipelineJob[]
  /** 开始时间 */
  startedAt?: string
  /** 结束时间 */
  finishedAt?: string
}

/** 流水线 */
export interface Pipeline {
  /** 流水线 ID */
  id: string
  /** 流水线名称 */
  name: string
  /** 流水线状态 */
  status: PipelineStatus
  /** 分支 */
  branch: string
  /** 提交哈希 */
  commit: string
  /** 提交信息 */
  commitMessage?: string
  /** 触发者 */
  triggeredBy: string
  /** 触发时间 */
  triggeredAt: string
  /** 执行时长 (秒) */
  duration: number | null
  /** 阶段列表 */
  stages: PipelineStage[]
}

/** 监控指标趋势 */
export type MetricTrend = 'up' | 'down' | 'stable'

/** 监控指标 */
export interface Metric {
  /** 指标 ID */
  id: string
  /** 指标标签 */
  label: string
  /** 指标值 */
  value: string
  /** 变化值 */
  change: string
  /** 趋势 */
  trend: MetricTrend
  /** 更新时间 */
  updatedAt: string
}

/** WebSocket 消息类型 */
export type WSMessageType = 'pipeline_update' | 'metric_update' | 'log_stream' | 'connected' | 'error'

/** WebSocket 消息 */
export interface WSMessage {
  type: WSMessageType
  data: unknown
}

/** 流水线更新消息 */
export interface PipelineUpdateMessage {
  type: 'pipeline_update'
  data: Pipeline
}

/** 指标更新消息 */
export interface MetricUpdateMessage {
  type: 'metric_update'
  data: Metric
}

/** 日志流消息 */
export interface LogStreamMessage {
  type: 'log_stream'
  data: {
    jobId: string
    log: string
  }
}

/** DevOps Store 状态 */
export interface DevOpsState {
  /** 流水线列表 */
  pipelines: Pipeline[]
  /** 选中的流水线 ID */
  selectedPipelineId: string | null
  /** 监控指标列表 */
  metrics: Metric[]
  /** 是否正在加载 */
  loading: boolean
  /** WebSocket 是否已连接 */
  wsConnected: boolean
  /** API 基础地址 */
  apiBaseUrl: string
  /** 错误信息 */
  error: string | null
}
