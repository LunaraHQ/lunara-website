import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function HeroSection() {
  const [session, setSession] = useState(null)
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setSession(data.session)
        setUserName(data.session.user.user_metadata?.name || data.session.user.email)
      }
    }
    loadSession()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setUserName(session.user.user_metadata?.name || session.user.email)
      }
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    window.location.href = '/'
  }

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 min-h-[70vh] overflow-hidden">
      {/* Space gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a103e]/90 via-[#6E41FFee]/90 to-[#130b24]/90 pointer-events-none" />
      {/* Nebula/star accent overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 15%, #8C64FF33 0%, transparent 50%)," +
            "radial-gradient(circle at 25% 80%, #6E41FF22 0%, transparent 60%)," +
            "radial-gradient(circle at 60% 60%, #fff3 1.5px, transparent 40%)," +
            "radial-gradient(circle at 25% 20%, #fff1 1.2px, transparent 30%)"
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl">
        {/* Logo */}
        <motion.img
          src="/images/lunara-logo.png"
          alt="Lunara"
          className="w-auto h-[8rem] md:h-[11rem] mx-auto mb-8 object-contain drop-shadow-[0_8px_36px_#8C64FF55]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="text-2xl md:text-3xl font-semibold text-[#e0d3fc] max-w-xl drop-shadow-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Your Business. Your Features. One SaaS.
        </motion.p>
        <motion.p
          className="mt-2 text-md md:text-lg text-[#b2a1e3] max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Modular business solutions tailored for your industry. Pay only for what you use.
        </motion.p>

        {/* Buttons */}
        <div className="w-full mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          {session ? (
            <>
              <span className="text-white font-medium px-4 py-2 rounded-xl bg-[#23194b]/80">
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="px-8 py-3 rounded-full bg-gradient-to-br from-red-600 via-[#8C64FF] to-[#6E41FF] text-white font-semibold shadow-xl hover:scale-105 transition border border-red-400/50"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="px-8 py-3 rounded-full bg-gradient-to-br from-[#8C64FF] via-[#6E41FF] to-[#322769] text-white font-semibold shadow-xl hover:scale-105 transition border border-[#6E41FF]/30"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/signin"
                className="px-8 py-3 rounded-full bg-[#23194b] border border-[#8C64FF] text-[#8C64FF] font-semibold shadow-xl hover:scale-105 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
