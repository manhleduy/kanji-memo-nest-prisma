import type { ReactNode } from 'react'

export function Tooltip({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 shadow-xl group-hover:block group-focus-within:block">
        {label}
      </span>
    </span>
  )
}
