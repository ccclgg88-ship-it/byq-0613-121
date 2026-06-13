import { TextureType } from '@/data/themes'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

const textures: { type: TextureType | null; label: string }[] = [
  { type: null, label: '无' },
  { type: 'noise', label: '噪点' },
  { type: 'grid', label: '网格' },
  { type: 'gradient', label: '渐变' },
]

export function TextureControl() {
  const state = useBadgeStore((s) => s.present)
  const update = useBadgeStore((s) => s.update)

  const hasTexture = state.texture !== null

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">纹理</label>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {textures.map((t) => (
              <button
                key={t.type || 'none'}
                onClick={() => update({ texture: t.type })}
                className={cn(
                  'py-2 px-2 rounded-lg text-xs transition-all duration-200',
                  'hover:bg-white/5',
                  state.texture === t.type
                    ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/50'
                    : 'bg-white/5 text-gray-400 ring-1 ring-white/10'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {hasTexture && (
            <>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">透明度</span>
                  <span className="text-xs text-gray-300 font-medium">{Math.round(state.textureOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={state.textureOpacity}
                  onChange={(e) => update({ textureOpacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {state.texture === 'grid' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">密度</span>
                    <span className="text-xs text-gray-300 font-medium">{Math.round(state.textureScale * 10)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={state.textureScale}
                    onChange={(e) => update({ textureScale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              )}

              {state.texture === 'noise' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">颗粒度</span>
                    <span className="text-xs text-gray-300 font-medium">{Math.round(state.textureScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={state.textureScale}
                    onChange={(e) => update({ textureScale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
