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
  const router = useRouter()

  useEffect(() => {
    // Persist Supabase session
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        localStorage.setItem('sb-session', JSON.stringify(session))
      } else {
        localStorage.removeItem('sb-session')
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Hide NavBar on internal pages
  const hideNav =
    router.pathname.startsWith('/dashboard') ||
    router.pathname.startsWith('/features') ||
    router.pathname === '/pricing' ||
    router.pathname.startsWith('/dashboard')

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {!hideNav && <NavBar />}
        <Component {...pageProps} />
        <CookieBanner />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
