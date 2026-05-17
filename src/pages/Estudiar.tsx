import { useState, useEffect, useRef } from 'react'
import { BookOpen, Play, Pause, RotateCcw, CheckCircle2, Circle, Plus, Lightbulb, Upload, Users, Eye, Download } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { tecnicasEstudio, herramientasIA, tareasHoy, materialesParaAlumnado } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const POMODORO_MINS = 25
const BREAK_MINS = 5

function EstudiarDocente() {
  const [materiales, setMateriales] = useState(materialesParaAlumnado)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', tipo: 'PDF', descripcion: '' })

  const subirMaterial = () => {
    if (!nuevoMaterial.titulo.trim()) return
    const emojis: Record<string, string> = { PDF: '📄', Plantilla: '📋', Imagen: '🖼️', Vídeo: '🎬', Enlace: '🔗' }
    setMateriales(prev => [{
      id: String(Date.now()),
      titulo: nuevoMaterial.titulo,
      tipo: nuevoMaterial.tipo,
      emoji: emojis[nuevoMaterial.tipo] ?? '📎',
      alumnos: 28,
      vistos: 0,
      descripcion: nuevoMaterial.descripcion || 'Material complementario para el alumnado.',
    }, ...prev])
    setNuevoMaterial({ titulo: '', tipo: 'PDF', descripcion: '' })
    setMostrarForm(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Recursos de Estudio" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Materiales complementarios</p>
              <h2 className="font-extrabold text-2xl leading-tight">Recursos<br />de Estudio</h2>
              <p className="text-white/70 text-xs mt-1">Sube materiales que llegarán directamente a tu alumnado</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📚</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Materiales', valor: materiales.length, emoji: '📄' },
              { label: 'Accedidos', valor: materiales.reduce((s, m) => s + m.vistos, 0), emoji: '👁️' },
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

        {/* Info banner */}
        <div className="flex items-start gap-3 p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
          <span className="text-xl">💡</span>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
            Los materiales que subas aquí aparecerán en la sección <strong>"Aprender a Estudiar"</strong> del alumnado como recursos complementarios a las técnicas de estudio.
          </p>
        </div>

        {/* Subir material */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Upload className="h-5 w-5 text-emerald-500" />
              Subir material
            </h2>
          </div>

          {mostrarForm ? (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Título del material</label>
                  <input
                    type="text"
                    value={nuevoMaterial.titulo}
                    onChange={e => setNuevoMaterial(p => ({ ...p, titulo: e.target.value }))}
                    placeholder="Ej: Guía de técnicas de memoria..."
                    className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo de archivo</label>
                    <select
                      value={nuevoMaterial.tipo}
                      onChange={e => setNuevoMaterial(p => ({ ...p, tipo: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      {['PDF', 'Plantilla', 'Imagen', 'Vídeo', 'Enlace'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all">
                      <Upload className="h-4 w-4" /> Elegir archivo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Descripción breve</label>
                  <input
                    type="text"
                    value={nuevoMaterial.descripcion}
                    onChange={e => setNuevoMaterial(p => ({ ...p, descripcion: e.target.value }))}
                    placeholder="¿Para qué sirve este material?"
                    className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1" onClick={subirMaterial}>Subir para el alumnado</Button>
                  <Button size="sm" variant="outline" onClick={() => setMostrarForm(false)}>Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <button
              onClick={() => setMostrarForm(true)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Subir nuevo material para el alumnado</span>
            </button>
          )}
        </div>

        {/* Lista de materiales subidos */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            Materiales publicados
          </h2>
          <div className="space-y-3">
            {materiales.map(mat => {
              const pct = Math.round((mat.vistos / mat.alumnos) * 100)
              return (
                <Card key={mat.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{mat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-foreground text-sm leading-snug">{mat.titulo}</p>
                          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            {mat.tipo}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{mat.descripcion}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" /> {mat.vistos} de {mat.alumnos} alumnos/as lo han visto
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} max={100} size="sm" color="gradient" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Técnicas de referencia */}
        <div>
          <h2 className="font-bold text-foreground mb-1 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
            Técnicas que ve el alumnado
          </h2>
          <p className="text-xs text-muted-foreground mb-3">Estas son las técnicas de estudio que tus alumnos/as pueden consultar en su plataforma.</p>
          <div className="grid grid-cols-2 gap-3">
            {tecnicasEstudio.slice(0, 4).map(tec => (
              <div key={tec.id} className={cn('rounded-2xl p-3 bg-gradient-to-br text-white', tec.color)}>
                <p className="text-2xl mb-1">{tec.emoji}</p>
                <p className="font-bold text-sm leading-snug">{tec.nombre}</p>
                <p className="text-white/70 text-[10px] mt-0.5">{tec.tiempo}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export function Estudiar() {
  const { user } = useAuth()
  if (user?.rol === 'docente') return <EstudiarDocente />
  const [segundos, setSegundos] = useState(POMODORO_MINS * 60)
  const [activo, setActivo] = useState(false)
  const [esDescanso, setEsDescanso] = useState(false)
  const [pomodoros, setPomodoros] = useState(0)
  const [tareas, setTareas] = useState(tareasHoy)
  const [mostrarFormTarea, setMostrarFormTarea] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState({ texto: '', materia: '', urgente: false })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (activo) {
      intervalRef.current = setInterval(() => {
        setSegundos(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setActivo(false)
            if (!esDescanso) {
              setPomodoros(p => p + 1)
              setEsDescanso(true)
              return BREAK_MINS * 60
            } else {
              setEsDescanso(false)
              return POMODORO_MINS * 60
            }
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [activo, esDescanso])

  const reset = () => {
    setActivo(false)
    setEsDescanso(false)
    setSegundos(POMODORO_MINS * 60)
  }

  const toggleTarea = (id: string) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, hecho: !t.hecho } : t))
  }

  const añadirTarea = () => {
    if (!nuevaTarea.texto.trim()) return
    setTareas(prev => [{
      id: String(Date.now()),
      texto: nuevaTarea.texto.trim(),
      materia: nuevaTarea.materia.trim() || 'General',
      emoji: '📝',
      hecho: false,
      urgente: nuevaTarea.urgente,
    }, ...prev])
    setNuevaTarea({ texto: '', materia: '', urgente: false })
    setMostrarFormTarea(false)
  }

  const mins = Math.floor(segundos / 60).toString().padStart(2, '0')
  const secs = (segundos % 60).toString().padStart(2, '0')
  const progresoTimer = esDescanso
    ? ((BREAK_MINS * 60 - segundos) / (BREAK_MINS * 60)) * 100
    : ((POMODORO_MINS * 60 - segundos) / (POMODORO_MINS * 60)) * 100

  const completadas = tareas.filter(t => t.hecho).length

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Aprender a Estudiar" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Técnicas y herramientas</p>
              <h2 className="font-extrabold text-2xl leading-tight">Domina tu<br />aprendizaje</h2>
              <p className="text-white/70 text-xs mt-1">Estudia mejor, no más horas</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📚</div>
          </div>
        </div>

        {/* Pomodoro timer */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">🍅</span>
            Temporizador Pomodoro
          </h2>
          <Card>
            <CardContent className="p-5">
              {/* Mode toggle */}
              <div className="flex bg-muted rounded-xl p-1 gap-1 mb-5">
                <button
                  onClick={() => { setEsDescanso(false); setActivo(false); setSegundos(POMODORO_MINS * 60) }}
                  className={cn('flex-1 py-1.5 rounded-lg text-sm font-medium transition-all', !esDescanso ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
                >
                  Foco 🍅
                </button>
                <button
                  onClick={() => { setEsDescanso(true); setActivo(false); setSegundos(BREAK_MINS * 60) }}
                  className={cn('flex-1 py-1.5 rounded-lg text-sm font-medium transition-all', esDescanso ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
                >
                  Descanso ☕
                </button>
              </div>

              {/* Ring */}
              <div className="flex flex-col items-center">
                <div className="relative h-36 w-36 mb-4">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                      stroke={esDescanso ? '#10b981' : '#6366f1'}
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - progresoTimer / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold tabular-nums text-foreground">{mins}:{secs}</span>
                    <span className="text-xs text-muted-foreground">{esDescanso ? 'Descanso' : 'Trabajando'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActivo(a => !a)}
                    className={cn(
                      'h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all',
                      esDescanso ? 'bg-emerald-500 shadow-emerald-200 dark:shadow-emerald-950' : 'bg-primary shadow-primary/25',
                    )}
                  >
                    {activo ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white" />}
                  </button>
                  <div className="h-10 w-10 flex flex-col items-center justify-center">
                    <span className="font-extrabold text-lg text-foreground leading-none">{pomodoros}</span>
                    <span className="text-[9px] text-muted-foreground">🍅 hoy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mis tareas de hoy */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Mis tareas de hoy
            </h2>
            <span className="text-sm text-muted-foreground">{completadas}/{tareas.length}</span>
          </div>
          <Card>
            <div className="divide-y divide-border">
              {tareas.map(tarea => (
                <div
                  key={tarea.id}
                  className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => toggleTarea(tarea.id)}
                >
                  {tarea.hecho
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    : <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                  }
                  <span className="text-lg">{tarea.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm font-medium', tarea.hecho && 'line-through text-muted-foreground')}>{tarea.texto}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tarea.materia}</p>
                  </div>
                  {tarea.urgente && !tarea.hecho && (
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-full shrink-0">Urgente</span>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              {mostrarFormTarea ? (
                <div className="space-y-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="¿Qué tienes que hacer?"
                    value={nuevaTarea.texto}
                    onChange={e => setNuevaTarea(prev => ({ ...prev, texto: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && añadirTarea()}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <input
                    type="text"
                    placeholder="Asignatura (opcional)"
                    value={nuevaTarea.materia}
                    onChange={e => setNuevaTarea(prev => ({ ...prev, materia: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && añadirTarea()}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={nuevaTarea.urgente}
                      onChange={e => setNuevaTarea(prev => ({ ...prev, urgente: e.target.checked }))}
                      className="accent-rose-500"
                    />
                    Marcar como urgente
                  </label>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="flex-1" onClick={añadirTarea}>Añadir</Button>
                    <Button size="sm" variant="ghost" className="flex-1" onClick={() => { setMostrarFormTarea(false); setNuevaTarea({ texto: '', materia: '', urgente: false }) }}>Cancelar</Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setMostrarFormTarea(true)}
                  className="w-full flex items-center justify-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" /> Añadir tarea
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* Materiales descargables */}
        {(() => {
          type MatDescargable = typeof materialesParaAlumnado[number] & { url?: string; gradiente?: string }
          const colores: Record<string, { bg: string; badge: string; text: string }> = {
            'from-red-500 to-orange-500': { bg: 'bg-orange-50 dark:bg-orange-950/20', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400', text: 'text-orange-600 dark:text-orange-400' },
            'from-blue-500 to-cyan-500':  { bg: 'bg-blue-50 dark:bg-blue-950/20',   badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',     text: 'text-blue-600 dark:text-blue-400' },
            'from-violet-500 to-purple-600': { bg: 'bg-violet-50 dark:bg-violet-950/20', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400', text: 'text-violet-600 dark:text-violet-400' },
          }
          const descargables = (materialesParaAlumnado as MatDescargable[]).filter(m => m.url)
          if (!descargables.length) return null
          return (
            <div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Download className="h-5 w-5 text-emerald-500" />
                Materiales para descargar
              </h2>
              <div className="space-y-3">
                {descargables.map(mat => {
                  const g = mat.gradiente ?? 'from-emerald-500 to-teal-600'
                  const c = colores[g] ?? { bg: 'bg-muted', badge: 'bg-muted text-muted-foreground', text: 'text-emerald-600 dark:text-emerald-400' }
                  return (
                    <a key={mat.id} href={mat.url} download className="block">
                      <Card hover className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className={cn('bg-gradient-to-br p-4 flex items-center gap-3', g)}>
                            <span className="text-3xl shrink-0">{mat.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-white text-sm leading-snug">{mat.titulo}</p>
                              <p className="text-white/70 text-xs mt-0.5">{mat.descripcion}</p>
                            </div>
                          </div>
                          <div className={cn('px-4 py-2.5 flex items-center justify-between', c.bg)}>
                            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', c.badge)}>Plantilla · PDF</span>
                            <span className={cn('flex items-center gap-1 text-xs font-medium', c.text)}>
                              <Download className="h-3.5 w-3.5" /> Descargar
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* Técnicas de estudio */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
            Técnicas de estudio
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {tecnicasEstudio.map(tec => (
              <Card key={tec.id} hover className="overflow-hidden">
                <div className={cn('bg-gradient-to-br p-4', tec.color)}>
                  <p className="text-3xl">{tec.emoji}</p>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-bold text-foreground text-sm mb-1 leading-snug">{tec.nombre}</h3>
                  <p className="text-xs text-muted-foreground leading-snug mb-2">{tec.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full',
                      tec.dificultad === 'Fácil' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40'
                    )}>
                      {tec.dificultad}
                    </span>
                    <span className="text-[10px] text-muted-foreground">⏱ {tec.tiempo}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Herramientas IA */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            Herramientas con IA recomendadas
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {herramientasIA.map(tool => (
              <div key={tool.id} className="shrink-0 w-40">
                <Card hover className="h-full">
                  <CardContent className="p-3">
                    <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center text-white text-xl mb-3', tool.bg)}>
                      {tool.emoji}
                    </div>
                    <p className="font-bold text-foreground text-sm mb-1">{tool.nombre}</p>
                    <p className="text-xs text-muted-foreground leading-snug mb-2">{tool.descripcion}</p>
                    <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', tool.gratis ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40' : 'bg-muted text-muted-foreground')}>
                      {tool.gratis ? 'Gratis' : 'De pago'}
                    </span>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block mt-2">
                      <Button size="sm" variant="outline" className="w-full text-xs">Abrir →</Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
