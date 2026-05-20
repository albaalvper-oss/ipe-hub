import { useNavigate } from 'react-router-dom'
import { Zap, Shield, GraduationCap, BookOpen, Lock } from 'lucide-react'

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center">

        {/* Badge privado */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs font-medium mb-8">
          <Lock className="h-3 w-3" />
          Plataforma privada · Acceso restringido
        </div>

        {/* Logo */}
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 mb-6">
          <Zap className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-extrabold text-white text-center leading-tight mb-2">
          IPE Hub
        </h1>
        <p className="text-white/60 text-sm text-center mb-2">
          Itinerario Personal para la Empleabilidad
        </p>
        <div className="flex items-center gap-1.5 text-white/40 text-xs mb-10">
          <Shield className="h-3 w-3" />
          Solo para alumnado y docentes autorizados
        </div>

        {/* Selección de rol */}
        <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-4">
          ¿Cómo quieres acceder?
        </p>

        <div className="w-full space-y-3">
          {/* Alumno */}
          <button
            onClick={() => navigate('/login', { state: { rol: 'alumno' } })}
            className="w-full group flex items-center gap-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="h-12 w-12 rounded-xl bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-all">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-base">Soy alumno/a</p>
              <p className="text-slate-400 text-xs mt-0.5">Accede con tus credenciales o código de clase</p>
            </div>
            <div className="text-slate-500 group-hover:text-slate-300 transition-colors">›</div>
          </button>

          {/* Docente */}
          <button
            onClick={() => navigate('/login', { state: { rol: 'docente' } })}
            className="w-full group flex items-center gap-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="h-12 w-12 rounded-xl bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-all">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-base">Soy docente</p>
              <p className="text-slate-400 text-xs mt-0.5">Gestiona tu aula, alumnado y recursos</p>
            </div>
            <div className="text-slate-500 group-hover:text-slate-300 transition-colors">›</div>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center space-y-1">
          <p className="text-slate-500 text-xs leading-relaxed">
            ¿No tienes acceso? Contacta con tu docente.<br />
            Esta plataforma es de uso exclusivo para el centro educativo.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs pt-1">
            <Zap className="h-3 w-3" />
            IPE Hub · Itinerario Personal para la Empleabilidad
          </div>
        </div>

      </div>
    </div>
  )
}
