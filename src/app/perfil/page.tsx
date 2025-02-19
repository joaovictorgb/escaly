'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { toast } from 'sonner'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Profile() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/entrar')
      return
    }

    // Atualiza o formData quando o user estiver disponível
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      crm: user.crm || '',
    })
  }, [user, router])

  if (!user) {
    return null // ou um loading spinner
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userRef = doc(db, 'users', user.id)
      await updateDoc(userRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

          <div className="flex flex-col items-center mb-8">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="w-24 h-24 text-gray-400" />
            )}
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.role === 'doctor' ? 'Médico' : 'Hospital'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="mt-1 text-sm text-gray-500">O email não pode ser alterado</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
              />
            </div>

            {user.role === 'doctor' && (
              <div>
                <label htmlFor="crm" className="block text-sm font-medium text-gray-700">
                  CRM
                </label>
                <input
                  type="text"
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 