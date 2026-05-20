import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, Star, Brain, TrendingUp, GraduationCap, BookOpen, ChevronRight, Zap, Trophy, CheckCircle2, Circle, Users, BookMarked, Target, FolderOpen, Shield, Rocket } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { currentUser, actividadReciente, stories, teacherProfile, misAlumnos, resultadosIPE1, resultadosIPE2 } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

type CursoId = 'ipe1' | 'ipe2'

const cursos = [
  {
    id: 'ipe1' as CursoId,
    titulo: 'IPE I',
    subtitulo: 'Explora y oriéntate',
    descripcion: 'Autoconocimiento, técnicas de estudio y primeros pasos en el aula',
    emoji: '🌱',
    gradiente: 'from-blue-500 to-indigo-600',
    etiqueta: 'Primer itinerario',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  },
  {
    id: 'ipe2' as CursoId,
    titulo: 'IPE II',
    subtitulo: 'Especialízate y lánzate',
    descripcion: 'Empleabilidad, proyectos reales y conexión con el mercado laboral',
    emoji: '🚀',
    gradiente: 'from-violet-500 to-purple-600',
    etiqueta: 'Segundo itinerario',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
  },
]

// IPE I — Primer año: exploración, estudio y base de aula
const seccionesIPE1 = [
  {
    to: '/conocete',
    titulo: 'Conócete en el Mercado',
    subtitulo: '¿Quién eres y qué pide el sector?',
    descripcion: 'Test de intereses, puestos de trabajo TAPSD y debate del aula',
    emoji: '🧠',
    icon: Brain,
    gradiente: 'from-violet-500 to-purple-600',
    progreso: 40,
    etiqueta: 'Test al 40%',
    nueva: false,
  },
  {
    to: '/aula',
    titulo: 'Para el Aula',
    subtitulo: 'Aprende haciendo desde el primer día',
    descripcion: 'Actividades ABR, misiones y recursos colaborativos',
    emoji: '🎓',
    icon: GraduationCap,
    gradiente: 'from-blue-500 to-indigo-600',
    progreso: 60,
    etiqueta: 'Misión activa',
    nueva: false,
  },
  {
    to: '/estudiar',
    titulo: 'Aprender a Estudiar',
    subtitulo: 'Organiza y optimiza tu aprendizaje',
    descripcion: 'Técnicas de estudio, Pomodoro y gestión de tareas',
    emoji: '📚',
    icon: BookOpen,
    gradiente: 'from-emerald-500 to-teal-600',
    progreso: 25,
    etiqueta: '4 tareas hoy',
    nueva: false,
  },
  {
    to: '/trabaja-seguro',
    titulo: 'Trabaja Seguro',
    subtitulo: 'Prevención de Riesgos Laborales',
    descripcion: 'Riesgos del sector, EPI, primeros auxilios y quiz PRL interactivo',
    emoji: '🦺',
    icon: Shield,
    gradiente: 'from-amber-500 to-orange-600',
    progreso: 20,
    etiqueta: 'Quiz disponible',
    nueva: true,
  },
  {
    to: '/recursos',
    titulo: 'Recursos',
    subtitulo: 'Materiales de tu docente',
    descripcion: 'Documentos, guías y materiales complementarios para el curso',
    emoji: '📂',
    icon: FolderOpen,
    gradiente: 'from-rose-500 to-pink-600',
    progreso: 0,
    etiqueta: 'Materiales disponibles',
    nueva: false,
  },
]

// IPE II — Segundo año: empleabilidad, mercado y proyectos avanzados
const seccionesIPE2 = [
  {
    to: '/mercado',
    titulo: 'El Mercado Habla',
    subtitulo: 'El mundo laboral te espera',
    descripcion: 'Ofertas, tendencias del sector y testimonios de profesionales',
    emoji: '📈',
    icon: TrendingUp,
    gradiente: 'from-amber-500 to-orange-600',
    progreso: 72,
    etiqueta: '3 ofertas nuevas',
    nueva: true,
  },
  {
    to: '/aula-ii',
    titulo: 'Para el Aula',
    subtitulo: 'Situaciones profesionales reales',
    descripcion: 'Retos basados en situaciones del entorno laboral del sector TAPSD',
    emoji: '🎓',
    icon: GraduationCap,
    gradiente: 'from-violet-500 to-purple-600',
    progreso: 80,
    etiqueta: 'Reto activo',
    nueva: false,
  },
  {
    to: '/emprende',
    titulo: 'Emprende',
    subtitulo: 'Innova e impacta en el sector',
    descripcion: 'Business Model Canvas, ideación, ODS y pitch final de proyecto',
    emoji: '🚀',
    icon: Rocket,
    gradiente: 'from-violet-500 to-purple-600',
    progreso: 33,
    etiqueta: 'Fase 3 activa',
    nueva: true,
  },
]

const seccionesPorCurso: Record<CursoId, typeof seccionesIPE1> = {
  ipe1: seccionesIPE1,
  ipe2: seccionesIPE2,
}

function DashboardDocente() {
  const navigate = useNavigate()

  const alumnosActivos = misAlumnos.filter(a => a.activo).length
  const progresoMedio = Math.round(misAlumnos.reduce((sum, a) => sum + a.progreso, 0) / misAlumnos.length)

  const acciones = [
    { label: 'Aula IPE I', emoji: '🎓', to: '/aula', color: 'from-blue-500 to-indigo-600' },
    { label: 'Aula IPE II', emoji: '🏆', to: '/aula-ii', color: 'from-violet-500 to-purple-600' },
    { label: 'Ver alumnado', emoji: '👥', to: '/perfil', color: 'from-blue-500 to-indigo-600' },
    { label: 'El Mercado', emoji: '📈', to: '/mercado', color: 'from-amber-500 to-orange-600' },
    { label: 'Emprende', emoji: '🚀', to: '/emprende', color: 'from-emerald-500 to-teal-600' },
    { label: 'Evaluaciones', emoji: '📊', to: '/evaluaciones', color: 'from-slate-600 to-indigo-700' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar showSearch />

      <div className="px-4 pt-4 space-y-5 pb-8">

        {/* Hero docente */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 10% 80%, white 1px, transparent 1px), radial-gradient(circle at 90% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative flex items-center gap-4 mb-5">
            <Avatar src={teacherProfile.avatar} alt={teacherProfile.name} size="xl" ring />
            <div>
              <p className="text-white/70 text-xs font-medium">Panel docente</p>
              <p className="font-extrabold text-xl leading-tight">¡Hola, {teacherProfile.name.split(' ')[0]}! 👋</p>
              <p className="text-white/70 text-xs">{teacherProfile.subject}</p>
              <p className="text-white/50 text-xs">{teacherProfile.centro}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 relative">
            {[
              { label: 'Alumnos/as', valor: teacherProfile.alumnos, emoji: '👥' },
              { label: 'Cursos activos', valor: teacherProfile.cursosActivos, emoji: '📚' },
              { label: 'Misiones', valor: teacherProfile.misionesCreadas, emoji: '🎯' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-3 text-center">
                <p className="text-xl mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-xl leading-none">{s.valor}</p>
                <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del grupo */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-violet-500" />
                Mi clase
              </h3>
              <span className="text-xs text-muted-foreground">{alumnosActivos}/{misAlumnos.length} activos hoy</span>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progreso medio del grupo</span>
                <span className="text-xs font-bold text-foreground">{progresoMedio}%</span>
              </div>
              <ProgressBar value={progresoMedio} max={100} color="gradient" size="sm" />
            </div>
            <div className="space-y-2">
              {misAlumnos.slice(0, 4).map(alumno => (
                <div key={alumno.id} className="flex items-center gap-3">
                  <Avatar src={alumno.avatar} alt={alumno.nombre} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-medium text-foreground truncate">{alumno.nombre}</p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">{alumno.progreso}%</span>
                    </div>
                    <ProgressBar value={alumno.progreso} max={100} size="sm" color="gradient" />
                  </div>
                  <div className={cn('h-2 w-2 rounded-full shrink-0', alumno.activo ? 'bg-emerald-500' : 'bg-muted-foreground/30')} />
                </div>
              ))}
              {misAlumnos.length > 4 && (
                <button onClick={() => navigate('/perfil')} className="w-full text-xs text-primary font-medium text-center pt-1 hover:underline">
                  Ver los {misAlumnos.length} alumnos/as →
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-primary" />
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {acciones.map(acc => (
              <button
                key={acc.label}
                onClick={() => navigate(acc.to)}
                className={cn('bg-gradient-to-br rounded-2xl p-4 text-left text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-200', acc.color)}
              >
                <p className="text-2xl mb-2">{acc.emoji}</p>
                <p className="font-bold text-sm">{acc.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* IPE por curso */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <BookMarked className="h-4.5 w-4.5 text-primary" />
            Alumnado por itinerario
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {(['IPE I', 'IPE II'] as const).map(ipe => {
              const grupo = misAlumnos.filter(a => a.curso === ipe)
              const progMedio = grupo.length ? Math.round(grupo.reduce((s, a) => s + a.progreso, 0) / grupo.length) : 0
              return (
                <Card key={ipe}>
                  <CardContent className="p-4">
                    <p className="font-bold text-foreground text-sm mb-0.5">{ipe}</p>
                    <p className="text-xs text-muted-foreground mb-2">{grupo.length} alumnos/as</p>
                    <ProgressBar value={progMedio} max={100} size="sm" color="gradient" />
                    <p className="text-xs text-muted-foreground mt-1">Progreso medio: {progMedio}%</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cursoActivo, setCursoActivo] = useState<CursoId | null>(null)
  const [resultados, setResultados] = useState({ ipe1: resultadosIPE1, ipe2: resultadosIPE2 })

  if (user?.rol === 'docente') return <DashboardDocente />

  const secciones = cursoActivo ? seccionesPorCurso[cursoActivo] : []
  const cursoInfo = cursos.find(c => c.id === cursoActivo)
  const raActivo = cursoActivo ? resultados[cursoActivo] : []
  const raCompletados = raActivo.filter(r => r.hecho).length

  const toggleResultado = (id: string) => {
    if (!cursoActivo) return
    setResultados(prev => ({
      ...prev,
      [cursoActivo]: prev[cursoActivo].map(r => r.id === id ? { ...r, hecho: !r.hecho } : r),
    }))
  }


  return (
    <div className="max-w-2xl mx-auto">
      <TopBar showSearch />

      <div className="px-4 pt-4 space-y-5 pb-8">

        {/* XP Banner */}
        <div className="bg-gradient-to-br from-primary via-secondary to-pink-500 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 10% 80%, white 1px, transparent 1px), radial-gradient(circle at 90% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" ring />
                <div>
                  <p className="text-white/80 text-xs font-medium">Panel alumno/a</p>
                  <p className="font-extrabold text-lg leading-tight">¡Hola, {currentUser.name.split(' ')[0]}! 👋</p>
                  <p className="text-white/70 text-xs">{currentUser.ciclo}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 bg-white/20 rounded-2xl px-3 py-1.5 mb-1.5">
                  <Flame className="h-4 w-4 fill-orange-300 text-orange-300" />
                  <span className="font-bold text-sm">{currentUser.racha}</span>
                  <span className="text-white/70 text-xs">días</span>
                </div>
                <div className="flex items-center gap-1 justify-end text-white/70 text-xs">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{currentUser.insignias} insignias</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold">Nivel {currentUser.nivel}</span>
              </div>
              <span className="text-white/70 text-xs">{currentUser.xp} / {currentUser.xpSiguienteNivel} XP</span>
            </div>
            <ProgressBar value={currentUser.xp} max={currentUser.xpSiguienteNivel} color="gradient" size="sm"
              className="[&>div]:bg-white/20 [&>div>div]:bg-white" />
            <p className="text-white/60 text-xs mt-1.5 text-right">
              {currentUser.xpSiguienteNivel - currentUser.xp} XP para nivel {currentUser.nivel + 1}
            </p>
          </div>
        </div>

        {/* Stories */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
              <div className={cn('p-0.5 rounded-full', story.visto ? 'bg-muted' : 'bg-gradient-to-tr from-primary to-secondary')}>
                <div className="bg-background p-0.5 rounded-full">
                  <Avatar src={story.avatar} alt={story.user} size="lg" />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground w-14 text-center truncate">{story.user}</span>
            </div>
          ))}
        </div>

        {/* Selector de itinerario */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-primary" />
            Elige tu itinerario
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {cursos.map(curso => {
              const activo = cursoActivo === curso.id
              return (
                <button
                  key={curso.id}
                  onClick={() => setCursoActivo(activo ? null : curso.id)}
                  className={cn(
                    'relative overflow-hidden rounded-2xl text-left transition-all duration-300',
                    activo
                      ? 'ring-2 ring-offset-2 ring-primary shadow-xl scale-[1.02]'
                      : 'opacity-75 hover:opacity-100 hover:shadow-md',
                  )}
                >
                  <div className={cn('bg-gradient-to-br p-5 relative', curso.gradiente)}>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                    {activo && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className="h-5 w-5 text-white drop-shadow" />
                      </div>
                    )}
                    <p className="text-3xl mb-2 relative">{curso.emoji}</p>
                    <p className="text-white font-extrabold text-xl leading-none relative">{curso.titulo}</p>
                    <p className="text-white/80 text-xs font-medium mt-1 relative">{curso.subtitulo}</p>
                  </div>
                  <div className="bg-card p-3 border-t border-border">
                    <p className="text-xs text-muted-foreground leading-snug mb-2">{curso.descripcion}</p>
                    <span className={cn(
                      'inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full',
                      activo ? 'bg-primary/10 text-primary' : curso.badge,
                    )}>
                      {activo ? '✓ Seleccionado' : curso.etiqueta}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Secciones según el curso elegido */}
        {cursoActivo ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Star className="h-4.5 w-4.5 text-primary fill-primary" />
                Tus secciones
              </h2>
              <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', cursoInfo?.badge)}>
                {cursoInfo?.titulo} · {secciones.length} módulos
              </span>
            </div>

            {/* Descripción del itinerario */}
            <div className={cn('rounded-2xl p-3.5 mb-3 flex items-center gap-3 bg-gradient-to-r', cursoActivo === 'ipe1' ? 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20' : 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20')}>
              <span className="text-2xl">{cursoInfo?.emoji}</span>
              <div>
                <p className={cn('text-xs font-bold', cursoActivo === 'ipe1' ? 'text-blue-700 dark:text-blue-400' : 'text-violet-700 dark:text-violet-400')}>
                  {cursoInfo?.subtitulo}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{cursoInfo?.descripcion}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {secciones.map(sec => (
                <Card
                  key={sec.to}
                  onClick={() => navigate(sec.to)}
                  className="overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn('bg-gradient-to-br p-4 relative', sec.gradiente)}>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                    {sec.nueva && (
                      <span className="absolute top-2.5 right-2.5 bg-white/25 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        NUEVO
                      </span>
                    )}
                    <p className="text-3xl mb-1 relative">{sec.emoji}</p>
                    <h3 className="text-white font-bold text-sm leading-tight relative">{sec.titulo}</h3>
                    <p className="text-white/70 text-[10px] mt-0.5 relative leading-snug">{sec.subtitulo}</p>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground mb-2 leading-snug">{sec.descripcion}</p>
                    <ProgressBar value={sec.progreso} max={100} size="sm" color="gradient" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">{sec.etiqueta}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-border p-6 text-center">
            <p className="text-3xl mb-2">👆</p>
            <p className="text-sm font-medium text-foreground">Elige un itinerario para ver tus secciones</p>
            <p className="text-xs text-muted-foreground mt-1">IPE I o IPE II según tu curso actual</p>
          </div>
        )}

        {/* Resultados de aprendizaje */}
        {cursoActivo && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Resultados de aprendizaje
              </h2>
              <span className={cn(
                'text-xs font-bold px-2.5 py-1 rounded-full',
                raCompletados === raActivo.length
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : cursoActivo === 'ipe1'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
              )}>
                {raCompletados}/{raActivo.length} completados
              </span>
            </div>

            {/* Barra de progreso de RA */}
            <div className="mb-3">
              <ProgressBar value={raCompletados} max={raActivo.length} size="sm" color="gradient" />
            </div>

            <Card>
              <div className="divide-y divide-border">
                {raActivo.map((ra, i) => (
                  <div
                    key={ra.id}
                    onClick={() => toggleResultado(ra.id)}
                    className="flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <div className="shrink-0 mt-0.5">
                      {ra.hecho
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        : <Circle className="h-5 w-5 text-muted-foreground/40" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className={cn(
                          'shrink-0 text-xs font-bold w-5 text-right mt-0.5',
                          ra.hecho ? 'text-emerald-500' : 'text-muted-foreground',
                        )}>
                          {i + 1}.
                        </span>
                        <p className={cn(
                          'text-sm leading-relaxed',
                          ra.hecho ? 'text-muted-foreground line-through' : 'text-foreground',
                        )}>
                          {ra.texto}
                        </p>
                      </div>
                    </div>
                    {ra.hecho && (
                      <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                        ✓ Logrado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Stats rápidos */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'RA completados', valor: cursoActivo ? `${raCompletados}/${raActivo.length}` : '—', emoji: '✅', color: 'text-emerald-600' },
            { label: 'En curso', valor: currentUser.enCurso, emoji: '⚡', color: 'text-primary' },
            { label: 'Insignias', valor: currentUser.insignias, emoji: '🏅', color: 'text-amber-600' },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-3 text-center">
                <p className="text-2xl mb-0.5">{stat.emoji}</p>
                <p className={cn('text-2xl font-extrabold', stat.color)}>{stat.valor}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actividad reciente */}
        <div>
          <h2 className="font-bold text-foreground mb-3">Actividad reciente</h2>
          <Card>
            <div className="divide-y divide-border">
              {actividadReciente.map((act, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5">
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
                    {act.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{act.texto}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{act.tiempo}</p>
                  </div>
                  {act.xp > 0 && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">+{act.xp} XP</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
