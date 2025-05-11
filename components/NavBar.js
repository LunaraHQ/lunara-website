// components/NavBar.js
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import ContactModal from './ContactModal'

export default function NavBar() {
  const { data: session, status } = useSession()
  const [isContactOpen, setContactOpen] = useState(false)

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/"><a className="text-2xl font-extrabold">Lunara</a></Link>
          <Link href="/#features"><a className="hover:underline">Features</a></Link>
          <Link href="/#howitworks"><a className="hover:underline">How It Works</a></Link>
          <Link href="/#pricing"><a className="hover:underline">Pricing</a></Link>
          <Link href="/pilot"><a className="hover:underline">Pilot Program</a></Link>
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
              <Link href="/auth/signup">
                <a className="hidden sm:inline bg-purple-500 hover:bg-purple-400 px-4 py-1 rounded-lg font-medium">
                  Sign Up
                </a>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Controlled Contact modal (no extra trigger) */}
      <ContactModal
        isOpen={isContactOpen}
        onOpen={() => setContactOpen(true)}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}
