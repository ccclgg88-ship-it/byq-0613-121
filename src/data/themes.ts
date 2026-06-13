export type ShapeType = 'circle' | 'hexagon' | 'shard'
export type TextureType = 'noise' | 'grid' | 'gradient'
export type StrokeStyle = 'solid' | 'dashed'
export type ThemeName = 'cyber' | 'handcraft' | 'darkroom' | 'tape'

export interface BadgeState {
  shape: ShapeType
  fillColor: string
  strokeColor: string
  strokeWidth: number
  strokeStyle: StrokeStyle
  texture: TextureType | null
  textureOpacity: number
  textureScale: number
  icon: string | null
  iconColor: string
  iconSize: number
  iconOffsetX: number
  iconOffsetY: number
  codename: string
  codenameColor: string
  codenameFontSize: number
  theme: ThemeName
}

export interface ThemePreset {
  name: ThemeName
  label: string
  description: string
  preview: string
  fillColor: string
  strokeColor: string
  strokeStyle: StrokeStyle
  strokeWidth: number
  texture: TextureType | null
  textureOpacity: number
  textureScale: number
  iconColor: string
  codenameColor: string
  background: string
}

export const THEMES: Record<ThemeName, ThemePreset> = {
  cyber: {
    name: 'cyber',
    label: '赛博',
    description: '霓虹高对比，未来科技感',
    preview: '#0d0221',
    fillColor: '#0d0221',
    strokeColor: '#00fff5',
    strokeStyle: 'solid',
    strokeWidth: 3,
    texture: 'grid',
    textureOpacity: 0.15,
    textureScale: 8,
    iconColor: '#00fff5',
    codenameColor: '#f0f0ff',
    background: '#1a0a3a',
  },
  handcraft: {
    name: 'handcraft',
    label: '手工',
    description: '暖色粗糙质感，匠人温度',
    preview: '#f5e6d3',
    fillColor: '#f5e6d3',
    strokeColor: '#8b6914',
    strokeStyle: 'dashed',
    strokeWidth: 2,
    texture: 'noise',
    textureOpacity: 0.25,
    textureScale: 1,
    iconColor: '#5c4033',
    codenameColor: '#3d2914',
    background: '#e8d5b7',
  },
  darkroom: {
    name: 'darkroom',
    label: '暗房',
    description: '暗红胶片风，神秘深沉',
    preview: '#1a1a1a',
    fillColor: '#1a1a1a',
    strokeColor: '#c41e3a',
    strokeStyle: 'solid',
    strokeWidth: 2,
    texture: 'gradient',
    textureOpacity: 0.4,
    textureScale: 1,
    iconColor: '#ff6b6b',
    codenameColor: '#ffcccc',
    background: '#0d0d0d',
  },
  tape: {
    name: 'tape',
    label: '磁带',
    description: '灰银复古风，怀旧经典',
    preview: '#2b2b2b',
    fillColor: '#2b2b2b',
    strokeColor: '#a0a0a0',
    strokeStyle: 'solid',
    strokeWidth: 2,
    texture: 'noise',
    textureOpacity: 0.35,
    textureScale: 1.5,
    iconColor: '#d4d4d4',
    codenameColor: '#e8e8e8',
    background: '#1f1f1f',
  },
}

export const DEFAULT_BADGE_STATE: BadgeState = {
  shape: 'circle',
  fillColor: THEMES.handcraft.fillColor,
  strokeColor: THEMES.handcraft.strokeColor,
  strokeWidth: THEMES.handcraft.strokeWidth,
  strokeStyle: THEMES.handcraft.strokeStyle,
  texture: THEMES.handcraft.texture,
  textureOpacity: THEMES.handcraft.textureOpacity,
  textureScale: THEMES.handcraft.textureScale,
  icon: 'star',
  iconColor: THEMES.handcraft.iconColor,
  iconSize: 60,
  iconOffsetX: 0,
  iconOffsetY: -15,
  codename: '',
  codenameColor: THEMES.handcraft.codenameColor,
  codenameFontSize: 22,
  theme: 'handcraft',
}
