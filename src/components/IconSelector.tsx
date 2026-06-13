import { useState } from 'react'
import { X } from 'lucide-react'
import { icons } from '@/data/icons'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

export function IconSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const icon = useBadgeStore((s) => s.present.icon)
  const iconColor = useBadgeStore((s) => s.present.iconColor)
  const update = useBadgeStore((s) => s.update)

  const selectedIcon = icons.find((i) => i.name === icon)

  const handleSelect = (iconName: string) => {
    update({ icon: iconName, iconOffsetX: 0, iconOffsetY: -15 })
    setIsOpen(false)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">图标</label>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'w-full p-3 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-200',
          'hover:bg-white/10 hover:ring-white/20',
          'flex items-center justify-between'
        )}
      >
        {selectedIcon ? (
        <div className="flex items-center gap-3">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {selectedIcon.paths.map((path, index) => (
                <path key={index} d={path} />
              ))}
            </svg>
            <span className="text-gray-300">{selectedIcon.label}</span>
          </div>
        ) : (
          <span className="text-gray-500">选择图标</span>
        )}
        <span className="text-gray-400 text-sm">更换 →</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">选择图标</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[60vh] pr-2">
              {icons.map((i) => (
                <button
                  key={i.name}
                  onClick={() => handleSelect(i.name)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200',
                    'hover:bg-white/10 hover:scale-110',
                    icon === i.name
                      ? 'ring-2 ring-amber-500/70 bg-amber-500/10'
                      : 'bg-white/5 ring-1 ring-white/5'
                  )}
                >
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    {i.paths.map((path, index) => (
                      <path key={index} d={path} />
                    ))}
                  </svg>
                  <span className="text-[10px] text-gray-400 truncate w-full text-center">{i.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
