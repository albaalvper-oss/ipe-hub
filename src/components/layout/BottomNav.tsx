import { NavLink } from 'react-router-dom'
import { Home, Brain, TrendingUp, GraduationCap, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Inicio' },
  { to: '/conocete', icon: Brain, label: 'Conócete' },
  { to: '/mercado', icon: TrendingUp, label: 'Mercado' },
  { to: '/aula', icon: GraduationCap, label: 'Aula' },
  { to: '/estudiar', icon: BookOpen, label: 'Estudiar' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around px-1 py-2 safe-area-bottom">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn('p-1.5 rounded-xl transition-all duration-200', isActive && 'bg-primary/10')}>
                  <Icon className={cn('h-5 w-5 transition-all', isActive && 'scale-110')} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className="text-[9px] font-medium leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
