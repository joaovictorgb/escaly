'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 lg:pt-20 xl:pt-12 pb-0">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-12 lg:pt-16">
          {/* Texto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left lg:flex-1 lg:pt-12 lg:pl-8 xl:pl-12"
          >
            <h1 className="text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] leading-[1.2] font-bold text-gray-900 max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              Descubra plantões{' '}
              <span className="text-blue-600">disponíveis</span>{' '}
              onde você estiver, sem burocracia e sem contratos.
            </h1>
            <p className="text-[15px] md:text-base lg:text-base text-gray-600 leading-relaxed font-medium mt-6 max-w-2xl mx-auto lg:mx-0 lg:max-w-[85%]">
              Conectamos médicos a oportunidades ideais, tudo de forma simples e rápida, 
              sem precisar de contratos ou passar horas buscando plantões em aberto.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Link
                href="/cadastro-medico"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-base inline-block hover:bg-blue-700 transition-colors w-full md:w-auto text-center"
              >
                Saiba mais
              </Link>
            </motion.div>
          </motion.div>

          {/* Imagem do Celular */}
          <motion.div 
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-16 lg:mt-0 flex justify-center lg:justify-end lg:flex-1"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/30 rounded-t-[3rem] lg:rounded-[3rem]"></div>
            <motion.div
              className="relative z-10 w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] mx-auto lg:mx-0"
            >
              <Image
                src="/headerimg.avif"
                alt="Preview do aplicativo Escala"
                width={400}
                height={800}
                priority
                className="w-full h-auto rounded-[2rem] shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 