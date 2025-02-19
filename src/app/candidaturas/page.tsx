'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  ClockIcon, 
  BuildingOffice2Icon,
  MapPinIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

type CandidatureStatus = 'pending' | 'approved' | 'rejected'

interface Candidature {
  id: string
  hospitalName: string
  specialty: string
  date: Date
  time: string
  location: string
  price: number
  status: CandidatureStatus
  createdAt: Date
}

export default function Candidaturas() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/entrar')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Dados mockados para exemplo
  const candidatures: Candidature[] = [
    {
      id: '1',
      hospitalName: 'Hospital São Lucas',
      specialty: 'Clínica Médica',
      date: new Date('2024-03-25'),
      time: '07:00 - 19:00',
      location: 'São Paulo, SP',
      price: 1500,
      status: 'pending',
      createdAt: new Date('2024-03-20')
    },
    {
      id: '2',
      hospitalName: 'Hospital Santa Casa',
      specialty: 'Clínica Médica',
      date: new Date('2024-03-26'),
      time: '19:00 - 07:00',
      location: 'São Paulo, SP',
      price: 1800,
      status: 'approved',
      createdAt: new Date('2024-03-19')
    },
    {
      id: '3',
      hospitalName: 'Hospital Albert Einstein',
      specialty: 'Clínica Médica',
      date: new Date('2024-03-24'),
      time: '07:00 - 19:00',
      location: 'São Paulo, SP',
      price: 2000,
      status: 'rejected',
      createdAt: new Date('2024-03-18')
    }
  ]

  const getStatusColor = (status: CandidatureStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      case 'approved':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'rejected':
        return 'bg-red-50 text-red-700 ring-red-600/20'
    }
  }

  const getStatusIcon = (status: CandidatureStatus) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusText = (status: CandidatureStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'approved':
        return 'Aprovada'
      case 'rejected':
        return 'Recusada'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="bg-blue-600 text-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Minhas Candidaturas</h1>
          <p className="mt-1 text-blue-100">
            Acompanhe o status das suas candidaturas para plantões
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Candidaturas Ativas
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Histórico
            </button>
          </nav>
        </div>

        {/* Candidatures Grid */}
        <div className="grid grid-cols-1 gap-6">
          {candidatures.map((candidature) => (
            <div
              key={candidature.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {candidature.hospitalName}
                      </h3>
                      <p className="text-sm text-gray-500">{candidature.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{candidature.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{candidature.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <BanknotesIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>
                        {candidature.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                  <div className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor(candidature.status)}`}>
                    {getStatusIcon(candidature.status)}
                    <span className="ml-2">{getStatusText(candidature.status)}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Candidatura feita em{' '}
                    {format(candidature.createdAt, "d 'de' MMMM", { locale: ptBR })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 