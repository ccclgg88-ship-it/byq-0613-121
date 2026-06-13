interface BadgeCodenameProps {
  codename: string
  color: string
  fontSize: number
  canvasSize: number
}

export function BadgeCodename({ codename, color, fontSize, canvasSize }: BadgeCodenameProps) {
  if (!codename) return null

  const x = canvasSize / 2
  const y = canvasSize / 2 + canvasSize * 0.28

  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={fontSize}
      fontFamily="'Playfair Display', Georgia, serif"
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
      letterSpacing="0.05em"
    >
      {codename}
    </text>
  )
}
