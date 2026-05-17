import { useState } from 'react'
import { Lightbulb, CheckCircle2, ThumbsUp, ChevronRight, Award, Zap, Target, Users } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { fasesEmprende, ideasEmprendedoras, odsRelacionados } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function EmprendeDocente() {
  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Emprende" />
      <div className="px-4 py-4 space-y-5 pb-8">
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative">
            <p className="text-white/70 text-sm mb-1">IPE II · RA3/RA4/RA5</p>
            <h2 className="font-extrabold text-2xl leading-tight">Emprende</h2>
            <p className="text-white/70 text-xs mt-1">Emprendimiento e innovación social en TAPSD</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="h-4.5 w-4.5 text-violet-500" />
              Fases del itinerario emprendedor
            </h3>
            <div className="space-y-2">
              {fasesEmprende.map((fase, i) => (
                <div key={fase.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{fase.titulo}</p>
                    <p className="text-xs text-muted-foreground">{fase.subtitulo}</p>
                  </div>
                  <span className="text-sm">{fase.emoji}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-violet-500" />
              Insignia del módulo
            </h3>
            <div className="flex items-center gap-4 bg-violet-50 dark:bg-violet-950/20 rounded-2xl p-4">
              <span className="text-4xl">🚀</span>
              <div>
                <p className="font-bold text-foreground">Emprendedor/a</p>
                <p className="text-xs text-muted-foreground mt-0.5">Se entrega al completar todas las fases del itinerario</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-violet-500" />
              Ideas del alumnado
            </h3>
            <div className="space-y-3">
              {ideasEmprendedoras.map(idea => (
                <div key={idea.id} className="p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar src={idea.avatar} alt={idea.autor} size="sm" />
                    <p className="text-xs font-semibold text-foreground">{idea.autor}</p>
                    <span className="ml-auto text-xs text-muted-foreground">{idea.votos} votos</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{idea.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{idea.descripcion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function Emprende() {
  const { user } = useAuth()

  if (user?.rol === 'docente') return <EmprendeDocente />

  const [tabActiva, setTabActiva] = useState<'fases' | 'ideas' | 'ods'>('fases')
  const [ideas, setIdeas] = useState(ideasEmprendedoras)

  const fasesCompletadas = fasesEmprende.filter(f => f.completada).length
  const xpTotal = fasesEmprende.filter(f => f.completada).reduce((s, f) => s + f.xp, 0)

  const handleVotar = (id: string) => {
    setIdeas(prev => prev.map(idea =>
      idea.id === id
        ? { ...idea, votos: idea.votado ? idea.votos - 1 : idea.votos + 1, votado: !idea.votado }
        : idea,
    ))
  }

  const tabs = [
    { id: 'fases', label: 'Itinerario', emoji: '🗺️' },
    { id: 'ideas', label: 'Ideas', emoji: '💡' },
    { id: 'ods', label: 'ODS', emoji: '🌍' },
  ] as const

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Emprende" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">IPE II · RA3 / RA4 / RA5</p>
              <h2 className="font-extrabold text-2xl leading-tight">Emprende</h2>
              <p className="text-white/70 text-xs mt-1">Innova y crea impacto en el sector de la dependencia</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🚀</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Fases', valor: `${fasesCompletadas}/${fasesEmprende.length}`, emoji: '📍' },
              { label: 'XP ganados', valor: xpTotal, emoji: '⚡' },
              { label: 'Ideas', valor: ideas.length, emoji: '💡' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso global */}
        <div className="flex items-center gap-4 bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
          <span className="text-3xl">🚀</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-foreground text-sm">Tu itinerario emprendedor</p>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{fasesCompletadas}/{fasesEmprende.length} fases</span>
            </div>
            <ProgressBar value={fasesCompletadas} max={fasesEmprende.length} color="gradient" size="sm" />
            <p className="text-xs text-muted-foreground mt-1">
              {fasesCompletadas === fasesEmprende.length ? '¡Has completado el itinerario! Insignia desbloqueada 🏅' : `${fasesEmprende.length - fasesCompletadas} fases restantes para conseguir la insignia Emprendedor/a`}
            </p>
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

        {/* Tab: Fases */}
        {tabActiva === 'fases' && (
          <div className="space-y-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🗺️</span>
              Itinerario emprendedor
            </h2>
            {fasesEmprende.map((fase, i) => {
              const bloqueada = !fase.completada && !fase.activa && i > 0 && !fasesEmprende[i - 1]?.completada
              return (
                <Card
                  key={fase.id}
                  className={cn('overflow-hidden transition-all', bloqueada && 'opacity-60')}
                >
                  <div className={cn('bg-gradient-to-r p-4 flex items-center gap-3', fase.gradiente, bloqueada && 'grayscale')}>
                    <span className="text-2xl">{fase.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-sm">{fase.titulo}</p>
                        {fase.completada && <CheckCircle2 className="h-4 w-4 text-white shrink-0" />}
                        {fase.activa && (
                          <span className="text-[10px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">ACTIVA</span>
                        )}
                      </div>
                      <p className="text-white/70 text-xs">{fase.subtitulo}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-bold text-sm">+{fase.xp}</p>
                      <p className="text-white/60 text-[10px]">XP</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground leading-snug mb-3">{fase.descripcion}</p>
                    {fase.completada ? (
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-bold">Fase completada</span>
                      </div>
                    ) : fase.activa ? (
                      <button className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                        <Target className="h-3.5 w-3.5" />
                        Continuar esta fase
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">🔒 Completa la fase anterior para desbloquear</span>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Tab: Ideas */}
        {tabActiva === 'ideas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <span className="text-lg">💡</span>
                Ideas del aula
              </h2>
              <span className="text-xs text-muted-foreground">{ideas.length} ideas compartidas</span>
            </div>
            <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-1">💡 Fase: Genera ideas</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vota las ideas que crees más innovadoras y con mayor impacto social en el sector de la dependencia. La idea más votada se desarrollará como proyecto del aula.
              </p>
            </div>
            <div className="space-y-3">
              {ideas.sort((a, b) => b.votos - a.votos).map((idea, rank) => (
                <Card key={idea.id} hover>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0',
                        rank === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-muted text-muted-foreground',
                      )}>
                        {rank + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-bold text-foreground text-sm leading-snug">{idea.titulo}</p>
                          {rank === 0 && <span className="shrink-0 text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-full">🏆 Top idea</span>}
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug mb-3">{idea.descripcion}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Avatar src={idea.avatar} alt={idea.autor} size="sm" />
                            <span className="text-xs text-muted-foreground">{idea.autor}</span>
                          </div>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{idea.categoria}</span>
                          <button
                            onClick={() => handleVotar(idea.id)}
                            className={cn(
                              'ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                              idea.votado
                                ? 'bg-violet-500 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600',
                            )}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {idea.votos}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab: ODS */}
        {tabActiva === 'ods' && (
          <div className="space-y-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <span className="text-lg">🌍</span>
              Objetivos de Desarrollo Sostenible
            </h2>
            <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-1">¿Por qué los ODS?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tu proyecto emprendedor debe estar alineado con al menos un ODS de la Agenda 2030. El sector de la dependencia conecta directamente con la salud, la igualdad y el trabajo decente.
              </p>
            </div>
            <div className="space-y-3">
              {odsRelacionados.map(ods => (
                <Card key={ods.numero} hover>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex flex-col items-center justify-center shrink-0">
                        <p className="text-white font-extrabold text-lg leading-none">{ods.numero}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xl">{ods.emoji}</span>
                          <p className="font-bold text-foreground text-sm">{ods.titulo}</p>
                        </div>
                        <span className={cn('inline-block text-[10px] font-bold px-2 py-0.5 rounded-full', ods.color)}>
                          ODS {ods.numero}
                        </span>
                      </div>
                      <Zap className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-violet-500" />
                  Insignia: Emprendedor/a
                </h3>
                <div className="flex items-center gap-4 bg-violet-50 dark:bg-violet-950/20 rounded-2xl p-4">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <p className="font-bold text-foreground text-sm">Emprendedor/a</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Completa todas las fases del itinerario para desbloquearla</p>
                    <ProgressBar value={fasesCompletadas} max={fasesEmprende.length} size="sm" color="gradient" className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}
