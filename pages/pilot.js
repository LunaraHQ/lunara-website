// pages/pilot.js
import React, { useState } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'

export default function PilotPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Network response was not ok')
      setSubmitted(true)
    } catch {
      setError('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Pilot Program | Lunara</title>
        <meta name="description" content="Apply for Lunara’s exclusive Pilot Program." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-4 text-center">Join Our Pilot Program</h1>
          <p className="text-gray-600 mb-6 text-center">
            Be one of the first to try Lunara’s AI-powered funnels. Free 3-month access, personalized onboarding, direct feedback channel.
          </p>

          {submitted ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-2">🎉 Thanks for applying!</p>
              <p>We’ll be in touch soon with next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-purple-500 to-purple-700 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Apply for Pilot'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
