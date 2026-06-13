import { useState, useEffect } from 'react'
import Home from '@/pages/Home'
import WorksPage from '@/pages/WorksPage'
import { useWorksStore } from '@/store/worksStore'

type PageType = 'designer' | 'works'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('designer')
  const initWorks = useWorksStore((s) => s.init)

  useEffect(() => {
    initWorks()
  }, [initWorks])

  const handleOpenWorks = () => {
    setCurrentPage('works')
  }

  const handleBackToDesigner = () => {
    setCurrentPage('designer')
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {currentPage === 'designer' && <Home onOpenWorks={handleOpenWorks} />}
      {currentPage === 'works' && <WorksPage onBack={handleBackToDesigner} />}
    </div>
  )
}
