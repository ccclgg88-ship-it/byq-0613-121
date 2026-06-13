import { ShapeType } from '@/data/themes'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

const shapes: { type: ShapeType; label: string }[] = [
  { type: 'circle', label: '圆形' },
  { type: 'hexagon', label: '六边形' },
  { type: 'shard', label: '碎片' },
]

function ShapePreview({ shape, fillColor, strokeColor }: { shape: ShapeType; fillColor: string; strokeColor: string }) {
  const size = 48
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4

  if (shape === 'circle') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill={fillColor} stroke={strokeColor} strokeWidth={2} />
      </svg>
    )
  }

  if (shape === 'hexagon') {
    const points: string[] = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polygon points={points.join(' ')} fill={fillColor} stroke={strokeColor} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    )
  }

  const points = [
    [cx, cy - r],
    [cx + r * 0.85, cy - r * 0.3],
    [cx + r * 0.95, cy + r * 0.5],
    [cx + r * 0.2, cy + r * 0.9],
    [cx - r * 0.7, cy + r * 0.65],
    [cx - r * 0.9, cy - r * 0.1],
    [cx - r * 0.4, cy - r * 0.8],
  ]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={points.map((p) => p.join(',')).join(' ')}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShapeSelector() {
  const shape = useBadgeStore((s) => s.present.shape)
  const fillColor = useBadgeStore((s) => s.present.fillColor)
  const strokeColor = useBadgeStore((s) => s.present.strokeColor)
  const update = useBadgeStore((s) => s.update)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">底板形状</label>
      <div className="flex gap-3">
        {shapes.map((s) => (
          <button
            key={s.type}
            onClick={() => update({ shape: s.type })}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200',
              'hover:bg-white/5',
              shape === s.type
                ? 'ring-2 ring-amber-500/70 bg-amber-500/10'
                : 'bg-white/5 ring-1 ring-white/10'
            )}
          >
            <ShapePreview shape={s.type} fillColor={fillColor} strokeColor={strokeColor} />
            <span className="text-xs text-gray-400">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
