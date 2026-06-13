import { useState } from 'react'
import { X, Check, AlertCircle } from 'lucide-react'
import { useWorksStore } from '@/store/worksStore'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

interface SaveWorkModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved?: () => void
}

export function SaveWorkModal({ isOpen, onClose, onSaved }: SaveWorkModalProps) {
  const [workName, setWorkName] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  
  const saveWork = useWorksStore((s) => s.saveWork)
  const state = useBadgeStore((s) => s.present)
  const theme = useBadgeStore((s) => s.present.theme)

  const generateThumbnail = (): string => {
    const svg = document.getElementById('badge-canvas')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      return `data:image/svg+xml;base64,${btoa(svgData)}`
    }
    return ''
  }

  const validateAndSave = () => {
    const newErrors: string[] = []
    
    if (!state.codename || state.codename.trim().length < 2) {
      newErrors.push('请先填写代号（2-8个字符）')
    }
    
    if (!state.icon) {
      newErrors.push('请先选择一个图标')
    }
    
    if (!workName || workName.trim().length < 2) {
      newErrors.push('请输入作品名称（2-16个字符）')
    } else if (workName.trim().length > 16) {
      newErrors.push('作品名称不能超过16个字符')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    const thumbnail = generateThumbnail()
    const result = saveWork(workName.trim(), state, thumbnail, theme)
    
    if (result.success) {
      setWorkName('')
      setErrors([])
      onClose()
      onSaved?.()
    } else {
      setErrors([result.error || '保存失败'])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-100">保存作品</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/30 mb-4">
            <AlertCircle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-xs text-rose-400">{error}</p>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">作品名称</label>
            <input
              type="text"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              placeholder="为你的徽章取个名字"
              className={cn(
                'w-full px-4 py-3 rounded-xl bg-white/5 text-gray-100 placeholder:text-gray-500',
                'ring-1 transition-all duration-200 outline-none',
                'focus:ring-amber-500/50',
                workName.trim().length >= 2 && workName.trim().length <= 16
                  ? 'ring-emerald-500/30'
                  : workName.length > 0
                    ? 'ring-rose-500/40'
                    : 'ring-white/10'
              )}
              maxLength={16}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              {workName.length}/16 字符
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              取消
            </button>
            <button
              onClick={validateAndSave}
              className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
            >
              <Check size={16} />
              保存作品
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
