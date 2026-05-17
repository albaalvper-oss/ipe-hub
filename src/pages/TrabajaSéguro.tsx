import { useState } from 'react'
import { Shield, CheckCircle2, Circle, ChevronDown, ChevronUp, Award, Zap, HelpCircle } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { riesgosSector, episSector, protocolosEmergencia, quizPRL } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function TrabajaSéguroDocente() {
  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Trabaja Seguro" />
      <div className="px-4 py-4 space-y-5 pb-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative">
            <p className="text-white/70 text-sm mb-1">IPE I · RA2</p>
            <h2 className="font-extrabold text-2xl leading-tight">Trabaja Seguro</h2>
            <p className="text-white/70 text-xs mt-1">Prevención de Riesgos Laborales en TAPSD</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-amber-500" />
              Contenidos del módulo
            </h3>
            <div className="space-y-2">
              {['Identificación de riesgos laborales en el sector', 'Equipos de Protección Individual (EPI)', 'Primeros auxilios y RCP', 'Protocolos de emergencia', 'Quiz PRL interactivo'].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 border-b border-border last:border-0">
                  <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-amber-500" />
              Insignia del módulo
            </h3>
            <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4">
              <span className="text-4xl">🦺</span>
              <div>
                <p className="font-bold text-foreground">Prevencionista</p>
                <p className="text-xs text-muted-foreground mt-0.5">Se entrega al completar el Quiz PRL con 80% o más</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Este módulo aborda el RA2 de la materia IPE I: adquisición de competencias de nivel básico en Prevención de Riesgos Laborales, contextualizadas al sector de Atención a Personas en Situación de Dependencia.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function TrabajaSéguro() {
  const { user } = useAuth()

  if (user?.rol === 'docente') return <TrabajaSéguroDocente />

  const [tabActiva, setTabActiva] = useState<'riesgos' | 'epis' | 'protocolos' | 'quiz'>('riesgos')
  const [protocoloAbierto, setProtocoloAbierto] = useState<string | null>(null)
  const [riesgoAbierto, setRiesgoAbierto] = useState<string | null>(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null)
  const [quizCompletado, setQuizCompletado] = useState(false)
  const [aciertos, setAciertos] = useState(0)
  const [respondidas, setRespondidas] = useState<Record<string, string>>({})

  const preguntaActual = quizPRL[quizIdx]
  const totalPreguntas = quizPRL.length

  const handleResponder = (opcionId: string) => {
    if (respondidas[preguntaActual.id]) return
    const esCorrecta = preguntaActual.opciones.find(o => o.id === opcionId)?.correcto ?? false
    setRespuestaSeleccionada(opcionId)
    setRespondidas(prev => ({ ...prev, [preguntaActual.id]: opcionId }))
    if (esCorrecta) setAciertos(prev => prev + 1)
  }

  const handleSiguiente = () => {
    if (quizIdx < totalPreguntas - 1) {
      setQuizIdx(prev => prev + 1)
      setRespuestaSeleccionada(null)
    } else {
      setQuizCompletado(true)
    }
  }

  const porcentajeAciertos = Math.round((aciertos / totalPreguntas) * 100)

  const tabs = [
    { id: 'riesgos', label: 'Riesgos', emoji: '⚠️' },
    { id: 'epis', label: 'EPI', emoji: '🦺' },
    { id: 'protocolos', label: 'Protocolos', emoji: '🚨' },
    { id: 'quiz', label: 'Quiz PRL', emoji: '🎯' },
  ] as const

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Trabaja Seguro" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">IPE I · RA2 · PRL</p>
              <h2 className="font-extrabold text-2xl leading-tight">Trabaja Seguro</h2>
              <p className="text-white/70 text-xs mt-1">Prevención de riesgos en el sector de la dependencia</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🦺</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Riesgos', valor: riesgosSector.length, emoji: '⚠️' },
              { label: 'EPI', valor: episSector.length, emoji: '🛡️' },
              { label: 'Quiz', valor: `${totalPreguntas} preg.`, emoji: '🎯' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insignia */}
        <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <span className="text-4xl">🦺</span>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">Insignia: Prevencionista</p>
            <p className="text-xs text-muted-foreground mt-0.5">Completa el Quiz PRL con 80% o más para desbloquearla</p>
            <ProgressBar value={quizCompletado ? porcentajeAciertos : 0} max={100} size="sm" color="gradient" className="mt-2" />
          </div>
          <div className={cn('h-10 w-10 rounded-full flex items-center justify-center text-xl', quizCompletado && porcentajeAciertos >= 80 ? 'bg-amber-500' : 'bg-muted')}>
            {quizCompletado && porcentajeAciertos >= 80 ? '🏅' : '🔒'}
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

        {/* Tab: Riesgos */}
        {tabActiva === 'riesgos' && (
          <div className="space-y-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              Riesgos laborales en TAPSD
            </h2>
            {riesgosSector.map(riesgo => {
              const abierto = riesgoAbierto === riesgo.id
              const nivelColor = riesgo.nivel === 'Alto' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
              return (
                <Card key={riesgo.id} className="overflow-hidden">
                  <button
                    className="w-full text-left"
                    onClick={() => setRiesgoAbierto(abierto ? null : riesgo.id)}
                  >
                    <div className={cn('bg-gradient-to-r p-4 flex items-center justify-between', riesgo.color)}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{riesgo.emoji}</span>
                        <div>
                          <p className="font-bold text-white text-sm">{riesgo.nombre}</p>
                          <span className="inline-block mt-0.5 text-[10px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">
                            Nivel {riesgo.nivel}
                          </span>
                        </div>
                      </div>
                      {abierto
                        ? <ChevronUp className="h-4 w-4 text-white/80 shrink-0" />
                        : <ChevronDown className="h-4 w-4 text-white/80 shrink-0" />
                      }
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{riesgo.descripcion}</p>
                    </CardContent>
                  </button>
                  {abierto && (
                    <div className="px-4 pb-4">
                      <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Medidas preventivas</p>
                      <div className="space-y-1.5">
                        {riesgo.medidas.map((m, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">{m}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}

        {/* Tab: EPI */}
        {tabActiva === 'epis' && (
          <div className="space-y-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              Equipos de Protección Individual
            </h2>
            <Card>
              <div className="divide-y divide-border">
                {episSector.map(epi => (
                  <div key={epi.id} className="flex items-center gap-4 p-4">
                    <span className="text-2xl shrink-0">{epi.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-semibold text-foreground text-sm">{epi.nombre}</p>
                        <span className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full',
                          epi.obligatorio
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                            : 'bg-muted text-muted-foreground',
                        )}>
                          {epi.obligatorio ? 'Obligatorio' : 'Recomendado'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{epi.uso}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">💡 Recuerda</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                El uso de EPI es tu derecho y tu obligación como trabajador/a. Tu empresa debe proporcionarlos gratuitamente y formartte en su uso correcto.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Protocolos */}
        {tabActiva === 'protocolos' && (
          <div className="space-y-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🚨</span>
              Protocolos de emergencia
            </h2>
            {protocolosEmergencia.map(proto => {
              const abierto = protocoloAbierto === proto.id
              return (
                <Card key={proto.id} className="overflow-hidden">
                  <button
                    className="w-full text-left"
                    onClick={() => setProtocoloAbierto(abierto ? null : proto.id)}
                  >
                    <div className={cn('bg-gradient-to-r p-4 flex items-center justify-between', proto.color)}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{proto.emoji}</span>
                        <p className="font-bold text-white text-sm leading-snug">{proto.titulo}</p>
                      </div>
                      {abierto
                        ? <ChevronUp className="h-4 w-4 text-white/80 shrink-0" />
                        : <ChevronDown className="h-4 w-4 text-white/80 shrink-0" />
                      }
                    </div>
                  </button>
                  {abierto && (
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {proto.pasos.map((paso, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {i + 1}
                            </div>
                            <p className="text-sm text-foreground leading-relaxed pt-0.5">{paso}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        )}

        {/* Tab: Quiz */}
        {tabActiva === 'quiz' && (
          <div className="space-y-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Quiz de Prevención de Riesgos Laborales
            </h2>

            {quizCompletado ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-5xl mb-4">{porcentajeAciertos >= 80 ? '🏆' : '📚'}</p>
                  <p className="font-extrabold text-2xl text-foreground mb-1">{aciertos}/{totalPreguntas} correctas</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {porcentajeAciertos >= 80
                      ? '¡Excelente! Has conseguido la insignia Prevencionista 🦺'
                      : 'Repasa los contenidos e inténtalo de nuevo para conseguir la insignia.'}
                  </p>
                  <ProgressBar value={porcentajeAciertos} max={100} color="gradient" size="md" className="mb-3" />
                  <p className="text-xs text-muted-foreground mb-5">{porcentajeAciertos}% de aciertos · mínimo 80% para la insignia</p>
                  {porcentajeAciertos >= 80 && (
                    <div className="flex items-center justify-center gap-3 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 mb-4">
                      <span className="text-3xl">🦺</span>
                      <div className="text-left">
                        <p className="font-bold text-foreground text-sm">Insignia desbloqueada</p>
                        <p className="text-xs text-muted-foreground">Prevencionista · +200 XP</p>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      setQuizIdx(0)
                      setRespuestaSeleccionada(null)
                      setQuizCompletado(false)
                      setAciertos(0)
                      setRespondidas({})
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Intentar de nuevo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Progreso del quiz */}
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Pregunta {quizIdx + 1} de {totalPreguntas}</span>
                  <span className="font-bold text-foreground">{aciertos} correctas</span>
                </div>
                <ProgressBar value={quizIdx} max={totalPreguntas} size="sm" color="gradient" />

                {/* Pregunta */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="font-semibold text-foreground text-sm leading-relaxed">{preguntaActual.pregunta}</p>
                    </div>
                    <div className="space-y-2">
                      {preguntaActual.opciones.map(opcion => {
                        const respondida = !!respondidas[preguntaActual.id]
                        const seleccionada = respuestaSeleccionada === opcion.id
                        const esCorrecta = opcion.correcto ?? false
                        let clases = 'w-full text-left p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 '
                        if (!respondida) {
                          clases += 'border-border hover:border-primary/50 hover:bg-primary/5'
                        } else if (esCorrecta) {
                          clases += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                        } else if (seleccionada) {
                          clases += 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
                        } else {
                          clases += 'border-border opacity-50'
                        }
                        return (
                          <button key={opcion.id} className={clases} onClick={() => handleResponder(opcion.id)} disabled={respondida}>
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                'h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0',
                                !respondida ? 'border-muted-foreground/40' : esCorrecta ? 'border-emerald-500 bg-emerald-500' : seleccionada ? 'border-red-500 bg-red-500' : 'border-border',
                              )}>
                                {respondida && esCorrecta && <CheckCircle2 className="h-4 w-4 text-white" />}
                                {respondida && seleccionada && !esCorrecta && <Circle className="h-4 w-4 text-white" />}
                              </div>
                              {opcion.texto}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {respondidas[preguntaActual.id] && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-0.5">💡 Explicación</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{preguntaActual.explicacion}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {respondidas[preguntaActual.id] && (
                  <Button onClick={handleSiguiente} className="w-full">
                    <Zap className="h-4 w-4" />
                    {quizIdx < totalPreguntas - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
                  </Button>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
