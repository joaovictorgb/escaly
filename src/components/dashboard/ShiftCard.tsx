'use client'

import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

interface ShiftCardProps {
  hospital: string
  specialty: string
  date: string
  time: string
  price: number
  location: string
  status: 'available' | 'applied' | 'active' | 'filled'
  doctorName?: string
  applicantsCount?: number
  onApply?: () => Promise<void>
  onCancel?: () => Promise<void>
  onViewApplicants?: () => void
  disabled?: boolean
}

export default function ShiftCard({
  hospital,
  specialty,
  date,
  time,
  price,
  location,
  status,
  doctorName,
  applicantsCount,
  onApply,
  onCancel,
  onViewApplicants,
  disabled
}: ShiftCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{hospital}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
        <span className="text-lg font-bold text-blue-600">
          R$ {price.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <ClockIcon className="w-5 h-5 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
      </div>

      {status === 'available' && onApply && (
        <button
          onClick={onApply}
          disabled={disabled}
          className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Processando...' : 'Candidatar-se'}
        </button>
      )}

      {status === 'applied' && onCancel && (
        <button
          onClick={onCancel}
          disabled={disabled}
          className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Processando...' : 'Cancelar Candidatura'}
        </button>
      )}

      {status === 'active' && onViewApplicants && (
        <button
          onClick={onViewApplicants}
          className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Ver Candidatos ({applicantsCount})
        </button>
      )}

      {status === 'filled' && doctorName && (
        <div className="flex items-center justify-center py-2 bg-green-50 text-green-700 rounded-lg text-sm">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Preenchido por {doctorName}
        </div>
      )}
    </div>
  )
} 