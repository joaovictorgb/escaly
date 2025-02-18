'use client'

import { User } from '@/types'
import { createContext, useContext, useState } from 'react'


interface AuthContextData {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading] = useState(false)

  const mockUser: User = {
    id: '1',
    name: 'Usuário Teste',
    email: '',
    role: 'doctor',
    phone: '11999999999'
  }

  const signIn = async (email: string,) => {
    try {
      setUser({ ...mockUser, email })
    } catch {
      throw new Error('Erro ao fazer login')
    }
  }

  const signUp = async (email: string) => {
    try {
      setUser({ ...mockUser, email })
    } catch {
      throw new Error('Erro ao criar conta')
    }
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 