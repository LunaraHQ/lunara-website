// pages/_app.js
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import NavBar from '../components/NavBar'
import CookieBanner from '../components/CookieBanner'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Plausible analytics setup
    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments)
    }

    // Supabase session persistence
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.setItem('sb-lunara-session', JSON.stringify(session))
      } else {
        localStorage.removeItem('sb-lunara-session')
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  // Only show NavBar on non-dashboard routes
  const isDashboard = router.pathname.startsWith('/dashboard')

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
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/plausible.js"
          data-domain="lunara.com"
        />
        {!isDashboard && <NavBar />}
        <Component {...pageProps} />
        <CookieBanner />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
