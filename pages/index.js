import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'
import HeroSection from '../components/HeroSection'
import HomeContent from '../components/HomeContent'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  if (session) {
    return null // or a spinner if you want a loading state here
  }

  return (
    <main className="bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] min-h-screen flex flex-col">
      <HeroSection />
      <HomeContent />
      <HowItWorks />
      <Footer />
    </main>
  )
}
