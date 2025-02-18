'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch {
      setError('Email ou senha inválidos')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/image.png"
              alt="Escala"
              width={150}
              height={50}
              priority
              className="h-8 md:h-10 w-auto mx-auto mb-6 md:mb-8"
            />
          </Link>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Entre na sua conta</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FcGoogle className="w-5 h-5 mr-2" />
            Continuar com Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FaApple className="w-5 h-5 mr-2" />
            Continuar com Apple
          </button>
        </div>

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

          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Senha"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link href="/esqueci-senha" className="text-sm text-blue-600 hover:text-blue-500">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <Link
              href="/cadastro"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Cadastre-se gratuitamente →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 