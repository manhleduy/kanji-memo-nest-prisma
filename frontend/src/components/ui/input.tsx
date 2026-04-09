import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-rose-400/60 focus:ring-2 focus:ring-rose-400/20',
        className,
      )}
      {...props}
    />
  )
}
