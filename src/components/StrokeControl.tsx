import { StrokeStyle } from '@/data/themes'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

const strokeStyles: { style: StrokeStyle; label: string }[] = [
  { style: 'solid', label: '实线' },
  { style: 'dashed', label: '虚线' },
]

export function StrokeControl() {
  const state = useBadgeStore((s) => s.present)
  const update = useBadgeStore((s) => s.update)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">描边</label>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">宽度</span>
              <span className="text-xs text-gray-300 font-medium">{state.strokeWidth}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={state.strokeWidth}
              onChange={(e) => update({ strokeWidth: parseFloat(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-gray-400">样式</span>
            <div className="flex gap-2">
              {strokeStyles.map((s) => (
                <button
                  key={s.style}
                  onClick={() => update({ strokeStyle: s.style })}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200',
                    'hover:bg-white/5',
                    state.strokeStyle === s.style
                      ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/50'
                      : 'bg-white/5 text-gray-400 ring-1 ring-white/10'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
