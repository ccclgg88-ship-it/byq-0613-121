import { icons } from '@/data/icons'

interface BadgeIconProps {
  iconName: string
  color: string
  size: number
  offsetX: number
  offsetY: number
  canvasSize: number
}

export function BadgeIcon({ iconName, color, size, offsetX, offsetY, canvasSize }: BadgeIconProps) {
  const icon = icons.find((i) => i.name === iconName)
  if (!icon) return null

  const cx = canvasSize / 2 + offsetX
  const cy = canvasSize / 2 + offsetY

  return (
    <g transform={`translate(${cx - size / 2}, ${cy - size / 2})`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {icon.paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
    </g>
  )
}
