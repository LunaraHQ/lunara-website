// pages/auth/signup.js
import React from 'react'
import Head from 'next/head'
import { getProviders, signIn } from 'next-auth/react'

export default function SignUp({ providers }) {
  return (
    <>
      <Head>
        <title>Sign Up | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-4xl font-extrabold mb-6">Create your Lunara account</h1>
        <p className="mb-8 text-gray-400">Choose a provider to get started</p>

        <div className="space-y-4 w-full max-w-xs">
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
            >
              Sign up with {provider.name}
            </button>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/auth/signin" className="underline">
            Sign in
          </a>
        </p>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return { props: { providers } }
}
