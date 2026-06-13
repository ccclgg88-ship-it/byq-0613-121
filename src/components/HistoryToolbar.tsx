import { Undo2, Redo2, RotateCcw } from 'lucide-react'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

export function HistoryToolbar() {
  const undo = useBadgeStore((s) => s.undo)
  const redo = useBadgeStore((s) => s.redo)
  const reset = useBadgeStore((s) => s.reset)
  const canUndo = useBadgeStore((s) => s.canUndo)
  const canRedo = useBadgeStore((s) => s.canRedo)

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={cn(
          'p-2 rounded-lg transition-all duration-200',
          canUndo
            ? 'hover:bg-white/10 text-gray-300 hover:text-white'
            : 'text-gray-600 cursor-not-allowed'
        )}
        title="撤销 (Ctrl+Z)"
      >
        <Undo2 size={18} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className={cn(
          'p-2 rounded-lg transition-all duration-200',
          canRedo
            ? 'hover:bg-white/10 text-gray-300 hover:text-white'
            : 'text-gray-600 cursor-not-allowed'
        )}
        title="重做 (Ctrl+Y)"
      >
        <Redo2 size={18} />
      </button>
      <div className="w-px h-5 bg-white/10 mx-1" />
      <button
        onClick={reset}
        className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10 text-gray-400 hover:text-gray-200"
        title="重置"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  )
}
