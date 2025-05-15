// pages/features/[slug].js
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

const featureInfo = {
  'meetings-events': {
    title: 'Meetings & Events',
    description: `Streamline your event bookings and attendee management in one place.
Automatically handle registrations, reminders, and post-event follow-up, reducing admin work and delivering a seamless guest experience.
Perfect for venues, hotels, and conference organizers.`
  },
  'sales-funnel': {
    title: 'Sales Funnel',
    description: `Capture and nurture leads from initial interest to closed sale.
Automate email campaigns, visualize your sales pipeline, and track results with real-time analytics.
Ideal for teams looking to boost conversions and shorten sales cycles.`
  },
  'cx-management': {
    title: 'Customer Experience (CX) Management',
    description: `Collect instant feedback, monitor online reviews, and turn insights into action.
Proactively resolve issues and understand guest satisfaction at every step.
Essential for any business focused on reputation and loyalty.`
  },
  'crm-client-management': {
    title: 'CRM & Client Management',
    description: `Organize all your contacts, track every interaction, and manage follow-ups with ease.
Get a 360° view of your clients to personalize engagement and forecast opportunities.
Valuable for sales teams, account managers, and client-facing businesses.`
  },
  'ai-chatbot-automation': {
    title: 'AI Chatbot & Automation',
    description: `Offer instant, 24/7 support and automate common queries without extra staff.
Qualify leads and direct urgent issues to your team, saving time and improving response rates.
Great for businesses ready to modernize customer communications.`
  },
  'analytics-reporting': {
    title: 'Analytics & Reporting',
    description: `Build custom dashboards and get actionable insights into every aspect of your operations.
Track key performance metrics and make smarter, data-driven decisions.
Designed for leaders who want a clear, measurable ROI.`
  },
  'team-management': {
    title: 'Team Management',
    description: `Schedule shifts, assign tasks, and keep your staff on the same page.
Boost team productivity with built-in communication tools and automated reminders.
Perfect for hospitality, retail, and any company managing staff.`
  },
  'ecommerce-tools': {
    title: 'E-commerce Conversion Tools',
    description: `Recover abandoned carts, run targeted promotions, and optimize your checkout process.
Increase sales and customer satisfaction with tools designed to boost online conversions.
Ideal for online retailers and service providers.`
  },
  'loyalty-membership': {
    title: 'Loyalty & Membership Management',
    description: `Launch rewards programs, manage memberships, and track customer loyalty automatically.
Deliver personalized offers and recognize your best customers, all from one dashboard.
Essential for businesses looking to build long-term relationships and increase retention.`
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
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4 py-16">
        <div className="bg-black/70 p-10 rounded-xl max-w-xl text-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">{feature.title}</h1>
          <p className="text-lg mb-8 whitespace-pre-line">{feature.description}</p>
          <Link href="/#pricing" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg focus:outline-none">
            See Pricing
          </Link>
        </div>
      </div>
    </>
  )
}
