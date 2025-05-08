// pages/index.js
import Head from 'next/head'
import dynamic from 'next/dynamic'
import HeroSection from '../components/HeroSection'
import HomeContent from '../components/HomeContent'

// Lazy-load below-the-fold components
const HowItWorks = dynamic(() => import('../components/HowItWorks'), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading…</p>,
})
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
})

export default function Home() {
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

      {/* Main content anchor for Skip link */}
      <main id="main-content">
        <HeroSection />
        <HomeContent />
        <HowItWorks />
      </main>

      <Footer />
    </>
  )
}
