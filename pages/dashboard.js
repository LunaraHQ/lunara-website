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
  // ... your features list ...
]

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/auth/signin")
      } else {
        setUser(data.session.user)
        setLoading(false)
      }
    }
    getSession()
  }, [router])

  // Sync with sidebar state
  useEffect(() => {
    const handler = () => {
      setSidebarCollapsed(window.localStorage.getItem("lunaraSidebarCollapsed") === "true");
    };
    window.addEventListener('storage', handler);
    handler();
    return () => window.removeEventListener('storage', handler);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full">
      <DashboardSidebar />
      <div
        className="absolute top-0 right-0"
        style={{
          left: sidebarCollapsed ? 64 : 220,
          width: `calc(100% - ${sidebarCollapsed ? 64 : 220}px)`,
          minHeight: '100vh',
          transition: 'left 0.3s, width 0.3s',
          background: 'linear-gradient(to bottom, #6D28D9, #1e0d47 70%, #000 100%)',
        }}
      >
        <div className="py-12 px-4 min-h-screen">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-purple-200 mb-2">
                Welcome
                {user?.user_metadata?.name
                  ? `, ${user.user_metadata.name.split(' ')[0]}`
                  : user?.email
                  ? `, ${user.email}`
                  : ''}!
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
      </div>
    </div>
  )
}
