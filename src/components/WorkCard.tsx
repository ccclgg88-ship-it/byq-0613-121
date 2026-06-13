import { Calendar } from 'lucide-react'
import { Work } from '@/data/types'
import { THEMES } from '@/data/themes'
import { cn } from '@/lib/utils'

interface WorkCardProps {
  work: Work
  onClick: () => void
}

export function WorkCard({ work, onClick }: WorkCardProps) {
  const theme = THEMES[work.themeName]
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10',
        'transition-all duration-300 hover:ring-amber-500/30 hover:shadow-lg',
        'hover:shadow-amber-500/5 hover:-translate-y-0.5'
      )}
    >
      <div className="aspect-square relative">
        <img
          src={work.thumbnail}
          alt={work.name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: theme.background + '80' }}
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span 
            className="px-2 py-1 rounded-md text-[10px] font-medium"
            style={{ backgroundColor: theme.fillColor, color: theme.codenameColor }}
          >
            {theme.label}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-100 truncate mb-1">
          {work.name}
        </h3>
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar size={12} />
          <span>{formatDate(work.createdAt)}</span>
        </div>
      </div>
    </button>
  )
}
