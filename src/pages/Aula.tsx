import { useState } from 'react'
import { Trophy, Users, CheckCircle2, Circle, Zap, Star, Plus, BarChart2, Download } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { misionActiva, retosABR, insigniasAula, currentUser, actividadesDocente } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function AulaDocente() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [actividades, setActividades] = useState(actividadesDocente)
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
      <TopBar title="Mi Aula" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero docente */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Gestión del aula</p>
              <h2 className="font-extrabold text-2xl leading-tight">Mi Aula</h2>
              <p className="text-white/70 text-xs mt-1">Crea y gestiona actividades para tu alumnado</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🎓</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Activas', valor: actividades.filter(a => a.estado === 'activa').length, emoji: '🟢' },
              { label: 'Completadas', valor: actividades.filter(a => a.estado === 'completada').length, emoji: '✅' },
              { label: 'Alumnos/as', valor: 28, emoji: '👥' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crear nueva actividad */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-500" />
              Añadir actividad
            </h2>
          </div>

          {mostrarFormulario ? (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Título de la actividad</label>
                  <input
                    type="text"
                    value={nuevaActividad.titulo}
                    onChange={e => setNuevaActividad(p => ({ ...p, titulo: e.target.value }))}
                    placeholder="Ej: Reto: diseña una red local..."
                    className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo</label>
                    <select
                      value={nuevaActividad.tipo}
                      onChange={e => setNuevaActividad(p => ({ ...p, tipo: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      {['Misión', 'Reto ABR', 'Reflexión', 'Entrega'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Fecha límite</label>
                    <input
                      type="text"
                      value={nuevaActividad.deadline}
                      onChange={e => setNuevaActividad(p => ({ ...p, deadline: e.target.value }))}
                      placeholder="Ej: 30 mayo"
                      className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1" onClick={crearActividad}>Crear actividad</Button>
                  <Button size="sm" variant="outline" onClick={() => setMostrarFormulario(false)}>Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <button
              onClick={() => setMostrarFormulario(true)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm font-medium">Nueva actividad para el alumnado</span>
            </button>
          )}
        </div>

        {/* Lista de actividades */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            Actividades creadas
          </h2>
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
                          <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">{act.tipo}</span>
                          <span className="text-[10px] text-muted-foreground">⏳ {act.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {act.entregados}/{act.alumnos} entregas
                        </span>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{pct}%</span>
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

export function Aula() {
  const { user } = useAuth()
  if (user?.rol === 'docente') return <AulaDocente />

  const [misionPasos, setMisionPasos] = useState(misionActiva.pasos)
  const [retoUnido, setRetoUnido] = useState<string | null>(null)

  const progreso = Math.round((misionPasos.filter(p => p.hecho).length / misionPasos.length) * 100)

  const togglePaso = (i: number) => {
    setMisionPasos(prev => prev.map((p, idx) => idx === i ? { ...p, hecho: !p.hecho } : p))
  }

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
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Aprendizaje basado en retos</p>
              <h2 className="font-extrabold text-2xl leading-tight">Aprende<br />haciendo</h2>
              <p className="text-white/70 text-xs mt-1">Misiones, retos ABR y recursos para el aula</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🎓</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Misiones', valor: 3, emoji: '🎯' },
              { label: 'Insignias', valor: `${insigniasAula.filter(i => i.obtenida).length}/${insigniasAula.length}`, emoji: '🏅' },
              { label: 'Nivel', valor: currentUser.nivel, emoji: '⚡' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Misión activa */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-500 fill-blue-500" />
            Misión activa
          </h2>
          <Card className="overflow-hidden border-blue-200 dark:border-blue-800">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-2xl shrink-0">
                  {misionActiva.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-foreground">{misionActiva.titulo}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{misionActiva.descripcion}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">+{misionActiva.xp} XP</p>
                      <p className="text-[10px] text-muted-foreground">⏳ {misionActiva.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">{misionPasos.filter(p => p.hecho).length}/{misionPasos.length} pasos</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{progreso}%</span>
                </div>
                <ProgressBar value={progreso} max={100} size="sm" color="gradient" />
              </div>

              <div className="space-y-2">
                {misionPasos.map((paso, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => togglePaso(i)}
                  >
                    {paso.hecho
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      : <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                    }
                    <span className={cn('text-sm flex-1', paso.hecho && 'line-through text-muted-foreground')}>{paso.texto}</span>
                  </div>
                ))}
              </div>

              {progreso === 100 && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-center">
                  <p className="text-emerald-600 font-bold text-sm">🎉 ¡Misión completada! +{misionActiva.xp} XP ganados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Retos ABR */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Retos ABR
            </h2>
            <span className="text-xs text-muted-foreground">{retosABR.length} disponibles</span>
          </div>
          <div className="space-y-3">
            {(retosABR as (typeof retosABR[number] & { url?: string })[]).map(reto => (
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
                    {reto.url && (
                      <a href={reto.url} download className="flex items-center gap-2 w-full mb-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors">
                        <Download className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-bold">Descargar plantilla de la actividad</span>
                      </a>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {reto.participantes} participantes
                        </span>
                        <span>⏳ {reto.deadline}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">+{reto.xp} XP</span>
                      </div>
                      <Button
                        size="sm"
                        variant={retoUnido === reto.id ? 'outline' : 'primary'}
                        onClick={() => setRetoUnido(id => id === reto.id ? null : reto.id)}
                        className={retoUnido === reto.id ? 'border-emerald-500 text-emerald-600' : ''}
                      >
                        {retoUnido === reto.id ? '✅ Unido' : reto.equipo ? '👥 Unirse' : '▶ Empezar'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Insignias del aula */}
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
