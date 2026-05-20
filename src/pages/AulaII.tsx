import { useState } from 'react'
import { Trophy, Users, Zap, Download, BarChart2, Plus } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { retosABR_IPE2, insigniasAula, actividadesDocente_IPE2 } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function AulaIIDocente() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [actividades, setActividades] = useState(actividadesDocente_IPE2)
  const [nuevaActividad, setNuevaActividad] = useState({ titulo: '', tipo: 'Misión', deadline: '' })

  const crearActividad = () => {
    if (!nuevaActividad.titulo.trim()) return
    const emojis: Record<string, string> = { 'Misión': '🎯', 'Reto ABR': '⚡', 'Reflexión': '🪞', 'Entrega': '📤' }
    setActividades(prev => [{
      id: String(Date.now()),
      titulo: nuevaActividad.titulo,
      tipo: nuevaActividad.tipo,
      emoji: emojis[nuevaActividad.tipo] ?? '📌',
      estado: 'activa',
      alumnos: 28,
      entregados: 0,
      deadline: nuevaActividad.deadline || 'Sin fecha',
    }, ...prev])
    setNuevaActividad({ titulo: '', tipo: 'Misión', deadline: '' })
    setMostrarFormulario(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Mi Aula · IPE II" />

      <div className="px-4 py-4 space-y-5 pb-8">

        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Gestión del aula · IPE II</p>
              <h2 className="font-extrabold text-2xl leading-tight">Situaciones<br />profesionales</h2>
              <p className="text-white/70 text-xs mt-1">Crea y gestiona actividades para tu alumnado</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🏆</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Activas', valor: actividades.filter(a => a.estado === 'activa').length, emoji: '🟢' },
              { label: 'Completadas', valor: actividades.filter(a => a.estado === 'completada').length, emoji: '✅' },
              { label: 'Alumnado', valor: 28, emoji: '👥' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-violet-500" />
              Actividades del aula
            </h2>
            <Button size="sm" onClick={() => setMostrarFormulario(v => !v)}>
              <Plus className="h-4 w-4" /> Nueva actividad
            </Button>
          </div>

          {mostrarFormulario && (
            <Card className="mb-3">
              <CardContent className="p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Título de la actividad *"
                  value={nuevaActividad.titulo}
                  onChange={e => setNuevaActividad(p => ({ ...p, titulo: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex gap-2">
                  {['Misión', 'Reto ABR', 'Reflexión', 'Entrega'].map(t => (
                    <button
                      key={t}
                      onClick={() => setNuevaActividad(p => ({ ...p, tipo: t }))}
                      className={cn('flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all', nuevaActividad.tipo === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border')}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Fecha límite (opcional)"
                  value={nuevaActividad.deadline}
                  onChange={e => setNuevaActividad(p => ({ ...p, deadline: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button size="sm" className="w-full" onClick={crearActividad}>Crear actividad</Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {actividades.map(act => {
              const pct = Math.round((act.entregados / act.alumnos) * 100)
              return (
                <Card key={act.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{act.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-foreground text-sm leading-snug">{act.titulo}</p>
                          <span className={cn(
                            'shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full',
                            act.estado === 'activa'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : 'bg-muted text-muted-foreground',
                          )}>
                            {act.estado === 'activa' ? '🟢 Activa' : '✅ Completada'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400 px-2 py-0.5 rounded-full font-medium">{act.tipo}</span>
                          <span className="text-[10px] text-muted-foreground">⏳ {act.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {act.entregados}/{act.alumnos} entregas
                        </span>
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} max={100} size="sm" color="gradient" />
                    </div>
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

export function AulaII() {
  const { user } = useAuth()
  if (user?.rol === 'docente') return <AulaIIDocente />

  const [retoUnido, setRetoUnido] = useState<string | null>(null)

  const dificuladVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
    'Básico': 'success',
    'Intermedio': 'warning',
    'Avanzado': 'destructive',
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Para el Aula" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">IPE II · Situaciones profesionales</p>
              <h2 className="font-extrabold text-2xl leading-tight">Aprende<br />del entorno real</h2>
              <p className="text-white/70 text-xs mt-1">Retos basados en situaciones del sector TAPSD</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🏆</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Retos', valor: retosABR_IPE2.length, emoji: '⚡' },
              { label: 'Insignias', valor: `${insigniasAula.filter(i => i.obtenida).length}/${insigniasAula.length}`, emoji: '🏅' },
              { label: 'En equipo', valor: retosABR_IPE2.filter(r => r.equipo).length, emoji: '🤝' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retos ABR */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-violet-500" />
              Retos ABR
            </h2>
            <span className="text-xs text-muted-foreground">{retosABR_IPE2.length} disponibles</span>
          </div>
          <div className="space-y-3">
            {retosABR_IPE2.map(reto => (
              <Card key={reto.id} hover>
                <CardContent className="p-0 overflow-hidden">
                  <div className={cn('bg-gradient-to-br p-4 flex items-start gap-3', reto.gradiente)}>
                    <span className="text-3xl">{reto.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-sm leading-snug">{reto.titulo}</h3>
                        <Badge variant={dificuladVariant[reto.dificultad] ?? 'secondary'} className="shrink-0 text-[10px]">
                          {reto.dificultad}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-xs mt-1 leading-snug">{reto.descripcion}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {reto.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">{tag}</span>
                      ))}
                    </div>
                    <a href={reto.url} download className="flex items-center gap-2 w-full mb-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-950/40 transition-colors">
                      <Download className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-bold">Descargar situación práctica</span>
                    </a>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {reto.participantes} participantes
                        </span>
                        <span>⏳ {reto.deadline}</span>
                        <span className="text-violet-600 dark:text-violet-400 font-bold">+{reto.xp} XP</span>
                      </div>
                      <Button
                        size="sm"
                        variant={retoUnido === reto.id ? 'outline' : 'primary'}
                        onClick={() => setRetoUnido(id => id === reto.id ? null : reto.id)}
                        className={retoUnido === reto.id ? 'border-emerald-500 text-emerald-600' : ''}
                      >
                        {retoUnido === reto.id ? '✅ Unido' : '👥 Unirse'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Insignias */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Mis insignias
            </h2>
            <span className="text-sm text-muted-foreground">
              {insigniasAula.filter(i => i.obtenida).length}/{insigniasAula.length}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {insigniasAula.map(ins => (
              <div
                key={ins.id}
                className={cn(
                  'flex flex-col items-center gap-1 p-2.5 rounded-2xl text-center',
                  ins.obtenida ? 'bg-card border border-border' : 'bg-muted/50 opacity-40',
                )}
              >
                <span className="text-2xl">{ins.emoji}</span>
                <p className="text-[9px] font-medium text-foreground leading-tight">{ins.nombre}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
