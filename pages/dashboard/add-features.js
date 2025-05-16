// pages/dashboard/add-features.js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import DashboardSidebar from '../../components/DashboardSidebar'
import { Checkbox } from 'lucide-react'

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

export default function AddFeatures() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const [selected, setSelected] = useState([])

  // Load user & profile
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return router.replace('/auth/signin')
      const { data } = await supabase
        .from('profiles')
        .select('features')
        .eq('id', session.user.id)
        .single()
      setProfile(data)
      setSelected(Array.isArray(data.features) ? data.features : [])
      setLoading(false)
    })()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
        Loading…
      </div>
    )
  }

  const toggleFeature = (slug) => {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(f => f !== slug)
        : [...prev, slug]
    )
  }

  const handleSave = async () => {
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ features: selected })
      .eq('id', profile.id)
    setSaving(false)
    if (error) {
      alert('Failed to save. Please try again.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gradient-to-b from-purple-800 via-purple-900 to-black p-8">
        <div className="max-w-3xl mx-auto bg-black/70 rounded-2xl shadow-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Add or Remove Features</h1>
          <p className="text-gray-300">
            Select the modules you’d like to enable on your dashboard.
          </p>
          <ul className="space-y-3">
            {ALL_FEATURES.map(({ name, slug }) => (
              <li key={slug}>
                <button
                  onClick={() => toggleFeature(slug)}
                  className="flex items-center space-x-3 w-full text-left"
                >
                  <span className={`p-1 rounded-full border-2 ${
                    selected.includes(slug)
                      ? 'border-green-400 bg-green-500'
                      : 'border-gray-600'
                  }`}>
                    <Checkbox className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-white">{name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow disabled:opacity-50 transition"
            >
              {saving ? 'Saving…' : 'Save Features'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
