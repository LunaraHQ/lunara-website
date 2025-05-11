// pages/cookie-policy.js
import React from 'react'

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>

      <p className="mb-4">
        We use cookies and similar technologies to provide functionality and analytics. This policy explains what we use and why.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
      <p className="mb-4">
        Small files stored on your device that remember preferences and usage.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Them</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Essential for site functionality</li>
        <li>Analytics to improve performance</li>
        <li>Marketing to personalize content</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
      <p>
        Control cookies via your browser settings. For more info, visit{' '}
        <a
          href="https://www.allaboutcookies.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          allaboutcookies.org
        </a>.
      </p>
    </div>
  )
}
