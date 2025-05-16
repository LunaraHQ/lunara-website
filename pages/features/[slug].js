// pages/features/[slug].js
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'

const MARKETING = {
  'meetings-events':      { title: 'Meetings & Events',      desc: 'Host events, manage RSVPs, send reminders.' },
  'sales-funnel':         { title: 'Sales Funnel',           desc: 'Capture leads, track campaigns, optimize your pipeline.' },
  'cx-management':        { title: 'CX Management',          desc: 'Run surveys, gather reviews, enhance experiences.' },
  'crm':                  { title: 'CRM & Client Mgmt.',     desc: 'Manage contacts, log interactions, forecast sales.' },
  'ai-chatbot-automation':{ title: 'AI Chatbot',            desc: '24/7 support, lead qualification with AI.' },
  'analytics':            { title: 'Analytics & Reporting',  desc: 'Visualize KPIs, dashboards, predictive insights.' },
  'team-management':      { title: 'Team Management',        desc: 'Roles, permissions, collaborate with your team.' },
  'ecommerce-tools':      { title: 'E-commerce Tools',       desc: 'Storefront, payments, inventory management.' },
  'loyalty-membership':   { title: 'Loyalty & Membership',   desc: 'Reward programs, tiers, subscriptions.' },
}

const LOADERS = {
  'meetings-events':      () => import('../../components/features/MeetingsEvents'),
  'sales-funnel':         () => import('../../components/features/SalesFunnel'),
  'cx-management':        () => import('../../components/features/CXManagement'),
  'crm':                  () => import('../../components/features/CRMModule'),
  'ai-chatbot-automation':() => import('../../components/features/AIChatbot'),
  'analytics':            () => import('../../components/features/AnalyticsModule'),
  'team-management':      () => import('../../components/features/TeamManagement'),
  'ecommerce-tools':      () => import('../../components/features/EcommerceTools'),
  'loyalty-membership':   () => import('../../components/features/LoyaltyModule'),
}

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  return { props: { isLoggedIn: !!user, slug: params.slug } }
}

export default function FeaturePage({ isLoggedIn, slug }) {
  const router = useRouter()
  const [Comp, setComp] = useState(null)

  if (!isLoggedIn) {
    const m = MARKETING[slug] || { title: 'Coming Soon', desc: '' }
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">{m.title}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">{m.desc}</p>
        <Link href="/auth/signin">
          <a className="px-6 py-3 bg-purple-700 text-white rounded hover:bg-purple-600">
            Sign In to Explore
          </a>
        </Link>
      </div>
    )
  }

  useEffect(() => {
    const loader = LOADERS[slug]
    if (!loader) return router.replace('/dashboard')
    loader().then((m) => setComp(() => m.default))
  }, [slug, router])

  if (!Comp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    )
  }

  return <Comp />
}
