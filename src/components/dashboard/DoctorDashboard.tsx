'use client'

import { User } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DashboardHeader from './DashboardHeader'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader user={user} />

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Olá, Dr. {user.name.split(' ')[0]}
          </h1>
          <p className="mt-2 text-blue-100 text-lg">
            {formattedDate} • {formattedTime}
          </p>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-white backdrop-blur-xl bg-opacity-80 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className="mt-3 flex items-baseline">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {stat.value}
                  {stat.suffix && <span className="text-yellow-400 ml-1">{stat.suffix}</span>}
                </p>
                {stat.change && (
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/plantoes"
              className="block bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-4 bg-blue-600 rounded-xl">
                  <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900">Plantões Disponíveis</h2>
                  <p className="text-base text-gray-600 mt-1">12 novos plantões hoje</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/candidaturas"
              className="block bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-8 border border-green-100 hover:border-green-300 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-4 bg-green-600 rounded-xl">
                  <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900">Minhas Candidaturas</h2>
                  <p className="text-base text-gray-600 mt-1">3 candidaturas pendentes</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {nextShift && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximo Plantão</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start bg-blue-50 rounded-xl p-6"
              >
                <div className="p-4 bg-blue-600 rounded-xl">
                  <BuildingOffice2Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{nextShift.hospital}</h3>
                  <p className="text-base text-gray-600 mt-1">{nextShift.specialty}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start bg-purple-50 rounded-xl p-6"
              >
                <div className="p-4 bg-purple-600 rounded-xl">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{nextShift.date}</h3>
                  <p className="text-base text-gray-600 mt-1">{nextShift.time}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start bg-green-50 rounded-xl p-6"
              >
                <div className="p-4 bg-green-600 rounded-xl">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{nextShift.location}</h3>
                  <p className="text-base text-gray-600 mt-1">{nextShift.duration}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start bg-yellow-50 rounded-xl p-6"
              >
                <div className="p-4 bg-yellow-600 rounded-xl">
                  <BanknotesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {nextShift.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </h3>
                  <p className="text-base text-gray-600 mt-1">Valor do plantão</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Plantões Disponíveis</h2>
            <Link 
              href="/plantoes"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos
              <span className="ml-2">→</span>
            </Link>
          </div>
          {/* Lista de plantões disponíveis aqui */}
        </motion.div>
      </main>
    </div>
  )
} 