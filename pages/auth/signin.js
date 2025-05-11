// pages/auth/signin.js

import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="space-y-6 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center">
          Sign in to LunaraHQ
        </h1>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return { props: { providers } }
}
