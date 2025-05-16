// pages/features/[slug].js
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'

const MARKETING_CONTENT = {
  'meetings-events': {
    title: 'Meetings & Events',
    description: 'Host events, manage RSVPs, send reminders, and keep attendees engaged.',
  },
  'sales-funnel': {
    title: 'Sales Funnel',
    description: 'Capture leads, track campaigns, and optimize your pipeline in real time.',
  },
  'cx-management': {
    title: 'CX Management',
    description: 'Run surveys, gather reviews, and deliver outstanding customer experiences.',
  },
  'crm': {
    title: 'CRM & Client Management',
    description: 'Manage contacts, log interactions, and forecast sales—all in one CRM.',
  },
  'ai-chatbot-automation': {
    title: 'AI Chatbot & Automation',
    description: 'Engage visitors 24/7, qualify leads, and automate support with AI-driven chatbots.',
  },
  'analytics': {
    title: 'Analytics & Reporting',
    description: 'Visualize your KPIs, dashboards, and predictive insights at a glance.',
  },
  'team-management': {
    title: 'Team Management',
    description: 'Assign roles, control permissions, and collaborate with your team seamlessly.',
  },
  'ecommerce-tools': {
    title: 'E-commerce Tools',
    description: 'Build your storefront, process payments, and manage inventory easily.',
  },
  'loyalty-membership': {
    title: 'Loyalty & Membership',
    description: 'Create rewards programs, tiered memberships, and subscription plans.',
  },
}

const STUB_LOADERS = {
  'meetings-events': () => import('../../components/features/MeetingsEvents'),
  'sales-funnel': () => import('../../components/features/SalesFunnel'),
  'cx-management': () => import('../../components/features/CXManagement'),
  'crm': () => import('../../components/features/CRMModule'),
  'ai-chatbot-automation': () => import('../../components/features/AIChatbot'),
  'analytics': () => import('../../components/features/AnalyticsModule'),
  'team-management': () => import('../../components/features/TeamManagement'),
  'ecommerce-tools': () => import('../../components/features/EcommerceTools'),
  'loyalty-membership': () => import('../../components/features/LoyaltyModule'),
}

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  return { props: { isLoggedIn: !!user, slug: params.slug } }
}

export default function FeaturePage({ isLoggedIn, slug }) {
  const router = useRouter()
  const [FeatureComponent, setFeatureComponent] = useState(null)

  if (!isLoggedIn) {
    const c = MARKETING_CONTENT[slug] || { title: 'Coming Soon', description: '' }
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{c.title}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">{c.description}</p>
        <Link href="/auth/signin">
          <a className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600">
            Sign In to Explore
          </a>
        </Link>
      </div>
    )
  }

  useEffect(() => {
    const loader = STUB_LOADERS[slug]
    if (!loader) return router.replace('/dashboard')
    loader().then((m) => setFeatureComponent(() => m.default))
  }, [slug, router])

  if (!FeatureComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    )
  }

  return <FeatureComponent />
}
