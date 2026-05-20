import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src: string
  alt: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ring?: boolean
  ringColor?: 'primary' | 'gradient' | 'none'
  className?: string
}

export function Avatar({ src, alt, size = 'md', ring = false, ringColor = 'primary', className }: AvatarProps) {
  const [error, setError] = useState(false)

  const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  }

  const ringStyles = {
    primary: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
    gradient: 'ring-2 ring-offset-2 ring-offset-background',
    none: '',
  }

  const initials = alt
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className={cn('relative shrink-0', className)}>
      {ring && ringColor === 'gradient' && (
        <div className={cn('absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary', sizes[size].split(' ').slice(0, 2).join(' '))} style={{ padding: 2 }}>
          <div className="w-full h-full rounded-full bg-background" />
        </div>
      )}
      {error ? (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white',
            sizes[size],
            ring && ringColor === 'primary' && ringStyles.primary,
          )}
        >
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={cn(
            'rounded-full object-cover bg-muted',
            sizes[size].split(' ').slice(0, 2).join(' '),
            ring && ringColor === 'primary' && ringStyles.primary,
          )}
        />
      )}
    </div>
  )
}
