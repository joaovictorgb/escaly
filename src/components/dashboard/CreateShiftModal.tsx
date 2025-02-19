'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


interface CreateShiftModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ShiftFormData) => Promise<void>
}

interface ShiftFormData {
  specialty: string
  date: string
  startTime: string
  endTime: string
  price: number
  location: string
  description?: string
}

export default function CreateShiftModal({ isOpen, onClose, onSubmit }: CreateShiftModalProps) {
  const [formData, setFormData] = useState<ShiftFormData>({
    specialty: '',
    date: '',
    startTime: '',
    endTime: '',
    price: 0,
    location: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(formData)
    setFormData({
      specialty: '',
      date: '',
      startTime: '',
      endTime: '',
      price: 0,
      location: '',
      description: ''
    })
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Criar Novo Plantão
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                      Especialidade
                    </label>
                    <input
                      type="text"
                      id="specialty"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Data
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Horário Início
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        Horário Fim
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Localização
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição (opcional)
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Criar Plantão
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 