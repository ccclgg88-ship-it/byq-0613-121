import React, { useState } from 'react'
import { X, Edit3, Download, Copy, Trash2, AlertTriangle, Check, X as XIcon } from 'lucide-react'
import { Work } from '@/data/types'
import { THEMES } from '@/data/themes'
import { BadgeShape, ShapeClipPathElements } from '@/components/BadgeShape'
import { BadgeIcon } from '@/components/BadgeIcon'
import { BadgeCodename } from '@/components/BadgeCodename'
import { TextureOverlay } from '@/components/TextureOverlay'
import { useWorksStore } from '@/store/worksStore'
import { useBadgeStore } from '@/store/badgeStore'
import { exportBadgeAsImage } from '@/lib/exportImage'
import { cn } from '@/lib/utils'

interface WorkDetailProps {
  work: Work
  onClose: () => void
  onSaved?: () => void
}

type ConfirmType = 'load' | 'delete' | null

export function WorkDetail({ work, onClose, onSaved }: WorkDetailProps) {
  const [confirmType, setConfirmType] = useState<ConfirmType>(null)
  const [copyName, setCopyName] = useState(`${work.name}-副本`)
  const [isCopying, setIsCopying] = useState(false)
  
  const deleteWork = useWorksStore((s) => s.deleteWork)
  const saveWork = useWorksStore((s) => s.saveWork)
  const presentState = useBadgeStore((s) => s.present)
  const loadState = useBadgeStore((s) => s.loadState)

  const theme = THEMES[work.themeName]
  const canvasSize = 240

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleLoad = () => {
    const hasChanges = JSON.stringify(presentState) !== JSON.stringify(work.badge)
    if (hasChanges) {
      setConfirmType('load')
    } else {
      doLoad()
    }
  }

  const doLoad = () => {
    loadState(work.badge)
    onClose()
  }

  const handleExport = async () => {
    const svgElement = document.getElementById('work-detail-svg')
    if (svgElement) {
      await exportBadgeAsImage(svgElement as unknown as SVGSVGElement, `${work.name}.png`)
    }
  }

  const handleCopy = () => {
    setIsCopying(true)
  }

  const confirmCopy = () => {
    const thumbnail = work.thumbnail
    const result = saveWork(copyName, work.badge, thumbnail, work.themeName)
    if (result.success) {
      setIsCopying(false)
      onSaved?.()
      onClose()
    }
  }

  const handleDelete = () => {
    setConfirmType('delete')
  }

  const confirmDelete = () => {
    deleteWork(work.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">{work.name}</h2>
            <p className="text-sm text-gray-400 mt-1">
              {theme.label} · {formatDate(work.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: theme.background }}
          >
            <svg
              id="work-detail-svg"
              width={canvasSize}
              height={canvasSize}
              viewBox={`0 0 ${canvasSize} ${canvasSize}`}
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl"
            >
              <defs>
                <clipPath id="detail-clip">
                  <ShapeClipPathElements shape={work.badge.shape} size={canvasSize} />
                </clipPath>
              </defs>

              <g clipPath="url(#detail-clip)">
                <BadgeShape
                  shape={work.badge.shape}
                  size={canvasSize}
                  fillColor={work.badge.fillColor}
                  strokeColor={work.badge.strokeColor}
                  strokeWidth={work.badge.strokeWidth}
                  strokeStyle={work.badge.strokeStyle}
                />
                <TextureOverlay
                  texture={work.badge.texture}
                  opacity={work.badge.textureOpacity}
                  scale={work.badge.textureScale}
                  canvasSize={canvasSize}
                  strokeColor={work.badge.strokeColor}
                />
              </g>

              {work.badge.icon && (
                <BadgeIcon
                  iconName={work.badge.icon}
                  color={work.badge.iconColor}
                  size={work.badge.iconSize * (canvasSize / 320)}
                  offsetX={work.badge.iconOffsetX * (canvasSize / 320)}
                  offsetY={work.badge.iconOffsetY * (canvasSize / 320)}
                  canvasSize={canvasSize}
                />
              )}
              <BadgeCodename
                codename={work.badge.codename}
                color={work.badge.codenameColor}
                fontSize={work.badge.codenameFontSize * (canvasSize / 320)}
                canvasSize={canvasSize}
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleLoad}
            className={cn(
              'flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
              'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
              'hover:bg-amber-500/20 transition-colors'
            )}
          >
            <Edit3 size={16} />
            <span className="text-sm font-medium">载入编辑</span>
          </button>

          <button
            onClick={handleExport}
            className={cn(
              'flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
              'bg-white/5 text-gray-300 ring-1 ring-white/10',
              'hover:bg-white/10 transition-colors'
            )}
          >
            <Download size={16} />
            <span className="text-sm font-medium">导出图片</span>
          </button>

          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
              'bg-white/5 text-gray-300 ring-1 ring-white/10',
              'hover:bg-white/10 transition-colors'
            )}
          >
            <Copy size={16} />
            <span className="text-sm font-medium">复制为新作品</span>
          </button>

          <button
            onClick={handleDelete}
            className={cn(
              'flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
              'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30',
              'hover:bg-rose-500/20 transition-colors'
            )}
          >
            <Trash2 size={16} />
            <span className="text-sm font-medium">删除</span>
          </button>
        </div>

        {confirmType && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] rounded-xl p-6 max-w-sm w-full mx-4">
              {confirmType === 'load' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-amber-500/15">
                      <AlertTriangle size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100">确认载入</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        当前画布有未保存的改动，确定要覆盖吗？
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmType(null)}
                      className="flex-1 py-2 px-4 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={doLoad}
                      className="flex-1 py-2 px-4 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors"
                    >
                      确认覆盖
                    </button>
                  </div>
                </>
              )}

              {confirmType === 'delete' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-rose-500/15">
                      <AlertTriangle size={24} className="text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100">确认删除</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        此操作不可恢复，确定要删除吗？
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmType(null)}
                      className="flex-1 py-2 px-4 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 py-2 px-4 rounded-lg bg-rose-500 text-white hover:bg-rose-400 transition-colors"
                    >
                      确认删除
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {isCopying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] rounded-xl p-6 max-w-sm w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-100">复制为新作品</h3>
                <button
                  onClick={() => setIsCopying(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-gray-400"
                >
                  <XIcon size={18} />
                </button>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">作品名称</label>
                <input
                  type="text"
                  value={copyName}
                  onChange={(e) => setCopyName(e.target.value)}
                  placeholder="输入作品名称"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-100 placeholder:text-gray-500 ring-1 ring-white/10 focus:ring-amber-500/50 outline-none"
                  maxLength={16}
                />
                <p className="text-xs text-gray-500">2-16 个字符</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setIsCopying(false)}
                  className="flex-1 py-2 px-4 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmCopy}
                  disabled={copyName.trim().length < 2 || copyName.trim().length > 16}
                  className={cn(
                    'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
                    copyName.trim().length >= 2 && copyName.trim().length <= 16
                      ? 'bg-amber-500 text-white hover:bg-amber-400'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Check size={16} className="inline mr-1" />
                  确认复制
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
