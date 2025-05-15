// components/HeroSection.js
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Network response was not ok')
      setSubmitted(true)
    } catch {
      setError('Oops! Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Gradient overlay on starry canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700 via-purple-800 to-black opacity-70" />

      {/* Lunara logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <img
          src="/images/lunara-logo.png"
          alt="Lunara"
          className="w-auto h-[15rem] md:h-[21rem]"
        />
      </motion.div>

      {/* Updated Clear SaaS Tagline */}
      <motion.p
        className="mt-4 text-2xl md:text-3xl font-semibold text-purple-300 max-w-xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Your Business. Your Features. One SaaS.
      </motion.p>

      <motion.p
        className="mt-3 text-md md:text-lg text-gray-300 max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Modular AI-powered solutions tailored specifically for your industry. Pay only for what you use.
      </motion.p>

      {submitted ? (
        <motion.p
          className="mt-4 text-lg text-green-400 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          🎉 Thanks! Check your inbox for confirmation.
        </motion.p>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-600 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </motion.form>
      )}

      {error && <p className="mt-2 text-red-500 z-10">{error}</p>}
    </section>
  )
}
