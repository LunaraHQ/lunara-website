import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import HomeContent from '../components/HomeContent'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunara – Launch Beyond</title>
        <meta name="description" content="Lunara is your sales-focused SaaS funnel builder. Launch from the moon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <HomeContent />
      <Footer />
    </>
  )
}
