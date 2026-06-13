import { create } from 'zustand'
import { BadgeState, DEFAULT_BADGE_STATE, THEMES, ThemeName, ShapeType, TextureType, StrokeStyle } from '@/data/themes'

const MAX_HISTORY = 30

interface HistoryState {
  past: BadgeState[]
  present: BadgeState
  future: BadgeState[]
}

interface BadgeStore extends HistoryState {
  update: (partial: Partial<BadgeState>) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  applyTheme: (themeName: ThemeName) => void
  reset: () => void
}

export const useBadgeStore = create<BadgeStore>((set, get) => ({
  past: [],
  present: { ...DEFAULT_BADGE_STATE },
  future: [],
  canUndo: false,
  canRedo: false,

  update: (partial) => {
    const { present, past } = get()
    const newPresent = { ...present, ...partial }
    const newPast = [...past, present].slice(-MAX_HISTORY)
    set({
      past: newPast,
      present: newPresent,
      future: [],
      canUndo: newPast.length > 0,
      canRedo: false,
    })
  },

  undo: () => {
    const { past, present, future } = get()
    if (past.length === 0) return
    const newPast = [...past]
    const previous = newPast.pop()!
    set({
      past: newPast,
      present: previous,
      future: [present, ...future],
      canUndo: newPast.length > 0,
      canRedo: true,
    })
  },

  redo: () => {
    const { past, present, future } = get()
    if (future.length === 0) return
    const newFuture = [...future]
    const next = newFuture.shift()!
    set({
      past: [...past, present],
      present: next,
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    })
  },

  applyTheme: (themeName: ThemeName) => {
    const theme = THEMES[themeName]
    const { present, past } = get()
    const newPresent: BadgeState = {
      ...present,
      theme: themeName,
      fillColor: theme.fillColor,
      strokeColor: theme.strokeColor,
      strokeWidth: theme.strokeWidth,
      strokeStyle: theme.strokeStyle,
      texture: theme.texture,
      textureOpacity: theme.textureOpacity,
      textureScale: theme.textureScale,
      iconColor: theme.iconColor,
      codenameColor: theme.codenameColor,
    }
    const newPast = [...past, present].slice(-MAX_HISTORY)
    set({
      past: newPast,
      present: newPresent,
      future: [],
      canUndo: newPast.length > 0,
      canRedo: false,
    })
  },

  reset: () => {
    const { past, present } = get()
    const newPast = [...past, present].slice(-MAX_HISTORY)
    set({
      past: newPast,
      present: { ...DEFAULT_BADGE_STATE },
      future: [],
      canUndo: newPast.length > 0,
      canRedo: false,
    })
  },
}))

export type { ShapeType, TextureType, StrokeStyle, ThemeName }
