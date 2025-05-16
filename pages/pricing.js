// pages/pricing.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

const ALL_FEATURES = [
  'meetings-events','sales-funnel','cx-management','crm',
  'ai-chatbot-automation','analytics','team-management',
  'ecommerce-tools','loyalty-membership'
]

export default function Pricing() {
  const [loading, setLoading] = useState(true)
  const [unlocked, setUnlocked] = useState([])
  const [selected, setSelected] = useState([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session
      if (!s) return router.push('/auth/signin')
      supabase
        .from('profiles')
        .select('features')
        .eq('id', s.user.id)
        .single()
        .then(({ data }) => {
          setUnlocked(Array.isArray(data.features) ? data.features : [])
          setLoading(false)
        })
    })
  }, [])

  if (loading) return <p className="p-6">Loading…</p>

  const toUnlock = ALL_FEATURES.filter((f) => !unlocked.includes(f))

  const toggle = (slug) => {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
  }
  const handleCheckout = () => {
    // later point to real payment route
    router.push(`/checkout?features=${selected.join(',')}`)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Select Features to Unlock</h1>
      {toUnlock.length === 0 ? (
        <p>All features already unlocked! 🎉</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCheckout()
          }}
        >
          <ul className="space-y-3 mb-6">
            {toUnlock.map((slug) => (
              <li key={slug} className="flex items-center">
                <input
                  id={slug}
                  type="checkbox"
                  className="mr-3"
                  checked={selected.includes(slug)}
                  onChange={() => toggle(slug)}
                />
                <label htmlFor={slug}>{slug.replace(/-/g, ' ')}</label>
              </li>
            ))}
          </ul>
          <button
            disabled={selected.length === 0}
            className={`px-5 py-2 rounded ${
              selected.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-700 hover:bg-purple-600 text-white'
            }`}
          >
            Checkout & Continue
          </button>
        </form>
      )}
    </div>
  )
}
