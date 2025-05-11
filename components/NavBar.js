// components/NavBar.js
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import ContactModal from './ContactModal'

export default function NavBar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/"><a className="text-2xl font-bold">Lunara</a></Link>
          <Link href="/#features"><a className="hover:underline">Features</a></Link>
          <Link href="/#howitworks"><a className="hover:underline">Howitworks</a></Link>
          <Link href="/#pricing"><a className="hover:underline">Pricing</a></Link>
          {/* Open the contact modal instead of navigating away */}
          <button
            onClick={() => setIsOpen(true)}
            className="hover:underline"
          >
            Contact
          </button>
        </div>

        <div className="space-x-4">
          {status === 'loading' ? null : session ? (
            <>
              <span className="text-gray-700">Hello, {session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="text-gray-700 hover:underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-gray-700 hover:underline"
              >
                Log In
              </button>
              <button
                onClick={() => signIn()}
                className="text-gray-700 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mount your existing ContactModal and control via isOpen */}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
