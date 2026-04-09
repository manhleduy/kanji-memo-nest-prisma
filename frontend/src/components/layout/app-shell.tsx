import type { ReactNode } from 'react'
import { APP_COPY } from '../../data'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(225,29,72,0.15),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,#020617_0%,#09111f_55%,#030712_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300">{APP_COPY.brand}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {APP_COPY.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">{APP_COPY.subtitle}</p>
          </div>
          <div className="flex gap-3 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-sky-500/10 px-3 py-1">Read</span>
            <span className="rounded-full border border-white/10 bg-rose-500/10 px-3 py-1">Write</span>
          </div>
        </header>
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  )
}
