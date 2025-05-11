// components/CookieBanner.js
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-gray-100 p-4 text-center z-50">
      <p className="text-sm">
        We use cookies to enhance your experience and analyze traffic. Read our{' '}
        <a href="/cookie-policy" className="underline">
          Cookie Policy
        </a>.
      </p>
      <button
        onClick={accept}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Accept
      </button>
    </div>
  )
}
