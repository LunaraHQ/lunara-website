// components/Footer.js
import React from 'react'
import Link from 'next/link'
import ContactModal from './ContactModal'

export default function Footer() {
  return (
    <footer className="bg-black/50 text-gray-400 py-10 mt-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            Lunara
          </Link>
          <p className="mt-2 text-gray-500">
            © {new Date().getFullYear()} LunaraHQ. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <ContactModal>
                <a className="text-gray-400 hover:underline">Contact Us</a>
              </ContactModal>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Follow</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
