// components/NavBar.js
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useRef } from 'react'
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
  const { data: session, status } = useSession()
  const [isContactOpen, setContactOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const dropdownRef = useRef(null)
  const timeout = useRef()

  const openDropdown = () => {
    clearTimeout(timeout.current)
    setShowFeatures(true)
  }
  const closeDropdown = () => {
    timeout.current = setTimeout(() => setShowFeatures(false), 120)
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
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button className="hover:underline flex items-center space-x-1 focus:outline-none">
              <span>Features</span>
              <span className="text-xs">&#x25BE;</span>
            </button>
            {showFeatures && (
              <div
                ref={dropdownRef}
                className="absolute left-0 mt-2 bg-white text-purple-800 rounded-lg shadow-xl w-64 z-50 transition"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
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
          <Link
            href="/pilot"
            className="hover:underline focus:outline-none text-white"
          >
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
          {status === 'loading' ? null : session ? (
            <>
              <span className="hidden sm:inline">Hi, {session.user.name}</span>
              <button
                onClick={() => signOut()}
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
