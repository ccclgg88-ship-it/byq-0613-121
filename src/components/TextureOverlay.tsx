import { TextureType } from '@/data/themes'

interface TextureOverlayProps {
  texture: TextureType | null
  opacity: number
  scale: number
  canvasSize: number
  strokeColor: string
}

export function TextureOverlay({ texture, opacity, scale, canvasSize, strokeColor }: TextureOverlayProps) {
  if (!texture) return null

  const filterId = `texture-${texture}-${Math.random().toString(36).slice(2, 8)}`
  const gradientId = `gradient-${Math.random().toString(36).slice(2, 8)}`

  if (texture === 'noise') {
    return (
      <>
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.8 / scale}
              numOctaves={3}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.5
                      0 0 0 0 0.5
                      0 0 0 0 0.5
                      0 0 0 1 0"
              result="grayNoise"
            />
          </filter>
        </defs>
        <rect
          x="0"
          y="0"
          width={canvasSize}
          height={canvasSize}
          filter={`url(#${filterId})`}
          opacity={opacity}
          pointerEvents="none"
        />
      </>
    )
  }

  if (texture === 'grid') {
    const gridSize = 8 * scale
    const lines = []
    for (let x = 0; x <= canvasSize; x += gridSize) {
      lines.push(
        <line key={`v-${x}`} x1={x} y1={0} x2={x} y2={canvasSize} stroke={strokeColor} strokeWidth={0.5} />
      )
    }
    for (let y = 0; y <= canvasSize; y += gridSize) {
      lines.push(
        <line key={`h-${y}`} x1={0} y1={y} x2={canvasSize} y2={y} stroke={strokeColor} strokeWidth={0.5} />
      )
    }
    return <g opacity={opacity} pointerEvents="none">{lines}</g>
  }

  if (texture === 'gradient') {
    return (
      <>
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3 * opacity} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={opacity * 0.6} />
          </radialGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={canvasSize}
          height={canvasSize}
          fill={`url(#${gradientId})`}
          pointerEvents="none"
        />
      </>
    )
  }

  return null
}
