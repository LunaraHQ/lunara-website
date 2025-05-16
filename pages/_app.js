// pages/_app.js
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import NavBar from '../components/NavBar'
import DashboardSidebar from '../components/DashboardSidebar'
import LoadingSpinner from '../components/LoadingSpinner'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

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

  // determine layout: dashboard + features (when logged in) + pricing
  const isApp =
    router.pathname.startsWith('/dashboard') ||
    (router.pathname.startsWith('/features') && session) ||
    router.pathname === '/pricing'

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {/* Pass session prop for user logic */}
      {!isApp && <NavBar session={session} />}
      {isApp && <DashboardSidebar session={session} />}

      <div className={`transition-all duration-300 ${isApp ? 'ml-16 md:ml-64' : ''}`}>
        {/* Always pass session to pages */}
        <Component {...pageProps} session={session}/>
      </div>
    </>
  )
}

export default MyApp
