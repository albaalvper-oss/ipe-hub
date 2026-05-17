import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'primary' | 'success' | 'warning' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'primary',
  size = 'md',
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))

  const colors = {
    primary: 'bg-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    gradient: 'bg-gradient-to-r from-primary to-secondary',
  }

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full rounded-full bg-muted overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground mt-1 text-right">{pct}%</p>
      )}
    </div>
  )
}
