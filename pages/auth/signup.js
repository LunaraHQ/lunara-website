// pages/auth/signup.js
import React, { useState } from 'react'
import Head from 'next/head'
import { signIn } from 'next-auth/react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleEmailSignUp = async (e) => {
    e.preventDefault()
    // trigger the same magic link flow
    await signIn('email', { email, callbackUrl: '/' })
    setSent(true)
  }

  return (
    <>
      <Head>
        <title>Sign Up | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-6">Create your Lunara account</h1>
        <p className="mb-8 text-gray-400">Enter your email, and we’ll send you a magic link to get started.</p>

        <div className="w-full max-w-xs space-y-4">
          <form onSubmit={handleEmailSignUp} className="flex flex-col space-y-3">
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
              {sent ? 'Link Sent!' : 'Send Magic Link'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have a link?{' '}
            <a href="/auth/signin" className="underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
