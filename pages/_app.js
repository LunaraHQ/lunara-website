// pages/_app.js
import '../styles/globals.css'
import { useRouter } from 'next/router'
import DashboardSidebar from '../components/DashboardSidebar'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isApp = 
    router.pathname.startsWith('/dashboard') ||
    router.pathname.startsWith('/features') ||
    router.pathname === '/pricing'

  return (
    <>
      {!isApp && <NavBar />}
      {isApp && <DashboardSidebar />}
      <div className={`transition-all duration-300 ${isApp ? 'ml-16 md:ml-64' : ''}`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
