'use client'

import Header from '@/components/layout/Header'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { Shift } from '@/types'

export default function AvailableShifts() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('São Paulo')

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await api.get(`/shifts?city=${selectedCity}&status=open`)
        setShifts(response.data)
      } catch (error) {
        console.error('Erro ao carregar plantões:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShifts()
  }, [selectedCity])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Plantões disponíveis
                </h1>
                <p className="text-gray-600">
                  Encontre as melhores oportunidades para você
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Localização:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border border-gray-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Belo Horizonte">Belo Horizonte</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando plantões...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="border border-gray-100 rounded-xl p-6 hover:border-blue-500 transition-all duration-200 hover:shadow-md bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {shift.specialty}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-600 flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            {new Date(shift.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <ClockIcon className="w-5 h-5 mr-2" />
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 mb-4">
                          R$ {shift.paymentValue.toFixed(2)}
                        </p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                          Candidatar-se
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
} 