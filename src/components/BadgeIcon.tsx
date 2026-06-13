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
  const scale = size / 24

  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
      {icon.paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </g>
  )
}
