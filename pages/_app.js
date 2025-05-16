import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import NavBar from '../components/NavBar'
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

  const isApp =
    router.pathname.startsWith('/dashboard') ||
    (router.pathname.startsWith('/features') && session) ||
    router.pathname === '/pricing'

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {!isApp && <NavBar onContactOpen={() => setContactOpen(true)} session={session} />}
      {isApp && <DashboardSidebar session={session} />}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <div className={`transition-all duration-300 ${isApp ? 'ml-16 md:ml-64' : ''}`}>
        <Component {...pageProps} session={session}/>
      </div>
    </>
  )
}
