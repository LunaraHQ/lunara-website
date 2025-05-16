// components/NavBar.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import ContactModal from './ContactModal'
import { AnimatePresence, motion } from 'framer-motion'

const FEATURES = [
  { name: 'Meetings & Events', slug: 'meetings-events' },
  { name: 'Sales Funnel',       slug: 'sales-funnel'      },
  { name: 'CX Management',      slug: 'cx-management'     },
  { name: 'CRM & Client Mgmt.', slug: 'crm'               },
  { name: 'AI Chatbot',         slug: 'ai-chatbot-automation' },
  { name: 'Analytics & Reporting', slug: 'analytics'      },
  { name: 'Team Management',    slug: 'team-management'   },
  { name: 'E-commerce Tools',   slug: 'ecommerce-tools'   },
  { name: 'Loyalty & Membership', slug: 'loyalty-membership' }
]

export default function NavBar() {
  const [session, setSession] = useState(null)
  const [userName, setUserName] = useState('')
  const [contactOpen, setContactOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) {
        const nm = data.session.user.user_metadata?.name || data.session.user.email
        setUserName(nm.split(' ')[0])
      }
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess)
      if (sess) {
        const nm = sess.user.user_metadata?.name || sess.user.email
        setUserName(nm.split(' ')[0])
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/"><a className="text-2xl font-extrabold">Lunara</a></Link>
          <Link href="/dashboard"><a className="hover:underline">Dashboard</a></Link>

          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button
              onClick={() => setShowFeatures((o) => !o)}
              className="flex items-center space-x-1 hover:underline"
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
                  className="absolute left-0 mt-2 bg-white text-purple-800 rounded shadow-lg w-56 z-50"
                >
                  {FEATURES.map((f) => (
                    <Link key={f.slug} href={`/features/${f.slug}`}>
                      <a className="block px-4 py-2 hover:bg-purple-100">{f.name}</a>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#howitworks"><a className="hover:underline">How It Works</a></Link>
          <Link href="/#pricing"><a className="hover:underline">Pricing</a></Link>
          <Link href="/pilot"><a className="hover:underline">Pilot Programme</a></Link>
          <button onClick={() => setContactOpen(true)} className="hover:underline">Contact</button>
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span>Hi, {userName}</span>
              <button
                onClick={logout}
                className="bg-white text-purple-700 px-4 py-1 rounded hover:opacity-90"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signup">
                <a className="bg-purple-500 px-4 py-1 rounded text-white hover:bg-purple-400">Sign Up</a>
              </Link>
              <Link href="/auth/signin">
                <a className="bg-white text-purple-700 px-4 py-1 rounded hover:opacity-90">Sign In</a>
              </Link>
            </>
          )}
        </div>
      </nav>

      <ContactModal
        isOpen={contactOpen}
        onOpen={() => setContactOpen(true)}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}
