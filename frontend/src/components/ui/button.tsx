import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'h-9 px-4' : 'h-11 px-5',
        variant === 'primary' && 'border-rose-500 bg-rose-500 text-white hover:bg-rose-600',
        variant === 'secondary' &&
          'border-sky-500/30 bg-sky-500/10 text-sky-50 hover:bg-sky-500/20',
        variant === 'ghost' && 'border-transparent bg-transparent text-slate-200 hover:bg-white/5',
        variant === 'outline' &&
          'border-white/10 bg-white/5 text-slate-100 hover:border-rose-400/40 hover:bg-rose-400/10',
        className,
      )}
      {...props}
    />
  )
}
