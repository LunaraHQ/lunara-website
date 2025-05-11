// pages/dashboard.js
import React from 'react'
import Head from 'next/head'
import { getSession, useSession, signOut } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export default function Dashboard({ entries }) {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Dashboard | Lunara</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-purple-700 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Lunara Dashboard</h1>
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-white text-purple-700 px-3 py-1 rounded"
            >
              Sign Out
            </button>
          )}
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Waitlist Signups</h2>
          {entries.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Signed Up At</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((row) => (
                    <tr key={row.id} className="border-b even:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{row.email}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(row.inserted_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No signups yet.</p>
          )}

          <div className="mt-6">
            <Link href="/">
              <a className="text-purple-700 hover:underline">&larr; Back to Home</a>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

// Server-side rendering and protection
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin?callbackUrl=/dashboard',
        permanent: false,
      },
    }
  }

  // Fetch waitlist entries using Service Role key
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  const { data, error } = await supabase
    .from('waitlist')
    .select('id, email, inserted_at')
    .order('inserted_at', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
  }

  return {
    props: {
      entries: data || [],
    },
  }
}
