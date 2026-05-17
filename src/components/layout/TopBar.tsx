import { Bell, Search, Zap } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { currentUser } from '@/data/mockData'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title?: string
  showSearch?: boolean
  className?: string
}

export function TopBar({ title, showSearch = false, className }: TopBarProps) {
  return (
    <header className={cn('sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3', className)}>
      <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
        {/* Left */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          {title ? (
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          ) : (
            <div>
              <p className="text-xs text-muted-foreground leading-none">Hola de nuevo,</p>
              <p className="text-sm font-bold text-foreground leading-tight">
                {currentUser.name.split(' ')[0]} 👋
              </p>
            </div>
          )}
        </div>

        {/* Desktop title */}
        {title && (
          <h1 className="hidden md:block text-xl font-bold text-foreground">{title}</h1>
        )}

        {/* Right */}
        <div className="flex items-center gap-2 ml-auto">
          {showSearch && (
            <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
            </button>
          )}
          <button className="relative h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full border-2 border-background" />
          </button>
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" ring className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
