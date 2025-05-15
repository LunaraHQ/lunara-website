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
    <section className="flex flex-col items-center text-center">
      {/* === 1) Full-width, natural-size image with fade-out at bottom */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/images/hero-landing.png"
          alt="Lunara Landing"
          className="w-full h-auto object-contain block"
        />
        {/* Fade to black (or whatever your next section bg is) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* === 2) Content underneath */}
      <div className="mt-8 px-6 max-w-3xl">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Lunara
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-purple-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          AI-powered funnels built for orbit.
        </motion.p>
        <motion.p
          className="mt-2 text-sm md:text-base text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Scalable. Secure. Stunningly simple.
        </motion.p>

        {submitted ? (
          <motion.p
            className="mt-6 text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            🎉 Thanks! Check your inbox for confirmation.
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
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
              className="w-full sm:w-auto flex-1 px-4 py-3 rounded-full border border-gray-600 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </motion.form>
        )}
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </section>
  )
}
