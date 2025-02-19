'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ShiftCard from '../dashboard/ShiftCard'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

export default function AvailableShifts() {
  const { user } = useAuth()
  const router = useRouter()
  const [shifts] = useState([
    {
      hospital: "Hospital São Lucas",
      specialty: "Clínica Médica",
      date: format(new Date('2024-03-20'), "dd 'de' MMMM", { locale: ptBR }),
      time: "07:00 - 19:00",
      price: 1500,
      location: "São Paulo, SP"
    },
    {
      hospital: "Hospital Santa Casa",
      specialty: "Pediatria",
      date: format(new Date('2024-03-22'), "dd 'de' MMMM", { locale: ptBR }),
      time: "19:00 - 07:00",
      price: 1800,
      location: "São Paulo, SP"
    }
  ])

  const handleApply = async () => {
    if (!user) {
      toast.error('Faça login para se candidatar ao plantão')
      router.push('/entrar')
      return
    }
    // Lógica para se candidatar ao plantão
    // Simulando uma operação assíncrona
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Candidatura realizada com sucesso!');
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Plantões em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja algumas das oportunidades disponíveis na plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shifts.map((shift, index) => (
            <ShiftCard
              key={index}
              {...shift}
              status="available"
              onApply={handleApply}
            />
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Para se candidatar aos plantões, faça login ou crie sua conta
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push('/entrar')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Fazer Login
              </button>
              <button
                onClick={() => router.push('/cadastro')}
                className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Criar Conta
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 