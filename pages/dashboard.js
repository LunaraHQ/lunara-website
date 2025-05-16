// pages/dashboard.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import {
  Calendar,
  BarChart3,
  Smile,
  Bot,
  Users,
  ShoppingCart,
  Gift,
} from 'lucide-react'

const ALL_FEATURES = [
  { name: 'Meetings & Events', slug: 'meetings-events', description: 'Host events, manage RSVPs, send reminders.', icon: Calendar },
  { name: 'Sales Funnel', slug: 'sales-funnel', description: 'Lead capture, campaigns, pipeline.', icon: BarChart3 },
  { name: 'CX Management', slug: 'cx-management', description: 'Surveys, reviews, guest feedback.', icon: Smile },
  { name: 'AI Chatbot & Automation', slug: 'ai-chatbot-automation', description: '24/7 support, lead qualification.', icon: Bot },
  { name: 'CRM & Client Management', slug: 'crm', description: 'Track client interactions, forecasting.', icon: Users },
  { name: 'Analytics & Reporting', slug: 'analytics', description: 'Dashboards, KPIs, predictions.', icon: BarChart3 },
  { name: 'E-commerce Tools', slug: 'ecommerce-tools', description: 'Storefront, payments, inventory.', icon: ShoppingCart },
  { name: 'Loyalty & Membership', slug: 'loyalty-membership', description: 'Rewards, tiers, subscriptions.', icon: Gift },
  { name: 'Team Management', slug: 'team-management', description: 'Roles, permissions, collaboration.', icon: Users },
]

// server-side redirect if not logged in
export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return { redirect: { destination: '/auth/signin', permanent: false } }
  }
  return { props: {} }
}

export default function Dashboard() {
  const [profile, setProfile] = useState({ name: '', features: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session
      if (s) {
        supabase
          .from('profiles')
          .select('name,features')
          .eq('id', s.user.id)
          .single()
          .then(({ data }) => {
            setProfile({ name: data.name, features: Array.isArray(data.features) ? data.features : [] })
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) return <p className="p-6">Loading…</p>

  const firstName = profile.name.split(' ')[0] || ''
  const unlocked = profile.features.map((f) => f.toLowerCase())

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-6">
      <h1 className="text-3xl font-bold text-white mb-2">Welcome, {firstName}!</h1>
      <p className="text-purple-200 mb-8">
        Preview any of Lunara’s modules below. Upgrade to unlock full access!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_FEATURES.map(({ name, slug, description, icon: Icon }) => {
          const isUnlocked = unlocked.includes(slug)
          const href = isUnlocked ? `/features/${slug}` : '/dashboard/add-features'

          return (
            <Link href={href} key={slug}>
              <a className="block group">
                <div className="relative p-6 bg-purple-800 rounded-lg hover:bg-purple-700 transition">
                  <Icon className="w-10 h-10 text-purple-300 mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-1">{name}</h2>
                  <p className="text-purple-200">{description}</p>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="px-3 py-1 bg-purple-600 text-white rounded">Click to Unlock</span>
                    </div>
                  )}
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
