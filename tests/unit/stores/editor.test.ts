/**
 * Editor Store unit tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import { mockElectronAPI, resetAllMocks } from '../../setup'

const RECENT_FILES_KEY = 'logos:recentFiles'

const seedRecentFiles = (files: Array<string | null>) => {
  window.localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(files))
}

const readRecentFiles = () => {
  const raw = window.localStorage.getItem(RECENT_FILES_KEY)
  return raw ? JSON.parse(raw) : null
}

describe('Editor Store - Recent Files', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetAllMocks()
    window.localStorage.clear()
  })

  it('loads recent files from localStorage', () => {
    seedRecentFiles(['a.ts', null, '', 'b.ts'])

    const store = useEditorStore()

    expect(store.recentFiles).toEqual(['a.ts', 'b.ts'])
  })

  it('dedupes, orders, and trims recent files', () => {
    const store = useEditorStore()

    for (let i = 0; i < 25; i += 1) {
      store.addToRecentFiles(`/path/${i}`)
    }

    expect(store.recentFiles.length).toBe(20)
    expect(store.recentFiles[0]).toBe('/path/24')
    expect(store.recentFiles[19]).toBe('/path/5')

    store.addToRecentFiles('/path/10')
    expect(store.recentFiles[0]).toBe('/path/10')
    expect(store.recentFiles).toHaveLength(20)
  })

  it('clears recent files and persists', () => {
    const store = useEditorStore()

    store.addToRecentFiles('/path/alpha')
    store.clearRecentFiles()

    expect(store.recentFiles).toEqual([])
    expect(readRecentFiles()).toEqual([])
  })

  it('prunes missing recent files', async () => {
    seedRecentFiles(['/keep', '/drop'])
    const store = useEditorStore()

    mockElectronAPI.fileSystem.exists
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)

    await store.pruneRecentFiles()

    expect(store.recentFiles).toEqual(['/keep'])
    expect(readRecentFiles()).toEqual(['/keep'])
  })
})
