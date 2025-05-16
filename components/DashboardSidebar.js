// components/DashboardSidebar.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import {
  Home,
  Users,
  BarChart3,
  Calendar,
  Smile,
  Bot,
  ShoppingCart,
  Gift,
  PlusCircle,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

const ALL_FEATURES = [
  { name: 'Meetings & Events', slug: 'meetings-events', icon: Calendar },
  { name: 'Sales Funnel', slug: 'sales-funnel', icon: BarChart3 },
  { name: 'CX Management', slug: 'cx-management', icon: Smile },
  { name: 'CRM & Client Management', slug: 'crm', icon: Users },
  { name: 'AI Chatbot & Automation', slug: 'ai-chatbot-automation', icon: Bot },
  { name: 'Analytics & Reporting', slug: 'analytics', icon: BarChart3 },
  { name: 'Team Management', slug: 'team-management', icon: Users },
  { name: 'E-commerce Tools', slug: 'ecommerce-tools', icon: ShoppingCart },
  { name: 'Loyalty & Membership', slug: 'loyalty-membership', icon: Gift },
]

export default function DashboardSidebar() {
  const router = useRouter()
  const [profile, setProfile] = useState({ name: '', features: [] })
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  // load collapse state
  useEffect(() => {
    const s = window.localStorage.getItem('lunaraSidebarCollapsed')
    if (s) setCollapsed(s === 'true')
  }, [])
  useEffect(() => {
    window.localStorage.setItem('lunaraSidebarCollapsed', collapsed ? 'true' : 'false')
  }, [collapsed])

  // fetch profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return setLoading(false)
      supabase
        .from('profiles')
        .select('name,features')
        .eq('id', data.session.user.id)
        .single()
        .then(({ data: p }) => {
          setProfile({ name: p.name, features: Array.isArray(p.features) ? p.features : [] })
          setLoading(false)
        })
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <aside className="fixed top-0 left-0 h-full w-16 flex items-center justify-center bg-gradient-to-b from-purple-900 to-black z-50">
        <span className="text-purple-300 animate-pulse">…</span>
      </aside>
    )
  }

  const userSlugs = profile.features.map((f) => f.toLowerCase())
  const firstName = profile.name.split(' ')[0] || ''

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-gradient-to-b from-purple-900 to-black shadow-xl border-r border-purple-700 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{ minWidth: collapsed ? 64 : 256 }}
    >
      {/* collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-4 right-[-18px] w-8 h-8 flex items-center justify-center bg-purple-800 border border-purple-600 rounded-full shadow hover:bg-purple-700 z-10"
      >
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>

      {/* My Account */}
      <Link href="/dashboard">
        <a className="flex items-center mt-4 mb-8 px-4 select-none focus:outline-none">
          {!collapsed && <span className="text-white font-extrabold text-2xl">My Account</span>}
        </a>
      </Link>

      {/* links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-2">
          <li>
            <Link href="/dashboard">
              <a
                className={`flex items-center px-4 py-3 rounded-lg transition focus:outline-none ${
                  router.pathname === '/dashboard'
                    ? 'bg-purple-700 text-white'
                    : 'text-purple-100 hover:bg-purple-700/50 hover:text-white'
                }`}
              >
                <Home className="w-6 h-6" />
                {!collapsed && <span className="ml-3">Dashboard</span>}
              </a>
            </Link>
          </li>
          {ALL_FEATURES.filter((f) => userSlugs.includes(f.slug)).map(({ name, slug, icon: Icon }) => (
            <li key={slug}>
              <Link href={`/features/${slug}`}>
                <a
                  className={`flex items-center px-4 py-3 rounded-lg transition focus:outline-none ${
                    router.pathname === `/features/${slug}`
                      ? 'bg-purple-700 text-white'
                      : 'text-purple-100 hover:bg-purple-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {!collapsed && <span className="ml-3">{name}</span>}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/dashboard/add-features">
              <a
                className={`flex items-center px-4 py-3 mt-4 rounded-lg transition focus:outline-none ${
                  router.pathname === '/dashboard/add-features'
                    ? 'bg-purple-700 text-white'
                    : 'text-purple-100 hover:bg-purple-700/50 hover:text-white'
                }`}
              >
                <PlusCircle className="w-6 h-6" />
                {!collapsed && <span className="ml-3">Add More Features</span>}
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* logout */}
      <div className="mb-6 w-full flex items-center justify-center px-2">
        <button
          onClick={handleLogout}
          className={`flex items-center px-4 py-2 rounded-lg shadow transition focus:outline-none ${
            collapsed
              ? 'bg-transparent text-purple-100 hover:bg-purple-700/50'
              : 'bg-white text-purple-800 hover:bg-gray-100'
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
