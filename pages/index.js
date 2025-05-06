
import Head from 'next/head'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>LunaraHQ</title>
      </Head>
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-30 z-0" />
      <header className="relative z-10 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">Lunara</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#beta" className="bg-white text-black px-4 py-2 rounded-lg font-semibold">Join Beta</a>
        </nav>
      </header>
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Launch from the Moon.</h2>
        <p className="text-lg md:text-xl max-w-xl mb-8">
          AI-powered sales orchestration for elite teams. Automate funnels, meeting
          insights, and CRM intelligence.
        </p>
        <a href="#beta" className="bg-white text-black px-6 py-3 rounded-full font-semibold text-lg">
          Request Early Access
        </a>
      </section>
    </div>
  )
}
