'use client'

import { Fragment } from 'react'
import { User } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../common/Logo'
import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  BellIcon
} from '@heroicons/react/24/outline'

import { useAuth } from '@/contexts/AuthContext'

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Plantões', href: '/plantoes' },
    { name: 'Candidaturas', href: '/candidaturas' },
    { name: 'Histórico', href: '/historico' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                    pathname === item.href
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full">
              <span className="sr-only">Notificações</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 rounded-full bg-white p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {user.avatar ? (
                  <Image
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={user.avatar}
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="hidden md:flex md:items-center">
                  <span className="text-sm font-medium text-gray-900">
                    Dr. {user.name.split(' ')[0]}
                  </span>
                  <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-400" />
                </span>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-900 font-medium truncate">{user.email}</p>
                    <p className="text-xs text-gray-500">CRM: {user.crm || 'Não informado'}</p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/perfil"
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } flex px-4 py-2 text-sm text-gray-700 items-center group`}
                      >
                        <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Configurações
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={signOut}
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } flex w-full px-4 py-2 text-sm text-gray-700 items-center group`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Sair
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
} 