'use client'

import { User } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

interface AuthContextData {
  user: User | null
  signIn: (email: string, password: string) => Promise<User | undefined>
  signUp: (email: string, password: string, name: string, crm?: string) => Promise<User | undefined>
  signInWithGoogle: () => Promise<User | undefined>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const getAuthErrorMessage = (error: unknown) => {
  if (!error || typeof error !== 'object' || !('code' in error)) return null

  const errorWithCode = error as { code: string }
  switch (errorWithCode.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou senha incorretos'
    case 'auth/email-already-in-use':
      return 'Este email já está sendo usado'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres'
    case 'auth/invalid-email':
      return 'Email inválido'
    case 'auth/popup-blocked':
      return 'O popup foi bloqueado pelo navegador. Permita popups para fazer login com Google'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Login cancelado'
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde'
    case 'permission-denied':
      return 'Erro de permissão ao salvar dados'
    default:
      console.error('Erro não tratado:', error)
      return 'Ocorreu um erro inesperado. Tente novamente'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const saveUserData = async (userId: string, data: Partial<User>) => {
    try {
      const userRef = doc(db, 'users', userId)
      await setDoc(userRef, {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true })
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error)
      throw new Error('Erro ao salvar dados do usuário')
    }
  }

  const loadUserData = async (userId: string) => {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    return userDoc.data() as User | undefined
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await loadUserData(firebaseUser.uid)
        setUser(userData || {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuário',
          email: firebaseUser.email || '',
          role: 'doctor',
          phone: '',
          avatar: firebaseUser.photoURL || undefined
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<User | undefined> => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password)
      const userData: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Usuário',
        email: firebaseUser.email || '',
        role: 'doctor',
        phone: '',
        avatar: firebaseUser.photoURL || undefined
      }
      setUser(userData)
      return userData
    } catch (error: unknown) {
      const message = getAuthErrorMessage(error)
      if (message) {
        throw new Error(message)
      }
      return undefined
    }
  }

  const signUp = async (email: string, password: string, name: string, crm?: string): Promise<User | undefined> => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      await updateProfile(firebaseUser, { displayName: name })
      
      const userData: User = {
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email || '',
        role: 'doctor',
        phone: '',
        crm,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await saveUserData(firebaseUser.uid, userData)
      setUser(userData)
      return userData
    } catch (error: unknown) {
      const message = getAuthErrorMessage(error)
      if (message) {
        throw new Error(message)
      }
      return undefined
    }
  }

  const signInWithGoogle = async (): Promise<User | undefined> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user) {
        const userData: User = {
          id: result.user.uid,
          name: result.user.displayName || 'Usuário',
          email: result.user.email || '',
          role: 'doctor',
          phone: result.user.phoneNumber || '',
          avatar: result.user.photoURL || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        await saveUserData(result.user.uid, userData)
        setUser(userData)
        return userData
      }
    } catch (error: unknown) {
      const message = getAuthErrorMessage(error)
      if (message) {
        throw new Error(message)
      }
    }
    return undefined
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
      router.push('/')
    } catch (error: unknown) {
      console.error('Erro ao sair:', error)
      throw new Error((error as Error).message)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signInWithGoogle,
      signOut, 
      isLoading: loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 