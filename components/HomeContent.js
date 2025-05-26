import { useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar,
  TrendingUp,
  Smile,
  Users,
  Bot,
  BarChart3,
  ShoppingCart,
  Gift,
  Cloud,
  ShieldCheck,
  Lock,
  UserPlus,
  Link2,
  Zap,
} from 'lucide-react'
import PricingTable from './PricingTable'

// Features list — FIXED SLUGS TO MATCH FEATURE ROUTES
const features = [
  { title: 'Meetings & Events', desc: 'Effortlessly manage bookings, registration, and reminders for any event.', icon: Calendar, slug: 'meetings-events' },
  { title: 'Sales Funnel', desc: 'Capture leads, automate outreach, and visualize your entire pipeline.', icon: TrendingUp, slug: 'sales-funnel' },
  { title: 'CX Management', desc: 'Collect feedback, manage reviews, and analyze guest experience in real-time.', icon: Smile, slug: 'cx-management' },
  { title: 'CRM & Client Management', desc: 'Track interactions, centralize contacts, and forecast your sales.', icon: Users, slug: 'crm' },
  { title: 'AI Chatbot & Automation', desc: 'Provide instant support, qualify leads, and automate routine tasks.', icon: Bot, slug: 'ai-chatbot' },
  { title: 'Analytics & Reporting', desc: 'Build custom dashboards and uncover actionable business insights.', icon: BarChart3, slug: 'analytics' },
  { title: 'Team Management', desc: 'Schedule shifts, assign tasks, and streamline team communication.', icon: Users, slug: 'team-management' },
  { title: 'E-commerce Tools', desc: 'Recover abandoned carts and boost conversions with smart offers.', icon: ShoppingCart, slug: 'ecommerce' },
  { title: 'Loyalty & Membership', desc: 'Reward returning customers and manage memberships with ease.', icon: Gift, slug: 'loyalty' },
]

const howItWorksSteps = [
  { icon: UserPlus, title: 'Sign Up', desc: 'Get on the waitlist in under 60 seconds—no credit card required.' },
  { icon: Link2, title: 'Stay in the Loop', desc: 'We’ll email you product updates, early access invites, and launch news.' },
  { icon: Zap, title: 'Be First to Launch', desc: 'When we go live, you’ll be one of the very first to try Lunara’s AI funnels.' },
]

export default function HomeContent() {
  const { scrollY } = useScroll()
  const hue = useTransform(scrollY, [0, 500], [260, 300], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(hueSpring, h => `hsl(${h}, 34%, 5%)`)

  return (
    <section className="relative z-10 min-h-screen overflow-x-clip">
      {/* Static, dense starry CSS background */}
      <div
        className="absolute inset-0 -z-30 h-full w-full"
        aria-hidden="true"
        style={{
          background:
            `linear-gradient(120deg, #100a22 70%, #1a1336 100%),
            repeating-radial-gradient(circle at 12% 18%, #fff 0 1px, transparent 1px 100%),
            repeating-radial-gradient(circle at 40% 70%, #e0d9ff 0 1.1px, transparent 1.1px 100%),
            repeating-radial-gradient(circle at 88% 50%, #8c64ff 0 1.2px, transparent 1.2px 100%),
            repeating-radial-gradient(circle at 67% 12%, #fffbe6 0 0.8px, transparent 0.8px 100%),
            repeating-radial-gradient(circle at 30% 50%, #a9b6ff 0 0.7px, transparent 0.7px 100%),
            repeating-radial-gradient(circle at 52% 38%, #fff 0 1.4px, transparent 1.4px 100%)`,
          backgroundSize: '100% 100%, 250px 250px, 300px 300px, 380px 380px, 280px 280px, 350px 350px, 200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      <main id="main-content" className="relative z-10 text-white font-sans">

        {/* HOW IT WORKS — Moved to top */}
        <section id="howitworks" className="py-12 px-6 bg-gradient-to-br from-[#23194b]/70 to-[#12092e]/80 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white drop-shadow-glow">
              How It Works
            </h2>
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
              {howItWorksSteps.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="relative flex flex-col items-center text-center p-6 md:p-7 bg-gradient-to-br from-[#2a1745]/90 via-[#6E41FF33]/60 to-[#130b24]/80 border border-[#38296b]/60 rounded-2xl shadow-lg overflow-hidden"
                  style={{
                    minHeight: '220px',
                    maxWidth: '350px',
                    margin: '0 auto',
                    justifyContent: 'center',
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-2xl" style={{
                    background: 'linear-gradient(120deg, transparent 60%, #8C64FF33 80%, transparent 100%)',
                    opacity: 0.23,
                    zIndex: 2,
                  }} />
                  <span className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-[#6E41FF22] via-[#8C64FF22] to-[#1a103e44] border border-[#8C64FF33] shadow-inner">
                    <Icon className="w-7 h-7 text-[#8C64FF]" />
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 drop-shadow">{title}</h3>
                  <p className="text-[#d2c6f7] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <h2 className="sr-only">Our Key Features</h2>
          {features.map(({ title, desc, icon: Icon, slug }, idx) => (
            <Link
              key={idx}
              href={`/features/${slug}`}
              className="group bg-gradient-to-br from-[#251654]/70 via-[#27134e]/60 to-[#130b24]/50 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center aspect-square transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_6px_32px_rgba(140,100,255,0.28)] focus:outline-none border border-[#322769]/60"
            >
              <div className="flex flex-col items-center">
                <Icon
                  className="w-20 h-20 md:w-24 md:h-24 text-[#8C64FF] opacity-90 group-hover:opacity-100 transition duration-300 drop-shadow-[0_8px_32px_#8C64FF44]"
                  strokeWidth={1.4}
                />
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[#d2c6f7] text-sm max-w-[14rem]">{desc}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Tech & Security */}
        <section id="security" className="py-20 px-6 bg-gradient-to-br from-[#23194b]/70 to-[#12092e]/80 backdrop-blur-lg" aria-labelledby="security-heading">
          <h2 id="security-heading" className="text-3xl font-bold text-center text-white mb-8">
            Enterprise-Grade Tech & Security
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Cloud, title: 'Global CDN', desc: 'Lightning-fast performance worldwide via Vercel’s edge network.' },
              { icon: ShieldCheck, title: 'SOC 2 & GDPR', desc: 'Built-in compliance to keep your data—and your guests—secure.' },
              { icon: Lock, title: 'Data Encryption', desc: 'All data encrypted in transit (TLS) and at rest.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="relative flex flex-col items-center text-center p-6 md:p-7 bg-gradient-to-br from-[#2a1745]/90 via-[#6E41FF33]/60 to-[#130b24]/80 border border-[#38296b]/60 rounded-2xl shadow-lg overflow-hidden"
                style={{
                  minHeight: '220px',
                  maxWidth: '350px',
                  margin: '0 auto',
                  justifyContent: 'center',
                }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl" style={{
                  background: 'linear-gradient(120deg, transparent 60%, #8C64FF33 80%, transparent 100%)',
                  opacity: 0.23,
                  zIndex: 2,
                }} />
                <span className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-[#6E41FF22] via-[#8C64FF22] to-[#1a103e44] border border-[#8C64FF33] shadow-inner">
                  <Icon className="w-7 h-7 text-[#8C64FF]" />
                </span>
                <h3 className="text-base md:text-lg font-semibold text-white mb-1 drop-shadow">{title}</h3>
                <p className="text-[#d2c6f7] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 text-center" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-3xl font-bold text-[#8C64FF] mb-8">
            Simple, Scalable Pricing
          </h2>
          <div className="max-w-4xl mx-auto px-6">
            <PricingTable />
          </div>
        </section>
      </main>
    </section>
  )
}
