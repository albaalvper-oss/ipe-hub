import { useState } from 'react'
import { Heart, ArrowUp, MapPin, Briefcase, Clock, Bookmark, ExternalLink, Sparkles, Send, Plus, X } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { tendenciasMercado, enlacesTendencias, debateMercado, ofertas, currentUser, teacherProfile } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const tabs = ['Ofertas', 'Tendencias', 'Debate']

export function Mercado() {
  const { user } = useAuth()
  const esDocente = user?.rol === 'docente'

  const [activeTab, setActiveTab] = useState(0)
  const [debate, setDebate] = useState(debateMercado)
  const [nuevaReflexion, setNuevaReflexion] = useState('')
  const [savedOfertas, setSavedOfertas] = useState(ofertas)
  const [enlacesExtra, setEnlacesExtra] = useState(enlacesTendencias)

  // Formulario de nueva oferta (docente)
  const [formOferta, setFormOferta] = useState(false)
  const [nuevaOferta, setNuevaOferta] = useState({ titulo: '', empresa: '', url: '', descripcion: '' })

  // Formulario de nuevo enlace de tendencias (docente)
  const [formTendencia, setFormTendencia] = useState(false)
  const [nuevaTendencia, setNuevaTendencia] = useState({ titulo: '', url: '', tipo: 'Artículo', descripcion: '' })

  const agregarOferta = () => {
    if (!nuevaOferta.titulo.trim() || !nuevaOferta.url.trim()) return
    setSavedOfertas(prev => [{
      id: String(Date.now()),
      empresa: nuevaOferta.empresa || 'Sin empresa',
      logo: '📌',
      puesto: nuevaOferta.titulo,
      tipo: 'Enlace docente',
      modalidad: '—',
      ubicacion: nuevaOferta.descripcion || '—',
      match: 0,
      habilidades: [],
      fecha: 'Ahora mismo',
      guardada: false,
      url: nuevaOferta.url,
    } as any, ...prev])
    setNuevaOferta({ titulo: '', empresa: '', url: '', descripcion: '' })
    setFormOferta(false)
  }

  const agregarTendencia = () => {
    if (!nuevaTendencia.titulo.trim() || !nuevaTendencia.url.trim()) return
    const gradientes = ['from-amber-500 to-orange-600', 'from-violet-500 to-purple-600', 'from-emerald-500 to-teal-600', 'from-blue-500 to-indigo-600']
    setEnlacesExtra(prev => [{
      id: String(Date.now()),
      titulo: nuevaTendencia.titulo,
      descripcion: nuevaTendencia.descripcion || 'Recurso compartido por tu docente.',
      emoji: nuevaTendencia.tipo === 'Vídeo' ? '▶️' : '📄',
      tipo: nuevaTendencia.tipo as 'Vídeo' | 'Artículo',
      url: nuevaTendencia.url,
      gradiente: gradientes[Math.floor(Math.random() * gradientes.length)],
    }, ...prev])
    setNuevaTendencia({ titulo: '', url: '', tipo: 'Artículo', descripcion: '' })
    setFormTendencia(false)
  }

  const toggleSave = (id: string) => {
    setSavedOfertas(prev => prev.map(o => o.id === id ? { ...o, guardada: !o.guardada } : o))
  }

  const getMatchColor = (match: number) =>
    match >= 80 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' :
    match >= 60 ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' :
    'text-muted-foreground bg-muted'

  return (
    <div className="max-w-2xl mx-auto">
      <TopBar title="El Mercado Habla" showSearch />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Hero banner */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Conexión con el entorno laboral</p>
              <h2 className="font-extrabold text-2xl leading-tight">El mundo<br />te espera</h2>
              <p className="text-white/70 text-xs mt-1">Ofertas, tendencias y profesionales reales</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📈</div>
          </div>
          {/* Perfil match */}
          <div className="mt-4 bg-white/15 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              <div>
                <p className="text-white font-semibold text-sm">Tu perfil de empleabilidad</p>
                <p className="text-white/70 text-xs">{currentUser.ciclo}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white">72%</p>
              <p className="text-white/60 text-[10px]">completado</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-2xl p-1 gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                'flex-1 py-2 rounded-xl text-sm font-medium transition-all',
                activeTab === i ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: Ofertas */}
        {activeTab === 0 && (
          <div className="space-y-3">

            {/* Banner bolsa de empleo FP */}
            <a href="https://www.empleafp.com/site/index.html#!/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                <div className="relative flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">🎓</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=AlbaTeacher&backgroundColor=b6e3f4`}
                          alt="Alba Álvarez"
                          className="h-5 w-5 rounded-full bg-white/20"
                        />
                        <span className="text-white/80 text-xs font-medium">Alba Álvarez · Profesora</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-white/60 shrink-0" />
                    </div>
                    <p className="text-white text-sm font-medium leading-snug">
                      Chicos, que el curro ya está ahí 👀 Os dejo la bolsa de empleo de FP para que cuando acabe el curso, vayáis echando un ojo y buscando lo vuestro.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                      <span className="text-white text-xs font-bold">empleafp.com</span>
                      <ExternalLink className="h-3 w-3 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Portales de empleo */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Portales donde buscar empleo</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { nombre: 'Empléate', descripcion: 'Portal del SEPE — empleo público y orientación laboral oficial.', emoji: '🏛️', url: 'https://www.sepe.es/HomeSepe/es/', color: 'from-blue-500 to-indigo-600' },
                  { nombre: 'InfoJobs', descripcion: 'El portal de referencia en España con la mayor cantidad de ofertas.', emoji: '💼', url: 'https://www.infojobs.net/', color: 'from-emerald-500 to-teal-600' },
                  { nombre: 'LinkedIn', descripcion: 'Fundamental para el networking, marca personal y búsqueda activa.', emoji: '🔗', url: 'https://www.linkedin.com/jobs/', color: 'from-sky-500 to-blue-600' },
                  { nombre: 'Indeed', descripcion: 'Potente metabuscador que agrega ofertas de muchas fuentes.', emoji: '🔍', url: 'https://es.indeed.com/', color: 'from-violet-500 to-purple-600' },
                ].map(portal => (
                  <a key={portal.nombre} href={portal.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className={`bg-gradient-to-br ${portal.color} rounded-2xl p-3.5 text-white h-full hover:scale-[1.02] transition-transform duration-200`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{portal.emoji}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-white/50" />
                      </div>
                      <p className="font-bold text-sm mb-1">{portal.nombre}</p>
                      <p className="text-white/70 text-[10px] leading-snug">{portal.descripcion}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Panel docente — añadir oferta */}
            {esDocente && (
              <div>
                {formOferta ? (
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground text-sm">Añadir oferta o enlace</p>
                        <button onClick={() => setFormOferta(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                      <input
                        type="text"
                        placeholder="Título o puesto *"
                        value={nuevaOferta.titulo}
                        onChange={e => setNuevaOferta(p => ({ ...p, titulo: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="Empresa / fuente"
                        value={nuevaOferta.empresa}
                        onChange={e => setNuevaOferta(p => ({ ...p, empresa: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="url"
                        placeholder="URL del enlace *"
                        value={nuevaOferta.url}
                        onChange={e => setNuevaOferta(p => ({ ...p, url: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="Descripción breve (opcional)"
                        value={nuevaOferta.descripcion}
                        onChange={e => setNuevaOferta(p => ({ ...p, descripcion: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <Button size="sm" className="w-full" onClick={agregarOferta}>Publicar para el alumnado</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <button
                    onClick={() => setFormOferta(true)}
                    className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" /> Añadir oferta o enlace de empleo
                  </button>
                )}
              </div>
            )}

            {savedOfertas.map(oferta => {
              const esEnlaceDocente = oferta.tipo === 'Enlace docente'
              return (
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
                          {!esEnlaceDocente && (
                            <span className={cn('text-xs font-bold px-2 py-1 rounded-full shrink-0', getMatchColor(oferta.match))}>
                              {oferta.match}% match
                            </span>
                          )}
                          {esEnlaceDocente && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400 shrink-0">
                              Docente
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {oferta.ubicacion !== '—' && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" /> {oferta.ubicacion}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Briefcase className="h-3 w-3" /> {oferta.tipo}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {oferta.fecha}
                          </span>
                        </div>
                        {oferta.habilidades.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {oferta.habilidades.map(h => (
                              <Badge key={h} variant="default" className="text-[10px]">{h}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          {esEnlaceDocente ? (
                            <a href={(oferta as any).url} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button size="sm" className="w-full">
                                Ver enlace <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </a>
                          ) : (
                            <Button size="sm" className="flex-1">
                              Ver oferta <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <button
                            onClick={() => toggleSave(oferta.id)}
                            className={cn('h-8 w-8 rounded-xl flex items-center justify-center transition-all', oferta.guardada ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/30' : 'bg-muted text-muted-foreground hover:text-foreground')}
                          >
                            <Bookmark className={cn('h-4 w-4', oferta.guardada && 'fill-current')} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Tab: Tendencias */}
        {activeTab === 1 && (
          <div className="space-y-3">

            {/* Panel docente — añadir enlace de tendencias */}
            {esDocente && (
              <div>
                {formTendencia ? (
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground text-sm">Añadir recurso de tendencias</p>
                        <button onClick={() => setFormTendencia(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                      <input
                        type="text"
                        placeholder="Título del recurso *"
                        value={nuevaTendencia.titulo}
                        onChange={e => setNuevaTendencia(p => ({ ...p, titulo: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="url"
                        placeholder="URL del enlace *"
                        value={nuevaTendencia.url}
                        onChange={e => setNuevaTendencia(p => ({ ...p, url: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="Descripción breve (opcional)"
                        value={nuevaTendencia.descripcion}
                        onChange={e => setNuevaTendencia(p => ({ ...p, descripcion: e.target.value }))}
                        className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Tipo</label>
                        <div className="flex gap-2">
                          {['Artículo', 'Vídeo'].map(t => (
                            <button
                              key={t}
                              onClick={() => setNuevaTendencia(p => ({ ...p, tipo: t }))}
                              className={cn('flex-1 py-2 rounded-xl text-sm font-medium border transition-all', nuevaTendencia.tipo === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border')}
                            >
                              {t === 'Vídeo' ? '▶ Vídeo' : '📄 Artículo'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" className="w-full" onClick={agregarTendencia}>Publicar para el alumnado</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <button
                    onClick={() => setFormTendencia(true)}
                    className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" /> Añadir recurso de tendencias
                  </button>
                )}
              </div>
            )}

            {/* Recursos y lecturas */}
            <div className="space-y-3">
              {enlacesExtra.map(enlace => (
                <a
                  key={enlace.id}
                  href={enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card hover className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className={cn('bg-gradient-to-br p-4 flex items-center gap-3', enlace.gradiente)}>
                        <span className="text-3xl shrink-0">{enlace.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm leading-snug">{enlace.titulo}</p>
                          <p className="text-white/70 text-xs mt-0.5 leading-snug">{enlace.descripcion}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-white/60 shrink-0" />
                      </div>
                      <div className="px-4 py-2.5 flex items-center gap-2">
                        <span className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full',
                          enlace.tipo === 'Vídeo'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
                        )}>
                          {enlace.tipo === 'Vídeo' ? '▶ Vídeo' : '📄 Artículo'}
                        </span>
                        <span className="text-xs text-muted-foreground">Toca para abrir</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Sectores con más demanda */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-4">Sectores con más demanda en 2026</p>
                <div className="space-y-3">
                  {tendenciasMercado.map((tend, i) => (
                    <div key={tend.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-muted-foreground w-5 text-right">{i + 1}</span>
                          <span className="text-lg">{tend.emoji}</span>
                          <span className="text-sm font-medium text-foreground">{tend.nombre}</span>
                          {tend.up && <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />}
                        </div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{tend.demanda}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden ml-7">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-700"
                          style={{ width: `${tend.demanda}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Habilidades más buscadas</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Python', 'Machine Learning', 'Docker', 'TypeScript', 'Kubernetes', 'AWS', 'Git', 'SQL', 'Figma'].map((skill, i) => (
                    <span key={skill} className={cn('px-3 py-1.5 rounded-full text-xs font-medium', i < 3 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' : 'bg-muted text-muted-foreground')}>
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab: Debate */}
        {activeTab === 2 && (
          <div className="space-y-4">

            {/* Input nueva reflexión */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                  <div className="flex-1">
                    <textarea
                      value={nuevaReflexion}
                      onChange={e => setNuevaReflexion(e.target.value)}
                      placeholder="¿Qué piensas sobre estas tendencias del mercado laboral?"
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{nuevaReflexion.length}/280</span>
                      <Button
                        size="sm"
                        disabled={!nuevaReflexion.trim()}
                        onClick={() => {
                          if (!nuevaReflexion.trim()) return
                          setDebate(prev => [{
                            id: String(Date.now()),
                            autor: currentUser.name,
                            avatar: currentUser.avatar,
                            texto: nuevaReflexion.trim(),
                            likes: 0,
                            tiempo: 'Ahora mismo',
                            liked: false,
                          }, ...prev])
                          setNuevaReflexion('')
                        }}
                      >
                        Publicar <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reflexiones del grupo */}
            <div className="space-y-3">
              {debate.map(post => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar src={post.avatar} alt={post.autor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold text-foreground text-sm">{post.autor}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{post.tiempo}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{post.texto}</p>
                        <button
                          onClick={() => setDebate(prev => prev.map(p =>
                            p.id === post.id
                              ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                              : p
                          ))}
                          className={cn(
                            'flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors',
                            post.liked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500',
                          )}
                        >
                          <Heart className={cn('h-3.5 w-3.5', post.liked && 'fill-current')} />
                          {post.likes} {post.likes === 1 ? 'me gusta' : 'me gusta'}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
