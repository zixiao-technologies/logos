/**
 * Reflog Store - Reflog 查看器状态管理
 */

import { defineStore } from 'pinia'
import type {
  ReflogState,
  ReflogEntry,
  ReflogGroup,
  ReflogFilters,
  ReflogOperationType
} from '@/types/reflog'

/** 默认过滤器 */
const DEFAULT_FILTERS: ReflogFilters = {
  search: '',
  operationTypes: [],
  dateRange: {},
  orphanedOnly: false
}

/**
 * 按日期分组条目 (helper function)
 */
function groupEntriesByDate(entries: ReflogEntry[]): ReflogGroup[] {
  const groups: Map<string, ReflogEntry[]> = new Map()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  for (const entry of entries) {
    const entryDate = new Date(entry.date)
    const entryDay = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate())

    let label: string
    if (entryDay.getTime() === today.getTime()) {
      label = 'Today'
    } else if (entryDay.getTime() === yesterday.getTime()) {
      label = 'Yesterday'
    } else {
      label = entryDay.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    if (!groups.has(label)) {
      groups.set(label, [])
    }
    groups.get(label)!.push(entry)
  }

  return Array.from(groups.entries()).map(([label, groupEntries]) => ({
    label,
    entries: groupEntries
  }))
}

/** 默认状态 */
const DEFAULT_STATE: ReflogState = {
  repoPath: null,
  entries: [],
  groupedEntries: [],
  viewState: {
    selectedEntry: null,
    expandedEntries: [],
    filters: { ...DEFAULT_FILTERS },
    displayCount: 100
  },
  isLoading: false,
  error: null
}

export const useReflogStore = defineStore('reflog', {
  state: (): ReflogState => ({ ...DEFAULT_STATE }),

  getters: {
    /** 过滤后的条目 */
    filteredEntries(): ReflogEntry[] {
      let entries = this.entries

      const { search, operationTypes, dateRange, orphanedOnly } = this.viewState.filters

      // 搜索过滤
      if (search) {
        const searchLower = search.toLowerCase()
        entries = entries.filter(e =>
          e.message.toLowerCase().includes(searchLower) ||
          e.hash.toLowerCase().includes(searchLower) ||
          e.shortHash.toLowerCase().includes(searchLower) ||
          e.author.toLowerCase().includes(searchLower)
        )
      }

      // 操作类型过滤
      if (operationTypes.length > 0) {
        entries = entries.filter(e =>
          operationTypes.includes(e.operationType as ReflogOperationType)
        )
      }

      // 日期范围过滤
      if (dateRange.start) {
        entries = entries.filter(e => e.date >= dateRange.start!)
      }
      if (dateRange.end) {
        entries = entries.filter(e => e.date <= dateRange.end!)
      }

      // 只显示孤儿提交
      if (orphanedOnly) {
        entries = entries.filter(e => e.isOrphaned)
      }

      return entries.slice(0, this.viewState.displayCount)
    },

    /** 分组后的条目 */
    filteredGroupedEntries(): ReflogGroup[] {
      return groupEntriesByDate(this.filteredEntries)
    },

    /** 是否有选中的条目 */
    hasSelection(): boolean {
      return this.viewState.selectedEntry !== null
    },

    /** 总条目数 */
    totalCount(): number {
      return this.entries.length
    },

    /** 过滤后的条目数 */
    filteredCount(): number {
      return this.filteredEntries.length
    }
  },

  actions: {
    /**
     * 加载 reflog
     */
    async loadReflog(repoPath: string, limit: number = 200): Promise<void> {
      this.repoPath = repoPath
      this.isLoading = true
      this.error = null

      try {
        const rawEntries = await window.electronAPI.git.getReflog(repoPath, limit)

        // 转换日期
        this.entries = rawEntries.map(e => ({
          index: e.index,
          hash: e.hash,
          shortHash: e.shortHash,
          operationType: e.operationType as ReflogOperationType,
          action: e.action,
          message: e.message,
          date: new Date(e.date),
          relativeDate: e.relativeDate,
          author: e.author,
          authorEmail: e.authorEmail,
          previousHash: e.previousHash,
          isOrphaned: e.isOrphaned,
          branch: e.branch
        }))

        // 分组
        this.groupedEntries = groupEntriesByDate(this.entries)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 加载特定 ref 的 reflog
     */
    async loadReflogForRef(repoPath: string, ref: string, limit: number = 100): Promise<void> {
      this.repoPath = repoPath
      this.isLoading = true
      this.error = null

      try {
        const rawEntries = await window.electronAPI.git.getReflogForRef(repoPath, ref, limit)

        this.entries = rawEntries.map(e => ({
          index: e.index,
          hash: e.hash,
          shortHash: e.shortHash,
          operationType: e.operationType as ReflogOperationType,
          action: e.action,
          message: e.message,
          date: new Date(e.date),
          relativeDate: e.relativeDate,
          author: e.author,
          authorEmail: e.authorEmail,
          previousHash: e.previousHash,
          isOrphaned: e.isOrphaned,
          branch: e.branch
        }))

        this.groupedEntries = groupEntriesByDate(this.entries)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * 刷新 reflog
     */
    async refresh(): Promise<void> {
      if (!this.repoPath) return
      await this.loadReflog(this.repoPath)
    },

    /**
     * 选择条目
     */
    selectEntry(entry: ReflogEntry | null): void {
      this.viewState.selectedEntry = entry
    },

    /**
     * 切换条目展开状态
     */
    toggleEntryExpanded(index: number): void {
      const expandedIndex = this.viewState.expandedEntries.indexOf(index)
      if (expandedIndex === -1) {
        this.viewState.expandedEntries.push(index)
      } else {
        this.viewState.expandedEntries.splice(expandedIndex, 1)
      }
    },

    /**
     * 设置搜索关键词
     */
    setSearch(search: string): void {
      this.viewState.filters.search = search
    },

    /**
     * 设置操作类型过滤
     */
    setOperationTypeFilter(types: ReflogOperationType[]): void {
      this.viewState.filters.operationTypes = types
    },

    /**
     * 设置日期范围过滤
     */
    setDateRange(start?: Date, end?: Date): void {
      this.viewState.filters.dateRange = { start, end }
    },

    /**
     * 设置只显示孤儿提交
     */
    setOrphanedOnly(value: boolean): void {
      this.viewState.filters.orphanedOnly = value
    },

    /**
     * 清除所有过滤器
     */
    clearFilters(): void {
      this.viewState.filters = { ...DEFAULT_FILTERS }
    },

    /**
     * 加载更多条目
     */
    loadMore(count: number = 50): void {
      this.viewState.displayCount += count
    },

    /**
     * 重置状态
     */
    reset(): void {
      Object.assign(this, { ...DEFAULT_STATE })
    }
  }
})
