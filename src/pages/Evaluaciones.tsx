import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ClipboardList, CheckSquare, Eye, Star } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { evaluacionesDocente } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

type IpeTab = 'IPE I' | 'IPE II'

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
    key: 'Autoevaluación' as const,
    label: 'Autoevaluación del alumnado',
    descripcion: 'Instrumentos para que el alumnado valore su propio desempeño.',
    icon: Star,
    gradiente: 'from-rose-500 to-pink-600',
    colorBg: 'bg-rose-50 dark:bg-rose-950/20',
    colorBorde: 'border-rose-200 dark:border-rose-800',
    colorTexto: 'text-rose-700 dark:text-rose-400',
    colorBadge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
    emoji: '🪞',
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
  const [ipeActivo, setIpeActivo] = useState<IpeTab>('IPE I')

  if (user?.rol !== 'docente') {
    navigate('/dashboard')
    return null
  }

  const docsActivos = evaluacionesDocente.filter(e => e.ipe === ipeActivo)
  const categoriasActivas = categorias.filter(cat =>
    docsActivos.some(e => e.categoria === cat.key)
  )

  const totalIPE1 = evaluacionesDocente.filter(e => e.ipe === 'IPE I').length
  const totalIPE2 = evaluacionesDocente.filter(e => e.ipe === 'IPE II').length

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Evaluaciones" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-700 to-indigo-800 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm mb-1">Solo visible para docentes</p>
              <h2 className="font-extrabold text-2xl leading-tight">Mis instrumentos<br />de evaluación</h2>
              <p className="text-white/70 text-xs mt-1">Rúbricas, autoevaluación y listas de cotejo</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📊</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/15 rounded-2xl p-3 text-center">
              <p className="font-extrabold text-white text-xl">{totalIPE1}</p>
              <p className="text-white/70 text-xs mt-0.5">docs. IPE I</p>
            </div>
            <div className="bg-white/15 rounded-2xl p-3 text-center">
              <p className="font-extrabold text-white text-xl">{totalIPE2}</p>
              <p className="text-white/70 text-xs mt-0.5">docs. IPE II</p>
            </div>
          </div>
        </div>

        {/* Selector IPE I / IPE II */}
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 gap-1">
          {(['IPE I', 'IPE II'] as IpeTab[]).map(ipe => (
            <button
              key={ipe}
              onClick={() => setIpeActivo(ipe)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                ipeActivo === ipe
                  ? 'bg-white dark:bg-slate-700 text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {ipe}
            </button>
          ))}
        </div>

        {/* Secciones por categoría del IPE activo */}
        {categoriasActivas.map(cat => {
          const docs = docsActivos.filter(e => e.categoria === cat.key)
          const Icon = cat.icon

          return (
            <div key={cat.key}>
              <div className={cn('flex items-center gap-3 p-4 rounded-2xl border mb-3', cat.colorBg, cat.colorBorde)}>
                <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0', cat.gradiente)}>
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('font-bold text-sm', cat.colorTexto)}>{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.descripcion}</p>
                </div>
                <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full shrink-0', cat.colorBadge)}>
                  {docs.length} {docs.length === 1 ? 'doc.' : 'docs.'}
                </span>
              </div>

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
                            'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors border',
                            cat.colorBg, cat.colorTexto, cat.colorBorde, 'hover:opacity-80',
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
            </div>
          )
        })}

      </div>
    </div>
  )
}
