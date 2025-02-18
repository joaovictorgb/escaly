'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Header() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-18 md:h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/image.png"
                alt="Escala"
                width={150}
                height={50}
                priority
                className="h-7 xs:h-8 sm:h-10 md:h-12 w-auto"
              />
            </Link>
            
            <nav className="hidden lg:flex ml-12 space-x-8">
              <Link 
                href="/para-medicos" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Para médicos
              </Link>
              <Link 
                href="/para-hospitais" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Para hospitais
              </Link>
            </nav>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  href="/plantoes"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  Plantões disponíveis
                </Link>
                <div className="flex items-center space-x-4 ml-4 border-l border-gray-200 pl-4">
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <button
                    onClick={signOut}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/entrar"
                  className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Cadastre-se
                </Link>
                <Link
                  href="/plantoes-disponiveis"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  Plantões disponíveis
                </Link>
              </>
            )}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {!user && (
              <>
                <Link
                  href="/entrar"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/plantoes-disponiveis"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap text-sm"
                >
                  Plantões disponíveis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Link
              href="/para-medicos"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
            >
              Para médicos
            </Link>
            <Link
              href="/para-hospitais"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
            >
              Para hospitais
            </Link>
            {!user && (
              <>
                <Link
                  href="/entrar"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50"
                >
                  Cadastre-se
                </Link>
                <Link
                  href="/plantoes-disponiveis"
                  className="block px-3 py-2.5 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center mt-3"
                >
                  Plantões disponíveis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 