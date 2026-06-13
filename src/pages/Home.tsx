import { useRef, useEffect } from 'react'
import { BadgeCanvas } from '@/components/BadgeCanvas'
import { ControlPanel } from '@/components/ControlPanel'
import { useBadgeStore } from '@/store/badgeStore'

interface HomeProps {
  onOpenWorks?: () => void
}

export default function Home({ onOpenWorks }: HomeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const undo = useBadgeStore((s) => s.undo)
  const redo = useBadgeStore((s) => s.redo)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-gray-100">
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <div className="max-w-xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2">
                徽章设计器
              </h1>
              <p className="text-gray-400 text-sm">
                设计一枚专属身份徽章，搭配几何底板、图标与代号
              </p>
            </div>
            <BadgeCanvas ref={svgRef} />
            <p className="text-center text-xs text-gray-500 mt-4">
              提示：拖拽图标调整位置 · Ctrl+Z 撤销 · Ctrl+Y 重做
            </p>
          </div>
        </div>

        <div className="w-96 border-l border-white/5">
          <ControlPanel svgRef={svgRef} onOpenWorks={onOpenWorks} />
        </div>
      </div>
    </div>
  )
}
