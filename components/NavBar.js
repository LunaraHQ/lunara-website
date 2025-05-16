import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import ContactModal from './ContactModal'

const features = [
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

export default function NavBar() {
  const [session, setSession] = useState(null)
  const [userName, setUserName] = useState(null)
  const [isContactOpen, setContactOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setSession(data.session)
        setUserName(data.session.user.user_metadata?.name || data.session.user.email)
      }
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setUserName(session.user.user_metadata?.name || session.user.email)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    window.location.href = '/'
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-2xl font-extrabold focus:outline-none">
            Lunara
          </Link>
          <Link href="/dashboard" className="hover:underline focus:outline-none">
            Dashboard
          </Link>
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button className="hover:underline flex items-center space-x-1 focus:outline-none">
              <span>Features</span>
              <span className="text-xs">&#x25BE;</span>
            </button>
            {showFeatures && (
              <div
                className="absolute left-0 mt-2 bg-white text-purple-800 rounded-lg shadow-xl w-64 z-50 transition"
              >
                {features.map((feat) => (
                  <Link
                    key={feat.slug}
                    href={`/features/${feat.slug}`}
                    className="block px-5 py-2 hover:bg-purple-100 transition-colors focus:outline-none"
                  >
                    {feat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/#howitworks" className="hover:underline focus:outline-none">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:underline focus:outline-none">
            Pricing
          </Link>
          <Link href="/pilot" className="hover:underline focus:outline-none">
            Pilot Programme
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="hover:underline focus:outline-none"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="hidden sm:inline">Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-700 px-4 py-1 rounded-lg font-medium hover:opacity-90 focus:outline-none"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="bg-purple-500 hover:bg-purple-400 px-4 py-1 rounded-lg font-medium text-white focus:outline-none"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/signin"
                className="bg-white text-purple-700 px-4 py-1 rounded-lg font-medium hover:opacity-90 focus:outline-none"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
      <ContactModal
        isOpen={isContactOpen}
        onOpen={() => setContactOpen(true)}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}
