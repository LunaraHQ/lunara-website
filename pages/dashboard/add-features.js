import React from 'react'
import { useRouter } from 'next/router'
import DashboardSidebar from '../../components/DashboardSidebar'
import { Lock } from 'lucide-react'

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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gradient-to-b from-purple-800 via-purple-900 to-black p-8">
        <div className="max-w-3xl mx-auto bg-black/70 rounded-2xl shadow-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Add More Features</h1>
          <p className="text-gray-300">
            All modules are locked. Please upgrade your plan to unlock new features.
          </p>
          <ul className="space-y-3">
            {ALL_FEATURES.map(({ name, slug }) => (
              <li key={slug} className="flex items-center space-x-3 text-gray-300">
                <Lock className="w-5 h-5 opacity-60" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <button
              onClick={() => router.push('/pricing')}
              className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow transition"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
