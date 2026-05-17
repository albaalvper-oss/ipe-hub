import { useState } from 'react'
import { Star, Clock, Users, Play, CheckCircle2, Search } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { cursos } from '@/data/mockData'
import { cn } from '@/lib/utils'

const categorias = ['Todos', 'Programación', 'Diseño', 'Frontend', 'Bases de Datos', 'Empleabilidad', 'Herramientas']

export function Cursos() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const filtrados = cursos.filter(c => {
    const matchCat = categoriaActiva === 'Todos' || c.categoria === categoriaActiva
    const matchBusqueda = c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBusqueda
  })

  const misCursos = cursos.filter(c => c.inscrito)

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Cursos" />

      <div className="px-4 py-4 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Mis cursos en curso */}
        {!busqueda && (
          <div>
            <h2 className="font-bold text-foreground mb-3">En curso</h2>
            <div className="space-y-3">
              {misCursos.filter(c => c.progreso > 0 && c.progreso < 100).map(curso => (
                <Card key={curso.id} hover>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={cn('h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shrink-0', curso.gradiente)}>
                        {curso.imagen}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{curso.titulo}</p>
                        <p className="text-xs text-muted-foreground">{curso.progreso}% completado · {curso.modulos} módulos</p>
                        <ProgressBar value={curso.progreso} className="mt-2" size="sm" color="gradient" />
                      </div>
                      <button className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 hover:bg-primary/20 transition-colors">
                        <Play className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                categoriaActiva === cat
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div>
          {busqueda && <p className="text-sm text-muted-foreground mb-3">{filtrados.length} resultados para "{busqueda}"</p>}
          <div className="grid gap-4">
            {filtrados.map(curso => (
              <Card key={curso.id} hover>
                <CardContent className="p-0 overflow-hidden">
                  {/* Gradient header */}
                  <div className={cn('bg-gradient-to-br p-5 relative', curso.gradiente)}>
                    <span className="text-4xl">{curso.imagen}</span>
                    {curso.progreso === 100 && (
                      <div className="absolute top-3 right-3 bg-white/20 rounded-full p-1 backdrop-blur-sm">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-foreground text-sm leading-snug">{curso.titulo}</h3>
                      <Badge variant={curso.nivel === 'Básico' ? 'success' : curso.nivel === 'Intermedio' ? 'warning' : 'secondary'}>
                        {curso.nivel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{curso.descripcion}</p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{curso.valoracion}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{curso.alumnos.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{curso.duracion}</span>
                      <span className="ml-auto text-amber-600 dark:text-amber-400 font-medium">+{curso.xp} XP</span>
                    </div>

                    {curso.inscrito && curso.progreso > 0 && (
                      <div className="mb-3">
                        <ProgressBar value={curso.progreso} size="sm" color={curso.progreso === 100 ? 'success' : 'gradient'} />
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={curso.inscrito ? (curso.progreso === 100 ? 'outline' : 'primary') : 'outline'}
                      className="w-full"
                    >
                      {curso.progreso === 100 ? '✅ Completado' : curso.inscrito ? '▶ Continuar' : 'Ver curso'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
