import { Settings, Share2, Flame, Star, Trophy, BookOpen, Zap, Users, Target, BookMarked } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { currentUser, insignias, actividadReciente, cursos, teacherProfile, misAlumnos } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function PerfilDocente() {
  const alumnosIPE1 = misAlumnos.filter(a => a.curso === 'IPE I')
  const alumnosIPE2 = misAlumnos.filter(a => a.curso === 'IPE II')
  const progresoMedio = Math.round(misAlumnos.reduce((s, a) => s + a.progreso, 0) / misAlumnos.length)

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Mi Perfil" />

      <div className="px-4 py-4 space-y-5">

        {/* Hero */}
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
          <CardContent className="p-4 -mt-10">
            <div className="flex items-end justify-between mb-3">
              <div className="ring-4 ring-card rounded-full">
                <Avatar src={teacherProfile.avatar} alt={teacherProfile.name} size="xl" />
              </div>
              <div className="flex gap-2 mb-2">
                <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h2 className="font-extrabold text-xl text-foreground">{teacherProfile.name}</h2>
            <p className="text-sm text-muted-foreground">{teacherProfile.username}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{teacherProfile.subject}</p>
            <p className="text-xs text-muted-foreground">{teacherProfile.centro}</p>

            {/* Stats docente */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{teacherProfile.alumnos}</p>
                <p className="text-xs text-muted-foreground">Alumnos/as</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-2xl font-extrabold text-foreground">{teacherProfile.cursosActivos}</p>
                <p className="text-xs text-muted-foreground">Cursos activos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{teacherProfile.misionesCreadas}</p>
                <p className="text-xs text-muted-foreground">Misiones creadas</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">Editar perfil</Button>
          </CardContent>
        </Card>

        {/* Progreso del grupo */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-violet-500" />
                Progreso del grupo
              </h3>
              <span className="text-xs font-bold text-muted-foreground">{progresoMedio}% medio</span>
            </div>
            <ProgressBar value={progresoMedio} max={100} color="gradient" size="md" showLabel />
          </CardContent>
        </Card>

        {/* Lista de alumnado */}
        <div>
          <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-violet-500" />
            Mi alumnado
          </h2>

          {/* IPE I */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🌱</span>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">IPE I · {alumnosIPE1.length} alumnos/as</p>
            </div>
            <Card>
              <div className="divide-y divide-border">
                {alumnosIPE1.map(alumno => (
                  <div key={alumno.id} className="flex items-center gap-3 p-3.5">
                    <Avatar src={alumno.avatar} alt={alumno.nombre} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-foreground truncate">{alumno.nombre}</p>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{alumno.progreso}%</span>
                      </div>
                      <ProgressBar value={alumno.progreso} max={100} size="sm" color="gradient" />
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{alumno.xp.toLocaleString()} XP</span>
                      <div className={cn('h-2 w-2 rounded-full', alumno.activo ? 'bg-emerald-500' : 'bg-muted-foreground/30')} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* IPE II */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🚀</span>
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">IPE II · {alumnosIPE2.length} alumnos/as</p>
            </div>
            <Card>
              <div className="divide-y divide-border">
                {alumnosIPE2.map(alumno => (
                  <div key={alumno.id} className="flex items-center gap-3 p-3.5">
                    <Avatar src={alumno.avatar} alt={alumno.nombre} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-foreground truncate">{alumno.nombre}</p>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{alumno.progreso}%</span>
                      </div>
                      <ProgressBar value={alumno.progreso} max={100} size="sm" color="gradient" />
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{alumno.xp.toLocaleString()} XP</span>
                      <div className={cn('h-2 w-2 rounded-full', alumno.activo ? 'bg-emerald-500' : 'bg-muted-foreground/30')} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Cursos gestionados */}
        <div>
          <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <BookMarked className="h-5 w-5 text-emerald-500" />
            Itinerarios gestionados
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'ipe1', titulo: 'IPE I', subtitulo: 'Explora y oriéntate', emoji: '🌱', gradiente: 'from-blue-500 to-indigo-600', alumnos: alumnosIPE1.length },
              { id: 'ipe2', titulo: 'IPE II', subtitulo: 'Especialízate y lánzate', emoji: '🚀', gradiente: 'from-violet-500 to-purple-600', alumnos: alumnosIPE2.length },
            ].map(c => (
              <div key={c.id} className={cn('rounded-2xl p-4 bg-gradient-to-br text-white', c.gradiente)}>
                <p className="text-2xl mb-1">{c.emoji}</p>
                <p className="font-bold text-sm leading-snug">{c.titulo}</p>
                <p className="text-white/70 text-[10px] mt-0.5">{c.subtitulo}</p>
                <p className="text-white/80 text-xs font-semibold mt-2">{c.alumnos} alumnos/as</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export function Perfil() {
  const { user } = useAuth()

  if (user?.rol === 'docente') return <PerfilDocente />

  const completados = cursos.filter(c => c.progreso === 100)

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Mi Perfil" />

      <div className="px-4 py-4 space-y-5">
        {/* Profile hero */}
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-primary via-secondary to-pink-500 relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>
          <CardContent className="p-4 -mt-10">
            <div className="flex items-end justify-between mb-3">
              <div className="ring-4 ring-card rounded-full">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" />
              </div>
              <div className="flex gap-2 mb-2">
                <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h2 className="font-extrabold text-xl text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.username}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{currentUser.ciclo}</p>
            <p className="text-xs text-muted-foreground">{currentUser.centro}</p>

            {/* XP Level */}
            <div className="mt-4 p-3 bg-muted rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground leading-none">Nivel actual</p>
                    <p className="font-extrabold text-lg text-foreground leading-none">{currentUser.nivel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 rounded-full px-3 py-1">
                  <Flame className="h-4 w-4 text-orange-500 fill-orange-400" />
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{currentUser.racha} días</span>
                </div>
              </div>
              <ProgressBar value={currentUser.xp} max={currentUser.xpSiguienteNivel} color="gradient" size="md" showLabel />
              <p className="text-xs text-muted-foreground mt-1">{currentUser.xp} XP — faltan {currentUser.xpSiguienteNivel - currentUser.xp} para nivel {currentUser.nivel + 1}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{completados.length}</p>
                <p className="text-xs text-muted-foreground">Cursos</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-2xl font-extrabold text-foreground">{insignias.filter(i => i.obtenida).length}</p>
                <p className="text-xs text-muted-foreground">Insignias</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{currentUser.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP total</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">Editar perfil</Button>
          </CardContent>
        </Card>

        {/* Insignias */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" /> Insignias
            </h2>
            <span className="text-sm text-muted-foreground">{insignias.filter(i => i.obtenida).length}/{insignias.length}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {insignias.map(insignia => (
              <div
                key={insignia.id}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center transition-all',
                  insignia.obtenida
                    ? 'bg-card border border-border hover:shadow-md cursor-pointer'
                    : 'bg-muted/50 opacity-50',
                )}
              >
                <span className="text-2xl">{insignia.emoji}</span>
                <p className="text-[10px] font-semibold text-foreground leading-tight">{insignia.nombre}</p>
                {insignia.fecha && <p className="text-[9px] text-muted-foreground">{insignia.fecha}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div>
          <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-primary" /> Actividad reciente
          </h2>
          <Card>
            <div className="divide-y divide-border">
              {actividadReciente.map((act, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
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

        {/* Completed courses */}
        {completados.length > 0 && (
          <div>
            <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-emerald-500" /> Cursos completados
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {completados.map(curso => (
                <div key={curso.id} className={cn('rounded-2xl p-3 bg-gradient-to-br', curso.gradiente)}>
                  <p className="text-2xl mb-1">{curso.imagen}</p>
                  <p className="text-white font-semibold text-xs leading-snug">{curso.titulo}</p>
                  <p className="text-white/70 text-[10px] mt-0.5">+{curso.xp} XP ganados</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
