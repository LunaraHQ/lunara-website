// pages/auth/signin.js
import React, { useState } from 'react'
import Head from 'next/head'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (res.error) setError(res.error)
    else window.location.href = '/'
  }

  return (
    <>
      <Head><title>Sign In | Lunara</title></Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-4">Sign In to Lunara</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-500 text-white"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-500 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Don’t have an account? <a href="/auth/signup" className="underline">Sign Up</a>
        </p>
      </div>
    </>
  )
}
