// pages/pricing.js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import DashboardSidebar from '../components/DashboardSidebar'
import { Lock, CheckCircle } from 'lucide-react'

const ALL_FEATURES = [
  { name: 'Meetings & Events', slug: 'meetings-events' },
  { name: 'Sales Funnel', slug: 'sales-funnel' },
  { name: 'CX Management', slug: 'cx-management' },
  { name: 'CRM & Client Management', slug: 'crm-client-management' },
  { name: 'AI Chatbot & Automation', slug: 'ai-chatbot-automation' },
  { name: 'Analytics & Reporting', slug: 'analytics-reporting' },
  { name: 'Team Management', slug: 'team-management' },
  { name: 'E-commerce Tools', slug: 'ecommerce-tools' },
  { name: 'Loyalty & Membership', slug: 'loyalty-membership' },
]

export default function Pricing() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return router.replace('/auth/signin')
      const { data } = await supabase
        .from('profiles')
        .select('id, features')
        .eq('id', session.user.id)
        .single()
      setProfile(data)
      setLoading(false)
    })()
  }, [router])

  const unlock = async (slug) => {
    setUpdating(true)
    const updated = [...(profile.features || []), slug]
    const { error } = await supabase
      .from('profiles')
      .update({ features: updated })
      .eq('id', profile.id)
    if (!error) setProfile({ ...profile, features: updated })
    setUpdating(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gradient-to-b from-purple-800 via-purple-900 to-black p-8">
        <div className="max-w-3xl mx-auto bg-black/70 rounded-2xl shadow-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Upgrade Plan</h1>
          <p className="text-gray-300">
            Unlock individual features here. Click “Unlock” to add them to your account.
          </p>
          <ul className="space-y-3">
            {ALL_FEATURES.map(({ name, slug }) => {
              const owned = profile.features?.includes(slug)
              return (
                <li key={slug} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {owned ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-white">{name}</span>
                  </div>
                  {!owned ? (
                    <button
                      onClick={() => unlock(slug)}
                      disabled={updating}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-lg disabled:opacity-50 transition"
                    >
                      {updating ? 'Updating…' : 'Unlock'}
                    </button>
                  ) : (
                    <span className="text-gray-300">Unlocked</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
