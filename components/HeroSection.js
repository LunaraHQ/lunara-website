// components/HeroSection.js
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700 via-purple-800 to-black opacity-70" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl">
        {/* Logo */}
        <motion.img
          src="/images/lunara-logo.png"
          alt="Lunara"
          className="w-auto h-[8rem] md:h-[11rem] mx-auto mb-8 object-contain"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="text-2xl md:text-3xl font-semibold text-purple-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Your Business. Your Features. One SaaS.
        </motion.p>
        <motion.p
          className="mt-2 text-md md:text-lg text-gray-300 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Modular business solutions tailored for your industry. Pay only for what you use.
        </motion.p>

        {/* Sign Up / Sign In Buttons */}
        <div className="w-full mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold shadow-xl hover:scale-105 transition"
          >
            Sign Up
          </Link>
          <Link
            href="/auth/signin"
            className="px-8 py-3 rounded-full bg-purple-700 text-white font-semibold shadow-xl hover:scale-105 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}
