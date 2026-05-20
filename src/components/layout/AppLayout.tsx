import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { useAuth } from '@/context/AuthContext'

export function AppLayout() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:ml-64 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
