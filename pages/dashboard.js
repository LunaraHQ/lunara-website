// pages/dashboard.js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
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

const features = [
  {
    title: 'Meetings & Events',
    slug: 'meetings-events',
    icon: Calendar,
    desc: 'Event booking, registration, reminders',
  },
  {
    title: 'Sales Funnel',
    slug: 'sales-funnel',
    icon: TrendingUp,
    desc: 'Lead capture, campaigns, pipeline',
  },
  {
    title: 'CX Management',
    slug: 'cx-management',
    icon: Smile,
    desc: 'Surveys, reviews, guest feedback',
  },
  {
    title: 'CRM & Client Management',
    slug: 'crm-client-management',
    icon: Users,
    desc: 'Track client interactions, forecasting',
  },
  {
    title: 'AI Chatbot & Automation',
    slug: 'ai-chatbot-automation',
    icon: Bot,
    desc: '24/7 support, lead qualification',
  },
  {
    title: 'Analytics & Reporting',
    slug: 'analytics-reporting',
    icon: BarChart3,
    desc: 'Dashboards, KPIs, predictions',
  },
  {
    title: 'Team Management',
    slug: 'team-management',
    icon: Users,
    desc: 'Shifts, tasks, staff comms',
  },
  {
    title: 'E-commerce Tools',
    slug: 'ecommerce-tools',
    icon: ShoppingCart,
    desc: 'Cart recovery, checkout boost',
  },
  {
    title: 'Loyalty & Membership',
    slug: 'loyalty-membership',
    icon: Gift,
    desc: 'Rewards, memberships, offers',
  },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return // Wait for session to load
    if (!session) {
      router.push("/auth/signin")
    } else {
      setLoading(false)
    }
  }, [session, status, router])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-200 mb-2">
            Welcome{session?.user?.name ? `, ${session.user.name}` : ''}!
          </h1>
          <p className="text-gray-300">
            Preview any of Lunara’s modular business features below. Upgrade to unlock full access!
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ title, slug, icon: Icon, desc }) => (
            <div
              key={slug}
              className="bg-black/80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-purple-700"
            >
              <Icon className="w-16 h-16 mb-4 text-purple-300" />
              <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
              <p className="text-gray-400 text-sm mb-6">{desc}</p>
              <Link
                href={`/features/${slug}`}
                className="mb-2 w-full inline-block rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white font-semibold px-6 py-2 transition cursor-pointer hover:from-purple-500 hover:to-purple-700"
              >
                Preview
              </Link>
              <button
                className="w-full py-2 rounded-full bg-gray-700 text-gray-300 font-semibold cursor-not-allowed"
                disabled
                title="Subscribe to use this feature"
              >
                Use (Subscribe)
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-purple-400 hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
