// pages/pricing.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

const ALL = [
  'meetings-events','sales-funnel','cx-management','crm',
  'ai-chatbot-automation','analytics','team-management',
  'ecommerce-tools','loyalty-membership'
]

export default function Pricing() {
  const [loading, setLoading] = useState(true)
  const [unlocked, setUnlocked] = useState([])
  const [sel, setSel] = useState([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return router.push('/auth/signin')
      supabase
        .from('profiles')
        .select('features')
        .eq('id', data.session.user.id)
        .single()
        .then(({ data }) => {
          setUnlocked(Array.isArray(data.features) ? data.features : [])
          setLoading(false)
        })
    })
  }, [])

  if (loading) return <p className="p-6">Loading…</p>

  const toUnlock = ALL.filter((f) => !unlocked.includes(f))
  const toggle = (s) => setSel((x) => x.includes(s) ? x.filter((i)=>i!==s) : [...x, s])
  const checkout = () => router.push(`/checkout?features=${sel.join(',')}`)

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Select Features to Unlock</h1>
      {toUnlock.length === 0 ? (
        <p>All features unlocked! 🎉</p>
      ) : (
        <form onSubmit={(e)=>{e.preventDefault(); checkout()}}>
          <ul className="space-y-3 mb-6">
            {toUnlock.map((slug) => (
              <li key={slug} className="flex items-center">
                <input
                  id={slug}
                  type="checkbox"
                  className="mr-3"
                  checked={sel.includes(slug)}
                  onChange={()=>toggle(slug)}
                />
                <label htmlFor={slug}>{slug.replace(/-/g,' ')}</label>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            disabled={!sel.length}
            className={`px-5 py-2 rounded ${
              !sel.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-600 text-white'
            }`}
          >
            Checkout & Continue
          </button>
        </form>
      )}
    </div>
  )
}
