import * as React from 'react'
import { cn } from '../../lib/utils'

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-cyan-500/10 text-cyan-200 border border-cyan-500/40',
    secondary: 'bg-slate-800 text-slate-200 border border-slate-700',
    outline: 'border border-slate-700 text-slate-200',
  }

  return (
    <div
      className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', variants[variant], className)}
      {...props}
    />
  )
}
