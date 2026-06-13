export async function exportBadgeAsImage(svgElement: SVGSVGElement, filename = 'badge.png'): Promise<void> {
  const svgData = new XMLSerializer().serializeToString(svgElement)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.crossOrigin = 'anonymous'

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Failed to load SVG'))
    img.src = url
  })

  const canvas = document.createElement('canvas')
  const scale = 4
  canvas.width = img.width * scale
  canvas.height = img.height * scale

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to get canvas context')

  ctx.scale(scale, scale)
  ctx.drawImage(img, 0, 0)

  URL.revokeObjectURL(url)

  canvas.toBlob((blob) => {
    if (!blob) throw new Error('Failed to create blob')
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl)
  }, 'image/png')
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateBadge(codename: string, icon: string | null): ValidationResult {
  const errors: string[] = []

  if (!codename || codename.trim().length === 0) {
    errors.push('请输入代号')
  } else if (codename.trim().length < 2 || codename.trim().length > 8) {
    errors.push('代号需要 2-8 个字符')
  }

  if (!icon) {
    errors.push('请选择一个图标')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
