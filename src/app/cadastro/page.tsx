'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'doctor' | 'hospital'>('doctor')
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      router.push('/dashboard')
    } catch {
      setError('Erro ao criar conta')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/image.png"
              alt="Escala"
              width={150}
              height={50}
              priority
              className="h-10 w-auto mx-auto mb-6"
            />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Cadastre-se gratuitamente</h2>
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => setUserType('doctor')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              userType === 'doctor'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sou médico
          </button>
          <button
            type="button"
            onClick={() => setUserType('hospital')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              userType === 'hospital'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sou hospital
          </button>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FcGoogle className="w-5 h-5 mr-2" />
          Continuar com Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome completo"
          />

          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Senha"
          />

          {userType === 'doctor' && (
            <input
              type="text"
              name="crm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="CRM (opcional)"
            />
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Criar conta
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              href="/entrar"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Faça login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 