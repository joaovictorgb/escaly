'use client'

import { useState } from 'react'
import { User } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DashboardHeader from './DashboardHeader'
import ShiftCard from './ShiftCard'
import CreateShiftModal from './CreateShiftModal'

interface HospitalDashboardProps {
  user: User
}

export default function HospitalDashboard({ user }: HospitalDashboardProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab] = useState<'active' | 'filled'>('active')

  const handleCreateShift = async (data: { specialty: string; date: string; startTime: string; endTime: string; price: number; location: string; description?: string; }) => {
    console.log('Criando plantão com os dados:', data)
    // Lógica para criar plantão
  }

  return (
    <div>
      <DashboardHeader user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Remover stats se não for utilizado */}
        </div>

        {/* Header with Tabs and Create Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Plantões</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Novo Plantão
          </button>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'active' ? (
            <ShiftCard
              hospital={user.name}
              specialty="Clínica Médica"
              date={format(new Date('2024-03-20'), "dd 'de' MMMM", { locale: ptBR })}
              time="07:00 - 19:00"
              price={1500}
              location="São Paulo, SP"
              status="active"
              onViewApplicants={() => {}}
            />
          ) : (
            <ShiftCard
              hospital={user.name}
              specialty="Pediatria"
              date={format(new Date('2024-03-22'), "dd 'de' MMMM", { locale: ptBR })}
              time="19:00 - 07:00"
              price={1800}
              location="São Paulo, SP"
              status="filled"
              onViewApplicants={() => {}}
            />
          )}
        </div>
      </main>

      <CreateShiftModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateShift}
      />
    </div>
  )
} 