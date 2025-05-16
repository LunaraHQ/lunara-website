import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import {
  Calendar,
  TrendingUp,
  Smile,
  Users,
  Bot,
  BarChart3,
  ShoppingCart,
  Gift,
} from 'lucide-react'
import DashboardSidebar from '../components/DashboardSidebar'

const features = [
  { title: 'Meetings & Events', slug: 'meetings-events', icon: Calendar, desc: 'Event booking, registration, reminders' },
  { title: 'Sales Funnel', slug: 'sales-funnel', icon: TrendingUp, desc: 'Lead capture, campaigns, pipeline' },
  { title: 'CX Management', slug: 'cx-management', icon: Smile, desc: 'Surveys, reviews, guest feedback' },
  { title: 'CRM & Client Management', slug: 'crm-client-management', icon: Users, desc: 'Track client interactions, forecasting' },
  { title: 'AI Chatbot & Automation', slug: 'ai-chatbot-automation', icon: Bot, desc: '24/7 support, lead qualification' },
  { title: 'Analytics & Reporting', slug: 'analytics-reporting', icon: BarChart3, desc: 'Dashboards, KPIs, predictions' },
  { title: 'Team Management', slug: 'team-management', icon: Users, desc: 'Shifts, tasks, staff comms' },
  { title: 'E-commerce Tools', slug: 'ecommerce-tools', icon: ShoppingCart, desc: 'Cart recovery, checkout boost' },
  { title: 'Loyalty & Membership', slug: 'loyalty-membership', icon: Gift, desc: 'Rewards, memberships, offers' },
]

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) return router.push("/auth/signin")
      setUser(data.session.user)
      setLoading(false)
    })()
  }, [router])

  // Sync collapse
  useEffect(() => {
    const handler = () => {
      setSidebarCollapsed(window.localStorage.getItem("lunaraSidebarCollapsed") === "true")
    }
    window.addEventListener('storage', handler)
    handler()
    return () => window.removeEventListener('storage', handler)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 bg-gradient-to-b from-purple-800 via-purple-900 to-black p-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-purple-200">
              Welcome, {user.user_metadata?.name?.split(' ')[0] || user.email}!
            </h1>
            <p className="text-gray-300">
              Preview any of Lunara’s modular business features below. Upgrade to unlock full access!
            </p>
          </header>

          <section className="grid md:grid-cols-3 gap-8">
            {features.map(({ title, slug, icon: Icon, desc }) => (
              <div
                key={slug}
                className="relative bg-black/80 rounded-2xl shadow-xl p-8 text-center border border-purple-700"
              >
                <Icon className="w-16 h-16 mb-4 text-purple-300 mx-auto" />
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-400 mb-6">{desc}</p>
                <Link href={`/features/${slug}`}>
                  <a className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl opacity-0 hover:opacity-100 transition">
                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg">
                      Click to unlock
                    </button>
                  </a>
                </Link>
                <button
                  disabled
                  className="mt-4 w-full py-2 rounded-full bg-gray-700 text-gray-300 cursor-not-allowed"
                >
                  Locked
                </button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
