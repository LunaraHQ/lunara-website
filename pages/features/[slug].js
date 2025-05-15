// pages/features/[slug].js
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

const featureInfo = {
  'meetings-events': {
    title: 'Meetings & Events',
    description:
      'Manage bookings, event registrations, and automated reminders in one streamlined module. Perfect for hotels, venues, and event planners.',
  },
  'sales-funnel': {
    title: 'Sales Funnel',
    description:
      'Capture, nurture, and convert leads with automated campaigns, tracking, and reporting. Adaptable for any B2B or B2C business.',
  },
  'cx-management': {
    title: 'CX Management',
    description:
      'Collect customer feedback, monitor reviews, and boost satisfaction with built-in CX tools.',
  },
  'crm-client-management': {
    title: 'CRM & Client Management',
    description:
      'Centralize contacts, track all interactions, and forecast sales in real-time.',
  },
  'ai-chatbot-automation': {
    title: 'AI Chatbot & Automation',
    description:
      'Offer instant, AI-powered chat support, lead qualification, and automated workflows.',
  },
  'analytics-reporting': {
    title: 'Analytics & Reporting',
    description:
      'Visualize KPIs, build dashboards, and turn data into actionable insights.',
  },
  'team-management': {
    title: 'Team Management',
    description:
      'Schedule shifts, assign tasks, and manage your team with ease.',
  },
  'ecommerce-tools': {
    title: 'E-commerce Tools',
    description:
      'Recover abandoned carts, optimize checkout, and grow revenue with built-in tools.',
  },
  'loyalty-membership': {
    title: 'Loyalty & Membership',
    description:
      'Build loyalty programs, manage memberships, and personalize rewards.',
  },
}

export default function FeaturePage() {
  const router = useRouter()
  const { slug } = router.query
  const feature = featureInfo[slug]

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div>
          <h1 className="text-2xl font-bold mb-4">Feature Not Found</h1>
          <Link href="/" className="underline text-purple-400">Return Home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{feature.title} | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-purple-800 via-purple-900 to-black">
        <div className="bg-black/70 p-10 rounded-xl max-w-xl text-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">{feature.title}</h1>
          <p className="text-lg mb-8">{feature.description}</p>
          <Link href="/#pricing" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg">
            See Pricing
          </Link>
        </div>
      </div>
    </>
  )
}
