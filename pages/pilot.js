// pages/pilot.js
import Head from 'next/head'
import Link from 'next/link'

export default function Pilot() {
  return (
    <>
      <Head>
        <title>Pilot Programme | Lunara</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4 py-16">
        <div className="bg-black/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-purple-200">Lunara Pilot Programme</h1>
          <p className="mb-6 text-lg text-gray-200">
            Be among the first to shape the future of business management.<br /><br />
            <strong>Lunara’s Pilot Programme</strong> is your chance to get early access to our modular SaaS platform—tailored for hospitality, retail, and service businesses.<br /><br />
            As a pilot user, you'll get exclusive previews, priority onboarding, and direct input into new feature development.
          </p>
          <div className="mb-6">
            <span className="inline-block bg-purple-700 text-white px-4 py-2 rounded-full font-semibold">
              Limited Spaces Available
            </span>
          </div>
          <p className="mb-8 text-gray-300">
            Ready to upgrade your business?<br />
            <strong>Sign up now to join the waitlist.</strong>
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-xl hover:scale-105"
          >
            Sign Up for Pilot
          </Link>
        </div>
      </div>
    </>
  )
}
