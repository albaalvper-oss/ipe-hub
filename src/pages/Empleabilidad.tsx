import { useState } from 'react'
import { Bookmark, MapPin, Clock, Briefcase, ExternalLink, Sparkles } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ofertas, currentUser } from '@/data/mockData'
import { cn } from '@/lib/utils'

const tabs = ['Ofertas', 'Guardadas', 'Mi CV']

export function Empleabilidad() {
  const [activeTab, setActiveTab] = useState(0)
  const [savedOfertas, setSavedOfertas] = useState(ofertas)

  const toggleSave = (id: string) => {
    setSavedOfertas(prev => prev.map(o => o.id === id ? { ...o, guardada: !o.guardada } : o))
  }

  const displayOfertas = activeTab === 1 ? savedOfertas.filter(o => o.guardada) : savedOfertas

  const getMatchColor = (match: number) =>
    match >= 80 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' :
    match >= 60 ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' :
    'text-muted-foreground bg-muted'

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="Empleabilidad" showSearch />

      <div className="px-4 py-4 space-y-5">
        {/* Profile match card */}
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">Perfil de empleabilidad</p>
                <p className="text-xs text-muted-foreground mt-0.5">{currentUser.ciclo}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold text-primary">72%</p>
                <p className="text-xs text-muted-foreground">completado</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: 'CV', estado: '✅ Listo', ok: true },
                { label: 'LinkedIn', estado: '⚠️ Mejorar', ok: false },
                { label: 'Portfolio', estado: '❌ Pendiente', ok: false },
              ].map(({ label, estado, ok }) => (
                <div key={label} className={cn('rounded-xl p-2 text-center', ok ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-muted')}>
                  <p className="text-xs font-bold text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{estado}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex bg-muted rounded-2xl p-1 gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                'flex-1 py-2 rounded-xl text-sm font-medium transition-all',
                activeTab === i
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CV Tab */}
        {activeTab === 2 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="font-bold text-foreground mb-2">Constructor de CV</h3>
              <p className="text-sm text-muted-foreground mb-4">Crea tu CV profesional paso a paso con nuestra guía adaptada a FP</p>
              <Button className="w-full">Empezar mi CV</Button>
            </CardContent>
          </Card>
        ) : (
          /* Offers list */
          <div className="space-y-3">
            {displayOfertas.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-3xl mb-3">🔖</p>
                  <p className="font-medium text-foreground">No tienes ofertas guardadas</p>
                  <p className="text-sm text-muted-foreground mt-1">Guarda las ofertas que te interesen</p>
                </CardContent>
              </Card>
            ) : displayOfertas.map(oferta => (
              <Card key={oferta.id} hover>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                      {oferta.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-foreground text-sm">{oferta.puesto}</p>
                          <p className="text-xs text-muted-foreground">{oferta.empresa}</p>
                        </div>
                        <div className={cn('text-xs font-bold px-2 py-1 rounded-full shrink-0', getMatchColor(oferta.match))}>
                          {oferta.match}% match
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {oferta.ubicacion}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" /> {oferta.tipo}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {oferta.fecha}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {oferta.habilidades.map(h => (
                          <Badge key={h} variant="default" className="text-[10px]">{h}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Ver oferta <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                        <button
                          onClick={() => toggleSave(oferta.id)}
                          className={cn(
                            'h-8 w-8 rounded-xl flex items-center justify-center transition-all',
                            oferta.guardada ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:text-foreground',
                          )}
                        >
                          <Bookmark className={cn('h-4 w-4', oferta.guardada && 'fill-current')} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
