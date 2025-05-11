// pages/_app.js
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
  // Plausible analytics setup
  useEffect(() => {
    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments)
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {/* Skip-to-content link, visible only on keyboard focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only bg-purple-600 text-white px-4 py-2 rounded fixed top-4 left-4 z-50"
        >
          Skip to content
        </a>

        {/* Plausible script */}
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/plausible.js"
          data-domain="lunara.com"
        />

        {/* Navigation Bar */}
        <NavBar />

        {/* Main page content */}
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
