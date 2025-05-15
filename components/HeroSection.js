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
      {/* 1) Your PNG as full-screen background */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/hero-landing.png"
          alt="Lunara Landing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2) Gradient overlay */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/30 to-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* 3) Title, copy & form */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Lunara
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-purple-300 mb-4 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        AI-powered funnels built for orbit.
      </motion.p>
      <motion.p
        className="text-md md:text-lg text-gray-400 mb-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Scalable. Secure. Stunningly simple.
      </motion.p>

      {submitted ? (
        <motion.p
          className="text-lg text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          🎉 Thanks! Check your inbox for confirmation.
        </motion.p>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
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
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </section>
  )
}
