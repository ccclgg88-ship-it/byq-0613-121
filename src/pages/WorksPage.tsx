import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Grid3X3, Package } from 'lucide-react'
import { WorkCard } from '@/components/WorkCard'
import { WorkDetail } from '@/components/WorkDetail'
import { useWorksStore } from '@/store/worksStore'
import { Work } from '@/data/types'
import { THEMES, ThemeName } from '@/data/themes'
import { cn } from '@/lib/utils'

interface WorksPageProps {
  onBack: () => void
}

const themes: ThemeName[] = ['cyber', 'handcraft', 'darkroom', 'tape']

export default function WorksPage({ onBack }: WorksPageProps) {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  
  const { works, filterWorks, setFilter, isLoading, init } = useWorksStore()

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    setFilter({ search: searchQuery, theme: selectedTheme })
  }, [searchQuery, selectedTheme, setFilter])

  const filteredWorks = filterWorks()

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work)
  }

  const handleCloseDetail = () => {
    setSelectedWork(null)
  }

  const handleSaved = () => {
    init()
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                作品库
              </h1>
              <p className="text-sm text-gray-400">
                {works.length} 件作品
              </p>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索作品名称..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 text-gray-100 placeholder:text-gray-500 ring-1 ring-white/10 focus:ring-amber-500/50 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTheme(null)}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                selectedTheme === null
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              )}
            >
              全部
            </button>
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={cn(
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  selectedTheme === theme
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                )}
              >
                {THEMES[theme].label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 rounded-2xl bg-white/5 mb-6">
              <Package size={48} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              还没有作品
            </h3>
            <p className="text-gray-400 max-w-sm">
              完成徽章设计后保存，就能在这里看到你的作品了。
            </p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-400 transition-colors"
            >
              开始设计
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => handleWorkClick(work)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedWork && (
        <WorkDetail
          work={selectedWork}
          onClose={handleCloseDetail}
          onSaved={handleSaved}
          onLoad={onBack}
        />
      )}
    </div>
  )
}
