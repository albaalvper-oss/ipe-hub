import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { materialesParaAlumnado, recursosDocentes, teacherProfile } from '@/data/mockData'

type Material = typeof materialesParaAlumnado[number] & { url?: string }
import { Avatar } from '@/components/ui/Avatar'
import { Download, ExternalLink } from 'lucide-react'

type RecursoAula = typeof recursosDocentes[number] & { url?: string }
import { cn } from '@/lib/utils'

const tipoColor: Record<string, string> = {
  PDF:       'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
  Plantilla: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  Imagen:    'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  Vídeo:     'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
  Enlace:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  Rúbrica:   'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
  Guía:      'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400',
  Dinámica:  'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400',
}

export function Recursos() {
  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Recursos" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Materiales del curso</p>
              <h2 className="font-extrabold text-2xl leading-tight">Recursos</h2>
              <p className="text-white/70 text-xs mt-1">Todo lo que tu docente comparte contigo</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📂</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: 'Materiales', valor: materialesParaAlumnado.length + recursosDocentes.length, emoji: '📄' },
              { label: 'De tu docente', valor: teacherProfile.name.split(' ')[0], emoji: '👩‍🏫' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cabecera docente */}
        <div className="flex items-center gap-3 p-3.5 bg-muted rounded-2xl">
          <Avatar src={teacherProfile.avatar} alt={teacherProfile.name} size="sm" />
          <div>
            <p className="text-sm font-semibold text-foreground">{teacherProfile.name}</p>
            <p className="text-xs text-muted-foreground">{teacherProfile.subject}</p>
          </div>
        </div>

        {/* Materiales complementarios (subidos por docente para alumnado) */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">📚</span>
            Materiales complementarios
          </h2>
          <div className="space-y-3">
            {(materialesParaAlumnado as Material[]).map(mat => (
              <Card key={mat.id} hover>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{mat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm leading-snug">{mat.titulo}</p>
                        <span className={cn('shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full', tipoColor[mat.tipo] ?? 'bg-muted text-muted-foreground')}>
                          {mat.tipo}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug mb-3">{mat.descripcion}</p>
                      {mat.url ? (
                        <a href={mat.url} download className="block">
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="h-3.5 w-3.5" /> Descargar
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-3.5 w-3.5" /> Descargar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recursos generales del aula */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">🗂️</span>
            Recursos del aula
          </h2>
          <Card>
            <div className="divide-y divide-border">
              {(recursosDocentes as RecursoAula[]).map(rec => (
                <div key={rec.id} className="flex items-center gap-3 p-4">
                  <span className="text-2xl shrink-0">{rec.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{rec.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{rec.descripcion}</p>
                    <span className={cn('inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full', tipoColor[rec.tipo] ?? 'bg-muted text-muted-foreground')}>
                      {rec.tipo}
                    </span>
                  </div>
                  {rec.url ? (
                    <a href={rec.url} download className="shrink-0">
                      <Button size="sm" variant="outline">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <Button size="sm" variant="outline" className="shrink-0">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
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
