// components/NavBar.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import ContactModal from './ContactModal'
import { AnimatePresence, motion } from 'framer-motion'

const FEATURES = [
  { name: 'Meetings & Events', slug: 'meetings-events' },
  { name: 'Sales Funnel', slug: 'sales-funnel' },
  { name: 'CX Management', slug: 'cx-management' },
  { name: 'CRM & Client Management', slug: 'crm' },
  { name: 'AI Chatbot & Automation', slug: 'ai-chatbot-automation' },
  { name: 'Analytics & Reporting', slug: 'analytics' },
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
    // load initial session and username
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session
      setSession(s)
      if (s) {
        const nm = s.user.user_metadata?.name || s.user.email
        setUserName(nm.split(' ')[0])
      }
    })
    // listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_ev, s) => {
      setSession(s)
      if (s) {
        const nm = s.user.user_metadata?.name || s.user.email
        setUserName(nm.split(' ')[0])
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/"><a className="text-2xl font-extrabold focus:outline-none">Lunara</a></Link>
          <Link href="/dashboard"><a className="hover:underline focus:outline-none">Dashboard</a></Link>

          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button
              onClick={() => setShowFeatures((o) => !o)}
              className="flex items-center space-x-1 hover:underline focus:outline-none"
            >
              <span>Features</span>
              <span className="text-xs">▾</span>
            </button>
            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 bg-white text-purple-800 rounded-lg shadow-xl w-64 z-50"
                >
                  {FEATURES.map((f) => (
                    <Link key={f.slug} href={`/features/${f.slug}`}>
                      <a className="block px-5 py-2 hover:bg-purple-100 focus:outline-none">{f.name}</a>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#howitworks"><a className="hover:underline focus:outline-none">How It Works</a></Link>
          <Link href="/#pricing"><a className="hover:underline focus:outline-none">Pricing</a></Link>
          <Link href="/pilot"><a className="hover:underline focus:outline-none">Pilot Programme</a></Link>
          <button onClick={() => setContactOpen(true)} className="hover:underline focus:outline-none">Contact</button>
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
              <Link href="/auth/signup">
                <a className="bg-purple-500 hover:bg-purple-400 px-4 py-1 rounded-lg font-medium text-white focus:outline-none">
                  Sign Up
                </a>
              </Link>
              <Link href="/auth/signin">
                <a className="bg-white text-purple-700 px-4 py-1 rounded-lg font-medium hover:opacity-90 focus:outline-none">
                  Sign In
                </a>
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
