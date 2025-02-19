'use client'

import { useAuth } from '@/contexts/AuthContext'
import DoctorDashboard from '@/components/dashboard/DoctorDashboard'
import HospitalDashboard from '@/components/dashboard/HospitalDashboard'
import LoadingScreen from '@/components/LoadingScreen'

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'doctor' ? (
        <DoctorDashboard user={user} />
      ) : (
        <HospitalDashboard user={user} />
      )}
    </div>
  )
} 