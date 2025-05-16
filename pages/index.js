// pages/index.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import HeroSection from '../components/HeroSection'
import HomeContent from '../components/HomeContent'
import { supabase } from '../utils/supabaseClient'

// Lazy-load below-the-fold components
const HowItWorks = dynamic(() => import('../components/HowItWorks'), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading…</p>,
})
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
})

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [router])

  return (
    <>
      <Head>
        <title>Lunara – Launch Beyond</title>
        <meta
          name="description"
          content="Lunara is your sales-focused SaaS funnel builder. Launch from the moon."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="main-content">
        <HeroSection />
        <HomeContent />
        <HowItWorks />
      </main>

      <Footer />
    </>
  )
}
