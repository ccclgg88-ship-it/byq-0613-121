import { create } from 'zustand'
import { Work, WorksFilter } from '@/data/types'
import { loadWorks, saveWorks, addWork, deleteWork, generateId } from '@/lib/worksStore'
import { BadgeState } from './badgeStore'

interface WorksStore {
  works: Work[]
  filter: WorksFilter
  isLoading: boolean
  
  init: () => void
  setFilter: (filter: WorksFilter) => void
  saveWork: (name: string, badge: BadgeState, thumbnail: string, themeName: string) => { success: boolean; error?: string }
  deleteWork: (id: string) => void
  getWorkById: (id: string) => Work | undefined
  filterWorks: () => Work[]
  hasUnsavedChanges: (currentState: BadgeState) => boolean
}

export const useWorksStore = create<WorksStore>((set, get) => ({
  works: [],
  filter: { search: '', theme: null },
  isLoading: true,

  init: () => {
    const works = loadWorks()
    set({ works, isLoading: false })
  },

  setFilter: (filter) => {
    set({ filter })
  },

  saveWork: (name, badge, thumbnail, themeName) => {
    const work: Work = {
      id: generateId(),
      name,
      badge,
      thumbnail,
      themeName,
      createdAt: Date.now(),
    }
    
    const result = addWork(work)
    if (result.success) {
      set((state) => ({ works: [work, ...state.works] }))
    }
    return result
  },

  deleteWork: (id) => {
    deleteWork(id)
    set((state) => ({ works: state.works.filter((w) => w.id !== id) }))
  },

  getWorkById: (id) => {
    return get().works.find((w) => w.id === id)
  },

  filterWorks: () => {
    const { works, filter } = get()
    
    return works.filter((work) => {
      const matchesSearch = !filter.search || 
        work.name.toLowerCase().includes(filter.search.toLowerCase())
      const matchesTheme = !filter.theme || work.themeName === filter.theme
      
      return matchesSearch && matchesTheme
    })
  },

  hasUnsavedChanges: (currentState) => {
    const lastSaved = get().works[0]
    if (!lastSaved) return true
    
    return JSON.stringify(currentState) !== JSON.stringify(lastSaved.badge)
  },
}))
