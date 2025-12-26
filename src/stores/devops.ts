/**
 * DevOps 状态管理
 * 管理流水线和监控指标，支持 WebSocket 实时更新
 */

import { defineStore } from 'pinia'
import type {
  DevOpsState,
  Pipeline,
  Metric,
  WSMessage,
  PipelineUpdateMessage,
  MetricUpdateMessage,
  LogStreamMessage
} from '@/types'

export const useDevOpsStore = defineStore('devops', {
  state: (): DevOpsState => ({
    pipelines: [],
    selectedPipelineId: null,
    metrics: [],
    loading: false,
    wsConnected: false,
    apiBaseUrl: 'http://localhost:3000/api',
    error: null
  }),

  getters: {
    /** 选中的流水线 */
    selectedPipeline: (state) => {
      if (!state.selectedPipelineId) return null
      return state.pipelines.find(p => p.id === state.selectedPipelineId) || null
    },

    /** 按状态分组的流水线 */
    pipelinesByStatus: (state) => {
      const groups: Record<string, Pipeline[]> = {
        running: [],
        pending: [],
        failed: [],
        success: [],
        cancelled: []
      }
      for (const pipeline of state.pipelines) {
        if (groups[pipeline.status]) {
          groups[pipeline.status].push(pipeline)
        }
      }
      return groups
    },

    /** 运行中的流水线数量 */
    runningCount: (state) => state.pipelines.filter(p => p.status === 'running').length,

    /** 失败的流水线数量 */
    failedCount: (state) => state.pipelines.filter(p => p.status === 'failed').length,

    /** 最近的流水线 (按触发时间排序) */
    recentPipelines: (state) => {
      return [...state.pipelines]
        .sort((a, b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime())
        .slice(0, 10)
    }
  },

  actions: {
    /**
     * 设置 API 基础地址
     */
    setApiBaseUrl(url: string) {
      this.apiBaseUrl = url
    },

    /**
     * 获取流水线列表
     */
    async fetchPipelines() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${this.apiBaseUrl}/pipelines`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.pipelines = data
      } catch (error) {
        this.error = (error as Error).message
        // 使用模拟数据作为后备
        this.loadMockData()
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取监控指标
     */
    async fetchMetrics() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/metrics`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.metrics = data
      } catch (error) {
        this.error = (error as Error).message
        // 使用模拟数据作为后备
        this.loadMockMetrics()
      }
    },

    /**
     * 触发流水线
     */
    async triggerPipeline(pipelineId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/pipelines/${pipelineId}/trigger`, {
          method: 'POST'
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.updatePipeline(data)
      } catch (error) {
        this.error = (error as Error).message
        // 模拟触发
        this.mockTriggerPipeline(pipelineId)
      }
    },

    /**
     * 取消流水线
     */
    async cancelPipeline(pipelineId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/pipelines/${pipelineId}/cancel`, {
          method: 'POST'
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.updatePipeline(data)
      } catch (error) {
        this.error = (error as Error).message
        // 模拟取消
        this.mockCancelPipeline(pipelineId)
      }
    },

    /**
     * 重试流水线
     */
    async retryPipeline(pipelineId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/pipelines/${pipelineId}/retry`, {
          method: 'POST'
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.updatePipeline(data)
      } catch (error) {
        this.error = (error as Error).message
        // 模拟重试
        this.mockTriggerPipeline(pipelineId)
      }
    },

    /**
     * 获取流水线详情
     */
    async fetchPipelineDetail(pipelineId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/pipelines/${pipelineId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.updatePipeline(data)
        return data
      } catch (error) {
        this.error = (error as Error).message
        return null
      }
    },

    /**
     * 选择流水线
     */
    selectPipeline(pipelineId: string | null) {
      this.selectedPipelineId = pipelineId
    },

    /**
     * 更新单个流水线
     */
    updatePipeline(pipeline: Pipeline) {
      const index = this.pipelines.findIndex(p => p.id === pipeline.id)
      if (index >= 0) {
        this.pipelines[index] = pipeline
      } else {
        this.pipelines.unshift(pipeline)
      }
    },

    /**
     * 更新单个指标
     */
    updateMetric(metric: Metric) {
      const index = this.metrics.findIndex(m => m.id === metric.id)
      if (index >= 0) {
        this.metrics[index] = metric
      } else {
        this.metrics.push(metric)
      }
    },

    /**
     * 处理 WebSocket 消息
     */
    handleWSMessage(message: WSMessage) {
      switch (message.type) {
        case 'pipeline_update':
          this.updatePipeline((message as PipelineUpdateMessage).data)
          break
        case 'metric_update':
          this.updateMetric((message as MetricUpdateMessage).data)
          break
        case 'log_stream':
          // 处理日志流 - 可以在这里触发事件或更新 job 日志
          const logData = (message as LogStreamMessage).data
          console.log(`Job ${logData.jobId}: ${logData.log}`)
          break
        case 'connected':
          this.wsConnected = true
          break
        case 'error':
          this.error = String(message.data)
          break
      }
    },

    /**
     * 设置 WebSocket 连接状态
     */
    setWSConnected(connected: boolean) {
      this.wsConnected = connected
    },

    /**
     * 加载模拟数据
     */
    loadMockData() {
      const now = new Date()
      this.pipelines = [
        {
          id: '1',
          name: 'frontend-deploy',
          status: 'success',
          branch: 'main',
          commit: 'a1b2c3d',
          commitMessage: 'feat: add new dashboard',
          triggeredBy: 'Logos',
          triggeredAt: new Date(now.getTime() - 3600000).toISOString(),
          duration: 222,
          stages: [
            {
              id: 's1',
              name: 'Build',
              status: 'success',
              jobs: [
                { id: 'j1', name: 'install', status: 'success', duration: 45 },
                { id: 'j2', name: 'build', status: 'success', duration: 120 }
              ]
            },
            {
              id: 's2',
              name: 'Test',
              status: 'success',
              jobs: [
                { id: 'j3', name: 'unit-test', status: 'success', duration: 30 },
                { id: 'j4', name: 'e2e-test', status: 'success', duration: 60 }
              ]
            },
            {
              id: 's3',
              name: 'Deploy',
              status: 'success',
              jobs: [
                { id: 'j5', name: 'deploy-prod', status: 'success', duration: 27 }
              ]
            }
          ]
        },
        {
          id: '2',
          name: 'backend-build',
          status: 'running',
          branch: 'develop',
          commit: 'e4f5g6h',
          commitMessage: 'fix: resolve memory leak',
          triggeredBy: 'Auto',
          triggeredAt: new Date(now.getTime() - 80000).toISOString(),
          duration: null,
          stages: [
            {
              id: 's1',
              name: 'Build',
              status: 'success',
              jobs: [
                { id: 'j1', name: 'compile', status: 'success', duration: 60 }
              ]
            },
            {
              id: 's2',
              name: 'Test',
              status: 'running',
              jobs: [
                { id: 'j2', name: 'unit-test', status: 'running' }
              ]
            },
            {
              id: 's3',
              name: 'Deploy',
              status: 'pending',
              jobs: [
                { id: 'j3', name: 'deploy-staging', status: 'pending' }
              ]
            }
          ]
        },
        {
          id: '3',
          name: 'integration-test',
          status: 'failed',
          branch: 'feature/auth',
          commit: 'i7j8k9l',
          commitMessage: 'feat: implement OAuth',
          triggeredBy: 'PR #123',
          triggeredAt: new Date(now.getTime() - 7200000).toISOString(),
          duration: 310,
          stages: [
            {
              id: 's1',
              name: 'Build',
              status: 'success',
              jobs: [
                { id: 'j1', name: 'build', status: 'success', duration: 90 }
              ]
            },
            {
              id: 's2',
              name: 'Test',
              status: 'failed',
              jobs: [
                { id: 'j2', name: 'integration-test', status: 'failed', duration: 220 }
              ]
            }
          ]
        },
        {
          id: '4',
          name: 'staging-deploy',
          status: 'pending',
          branch: 'main',
          commit: 'a1b2c3d',
          commitMessage: 'chore: update dependencies',
          triggeredBy: 'Manual',
          triggeredAt: new Date(now.getTime() - 300000).toISOString(),
          duration: null,
          stages: [
            {
              id: 's1',
              name: 'Build',
              status: 'pending',
              jobs: [
                { id: 'j1', name: 'build', status: 'pending' }
              ]
            },
            {
              id: 's2',
              name: 'Deploy',
              status: 'pending',
              jobs: [
                { id: 'j2', name: 'deploy-staging', status: 'pending' }
              ]
            }
          ]
        }
      ]
    },

    /**
     * 加载模拟指标
     */
    loadMockMetrics() {
      this.metrics = [
        {
          id: 'm1',
          label: 'CPU 使用率',
          value: '42%',
          change: '+5%',
          trend: 'up',
          updatedAt: new Date().toISOString()
        },
        {
          id: 'm2',
          label: '内存使用',
          value: '6.2 GB',
          change: '-0.3 GB',
          trend: 'down',
          updatedAt: new Date().toISOString()
        },
        {
          id: 'm3',
          label: '构建成功率',
          value: '94%',
          change: '+2%',
          trend: 'up',
          updatedAt: new Date().toISOString()
        },
        {
          id: 'm4',
          label: '平均部署时间',
          value: '4m 32s',
          change: '-30s',
          trend: 'down',
          updatedAt: new Date().toISOString()
        }
      ]
    },

    /**
     * 模拟触发流水线
     */
    mockTriggerPipeline(pipelineId: string) {
      const pipeline = this.pipelines.find(p => p.id === pipelineId)
      if (pipeline) {
        pipeline.status = 'running'
        pipeline.triggeredAt = new Date().toISOString()
        pipeline.duration = null
        for (const stage of pipeline.stages) {
          stage.status = 'pending'
          for (const job of stage.jobs) {
            job.status = 'pending'
          }
        }
        if (pipeline.stages.length > 0) {
          pipeline.stages[0].status = 'running'
          if (pipeline.stages[0].jobs.length > 0) {
            pipeline.stages[0].jobs[0].status = 'running'
          }
        }
      }
    },

    /**
     * 模拟取消流水线
     */
    mockCancelPipeline(pipelineId: string) {
      const pipeline = this.pipelines.find(p => p.id === pipelineId)
      if (pipeline) {
        pipeline.status = 'cancelled'
        for (const stage of pipeline.stages) {
          if (stage.status === 'running' || stage.status === 'pending') {
            stage.status = 'skipped'
          }
          for (const job of stage.jobs) {
            if (job.status === 'running' || job.status === 'pending') {
              job.status = 'failed'
            }
          }
        }
      }
    },

    /**
     * 初始化
     */
    async init() {
      this.loading = true
      try {
        await Promise.all([
          this.fetchPipelines(),
          this.fetchMetrics()
        ])
      } catch {
        // 错误已在各个方法中处理
      } finally {
        this.loading = false
      }
    },

    /**
     * 清除错误
     */
    clearError() {
      this.error = null
    }
  }
})