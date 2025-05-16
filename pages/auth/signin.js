// pages/auth/signin.js
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (res.error) {
      setError('Check account email or password and try again.')
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>Sign In | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4">
        <div className="bg-black/80 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          {/* Crisp Lunara Logo */}
          <img
            src="/images/lunara-logo.png"
            alt="Lunara"
            className="mx-auto mb-6 h-20 w-auto object-contain"
          />
          <h1 className="text-3xl font-extrabold text-purple-200 mb-6">Sign In</h1>
          {error && (
            <div className="mb-4 text-red-500 font-semibold text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4">
            <a
              href="/auth/signup"
              className="text-purple-400 hover:underline transition"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
