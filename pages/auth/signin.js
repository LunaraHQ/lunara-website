// pages/auth/signin.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {err && <p className="text-red-600 mb-4">{err}</p>}
        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
