import { useState } from 'react'
import { Palette, Layers, Settings } from 'lucide-react'
import { ShapeSelector } from '@/components/ShapeSelector'
import { IconSelector } from '@/components/IconSelector'
import { CodenameInput } from '@/components/CodenameInput'
import { ColorPicker } from '@/components/ColorPicker'
import { StrokeControl } from '@/components/StrokeControl'
import { TextureControl } from '@/components/TextureControl'
import { ThemeSelector } from '@/components/ThemeSelector'
import { HistoryToolbar } from '@/components/HistoryToolbar'
import { ExportButton } from '@/components/ExportButton'
import { cn } from '@/lib/utils'

type TabType = 'basic' | 'style' | 'advanced'

interface ControlPanelProps {
  svgRef: React.RefObject<SVGSVGElement>
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'basic', label: '基础', icon: <Layers size={16} /> },
  { id: 'style', label: '样式', icon: <Palette size={16} /> },
  { id: 'advanced', label: '高级', icon: <Settings size={16} /> },
]

export function ControlPanel({ svgRef }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic')

  return (
    <div className="flex flex-col h-full bg-[#1a1a2e]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">徽</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-100">徽章设计器</h2>
            <p className="text-[11px] text-gray-500">打造专属身份标识</p>
          </div>
        </div>
        <HistoryToolbar />
      </div>

      <div className="flex px-4 pt-3 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-amber-500/15 text-amber-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-6">
          {activeTab === 'basic' && (
            <>
              <ThemeSelector />
              <div className="h-px bg-white/5" />
              <ShapeSelector />
              <div className="h-px bg-white/5" />
              <IconSelector />
              <div className="h-px bg-white/5" />
              <CodenameInput />
            </>
          )}

          {activeTab === 'style' && (
            <>
              <ColorPicker />
              <div className="h-px bg-white/5" />
              <StrokeControl />
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <TextureControl />
            </>
          )}
        </div>
      </div>

      <div className="p-5 border-t border-white/5">
        <ExportButton svgRef={svgRef} />
      </div>
    </div>
  )
}
