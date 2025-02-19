import Header from '@/components/layout/Header'
import HeroSection from '@/components/home/HeroSection'
import AvailableShifts from '@/components/home/AvailableShifts'

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <HeroSection />
      <AvailableShifts />
    </main>
  )
} 