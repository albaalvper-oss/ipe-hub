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
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  const ringStyles = {
    primary: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
    gradient: 'ring-2 ring-offset-2 ring-offset-background',
    none: '',
  }

  return (
    <div className={cn('relative shrink-0', className)}>
      {ring && ringColor === 'gradient' && (
        <div className={cn('absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary', sizes[size])} style={{ padding: 2 }}>
          <div className="w-full h-full rounded-full bg-background" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover bg-muted',
          sizes[size],
          ring && ringColor === 'primary' && ringStyles.primary,
        )}
      />
    </div>
  )
}
