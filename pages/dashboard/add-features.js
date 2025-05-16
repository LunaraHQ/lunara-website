// pages/dashboard/add-features.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '../../utils/supabaseClient'
import { PlusCircle, ChevronRight } from 'lucide-react'

const ALL_FEATURES = [
  'meetings-events','sales-funnel','cx-management','crm',
  'ai-chatbot-automation','analytics','team-management',
  'ecommerce-tools','loyalty-membership'
]

export default function AddFeatures() {
  const [loading, setLoading] = useState(true)
  const [userFeatures, setUserFeatures] = useState([])
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
          setUserFeatures(Array.isArray(data.features) ? data.features : [])
          setLoading(false)
        })
    })
  }, [])

  if (loading) return <p className="p-4">Loading…</p>

  const locked = ALL_FEATURES.filter((s) => !userFeatures.includes(s))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Locked Features</h1>
      {locked.length === 0 ? (
        <p>You’ve unlocked everything! 🎉</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {locked.map((slug) => (
              <li key={slug} className="flex items-center space-x-3 p-4 border rounded-lg">
                <PlusCircle className="w-6 h-6 text-purple-600" />
                <span className="font-medium">{slug.replace(/-/g,' ')}</span>
              </li>
            ))}
          </ul>
          <Link href="/pricing">
            <button className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600">
              Upgrade Plan <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
