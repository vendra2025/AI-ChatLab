import * as React from 'react'
import { cn } from '../../lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-xl border border-slate-800 bg-slate-900/60 shadow-card backdrop-blur', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn('flex flex-col gap-1 p-6 pb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
