import { useState } from 'react'
import { Upload, FolderOpen, Share2, Trash2, Plus } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { misRecursosAula } from '@/data/mockData'
import { cn } from '@/lib/utils'

const tiposColor: Record<string, string> = {
  'Presentación': 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  'Actividad':    'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
  'Vídeo':        'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
  'Plantilla':    'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  'Evaluación':   'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
  'Guía':         'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
}

const categoriasOrden = ['Presentación', 'Actividad', 'Plantilla', 'Evaluación', 'Guía', 'Vídeo']

export function MisRecursos() {
  const [recursos, setRecursos] = useState(misRecursosAula)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [filtro, setFiltro] = useState<string | null>(null)
  const [nuevoRecurso, setNuevoRecurso] = useState({ titulo: '', tipo: 'Presentación', formato: 'PPTX' })

  const toggleCompartido = (id: string) => {
    setRecursos(prev => prev.map(r => r.id === id ? { ...r, compartido: !r.compartido } : r))
  }

  const eliminar = (id: string) => {
    setRecursos(prev => prev.filter(r => r.id !== id))
  }

  const agregar = () => {
    if (!nuevoRecurso.titulo.trim()) return
    const emojis: Record<string, string> = {
      Presentación: '📊', Actividad: '🎯', Vídeo: '🎬',
      Plantilla: '📄', Evaluación: '📋', Guía: '📖',
    }
    setRecursos(prev => [{
      id: String(Date.now()),
      titulo: nuevoRecurso.titulo,
      tipo: nuevoRecurso.tipo,
      emoji: emojis[nuevoRecurso.tipo] ?? '📎',
      formato: nuevoRecurso.formato,
      tamaño: '—',
      fecha: 'Ahora mismo',
      compartido: false,
    }, ...prev])
    setNuevoRecurso({ titulo: '', tipo: 'Presentación', formato: 'PPTX' })
    setMostrarForm(false)
  }

  const recursosFiltrados = filtro ? recursos.filter(r => r.tipo === filtro) : recursos
  const compartidos = recursos.filter(r => r.compartido).length

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Mis Recursos" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Tu biblioteca personal</p>
              <h2 className="font-extrabold text-2xl leading-tight">Mis Recursos<br />del Aula</h2>
              <p className="text-white/70 text-xs mt-1">Presentaciones, guías y materiales para tus clases</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🗂️</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Total', valor: recursos.length, emoji: '📁' },
              { label: 'Compartidos', valor: compartidos, emoji: '🔗' },
              { label: 'Solo para mí', valor: recursos.length - compartidos, emoji: '🔒' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-lg mb-0.5">{s.emoji}</p>
                <p className="font-extrabold text-white text-sm">{s.valor}</p>
                <p className="text-white/60 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info compartidos */}
        <div className="flex items-start gap-3 p-3.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl">
          <span className="text-xl">🔗</span>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
            Los recursos marcados como <strong>"Compartido"</strong> son visibles para tu alumnado. Los demás son privados y solo los ves tú.
          </p>
        </div>

        {/* Subir recurso */}
        {mostrarForm ? (
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-foreground text-sm">Nuevo recurso</p>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Título</label>
                <input
                  type="text"
                  value={nuevoRecurso.titulo}
                  onChange={e => setNuevoRecurso(p => ({ ...p, titulo: e.target.value }))}
                  placeholder="Ej: Presentación Unidad 3..."
                  className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Categoría</label>
                  <select
                    value={nuevoRecurso.tipo}
                    onChange={e => setNuevoRecurso(p => ({ ...p, tipo: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    {categoriasOrden.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Formato</label>
                  <select
                    value={nuevoRecurso.formato}
                    onChange={e => setNuevoRecurso(p => ({ ...p, formato: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    {['PPTX', 'PDF', 'DOCX', 'MP4', 'ZIP', 'ENLACE'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <button className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all">
                <Upload className="h-4 w-4" /> Seleccionar archivo
              </button>
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="flex-1" onClick={agregar}>Guardar recurso</Button>
                <Button size="sm" variant="outline" onClick={() => setMostrarForm(false)}>Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <button
            onClick={() => setMostrarForm(true)}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-indigo-500 hover:text-indigo-600 transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm font-medium">Añadir nuevo recurso</span>
          </button>
        )}

        {/* Filtros por tipo */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setFiltro(null)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              filtro === null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            Todos ({recursos.length})
          </button>
          {categoriasOrden.filter(c => recursos.some(r => r.tipo === c)).map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(f => f === cat ? null : cat)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                filtro === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {cat} ({recursos.filter(r => r.tipo === cat).length})
            </button>
          ))}
        </div>

        {/* Lista de recursos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-indigo-500" />
              {filtro ? `${filtro}s` : 'Todos los recursos'}
            </h2>
            <span className="text-xs text-muted-foreground">{recursosFiltrados.length} archivos</span>
          </div>

          <Card>
            <div className="divide-y divide-border">
              {recursosFiltrados.map(rec => (
                <div key={rec.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{rec.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm leading-snug truncate">{rec.titulo}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleCompartido(rec.id)}
                            className={cn(
                              'flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all',
                              rec.compartido
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80',
                            )}
                          >
                            {rec.compartido ? <><Share2 className="h-2.5 w-2.5" /> Compartido</> : '🔒 Privado'}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', tiposColor[rec.tipo] ?? 'bg-muted text-muted-foreground')}>
                          {rec.tipo}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">{rec.formato}</span>
                        <span className="text-[10px] text-muted-foreground">{rec.tamaño}</span>
                        <span className="text-[10px] text-muted-foreground">{rec.fecha}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminar(rec.id)}
                      className="shrink-0 h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {recursosFiltrados.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-3xl mb-2">📂</p>
                  <p className="text-sm text-muted-foreground">No hay recursos en esta categoría</p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
