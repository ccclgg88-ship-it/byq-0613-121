import { BadgeState } from '@/store/badgeStore'

export interface Work {
  id: string
  name: string
  badge: BadgeState
  themeName: string
  thumbnail: string
  createdAt: number
}

export interface WorksFilter {
  search: string
  theme: string | null
}

export const MAX_WORKS = 50
