// pages/about.js
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white px-4 py-16">
        <div className="bg-black/80 p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-purple-200">About Lunara</h1>
          <p className="mb-6 text-lg text-gray-200">
            Lunara is building the future of business management—modular, scalable, and brilliantly simple.<br /><br />
            Our mission is to empower companies of all sizes to adapt quickly, innovate with confidence, and pay only for what they use.<br /><br />
            Whether you’re in hospitality, retail, healthcare, professional services, or education—Lunara helps you manage sales, events, clients, teams, analytics, and more with unmatched flexibility.
          </p>
          <p className="text-gray-400">
            Built in Ireland. Inspired by possibility. <br />
            <span className="text-purple-300">Lunara – Your Business. Your Features. One SaaS.</span>
          </p>
        </div>
      </div>
    </>
  )
}
