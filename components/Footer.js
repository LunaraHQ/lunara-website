// components/Footer.js
import React from 'react'
import Link from 'next/link'
import ContactModal from './ContactModal'

export default function Footer() {
  return (
    <footer className="bg-black/50 text-gray-400 py-10 mt-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
        {/* Logo & copyright */}
        <div>
          <Link href="/">
            <a className="text-2xl font-bold text-white">Lunara</a>
          </Link>
          <p className="mt-2 text-gray-500">
            © {new Date().getFullYear()} LunaraHQ. All rights reserved.
          </p>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about">
                <a className="hover:underline">About Us</a>
              </Link>
            </li>
            <li>
              <ContactModal>
                <a className="text-gray-400 hover:underline">Contact Us</a>
              </ContactModal>
            </li>
            <li>
              <Link href="/terms">
                <a className="hover:underline">Terms of Service</a>
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy">
                <a className="hover:underline">Cookie Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a className="hover:underline">Privacy Policy</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Follow */}
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
