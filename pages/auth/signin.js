// pages/auth/signin.js
import React, { useState } from 'react'
import Head from 'next/head'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn('email', {
      email,
      callbackUrl: '/',
    })
    setSent(true)
  }

  return (
    <>
      <Head>
        <title>Sign In | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-4">Sign In to Lunara</h1>
        <p className="mb-6 text-gray-400">Enter your email and we’ll send a sign-in link</p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={sent}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition disabled:opacity-50"
          >
            {sent ? 'Link Sent!' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="underline">
            Sign Up
          </a>
        </p>
      </div>
    </>
  )
}
