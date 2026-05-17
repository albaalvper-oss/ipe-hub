import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Zap, Eye, EyeOff, ArrowRight, Shield, GraduationCap, BookOpen, Hash } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth, Rol } from '@/context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const rolInicial: Rol = (location.state as any)?.rol ?? 'alumno'
  const [rol, setRol] = useState<Rol>(rolInicial)
  const [metodo, setMetodo] = useState<'credenciales' | 'codigo'>('credenciales')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(rol)
      navigate('/dashboard')
    }, 900)
  }

  const esAlumno = rol === 'alumno'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white">IPE Hub</span>
          </Link>
          <div className="flex items-center gap-1.5 bg-white/10 text-white/60 rounded-full px-3 py-1 text-xs">
            <Shield className="h-3 w-3" />
            Acceso privado
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">

          {/* Selector de rol */}
          <div className="flex bg-white/10 rounded-2xl p-1 gap-1 mb-6">
            {(['alumno', 'docente'] as Rol[]).map(r => (
              <button
                key={r}
                onClick={() => { setRol(r); setMetodo('credenciales') }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  rol === r ? 'bg-white text-slate-900 shadow-sm' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {r === 'alumno'
                  ? <><GraduationCap className="h-4 w-4" />Alumno/a</>
                  : <><BookOpen className="h-4 w-4" />Docente</>
                }
              </button>
            ))}
          </div>

          {/* Perfil de muestra */}
          <div className={`rounded-2xl p-3 mb-5 flex items-center gap-3 ${esAlumno ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-violet-500/20 border border-violet-400/30'}`}>
            <img
              src={esAlumno
                ? 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent'
                : 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlbaTeacher&backgroundColor=b6e3f4'
              }
              alt="avatar"
              className="h-10 w-10 rounded-full bg-white/20 shrink-0"
            />
            <div>
              <p className="text-white font-semibold text-sm leading-none">
                {esAlumno ? 'Alex García' : 'Alba Álvarez'}
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                {esAlumno
                  ? 'Alumno · Grado Medio TAPSD'
                  : 'Profesora · Grado Medio TAPSD'
                }
              </p>
              <p className="text-white/40 text-[10px]">IES Tecnológico Salamanca</p>
            </div>
          </div>

          {/* Título */}
          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-white">
              {esAlumno ? 'Accede a tu clase' : 'Accede como docente'}
            </h2>
            <p className="text-white/50 text-xs mt-1">
              {esAlumno
                ? 'Usa tus credenciales o el código de clase'
                : 'Gestiona tu aula y el progreso de tu alumnado'
              }
            </p>
          </div>

          {/* Métodos (solo alumno) */}
          {esAlumno && (
            <div className="flex bg-white/10 rounded-xl p-0.5 gap-0.5 mb-4">
              <button
                onClick={() => setMetodo('credenciales')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${metodo === 'credenciales' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/70'}`}
              >
                Email y contraseña
              </button>
              <button
                onClick={() => setMetodo('codigo')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${metodo === 'codigo' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/70'}`}
              >
                Código de clase
              </button>
            </div>
          )}

          {/* Formulario credenciales */}
          {metodo === 'credenciales' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">Email educativo</label>
                <input
                  type="email"
                  defaultValue={esAlumno ? 'alex@ies-tecnologico.es' : 'alba@ies-tecnologico.es'}
                  className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    defaultValue="••••••••"
                    className="w-full h-11 px-4 pr-11 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all text-sm"
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" size="lg" loading={loading} className="w-full">
                {esAlumno ? 'Entrar a mi clase' : 'Entrar al panel docente'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
            </form>
          )}

          {/* Formulario código de clase */}
          {metodo === 'codigo' && esAlumno && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">Código de clase</label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all text-sm tracking-widest uppercase font-mono"
                    placeholder="IPE-XXXX"
                    maxLength={8}
                  />
                </div>
                <p className="text-white/40 text-xs mt-1.5">Tu docente te proporcionará el código</p>
              </div>
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">Tu nombre completo</label>
                <input
                  type="text"
                  defaultValue="Alex García"
                  className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all text-sm"
                />
              </div>
              <Button type="submit" size="lg" loading={loading} className="w-full">
                Unirme a la clase
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2">
            <Shield className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
            <p className="text-white/30 text-xs leading-relaxed">
              Plataforma de uso exclusivo para el alumnado y docentes del centro. Si no tienes acceso, contacta con tu docente.
            </p>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          <Link to="/" className="hover:text-white/60 transition-colors">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  )
}
