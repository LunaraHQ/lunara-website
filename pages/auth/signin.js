// pages/auth/signin.js
import React from 'react'
import Head from 'next/head'
import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers, callbackUrl }) {
  return (
    <>
      <Head>
        <title>Sign In | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-6">Welcome back to Lunara</h1>
        <p className="mb-8 text-gray-400">Sign in to access your dashboard</p>

        <div className="space-y-4 w-full max-w-xs">
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, { callbackUrl: callbackUrl || '/' })
              }
              className="w-full flex items-center justify-center gap-3 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="underline">
            Sign up
          </a>
        </p>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const callbackUrl = context.query.callbackUrl || '/'
  return {
    props: { providers, callbackUrl: decodeURIComponent(callbackUrl) },
  }
}
