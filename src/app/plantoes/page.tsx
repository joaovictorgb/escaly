'use client'

import { useState, useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  ChevronDownIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  StarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Shift {
  id: string
  hospital: string
  specialty: string
  date: string
  time: string
  price: number
  location: string
  description: string
  rating?: number
  reviews?: number
}

const SPECIALTIES = ['Todas', 'Clínica Médica', 'Pediatria', 'Cirurgia', 'Ortopedia'] as const
type Specialty = typeof SPECIALTIES[number]

const CITIES = [
  { value: '', label: 'Todas as cidades' },
  { value: 'sp', label: 'São Paulo, SP' },
  { value: 'rj', label: 'Rio de Janeiro, RJ' }
] as const

const PRICE_RANGES = [
  { value: '', label: 'Valor/hora' },
  { value: '100-150', label: 'R$ 100-150/h' },
  { value: '150-200', label: 'R$ 150-200/h' },
  { value: '200+', label: 'R$ 200+/h' }
] as const

const SORT_OPTIONS = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliação' }
] as const

const FEATURED_HOSPITALS = [
  {
    id: 1,
    name: 'Hospital Albert Einstein',
    image: '/hospitals/einstein.jpg',
    rating: 4.9,
    shifts: 15
  },
  {
    id: 2,
    name: 'Hospital Sírio-Libanês',
    image: '/hospitals/sirio.jpg',
    rating: 4.8,
    shifts: 12
  },
  {
    id: 3,
    name: 'Hospital São Luiz',
    image: '/hospitals/sao-luiz.jpg',
    rating: 4.7,
    shifts: 8
  }
]

export default function Shifts() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('Todas')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]['value']>('recent')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [favoriteShifts, setFavoriteShifts] = useState<string[]>([])

  // Dados mockados com tipagem correta
  const shifts: Shift[] = useMemo(() => [
    {
      id: 'shift1',
      hospital: "Hospital São Lucas",
      specialty: "Clínica Médica",
      date: format(new Date('2024-03-20'), "dd 'de' MMMM", { locale: ptBR }),
      time: "07:00 - 19:00",
      price: 1500,
      location: "São Paulo, SP",
      description: "Plantão na emergência. Necessário experiência em atendimento de urgência.",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 'shift2',
      hospital: "Hospital Santa Casa",
      specialty: "Pediatria",
      date: format(new Date('2024-03-22'), "dd 'de' MMMM", { locale: ptBR }),
      time: "19:00 - 07:00",
      price: 1800,
      location: "São Paulo, SP",
      description: "Plantão no pronto-atendimento pediátrico."
    },
    {
      id: 'shift3',
      hospital: "Hospital Albert Einstein",
      specialty: "Clínica Médica",
      date: format(new Date('2024-03-25'), "dd 'de' MMMM", { locale: ptBR }),
      time: "07:00 - 19:00",
      price: 2000,
      location: "São Paulo, SP",
      description: "Plantão na UTI. Experiência em terapia intensiva será um diferencial."
    }
  ], [])

  const filteredShifts = useMemo(() => {
    return shifts.filter(shift => {
      const searchTermLower = searchTerm.toLowerCase().trim()
      const matchesSearch = !searchTermLower || 
        shift.hospital.toLowerCase().includes(searchTermLower) ||
        shift.specialty.toLowerCase().includes(searchTermLower) ||
        shift.location.toLowerCase().includes(searchTermLower)
      
      const matchesSpecialty = selectedSpecialty === 'Todas' || shift.specialty === selectedSpecialty
      const matchesCity = !selectedCity || shift.location.toLowerCase().includes(selectedCity)
      
      const [min, max] = selectedValue.split('-').map(Number)
      const pricePerHour = shift.price / 12 // assumindo plantão de 12h
      const matchesValue = !selectedValue || 
        (min && max ? pricePerHour >= min && pricePerHour <= max : pricePerHour >= Number(selectedValue.replace('+', '')))
      
      return matchesSearch && matchesSpecialty && matchesCity && matchesValue
    })
  }, [shifts, searchTerm, selectedSpecialty, selectedCity, selectedValue])

  const sortedAndFilteredShifts = useMemo(() => {
    let result = filteredShifts

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // Mantém a ordem original (mais recentes)
        break
    }

    return result
  }, [filteredShifts, sortBy])

  const handleApply = useCallback(async (shift: Shift) => {
    if (!user) {
      setSelectedShift(shift)
      setIsLoginModalOpen(true)
      return
    }
    // Lógica para se candidatar ao plantão
    toast.success('Candidatura realizada com sucesso!')
  }, [user])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const toggleFavorite = useCallback((shiftId: string) => {
    if (!user) {
      setIsLoginModalOpen(true)
      return
    }

    setFavoriteShifts(prev => 
      prev.includes(shiftId) 
        ? prev.filter(id => id !== shiftId)
        : [...prev, shiftId]
    )
    
    toast.success(
      favoriteShifts.includes(shiftId) 
        ? 'Plantão removido dos favoritos'
        : 'Plantão adicionado aos favoritos'
    )
  }, [user, favoriteShifts])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Estatísticas */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Encontre os melhores plantões
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-12">
            Conectamos os melhores hospitais com médicos qualificados. 
            Encontre oportunidades que se encaixam na sua agenda.
          </p>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-2xl font-bold text-white">150+</p>
                  <p className="text-blue-200">Hospitais Parceiros</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <UserGroupIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-2xl font-bold text-white">2.500+</p>
                  <p className="text-blue-200">Médicos Ativos</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-4">
                <CheckBadgeIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <p className="text-2xl font-bold text-white">10.000+</p>
                  <p className="text-blue-200">Plantões Realizados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Busca Melhorada */}
          <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Busque por hospital ou especialidade..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              <MapPinIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <ChevronDownIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {PRICE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <BanknotesIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <ChevronDownIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
        {/* Hospitais em Destaque */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Hospitais em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_HOSPITALS.map((hospital) => (
              <div key={hospital.id} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold">{hospital.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm">{hospital.rating}</span>
                    </div>
                    <span className="text-sm">{hospital.shifts} plantões</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros e Ordenação */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SPECIALTIES.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty as Specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  (specialty === 'Todas' && selectedSpecialty === 'Todas') || selectedSpecialty === specialty
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-500'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <ArrowsUpDownIcon className="h-5 w-5" />
                Ordenar por
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none">
                {SORT_OPTIONS.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy(option.value)}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } ${
                          sortBy === option.value ? 'text-blue-600' : 'text-gray-700'
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>

            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filtros
            </button>
          </div>
        </div>

        {/* Lista de Plantões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredShifts.map((shift) => (
            <div
              key={shift.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                isHovered === shift.id ? 'transform -translate-y-1 shadow-md border-blue-200' : ''
              }`}
              onMouseEnter={() => setIsHovered(shift.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{shift.hospital}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <AcademicCapIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{shift.specialty}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(shift.id)}
                    className={`transition-colors ${
                      favoriteShifts.includes(shift.id) 
                        ? 'text-red-500' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <HeartIcon className={`h-6 w-6 ${
                      favoriteShifts.includes(shift.id) ? 'fill-current' : ''
                    }`} />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{shift.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{shift.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{shift.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">{shift.rating}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(shift.rating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({shift.reviews})</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    R$ {shift.price.toLocaleString('pt-BR')}
                  </span>
                </div>

                <button
                  onClick={() => handleApply(shift)}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isHovered === shift.id
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Candidatar-se
                  <ArrowRightIcon className={`w-4 h-4 transition-transform duration-300 ${
                    isHovered === shift.id ? 'transform translate-x-1' : ''
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShifts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black">
              Nenhum plantão encontrado com os filtros selecionados.
            </p>
          </div>
        )}

        <Transition appear show={isLoginModalOpen} as={Fragment}>
          <Dialog 
            as="div" 
            className="relative z-50" 
            onClose={() => setIsLoginModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-black mb-4"
                    >
                      Faça login para se candidatar
                    </Dialog.Title>

                    {selectedShift && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-black">{selectedShift.hospital}</p>
                        <p className="text-sm text-black">{selectedShift.specialty}</p>
                        <p className="text-sm text-black mt-2">
                          {selectedShift.date} • {selectedShift.time}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 space-y-4">
                      <Link
                        href="/entrar"
                        className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Fazer Login
                      </Link>
                      
                      <div className="text-center">
                        <p className="text-sm text-black">
                          Ainda não tem uma conta?{' '}
                          <Link
                            href="/cadastro"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Cadastre-se →
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </div>
  )
} 