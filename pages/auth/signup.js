// pages/auth/signup.js
import React, { useState } from 'react'
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function SignUp() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/auth/signin'), 3000)
    }
  }

  return (
    <>
      <Head><title>Sign Up | Lunara</title></Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-4">Create your Lunara account</h1>
        {success ? (
          <p className="text-green-400">Check your email to confirm and then sign in...</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-500 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/auth/signin" className="underline">Sign In</a>
        </p>
      </div>
    </>
  )
}
