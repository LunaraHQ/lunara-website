// pages/features/[slug].js
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import DashboardSidebar from '../../components/DashboardSidebar'
import LoadingSpinner from '../../components/LoadingSpinner'

// Dynamically import your feature modules
const MeetingsEvents = React.lazy(() => import('../../components/features/MeetingsEvents'))
const SalesFunnel     = React.lazy(() => import('../../components/features/SalesFunnel'))
const CXManagement   = React.lazy(() => import('../../components/features/CXManagement'))
const CRMModule      = React.lazy(() => import('../../components/features/CRMModule'))
const AIChatbot      = React.lazy(() => import('../../components/features/AIChatbot'))
const Analytics      = React.lazy(() => import('../../components/features/AnalyticsModule'))
const TeamManagement = React.lazy(() => import('../../components/features/TeamManagement'))
const EcommerceTools = React.lazy(() => import('../../components/features/EcommerceTools'))
const LoyaltyModule  = React.lazy(() => import('../../components/features/LoyaltyModule'))

export default function FeaturePage() {
  const router = useRouter()
  const { slug } = router.query

  const [loading, setLoading] = useState(true)
  const [user, setUser]     = useState(null)
  const [profile, setProfile] = useState(null)

  // 1) Check auth & subscription
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        return router.replace('/auth/signin')
      }
      setUser(session.user)
      const { data } = await supabase
        .from('profiles')
        .select('features, user_metadata')
        .eq('id', session.user.id)
        .single()
      setProfile(data)
      setLoading(false)

      if (!data.features?.includes(slug)) {
        router.replace('/dashboard')
      }
    })()
  }, [slug, router])

  // **Centered full-screen spinner while loading**
  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black">
        <LoadingSpinner />
      </div>
    )
  }

  // Admin flag
  const isAdmin = Boolean(profile.user_metadata?.isAdmin)

  // Pick the right module
  let FeatureComponent = null
  switch (slug) {
    case 'meetings-events':
      FeatureComponent = MeetingsEvents; break
    case 'sales-funnel':
      FeatureComponent = SalesFunnel; break
    case 'cx-management':
      FeatureComponent = CXManagement; break
    case 'crm-client-management':
      FeatureComponent = CRMModule; break
    case 'ai-chatbot-automation':
      FeatureComponent = AIChatbot; break
    case 'analytics-reporting':
      FeatureComponent = Analytics; break
    case 'team-management':
      FeatureComponent = TeamManagement; break
    case 'ecommerce-tools':
      FeatureComponent = EcommerceTools; break
    case 'loyalty-membership':
      FeatureComponent = LoyaltyModule; break
    default:
      router.replace('/dashboard')
      return null
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gradient-to-b from-purple-800 via-purple-900 to-black p-6">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        }>
          <FeatureComponent user={user} isAdmin={isAdmin} />
        </Suspense>
      </main>
    </div>
  )
}
