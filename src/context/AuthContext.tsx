import { createContext, useContext, useState, ReactNode } from 'react'

export type Rol = 'alumno' | 'docente'

interface AuthUser {
  rol: Rol
}

interface AuthContextType {
  user: AuthUser | null
  login: (rol: Rol) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = (rol: Rol) => setUser({ rol })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
