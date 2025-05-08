import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import FeatureGrid from '../components/FeatureGrid'
import HowItWorks from '../components/HowItWorks'
import PricingTable from '../components/PricingTable'
import Footer from '../components/Footer'
import ThemeToggle from '../components/ThemeToggle'

// Defer heavy HomeContent (starfield + asteroid) to client
const HomeContent = dynamic(() => import('../components/HomeContent'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunara · Space-Age Funnels</title>
      </Head>
      <NavBar />
      <HomeContent />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <PricingTable />
      <Footer />
      <ThemeToggle />
    </>
  )
}
