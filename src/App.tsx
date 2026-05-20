import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Conocete } from '@/pages/Conocete'
import { Mercado } from '@/pages/Mercado'
import { Aula } from '@/pages/Aula'
import { Estudiar } from '@/pages/Estudiar'
import { Perfil } from '@/pages/Perfil'
import { MisRecursos } from '@/pages/MisRecursos'
import { Recursos } from '@/pages/Recursos'
import { TrabajaSéguro } from '@/pages/TrabajaSéguro'
import { Emprende } from '@/pages/Emprende'
import { AulaII } from '@/pages/AulaII'
import { Evaluaciones } from '@/pages/Evaluaciones'

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conocete" element={<Conocete />} />
          <Route path="/mercado" element={<Mercado />} />
          <Route path="/aula" element={<Aula />} />
          <Route path="/estudiar" element={<Estudiar />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mis-recursos" element={<MisRecursos />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/trabaja-seguro" element={<TrabajaSéguro />} />
          <Route path="/emprende" element={<Emprende />} />
          <Route path="/aula-ii" element={<AulaII />} />
          <Route path="/evaluaciones" element={<Evaluaciones />} />
          {/* Redirects para rutas antiguas */}
          <Route path="/ipe" element={<Navigate to="/conocete" replace />} />
          <Route path="/empleabilidad" element={<Navigate to="/mercado" replace />} />
          <Route path="/cursos" element={<Navigate to="/aula" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
