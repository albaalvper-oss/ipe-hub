import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, Brain, TrendingUp, GraduationCap, BookOpen, User, Zap, Bell, Settings, ChevronDown, ChevronRight, Users, LogOut, FolderOpen, Shield, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import { currentUser, teacherProfile } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

const ipeGroups = [
  {
    id: 'ipe1',
    titulo: 'IPE I',
    subtitulo: 'Explora y oriéntate',
    emoji: '🌱',
    gradiente: 'from-blue-500 to-indigo-600',
    colorTexto: 'text-blue-600 dark:text-blue-400',
    colorBg: 'bg-blue-50 dark:bg-blue-950/30',
    colorBorde: 'border-blue-200 dark:border-blue-800',
    secciones: [
      { to: '/conocete', icon: Brain, label: 'Conócete en el Mercado', color: 'text-violet-500' },
      { to: '/trabaja-seguro', icon: Shield, label: 'Trabaja Seguro', color: 'text-amber-500' },
      { to: '/aula', icon: GraduationCap, label: 'Para el Aula', color: 'text-blue-500' },
      { to: '/estudiar', icon: BookOpen, label: 'Aprender a Estudiar', color: 'text-emerald-500' },
      { to: '/recursos', icon: FolderOpen, label: 'Recursos', color: 'text-rose-500' },
    ],
  },
  {
    id: 'ipe2',
    titulo: 'IPE II',
    subtitulo: 'Especialízate y lánzate',
    emoji: '🚀',
    gradiente: 'from-violet-500 to-purple-600',
    colorTexto: 'text-violet-600 dark:text-violet-400',
    colorBg: 'bg-violet-50 dark:bg-violet-950/30',
    colorBorde: 'border-violet-200 dark:border-violet-800',
    secciones: [
      { to: '/aula', icon: GraduationCap, label: 'Para el Aula', color: 'text-blue-500' },
      { to: '/mercado', icon: TrendingUp, label: 'El Mercado Habla', color: 'text-amber-500' },
      { to: '/emprende', icon: Rocket, label: 'Emprende', color: 'text-violet-500' },
    ],
  },
]

const navDocente = [
  { to: '/aula', icon: GraduationCap, label: 'Mi Aula', color: 'text-blue-500' },
  { to: '/mercado', icon: TrendingUp, label: 'El Mercado Habla', color: 'text-amber-500' },
  { to: '/emprende', icon: Rocket, label: 'Emprende', color: 'text-violet-500' },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const esDocente = user?.rol === 'docente'

  const seccionesRutas = ['/conocete', '/mercado', '/aula', '/estudiar', '/trabaja-seguro', '/emprende']
  const enSeccion = seccionesRutas.includes(location.pathname)

  const [abierto, setAbierto] = useState<string | null>(() => {
    if (!enSeccion) return null
    if (location.pathname === '/mercado') return 'ipe2'
    return null
  })

  const toggleGrupo = (id: string) => {
    setAbierto(prev => prev === id ? null : id)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const perfil = esDocente ? teacherProfile : currentUser

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col bg-sidebar border-r border-sidebar-border z-40 py-6">

      {/* Logo */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-bold text-sidebar-foreground leading-none">IPE Hub</p>
            <p className="text-xs text-muted-foreground leading-none mt-0.5">Itinerario Personal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">

        {/* Inicio */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Home className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-indigo-500')} strokeWidth={isActive ? 2.5 : 1.8} />
              {esDocente ? 'Panel docente' : 'Inicio'}
            </>
          )}
        </NavLink>

        {/* Separador */}
        <div className="pt-2 pb-1 px-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {esDocente ? 'Gestión' : 'Itinerarios'}
          </p>
        </div>

        {/* Navegación según rol */}
        {esDocente ? (
          <>
            {/* Alumnado */}
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Users className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-violet-500')} strokeWidth={isActive ? 2.5 : 1.8} />
                  Mi Alumnado
                </>
              )}
            </NavLink>

            {/* Secciones docente */}
            {navDocente.map(({ to, icon: Icon, label, color }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : color)} strokeWidth={isActive ? 2.5 : 1.8} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </>
        ) : (
          /* IPE I e IPE II para alumnos */
          ipeGroups.map(grupo => {
            const expandido = abierto === grupo.id

            return (
              <div key={grupo.id}>
                <button
                  onClick={() => toggleGrupo(grupo.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    expandido
                      ? cn('border', grupo.colorBg, grupo.colorBorde, grupo.colorTexto)
                      : 'text-sidebar-foreground hover:bg-sidebar-accent',
                  )}
                >
                  <span className="text-base leading-none">{grupo.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="font-bold leading-none">{grupo.titulo}</p>
                    <p className={cn('text-[10px] mt-0.5 leading-none', expandido ? grupo.colorTexto : 'text-muted-foreground')}>
                      {grupo.subtitulo}
                    </p>
                  </div>
                  {expandido
                    ? <ChevronDown className="h-4 w-4 shrink-0" />
                    : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  }
                </button>

                {expandido && (
                  <div className="ml-3 mt-0.5 pl-3 border-l-2 border-border space-y-0.5">
                    {grupo.secciones.map(({ to, icon: Icon, label, color }) => (
                      <NavLink
                        key={`${grupo.id}-${to}`}
                        to={to}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent',
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : color)} strokeWidth={isActive ? 2.5 : 1.8} />
                            <span className="text-sm">{label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}

        {/* Perfil */}
        <div className="pt-2 pb-1 px-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Cuenta</p>
        </div>
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-sidebar-foreground hover:bg-sidebar-accent',
            )
          }
        >
          {({ isActive }) => (
            <>
              <User className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-pink-500')} strokeWidth={isActive ? 2.5 : 1.8} />
              Mi Perfil
            </>
          )}
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="px-3 space-y-0.5 mt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          Notificaciones
          <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold h-5 min-w-5 rounded-full flex items-center justify-center px-1">3</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Settings className="h-5 w-5" strokeWidth={1.8} />
          Ajustes
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.8} />
          Cerrar sesión
        </button>
      </div>

      {/* Usuario */}
      <div className="px-3 mt-4 pt-4 border-t border-sidebar-border">
        <NavLink to="/perfil" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer">
          <Avatar src={perfil.avatar} alt={perfil.name} size="sm" ring />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{perfil.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {esDocente
                ? (teacherProfile as typeof teacherProfile).subject
                : `Nivel ${(currentUser as typeof currentUser).nivel} · ${(currentUser as typeof currentUser).xp} XP`
              }
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}
