'use client'

import { User } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DashboardHeader from './DashboardHeader'
import Link from 'next/link'
import { 
  BuildingOffice2Icon, 
  ClipboardDocumentListIcon,
  CalendarIcon,
  BanknotesIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface DoctorDashboardProps {
  user: User
}

export default function DoctorDashboard({ user }: DoctorDashboardProps) {
  const currentTime = new Date()
  const formattedDate = format(currentTime, "EEEE, d 'de' MMMM", { locale: ptBR })
  const formattedTime = format(currentTime, "HH:mm", { locale: ptBR })

  const stats = [
    { label: 'Plantões Realizados', value: '24', change: '+4', changeType: 'increase' },
    { label: 'Avaliação Média', value: '4.9', suffix: '★' },
    { label: 'Ganhos do Mês', value: 'R$ 12.450', change: '+12.3%', changeType: 'increase' },
    { label: 'Taxa de Aceite', value: '95%', change: '+2.3%', changeType: 'increase' },
  ]

  const nextShift = {
    hospital: "Hospital São Lucas",
    specialty: "Clínica Médica",
    duration: "12h",
    date: "Amanhã",
    time: "07:00 - 19:00",
    location: "São Paulo, SP",
    price: 1500
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="bg-blue-600 text-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Olá, Dr. {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-blue-100">
            {formattedDate} • {formattedTime}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                  {stat.suffix && <span className="text-yellow-400 ml-1">{stat.suffix}</span>}
                </p>
                {stat.change && (
                  <span className={`ml-2 text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link 
            href="/plantoes"
            className="group bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-blue-500 transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-900">Plantões Disponíveis</h2>
                <p className="text-sm text-gray-500">12 novos plantões hoje</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/candidaturas"
            className="group bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-green-500 transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-900">Minhas Candidaturas</h2>
                <p className="text-sm text-gray-500">3 candidaturas pendentes</p>
              </div>
            </div>
          </Link>
        </div>

        {nextShift && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximo Plantão</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BuildingOffice2Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{nextShift.hospital}</h3>
                  <p className="text-sm text-gray-500">{nextShift.specialty}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{nextShift.date}</h3>
                  <p className="text-sm text-gray-500">{nextShift.time}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{nextShift.location}</h3>
                  <p className="text-sm text-gray-500">{nextShift.duration}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BanknotesIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">
                    {nextShift.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </h3>
                  <p className="text-sm text-gray-500">Valor do plantão</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Plantões Disponíveis</h2>
            <Link 
              href="/plantoes"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Ver todos →
            </Link>
          </div>
          {/* Lista de plantões disponíveis aqui */}
        </div>
      </main>
    </div>
  )
} 