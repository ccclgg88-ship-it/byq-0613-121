import { useBadgeStore } from '@/store/badgeStore'
import { cn } from '@/lib/utils'

export function CodenameInput() {
  const codename = useBadgeStore((s) => s.present.codename)
  const update = useBadgeStore((s) => s.update)

  const isValid = codename.trim().length >= 2 && codename.trim().length <= 8
  const isEmpty = codename.trim().length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 8) {
      update({ codename: value })
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">代号</label>
      <div className="relative">
        <input
          type="text"
          value={codename}
          onChange={handleChange}
          placeholder="输入 2-8 个字符"
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-white/5 text-gray-100 placeholder:text-gray-500',
            'ring-1 transition-all duration-200 outline-none',
            'focus:ring-amber-500/50',
            isEmpty
              ? 'ring-white/10'
              : isValid
                ? 'ring-emerald-500/30 focus:ring-emerald-500/50'
                : 'ring-rose-500/40 focus:ring-rose-500/60'
          )}
        />
        <div
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium px-2 py-0.5 rounded-md',
            isEmpty
              ? 'text-gray-500 bg-white/5'
              : isValid
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-rose-400 bg-rose-500/10'
          )}
        >
          {codename.length}/8
        </div>
      </div>
      {!isEmpty && !isValid && (
        <p className="text-xs text-rose-400">代号需要 2-8 个字符</p>
      )}
    </div>
  )
}
