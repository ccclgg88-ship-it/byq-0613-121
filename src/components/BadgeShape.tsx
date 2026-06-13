import { ShapeType, StrokeStyle } from '@/data/themes'

interface ShapeBaseProps {
  size: number
  fillColor: string
  strokeColor: string
  strokeWidth: number
  strokeStyle: StrokeStyle
  clipId?: string
}

export function getShapeClipPath(shape: ShapeType, size: number): string {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4

  switch (shape) {
    case 'circle':
      return `circle(${r}px at ${cx}px ${cy}px)`
    case 'hexagon': {
      const points: string[] = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        points.push(`${x}px ${y}px`)
      }
      return `polygon(${points.join(', ')})`
    }
    case 'shard': {
      const points = [
        `${cx}px ${cy - r}px`,
        `${cx + r * 0.85}px ${cy - r * 0.3}px`,
        `${cx + r * 0.95}px ${cy + r * 0.5}px`,
        `${cx + r * 0.2}px ${cy + r * 0.9}px`,
        `${cx - r * 0.7}px ${cy + r * 0.65}px`,
        `${cx - r * 0.9}px ${cy - r * 0.1}px`,
        `${cx - r * 0.4}px ${cy - r * 0.8}px`,
      ]
      return `polygon(${points.join(', ')})`
    }
    default:
      return ''
  }
}

export function ShapeCircle({ size, fillColor, strokeColor, strokeWidth, strokeStyle }: ShapeBaseProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - strokeWidth / 2 - 2
  const dashArray = strokeStyle === 'dashed' ? `${strokeWidth * 2} ${strokeWidth * 1.5}` : undefined

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
    />
  )
}

export function ShapeHexagon({ size, fillColor, strokeColor, strokeWidth, strokeStyle }: ShapeBaseProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - strokeWidth / 2 - 2
  const dashArray = strokeStyle === 'dashed' ? `${strokeWidth * 2} ${strokeWidth * 1.5}` : undefined

  const points: string[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    points.push(`${x},${y}`)
  }

  return (
    <polygon
      points={points.join(' ')}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      strokeLinejoin="round"
    />
  )
}

export function ShapeShard({ size, fillColor, strokeColor, strokeWidth, strokeStyle }: ShapeBaseProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - strokeWidth / 2 - 2
  const dashArray = strokeStyle === 'dashed' ? `${strokeWidth * 2} ${strokeWidth * 1.5}` : undefined

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
    <polygon
      points={points.map((p) => p.join(',')).join(' ')}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      strokeLinejoin="round"
    />
  )
}

interface BadgeShapeProps extends ShapeBaseProps {
  shape: ShapeType
}

export function BadgeShape({ shape, ...props }: BadgeShapeProps) {
  switch (shape) {
    case 'circle':
      return <ShapeCircle {...props} />
    case 'hexagon':
      return <ShapeHexagon {...props} />
    case 'shard':
      return <ShapeShard {...props} />
    default:
      return <ShapeCircle {...props} />
  }
}
