// pages/auth/signup.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../../utils/supabaseClient'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.password2) {
      setError('Passwords do not match. Please re-enter.')
      return
    }
    setLoading(true)
    try {
      // 1. Sign up with Supabase Auth, storing name in user_metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { name: form.name },
        }
      })
      if (signUpError) {
        setError(signUpError.message || 'Sign up failed.')
        setLoading(false)
        return
      }

      // 2. Insert into profiles table (after sign up is successful)
      // (user id is in data.user.id)
      const user = data?.user
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: user.id, email: form.email, name: form.name }
          ])
        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Optionally show error, but still continue
        }
      }

      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin?newaccount=true')
      }, 2500)
    } catch (err) {
      setLoading(false)
      setError('Sign up failed. Please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4">
        <div className="bg-black/80 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          {/* Larger Lunara Logo */}
          <img
            src="/images/lunara-logo.png"
            alt="Lunara"
            className="mx-auto mb-6 h-28 w-auto object-contain"
          />
          <h1 className="text-3xl font-extrabold text-purple-200 mb-6">Sign Up</h1>
          {error && (
            <div className="mb-4 text-red-500 font-semibold text-center">{error}</div>
          )}
          {success ? (
            <div className="mb-4 text-green-400 font-semibold text-center">
              Signup successful! Please check your email to verify your account.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
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
              <input
                type="password"
                name="password2"
                placeholder="Repeat Password"
                value={form.password2}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          )}
          <div className="mt-4">
            <a
              href="/auth/signin"
              className="text-purple-400 hover:underline transition"
            >
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
