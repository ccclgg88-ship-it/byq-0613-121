import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react'
import { BadgeShape, ShapeClipPathElements } from '@/components/BadgeShape'
import { BadgeIcon } from '@/components/BadgeIcon'
import { BadgeCodename } from '@/components/BadgeCodename'
import { TextureOverlay } from '@/components/TextureOverlay'
import { useBadgeStore } from '@/store/badgeStore'
import { THEMES } from '@/data/themes'

export const CANVAS_SIZE = 320

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  startOffsetX: number
  startOffsetY: number
}

export const BadgeCanvas = forwardRef<SVGSVGElement>(function BadgeCanvas(_, ref) {
  const state = useBadgeStore((s) => s.present)
  const update = useBadgeStore((s) => s.update)
  const internalRef = useRef<SVGSVGElement>(null)
  const [drag, setDrag] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  })

  const theme = THEMES[state.theme]

  const clampIconPosition = useCallback(
    (offsetX: number, offsetY: number, size: number) => {
      const maxRadius = CANVAS_SIZE / 2 - 8
      const iconHalfSize = size / 2
      const cx = CANVAS_SIZE / 2
      const cy = CANVAS_SIZE / 2

      let finalX = offsetX
      let finalY = offsetY

      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
      const maxDistance = maxRadius - iconHalfSize * 0.6

      if (distance > maxDistance) {
        const ratio = maxDistance / distance
        finalX = offsetX * ratio
        finalY = offsetY * ratio
      }

      void cx
      void cy

      return { iconOffsetX: finalX, iconOffsetY: finalY }
    },
    []
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!state.icon) return
    e.preventDefault()
    setDrag({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: state.iconOffsetX,
      startOffsetY: state.iconOffsetY,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!drag.isDragging) return
      const dx = (e.clientX - drag.startX) * (CANVAS_SIZE / 320)
      const dy = (e.clientY - drag.startY) * (CANVAS_SIZE / 320)
      const newOffsetX = drag.startOffsetX + dx
      const newOffsetY = drag.startOffsetY + dy
      const clamped = clampIconPosition(newOffsetX, newOffsetY, state.iconSize)
      update(clamped)
    },
    [drag.isDragging, drag.startX, drag.startY, drag.startOffsetX, drag.startOffsetY, clampIconPosition, state.iconSize, update]
  )

  const handleMouseUp = useCallback(() => {
    setDrag((d) => ({ ...d, isDragging: false }))
  }, [])

  useEffect(() => {
    if (drag.isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [drag.isDragging, handleMouseMove, handleMouseUp])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!state.icon) return
    const touch = e.touches[0]
    setDrag({
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      startOffsetX: state.iconOffsetX,
      startOffsetY: state.iconOffsetY,
    })
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!drag.isDragging) return
      const touch = e.touches[0]
      const dx = (touch.clientX - drag.startX) * (CANVAS_SIZE / 320)
      const dy = (touch.clientY - drag.startY) * (CANVAS_SIZE / 320)
      const newOffsetX = drag.startOffsetX + dx
      const newOffsetY = drag.startOffsetY + dy
      const clamped = clampIconPosition(newOffsetX, newOffsetY, state.iconSize)
      update(clamped)
    },
    [drag.isDragging, drag.startX, drag.startY, drag.startOffsetX, drag.startOffsetY, clampIconPosition, state.iconSize, update]
  )

  const handleTouchEnd = useCallback(() => {
    setDrag((d) => ({ ...d, isDragging: false }))
  }, [])

  useEffect(() => {
    if (drag.isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
      return () => {
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [drag.isDragging, handleTouchMove, handleTouchEnd])

  const setRefs = useCallback(
    (node: SVGSVGElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  return (
    <div
      className="relative flex items-center justify-center rounded-2xl p-8 transition-all duration-500"
      style={{ backgroundColor: theme.background }}
    >
      <div className="relative" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
        <svg
          ref={setRefs}
          id="badge-canvas"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl transition-transform duration-300"
        >
          <defs>
            <clipPath id="badge-shape-clip">
              <ShapeClipPathElements shape={state.shape} size={CANVAS_SIZE} />
            </clipPath>
          </defs>

          <g clipPath="url(#badge-shape-clip)">
            <BadgeShape
              shape={state.shape}
              size={CANVAS_SIZE}
              fillColor={state.fillColor}
              strokeColor={state.strokeColor}
              strokeWidth={state.strokeWidth}
              strokeStyle={state.strokeStyle}
            />
            <TextureOverlay
              texture={state.texture}
              opacity={state.textureOpacity}
              scale={state.textureScale}
              canvasSize={CANVAS_SIZE}
              strokeColor={state.strokeColor}
            />
          </g>

          {state.icon && (
            <g
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ cursor: drag.isDragging ? 'grabbing' : 'grab' }}
            >
              <BadgeIcon
                iconName={state.icon}
                color={state.iconColor}
                size={state.iconSize}
                offsetX={state.iconOffsetX}
                offsetY={state.iconOffsetY}
                canvasSize={CANVAS_SIZE}
              />
            </g>
          )}
          <BadgeCodename
            codename={state.codename}
            color={state.codenameColor}
            fontSize={state.codenameFontSize}
            canvasSize={CANVAS_SIZE}
          />
        </svg>
      </div>
    </div>
  )
})
