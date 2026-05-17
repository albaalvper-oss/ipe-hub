import { useState } from 'react'
import { Brain, Target, CheckCircle2, Circle, ChevronRight, ChevronLeft, Sparkles, RotateCcw, TrendingUp, Users, Heart, ThumbsUp, Send } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { testIntereses, misHabilidades, misObjetivos, tarjetasReflexion, puestosEmpleo, comparativaPublicoPrivado, aptitudesMercado, debateConocete } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function Conocete() {
  const [tabActiva, setTabActiva] = useState<'yo' | 'sector' | 'mercado' | 'debate'>('yo')

  // --- Tab Yo ---
  const [respuestas, setRespuestas] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    testIntereses.preguntas.filter(p => p.respondida).forEach(p => { init[p.id] = (p as any).respuesta })
    return init
  })
  const [preguntaActual, setPreguntaActual] = useState(() => {
    const idx = testIntereses.preguntas.findIndex(p => !p.respondida)
    return idx === -1 ? 0 : idx
  })
  const [objetivos, setObjetivos] = useState(misObjetivos)
  const [reflexionIdx, setReflexionIdx] = useState(0)

  // --- Tab Sector ---
  const [puestoAbierto, setPuestoAbierto] = useState<string | null>(null)

  // --- Tab Debate ---
  const [posts, setPosts] = useState(debateConocete)
  const [nuevoPost, setNuevoPost] = useState('')

  const totalPreguntas = testIntereses.preguntas.length
  const respondidas = Object.keys(respuestas).length
  const progresoTest = Math.round((respondidas / totalPreguntas) * 100)
  const testCompletado = respondidas === totalPreguntas
  const pregunta = testIntereses.preguntas[preguntaActual]
  const reflexion = tarjetasReflexion[reflexionIdx]

  const responder = (opcionId: string) => {
    setRespuestas(prev => ({ ...prev, [pregunta.id]: opcionId }))
    if (preguntaActual < totalPreguntas - 1) {
      setTimeout(() => setPreguntaActual(i => i + 1), 300)
    }
  }

  const toggleObjetivo = (id: string) => {
    setObjetivos(prev => prev.map(o => o.id === id ? { ...o, completado: !o.completado } : o))
  }

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p,
    ))
  }

  const handleEnviar = () => {
    if (!nuevoPost.trim()) return
    setPosts(prev => [{
      id: String(Date.now()),
      autor: 'Alex García',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent',
      texto: nuevoPost.trim(),
      likes: 0,
      tiempo: 'Ahora mismo',
      liked: false,
    }, ...prev])
    setNuevoPost('')
  }

  const tabs = [
    { id: 'yo', label: 'Conócete', emoji: '🧠' },
    { id: 'sector', label: 'El Sector', emoji: '🏥' },
    { id: 'mercado', label: 'Te pide', emoji: '⭐' },
    { id: 'debate', label: 'Debate', emoji: '💬' },
  ] as const

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Conócete en el Mercado Actual" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">IPE I · RA1 · Sector TAPSD</p>
              <h2 className="font-extrabold text-2xl leading-tight">Conócete en el<br />Mercado Actual</h2>
              <p className="text-white/70 text-xs mt-1">¿Quién eres y qué pide el sector de la dependencia?</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🧠</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Test', valor: `${progresoTest}%`, emoji: '✅' },
              { label: 'Puestos', valor: puestosEmpleo.length, emoji: '💼' },
              { label: 'Debate', valor: `${posts.length} voces`, emoji: '💬' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-2xl p-1 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={cn(
                'flex-1 flex flex-col items-center py-2 rounded-xl text-xs font-medium transition-all duration-200',
                tabActiva === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className="text-base">{tab.emoji}</span>
              <span className="mt-0.5 hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ──────────── TAB: CONÓCETE ──────────── */}
        {tabActiva === 'yo' && (
          <>
            {/* Test de intereses */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-500" />
                  Test de intereses
                </h2>
                <span className="text-sm text-muted-foreground">{respondidas}/{totalPreguntas}</span>
              </div>

              {testCompletado ? (
                <Card>
                  <CardContent className="p-5 text-center">
                    <p className="text-4xl mb-3">🎉</p>
                    <h3 className="font-bold text-foreground text-lg mb-1">¡Test completado!</h3>
                    <p className="text-sm text-muted-foreground mb-4">Tu perfil apunta a un rol de cuidado y comunicación. ¡Muy demandado en el sector TAPSD!</p>
                    <div className="flex gap-2 flex-wrap justify-center mb-4">
                      {['Empático/a', 'Trabajo en equipo', 'Vocación de servicio', 'Sector social'].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => { setRespuestas({}); setPreguntaActual(0) }}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mx-auto transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Volver a hacer el test
                    </button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="overflow-hidden">
                  <div className="h-1 bg-muted">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${(preguntaActual / totalPreguntas) * 100}%` }} />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-muted-foreground font-medium">Pregunta {preguntaActual + 1} de {totalPreguntas}</span>
                      <div className="flex gap-1">
                        {testIntereses.preguntas.map((p, i) => (
                          <div key={p.id} className={cn('h-1.5 w-5 rounded-full transition-colors', respuestas[p.id] ? 'bg-violet-500' : i === preguntaActual ? 'bg-violet-200' : 'bg-muted')} />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-4">{pregunta.pregunta}</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {pregunta.opciones.map(op => (
                        <button
                          key={op.id}
                          onClick={() => responder(op.id)}
                          className={cn(
                            'flex flex-col items-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 text-center',
                            respuestas[pregunta.id] === op.id
                              ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300'
                              : 'border-border hover:border-violet-200 hover:bg-violet-50/50 dark:hover:bg-violet-950/10 text-foreground',
                          )}
                        >
                          <span className="text-2xl">{op.emoji}</span>
                          <span className="text-xs leading-snug">{op.texto}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => setPreguntaActual(i => Math.max(0, i - 1))}
                        disabled={preguntaActual === 0}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                      </button>
                      {respuestas[pregunta.id] && preguntaActual < totalPreguntas - 1 && (
                        <button
                          onClick={() => setPreguntaActual(i => i + 1)}
                          className="flex items-center gap-1 text-sm text-violet-600 font-medium hover:underline"
                        >
                          Siguiente <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Reflexión */}
            <div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-500" />
                Reflexión del día
              </h2>
              <div className={cn('bg-gradient-to-br rounded-3xl p-5 text-white relative overflow-hidden cursor-pointer', reflexion.color)}
                onClick={() => setReflexionIdx(i => (i + 1) % tarjetasReflexion.length)}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 90% 10%, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                <p className="text-4xl mb-3 relative">{reflexion.emoji}</p>
                <p className="text-white font-bold text-base leading-snug relative">{reflexion.pregunta}</p>
                <p className="text-white/60 text-xs mt-3 relative">Toca para cambiar · {reflexionIdx + 1}/{tarjetasReflexion.length}</p>
              </div>
            </div>

            {/* Mis habilidades */}
            <div>
              <h2 className="font-bold text-foreground mb-3">Mis fortalezas</h2>
              <Card>
                <CardContent className="p-4 space-y-4">
                  {misHabilidades.map(hab => (
                    <div key={hab.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{hab.emoji}</span>
                          <span className="text-sm font-medium text-foreground">{hab.nombre}</span>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{hab.nivel}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', hab.color)}
                          style={{ width: `${hab.nivel}%` }} />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">Editar mis habilidades</Button>
                </CardContent>
              </Card>
            </div>

            {/* Actividad: Descubriendo mi perfil profesional */}
            <a href="/ANÁLISIS DAFO.pdf" download className="block">
              <Card hover className="overflow-hidden">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 flex items-center gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 2px, transparent 2px)', backgroundSize: '18px 18px' }} />
                  <span className="text-3xl relative">📊</span>
                  <div className="relative">
                    <p className="font-extrabold text-white text-sm leading-none">Descubriendo mi perfil profesional</p>
                    <p className="text-white/70 text-xs mt-1">Análisis DAFO personal · Plantilla descargable</p>
                  </div>
                </div>
                <CardContent className="px-4 py-3 bg-rose-50 dark:bg-rose-950/20">
                  <p className="text-xs text-muted-foreground leading-snug mb-2">
                    Identifica tus <strong>Debilidades, Amenazas, Fortalezas y Oportunidades</strong> como futuro/a profesional TAPSD. Rellena la plantilla y reflexiona sobre tu zona de desarrollo próximo.
                  </p>
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <span>⬇️</span> Descargar plantilla DAFO
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Mis objetivos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-violet-500" />
                  Mis objetivos
                </h2>
                <span className="text-xs text-muted-foreground">
                  {objetivos.filter(o => o.completado).length}/{objetivos.length}
                </span>
              </div>
              <Card>
                <div className="divide-y divide-border">
                  {objetivos.map(obj => (
                    <div
                      key={obj.id}
                      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => toggleObjetivo(obj.id)}
                    >
                      {obj.completado
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        : <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                      }
                      <span className="text-xl">{obj.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-medium', obj.completado && 'line-through text-muted-foreground')}>{obj.texto}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">📅 {obj.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-violet-600 hover:text-violet-700 hover:bg-violet-50">
                    + Añadir objetivo
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* ──────────── TAB: EL SECTOR ──────────── */}
        {tabActiva === 'sector' && (
          <>
            {/* Intro RA */}
            <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-1">📌 RA1 — CE a</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Analiza las principales oportunidades de empleo del sector e identifica los puestos de trabajo relacionados con el título TAPSD y sus requerimientos actuales.
              </p>
            </div>

            {/* Puestos de trabajo */}
            <div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-lg">💼</span>
                Puestos de trabajo en TAPSD
              </h2>
              <div className="space-y-3">
                {puestosEmpleo.map(puesto => {
                  const abierto = puestoAbierto === puesto.id
                  return (
                    <Card key={puesto.id} className="overflow-hidden">
                      <button className="w-full text-left" onClick={() => setPuestoAbierto(abierto ? null : puesto.id)}>
                        <div className={cn('bg-gradient-to-r p-4 flex items-center gap-3', puesto.color)}>
                          <span className="text-2xl">{puesto.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-sm leading-snug">{puesto.puesto}</p>
                            <p className="text-white/70 text-xs">{puesto.entorno}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-white font-extrabold text-lg leading-none">{puesto.demanda}%</p>
                            <p className="text-white/60 text-[10px]">demanda</p>
                          </div>
                        </div>
                        <CardContent className="p-3.5">
                          <p className="text-xs text-muted-foreground leading-snug">{puesto.descripcion}</p>
                        </CardContent>
                      </button>
                      {abierto && (
                        <div className="px-4 pb-4 space-y-3">
                          <div>
                            <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Competencias requeridas</p>
                            <div className="flex flex-wrap gap-1.5">
                              {puesto.competencias.map(c => (
                                <span key={c} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{c}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-muted rounded-xl p-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Salario estimado</p>
                              <p className="text-sm font-bold text-foreground">{puesto.salario}</p>
                            </div>
                            <span className={cn(
                              'text-[10px] font-bold px-2 py-0.5 rounded-full',
                              puesto.requisitosTitulo
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : 'bg-muted text-muted-foreground',
                            )}>
                              {puesto.requisitosTitulo ? '✓ Requiere título' : 'Sin título específico'}
                            </span>
                          </div>
                          <ProgressBar value={puesto.demanda} max={100} size="sm" color="gradient" />
                          <p className="text-xs text-muted-foreground">Demanda laboral: {puesto.demanda}% — sector en crecimiento</p>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Comparativa público/privado */}
            <div>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-3">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">📌 RA1 — CE b</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Compara los requerimientos del mercado laboral privado con los de la función pública relacionados con el sector TAPSD.
                </p>
              </div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Sector privado vs. Función pública
              </h2>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-bold text-muted-foreground w-1/3">Aspecto</th>
                        <th className="text-left p-3 font-bold text-blue-600 dark:text-blue-400">🏢 Privado</th>
                        <th className="text-left p-3 font-bold text-emerald-600 dark:text-emerald-400">🏛️ Público</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativaPublicoPrivado.map((row, i) => (
                        <tr key={i} className={cn('border-b border-border last:border-0', i % 2 === 0 ? '' : 'bg-muted/30')}>
                          <td className="p-3 font-semibold text-foreground">{row.aspecto}</td>
                          <td className="p-3 text-muted-foreground leading-snug">{row.privado}</td>
                          <td className="p-3 text-muted-foreground leading-snug">{row.publico}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* ──────────── TAB: TE PIDE ──────────── */}
        {tabActiva === 'mercado' && (
          <>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">📌 RA1 — CE c</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reflexiona sobre las actitudes y aptitudes requeridas actualmente para el perfil TAPSD e identifica tu zona de desarrollo próximo.
              </p>
            </div>

            <h2 className="font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              ¿Qué pide el mercado de ti?
            </h2>

            {aptitudesMercado.map(bloque => (
              <Card key={bloque.id} className="overflow-hidden">
                <div className={cn('bg-gradient-to-r p-4 flex items-center gap-3', bloque.color)}>
                  <span className="text-2xl">{bloque.emoji}</span>
                  <p className="font-bold text-white text-sm">{bloque.categoria}</p>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {bloque.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Zona de desarrollo próximo */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shrink-0">🎯</div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Tu zona de desarrollo próximo</p>
                    <p className="text-xs text-muted-foreground">¿Qué tienes que trabajar para llegar al perfil ideal?</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {misHabilidades.map(hab => {
                    const gap = 100 - hab.nivel
                    return (
                      <div key={hab.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{hab.emoji}</span>
                            <span className="text-xs font-medium text-foreground">{hab.nombre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground font-bold">{hab.nivel}%</span>
                            {gap > 20 && (
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                                +{gap}% por desarrollar
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', hab.color)}
                            style={{ width: `${hab.nivel}%` }} />
                          <div className="absolute inset-0 border-r-2 border-dashed border-primary/40" style={{ left: '80%', borderRight: '2px dashed' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  La línea indica el nivel mínimo recomendado para el mercado TAPSD (80%). Trabaja las competencias por debajo de ese umbral.
                </p>
              </CardContent>
            </Card>

            {/* Reflexión CE c */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
              <div className="relative">
                <p className="text-3xl mb-3">💭</p>
                <p className="font-bold text-base leading-snug mb-2">Pregunta de reflexión</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  "¿Qué competencia del perfil TAPSD sientes que ya tienes desarrollada? ¿Y cuál necesitas trabajar más? ¿Qué acciones concretas puedes tomar este trimestre?"
                </p>
                <p className="text-white/50 text-xs mt-3">Anota tu reflexión en tu diario de aprendizaje</p>
              </div>
            </div>
          </>
        )}

        {/* ──────────── TAB: DEBATE ──────────── */}
        {tabActiva === 'debate' && (
          <>
            <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-1">💬 Debate del aula</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comparte tu opinión sobre el sector, los puestos de trabajo o las competencias que el mercado TAPSD demanda. Aprende de las reflexiones de tus compañeros/as.
              </p>
            </div>

            {/* Preguntas guía */}
            <div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-violet-500" />
                Preguntas para reflexionar
              </h2>
              <div className="space-y-2">
                {[
                  '¿Privado o público? ¿Qué pesa más para ti al elegir dónde trabajar?',
                  '¿Qué competencia del perfil TAPSD crees que te cuesta más desarrollar?',
                  '¿Cómo te ves trabajando en el sector dentro de 5 años?',
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-muted rounded-2xl cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => setNuevoPost(q)}>
                    <span className="text-violet-500 font-extrabold text-sm shrink-0">Q{i + 1}</span>
                    <p className="text-sm text-foreground leading-snug">{q}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Nueva aportación */}
            <div className="space-y-2">
              <textarea
                value={nuevoPost}
                onChange={e => setNuevoPost(e.target.value)}
                placeholder="Escribe tu reflexión, pregunta u opinión sobre el sector..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
              />
              <Button onClick={handleEnviar} disabled={!nuevoPost.trim()} className="w-full">
                <Send className="h-4 w-4" />
                Compartir con el aula
              </Button>
            </div>

            {/* Posts del debate */}
            <div className="space-y-3">
              {posts.map(post => (
                <Card key={post.id} hover>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2.5">
                      <Avatar src={post.avatar} alt={post.autor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{post.autor}</p>
                        <p className="text-xs text-muted-foreground">{post.tiempo}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-3">{post.texto}</p>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={cn(
                        'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all',
                        post.liked
                          ? 'bg-violet-500 text-white'
                          : 'bg-muted text-muted-foreground hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600',
                      )}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {post.likes} {post.likes === 1 ? 'me parece bien' : 'me parece bien'}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
