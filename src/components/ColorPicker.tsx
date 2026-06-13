import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

interface ColorInputProps {
  label: string
  value: string
  onChange: (color: string) => void
  presetColors?: string[]
}

function ColorInput({ label, value, onChange, presetColors }: ColorInputProps) {
  const defaultPresets = ['#0d0221', '#1a1a1a', '#2b2b2b', '#f5e6d3', '#d4a574', '#00fff5', '#c41e3a', '#ff6b6b']
  const presets = presetColors || defaultPresets

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-400">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
          />
          <div
            className="absolute inset-0 rounded-lg ring-1 ring-white/10 pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
        <div className="flex gap-1.5">
          {presets.slice(0, 6).map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={cn(
                'w-6 h-6 rounded-md ring-1 transition-all duration-150',
                value === color
                  ? 'ring-amber-500 ring-offset-2 ring-offset-[#1a1a2e] scale-110'
                  : 'ring-white/10 hover:ring-white/30 hover:scale-105'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ColorPicker() {
  const state = useBadgeStore((s) => s.present)
  const update = useBadgeStore((s) => s.update)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">颜色</label>
        <div className="space-y-3">
          <ColorInput
            label="填充色"
            value={state.fillColor}
            onChange={(c) => update({ fillColor: c })}
          />
          <ColorInput
            label="描边色"
            value={state.strokeColor}
            onChange={(c) => update({ strokeColor: c })}
          />
          <ColorInput
            label="图标色"
            value={state.iconColor}
            onChange={(c) => update({ iconColor: c })}
          />
          <ColorInput
            label="文字色"
            value={state.codenameColor}
            onChange={(c) => update({ codenameColor: c })}
          />
        </div>
      </div>
    </div>
  )
}
