// components/NavBar.js
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import ContactModal from './ContactModal'

const featureLinks = [
  { name: 'Meetings & Events', href: '/#features' },
  { name: 'Sales Funnel', href: '/#features' },
  { name: 'CX Management', href: '/#features' },
  { name: 'CRM & Client Management', href: '/#features' },
  { name: 'AI Chatbot & Automation', href: '/#features' },
  { name: 'Analytics & Reporting', href: '/#features' },
  { name: 'Team Management', href: '/#features' },
  { name: 'E-commerce Tools', href: '/#features' },
  { name: 'Loyalty & Membership', href: '/#features' },
]

export default function NavBar() {
  const { data: session, status } = useSession()
  const [isContactOpen, setContactOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-2xl font-extrabold">
            Lunara
          </Link>
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button className="hover:underline flex items-center space-x-1">
              <span>Features</span>
              <span className="text-xs">&#x25BE;</span>
            </button>
            {showFeatures && (
              <div className="absolute left-0 mt-2 bg-white text-purple-800 rounded-lg shadow-xl w-56 z-50">
                {featureLinks.map((feat) => (
                  <Link
                    key={feat.name}
                    href={feat.href}
                    className="block px-5 py-2 hover:bg-purple-50"
                  >
                    {feat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/#howitworks" className="hover:underline">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="/pilot" className="hover:underline">
            Pilot Program
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="hover:underline"
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
                className="bg-white text-purple-700 px-4 py-1 rounded-lg font-medium hover:opacity-90"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="bg-white text-purple-700 px-4 py-1 rounded-lg font-medium hover:opacity-90"
              >
                Sign In
              </button>
              <Link
                href="/auth/signup"
                className="hidden sm:inline bg-purple-500 hover:bg-purple-400 px-4 py-1 rounded-lg font-medium"
              >
                Sign Up
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
