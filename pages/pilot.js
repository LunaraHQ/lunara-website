// pages/pilot.js
import Head from 'next/head'
import Link from 'next/link'

export default function Pilot() {
  return (
    <>
      <Head>
        <title>Pilot Programme | Lunara</title>
        <meta name="description" content="Be among the first to shape the future of business management with the Lunara Pilot Programme. Early access, direct input, and priority onboarding for hospitality, retail, and service leaders." />
      </Head>
      <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#6E41FF] via-[#231350] to-black px-4 py-16">
        <section className="relative bg-black/80 backdrop-blur-xl border border-purple-800 p-10 rounded-2xl shadow-2xl max-w-xl w-full flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-purple-300 via-purple-200 to-white drop-shadow-xl leading-snug">
            Lunara Pilot<br />Programme
          </h1>
          <p className="mb-6 text-lg text-gray-200 font-medium">
            Be among the first to shape the future of business management.<br /><br />
            <span className="font-bold text-purple-300">Lunara’s Pilot Programme</span> gives you early access to our modular SaaS platform, built for hospitality, retail, and service industries.<br /><br />
            As a pilot user, enjoy exclusive previews, priority onboarding, and a direct voice in our roadmap.
          </p>
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-br from-purple-700 to-fuchsia-800 text-white px-5 py-2 rounded-full font-semibold tracking-wide shadow-lg">
              Limited Spaces Available
            </span>
          </div>
          <p className="mb-8 text-base md:text-lg text-purple-100">
            Ready to upgrade your business?<br />
            <span className="font-semibold text-white">Sign up now to join the waitlist.</span>
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-gradient-to-br from-purple-500 to-fuchsia-700 text-white font-semibold px-8 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Sign Up for Pilot
          </Link>
        </section>
      </main>
    </>
  )
}
