import { Work, MAX_WORKS } from '@/data/types'

const STORAGE_KEY = 'badge-designer-works'

export function loadWorks(): Work[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch {
    console.error('Failed to load works from localStorage')
  }
  return []
}

export function saveWorks(works: Work[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works))
  } catch {
    console.error('Failed to save works to localStorage')
  }
}

export function addWork(work: Work): { success: boolean; error?: string } {
  const works = loadWorks()
  
  if (works.length >= MAX_WORKS) {
    return { 
      success: false, 
      error: `已达最大保存数量（${MAX_WORKS}件），请先删除部分作品` 
    }
  }
  
  works.unshift(work)
  saveWorks(works)
  return { success: true }
}

export function updateWork(work: Work): void {
  const works = loadWorks()
  const index = works.findIndex((w) => w.id === work.id)
  if (index !== -1) {
    works[index] = work
    saveWorks(works)
  }
}

export function deleteWork(id: string): void {
  const works = loadWorks()
  const filtered = works.filter((w) => w.id !== id)
  saveWorks(filtered)
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
