import { useNavigate } from 'react-router-dom'
import { Download, ClipboardList, CheckSquare, Eye } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { evaluacionesDocente } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const categorias = [
  {
    key: 'Rúbrica' as const,
    label: 'Rúbricas de evaluación',
    descripcion: 'Criterios y niveles de desempeño para evaluar actividades y retos.',
    icon: ClipboardList,
    gradiente: 'from-indigo-500 to-blue-600',
    colorBg: 'bg-indigo-50 dark:bg-indigo-950/20',
    colorBorde: 'border-indigo-200 dark:border-indigo-800',
    colorTexto: 'text-indigo-700 dark:text-indigo-400',
    colorBadge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400',
    emoji: '📋',
  },
  {
    key: 'Lista de cotejo' as const,
    label: 'Listas de cotejo',
    descripcion: 'Indicadores de presencia/ausencia para verificar el cumplimiento de criterios.',
    icon: CheckSquare,
    gradiente: 'from-emerald-500 to-teal-600',
    colorBg: 'bg-emerald-50 dark:bg-emerald-950/20',
    colorBorde: 'border-emerald-200 dark:border-emerald-800',
    colorTexto: 'text-emerald-700 dark:text-emerald-400',
    colorBadge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    emoji: '✅',
  },
  {
    key: 'Lista de observación' as const,
    label: 'Listas de observación',
    descripcion: 'Registros sistemáticos para observar y anotar comportamientos y actitudes.',
    icon: Eye,
    gradiente: 'from-amber-500 to-orange-600',
    colorBg: 'bg-amber-50 dark:bg-amber-950/20',
    colorBorde: 'border-amber-200 dark:border-amber-800',
    colorTexto: 'text-amber-700 dark:text-amber-400',
    colorBadge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    emoji: '👁️',
  },
]

export function Evaluaciones() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user?.rol !== 'docente') {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Evaluaciones" />

      <div className="px-4 py-4 space-y-6 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-700 to-indigo-800 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Solo visible para docentes</p>
              <h2 className="font-extrabold text-2xl leading-tight">Mis instrumentos<br />de evaluación</h2>
              <p className="text-white/70 text-xs mt-1">Rúbricas, listas de cotejo y observación</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📊</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {categorias.map(cat => {
              const n = evaluacionesDocente.filter(e => e.categoria === cat.key).length
              return (
                <div key={cat.key} className="bg-white/15 rounded-2xl p-2.5 text-center">
                  <p className="text-lg mb-0.5">{cat.emoji}</p>
                  <p className="font-extrabold text-white text-sm">{n}</p>
                  <p className="text-white/60 text-[10px]">{cat.label.split(' ')[0]}s</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Aviso de uso */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-foreground">¿Cómo añadir documentos?</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Sube el PDF a la carpeta <span className="font-mono bg-muted px-1 rounded">/public</span> del proyecto y añade la referencia en <span className="font-mono bg-muted px-1 rounded">mockData.ts</span> dentro del array <span className="font-mono bg-muted px-1 rounded">evaluacionesDocente</span>.
            </p>
          </div>
        </div>

        {/* Secciones por categoría */}
        {categorias.map(cat => {
          const docs = evaluacionesDocente.filter(e => e.categoria === cat.key)
          const Icon = cat.icon

          return (
            <div key={cat.key}>
              {/* Cabecera de categoría */}
              <div className={cn('flex items-center gap-3 p-4 rounded-2xl border mb-3', cat.colorBg, cat.colorBorde)}>
                <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br', cat.gradiente)}>
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className={cn('font-bold text-sm', cat.colorTexto)}>{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.descripcion}</p>
                </div>
                <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', cat.colorBadge)}>
                  {docs.length} {docs.length === 1 ? 'doc.' : 'docs.'}
                </span>
              </div>

              {/* Lista de documentos */}
              {docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 rounded-2xl border-2 border-dashed border-border text-center">
                  <span className="text-3xl mb-2">{cat.emoji}</span>
                  <p className="text-sm font-medium text-muted-foreground">Sin documentos todavía</p>
                  <p className="text-xs text-muted-foreground mt-1">Añade {cat.label.toLowerCase()} al array en mockData.ts</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {docs.map(doc => (
                    <Card key={doc.id} hover className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className={cn('bg-gradient-to-br p-4 flex items-center gap-3', cat.gradiente)}>
                          <span className="text-2xl shrink-0">{doc.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-sm leading-snug">{doc.titulo}</p>
                            <p className="text-white/70 text-xs mt-0.5 leading-snug">{doc.descripcion}</p>
                          </div>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between gap-3">
                          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', cat.colorBadge)}>
                            {doc.categoria}
                          </span>
                          <a
                            href={doc.url}
                            download
                            className={cn(
                              'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors',
                              cat.colorBg, cat.colorTexto, 'hover:opacity-80 border', cat.colorBorde,
                            )}
                          >
                            <Download className="h-3.5 w-3.5" />
                            Descargar
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
}
