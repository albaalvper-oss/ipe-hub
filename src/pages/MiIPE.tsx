import { CheckCircle2, Circle, Lock, ChevronRight, Zap } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { itinerario, currentUser } from '@/data/mockData'
import { cn } from '@/lib/utils'

const estadoConfig = {
  completado: { color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', badge: 'success' as const, icon: CheckCircle2 },
  en_curso: { color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20', badge: 'default' as const, icon: Zap },
  bloqueado: { color: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-border', badge: 'outline' as const, icon: Lock },
}

const estadoLabel = { completado: 'Completado', en_curso: 'En curso', bloqueado: 'Bloqueado' }

export function MiIPE() {
  const totalXP = itinerario.reduce((sum, f) => sum + f.xpTotal, 0)
  const ganados = itinerario.filter(f => f.estado === 'completado').reduce((s, f) => s + f.xpTotal, 0)

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Mi IPE" />

      <div className="px-4 py-4 space-y-5">
        {/* Progress overview */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-foreground">Progreso total</h2>
              <span className="text-sm font-bold text-primary">{Math.round((ganados / totalXP) * 100)}%</span>
            </div>
            <ProgressBar value={ganados} max={totalXP} color="gradient" size="md" />
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span>{ganados} XP obtenidos</span>
              <span>{totalXP} XP totales</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-foreground">{currentUser.completados}</p>
                <p className="text-xs text-muted-foreground">Completados</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-primary">{currentUser.enCurso}</p>
                <p className="text-xs text-muted-foreground">En curso</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-foreground">{currentUser.insignias}</p>
                <p className="text-xs text-muted-foreground">Insignias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-border" />

          <div className="space-y-4">
            {itinerario.map((fase) => {
              const cfg = estadoConfig[fase.estado]
              const Icon = cfg.icon
              const completadosEnFase = fase.items.filter(i => i.completado).length

              return (
                <div key={fase.id} className="relative flex gap-4">
                  {/* Step indicator */}
                  <div className={cn(
                    'relative z-10 h-14 w-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2',
                    cfg.bg, cfg.border,
                  )}>
                    <Icon className={cn('h-5 w-5', cfg.color)} strokeWidth={fase.estado === 'en_curso' ? 2.5 : 2} />
                    <span className={cn('text-[10px] font-bold mt-0.5', cfg.color)}>F{fase.fase}</span>
                  </div>

                  {/* Card */}
                  <Card className={cn('flex-1 border', cfg.border)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-foreground">{fase.titulo}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{fase.descripcion}</p>
                        </div>
                        <Badge variant={cfg.badge}>{estadoLabel[fase.estado]}</Badge>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 mt-3">
                        {fase.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            {item.completado
                              ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              : <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                            }
                            <span className={cn('text-sm flex-1', item.completado ? 'text-foreground line-through text-muted-foreground' : 'text-foreground')}>
                              {item.titulo}
                            </span>
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">+{item.xp} XP</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">{fase.fecha} · {completadosEnFase}/{fase.items.length} completados</span>
                        {fase.estado !== 'bloqueado' && (
                          <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                            Ver detalles <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
