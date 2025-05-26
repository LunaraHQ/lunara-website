import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import LoadingSpinner from '../components/LoadingSpinner'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // "isApp" means pages that should look like the SaaS app, not the landing/marketing site
  const isApp =
    router.pathname.startsWith('/dashboard') ||
    (router.pathname.startsWith('/features') && session) ||
    router.pathname === '/pricing'

  if (loading) {
    return <LoadingSpinner />
  }

  // Use one handler for all modals
  const handleContactOpen = () => setContactOpen(true)
  const handleContactClose = () => setContactOpen(false)

  return (
    <>
      {/* NavBar only for marketing/public pages */}
      {!isApp && <NavBar onContactOpen={handleContactOpen} session={session} />}

      {/* Contact Modal (global, always available) */}
      <ContactModal open={contactOpen} onClose={handleContactClose} />

      {/* Main Page Content */}
      <div className={`transition-all duration-300 ${isApp ? 'ml-16 md:ml-64' : ''}`}>
        <Component {...pageProps} session={session} onContactOpen={handleContactOpen} />
      </div>

      {/* Footer only on marketing/public pages */}
      {!isApp && <Footer onContactOpen={handleContactOpen} />}
    </>
  )
}
