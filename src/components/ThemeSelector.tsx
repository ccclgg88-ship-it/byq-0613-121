import { THEMES, ThemeName } from '@/data/themes'
import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

const themeList: ThemeName[] = ['cyber', 'handcraft', 'darkroom', 'tape']

export function ThemeSelector() {
  const currentTheme = useBadgeStore((s) => s.present.theme)
  const applyTheme = useBadgeStore((s) => s.applyTheme)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">主题包</label>
      <div className="grid grid-cols-2 gap-2">
        {themeList.map((name) => {
          const theme = THEMES[name]
          return (
            <button
              key={name}
              onClick={() => applyTheme(name)}
              className={cn(
                'p-3 rounded-xl transition-all duration-300 text-left',
                'hover:scale-[1.02]',
                currentTheme === name
                  ? 'ring-2 ring-amber-500/70 ring-offset-2 ring-offset-[#1a1a2e]'
                  : 'ring-1 ring-white/10 hover:ring-white/20'
              )}
              style={{ backgroundColor: theme.fillColor }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.strokeColor }}
                />
                <span className="text-sm font-semibold" style={{ color: theme.codenameColor }}>
                  {theme.label}
                </span>
              </div>
              <p className="text-[11px] opacity-70" style={{ color: theme.codenameColor }}>
                {theme.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
