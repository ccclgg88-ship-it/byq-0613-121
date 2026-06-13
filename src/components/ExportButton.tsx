import { useState } from 'react'
import { Download, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useBadgeStore } from '@/store/badgeStore'
import { validateBadge, exportBadgeAsImage, ValidationResult } from '@/lib/exportImage'
import { cn } from '@/lib/utils'

interface ExportButtonProps {
  svgRef: React.RefObject<SVGSVGElement>
}

export function ExportButton({ svgRef }: ExportButtonProps) {
  const codename = useBadgeStore((s) => s.present.codename)
  const icon = useBadgeStore((s) => s.present.icon)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleExport = async () => {
    const result = validateBadge(codename, icon)
    setValidation(result)

    if (!result.valid) {
      return
    }

    if (!svgRef.current) {
      setValidation({ valid: false, errors: ['画布未准备好，请稍后重试'] })
      return
    }

    setIsExporting(true)
    try {
      await exportBadgeAsImage(svgRef.current, `badge-${codename.trim()}.png`)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch {
      setValidation({ valid: false, errors: ['导出失败，请重试'] })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-3">
      {validation && !validation.valid && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/30">
          <AlertCircle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            {validation.errors.map((error, index) => (
              <p key={index} className="text-xs text-rose-400">{error}</p>
            ))}
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <p className="text-xs text-emerald-400">导出成功！</p>
        </div>
      )}

      <button
        onClick={handleExport}
        disabled={isExporting}
        className={cn(
          'w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300',
          'flex items-center justify-center gap-2',
          'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
          'hover:from-amber-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/20',
          'active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
        )}
      >
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            导出中...
          </>
        ) : (
          <>
            <Download size={18} />
            导出徽章
          </>
        )}
      </button>
    </div>
  )
}
