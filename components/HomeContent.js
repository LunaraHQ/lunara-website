import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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

// Map features to their slugs for URL use
const features = [
  {
    title: 'Meetings & Events',
    desc: 'Effortlessly manage bookings, registration, and reminders for any event.',
    icon: Calendar,
    slug: 'meetings-events',
  },
  {
    title: 'Sales Funnel',
    desc: 'Capture leads, automate outreach, and visualize your entire pipeline.',
    icon: TrendingUp,
    slug: 'sales-funnel',
  },
  {
    title: 'CX Management',
    desc: 'Collect feedback, manage reviews, and analyze guest experience in real-time.',
    icon: Smile,
    slug: 'cx-management',
  },
  {
    title: 'CRM & Client Management',
    desc: 'Track interactions, centralize contacts, and forecast your sales.',
    icon: Users,
    slug: 'crm-client-management',
  },
  {
    title: 'AI Chatbot & Automation',
    desc: 'Provide instant support, qualify leads, and automate routine tasks.',
    icon: Bot,
    slug: 'ai-chatbot-automation',
  },
  {
    title: 'Analytics & Reporting',
    desc: 'Build custom dashboards and uncover actionable business insights.',
    icon: BarChart3,
    slug: 'analytics-reporting',
  },
  {
    title: 'Team Management',
    desc: 'Schedule shifts, assign tasks, and streamline team communication.',
    icon: Users,
    slug: 'team-management',
  },
  {
    title: 'E-commerce Tools',
    desc: 'Recover abandoned carts and boost conversions with smart offers.',
    icon: ShoppingCart,
    slug: 'ecommerce-tools',
  },
  {
    title: 'Loyalty & Membership',
    desc: 'Reward returning customers and manage memberships with ease.',
    icon: Gift,
    slug: 'loyalty-membership',
  },
]

const howItWorksSteps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    desc: 'Get on the waitlist in under 60 seconds—no credit card required.',
  },
  {
    icon: Link2,
    title: 'Stay in the Loop',
    desc: 'We’ll email you product updates, early access invites, and launch news.',
  },
  {
    icon: Zap,
    title: 'Be First to Launch',
    desc: 'When we go live, you’ll be one of the very first to try Lunara’s AI funnels.',
  },
]

export default function HomeContent() {
  const { scrollY } = useScroll()
  const hue = useTransform(scrollY, [0, 500], [260, 300], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(hueSpring, h => `hsl(${h}, 34%, 9%)`)

  const canvas1 = useRef(null)
  const canvas2 = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const initLayer = (canvas, speed, count) => {
      const ctx = canvas.getContext('2d')
      const stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.2 + 0.05,
      }))
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        stars.forEach(star => {
          star.y += star.s * speed
          if (star.y > canvas.height) star.y = 0
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
          ctx.fillStyle = '#fff'
          ctx.globalAlpha = 0.85 // a bit more visible
          ctx.shadowColor = '#6E41FF'
          ctx.shadowBlur = 12 // stronger glow
          ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }
    initLayer(canvas1.current, 1, 180)
    initLayer(canvas2.current, 0.5, 120)
  }, [])

  return (
    <>
      {/* Decorative background layers */}
      <motion.div
        style={{ background }}
        className="fixed inset-0 -z-30"
        aria-hidden="true"
      />
      <canvas
        ref={canvas1}
        className="fixed inset-0 -z-20 opacity-80"
        aria-hidden="true"
      />
      <canvas
        ref={canvas2}
        className="fixed inset-0 -z-20 opacity-60"
        aria-hidden="true"
      />

      <main id="main-content" className="relative z-10 text-white font-sans">

        {/* Features */}
        <section
          id="features"
          className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          <h2 className="sr-only">Our Key Features</h2>
          {features.map(({ title, desc, icon: Icon, slug }, idx) => (
            <Link
              key={idx}
              href={`/features/${slug}`}
              className="group bg-gradient-to-br from-[#251654]/70 via-[#27134e]/60 to-[#130b24]/50 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center aspect-square transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_6px_32px_rgba(140,100,255,0.28)] focus:outline-none border border-[#322769]/60"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Icon
                  className="w-20 h-20 md:w-24 md:h-24 text-[#8C64FF] opacity-90 group-hover:opacity-100 transition duration-300 drop-shadow-[0_8px_32px_#8C64FF44]"
                  strokeWidth={1.4}
                />
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[#d2c6f7] text-sm max-w-[14rem]">
                  {desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </section>

        {/* Tech & Security */}
        <section
          id="security"
          className="py-20 px-6 bg-gradient-to-br from-[#23194b]/70 to-[#12092e]/80 backdrop-blur-lg"
          aria-labelledby="security-heading"
        >
          <h2
            id="security-heading"
            className="text-3xl font-bold text-center text-white mb-8"
          >
            Enterprise-Grade Tech & Security
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white p-4 rounded-2xl bg-gradient-to-br from-[#1a103e]/60 via-[#6E41FF33]/60 to-[#130b24]/40">
              <Cloud className="mx-auto mb-4 w-12 h-12 text-[#8C64FF]" />
              <h3 className="text-xl font-semibold mb-2">Global CDN</h3>
              <p>Lightning-fast performance worldwide via Vercel’s edge network.</p>
            </div>
            <div className="text-white p-4 rounded-2xl bg-gradient-to-br from-[#1a103e]/50 via-[#6E41FF22]/50 to-[#130b24]/40">
              <ShieldCheck className="mx-auto mb-4 w-12 h-12 text-[#8C64FF]" />
              <h3 className="text-xl font-semibold mb-2">SOC 2 & GDPR</h3>
              <p>Built-in compliance to keep your data—and your guests—secure.</p>
            </div>
            <div className="text-white p-4 rounded-2xl bg-gradient-to-br from-[#1a103e]/50 via-[#6E41FF22]/50 to-[#130b24]/40">
              <Lock className="mx-auto mb-4 w-12 h-12 text-[#8C64FF]" />
              <h3 className="text-xl font-semibold mb-2">Data Encryption</h3>
              <p>All data encrypted in transit (TLS) and at rest.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-20 text-center"
          aria-labelledby="pricing-heading"
        >
          <h2
            id="pricing-heading"
            className="text-3xl font-bold text-[#8C64FF] mb-8"
          >
            Simple, Scalable Pricing
          </h2>
          <div className="max-w-4xl mx-auto px-6">
            <PricingTable />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="howitworks"
          className="py-12 px-6 bg-gradient-to-br from-[#23194b]/70 to-[#12092e]/80 backdrop-blur-lg"
        >
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
                  {/* Shimmer Overlay */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl shimmer" />
                  <span className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-[#6E41FF22] via-[#8C64FF22] to-[#1a103e44] border border-[#8C64FF33] shadow-inner">
                    <Icon className="w-7 h-7 text-[#8C64FF]" />
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 drop-shadow">
                    {title}
                  </h3>
                  <p className="text-[#d2c6f7] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Shimmer Animation */}
          <style jsx>{`
            .shimmer {
              background: linear-gradient(
                120deg,
                transparent 30%,
                #8C64FF33 45%,
                #fff2 55%,
                transparent 70%
              );
              animation: shimmer-move 1.8s infinite linear;
              opacity: 0.38;
              z-index: 2;
            }
            @keyframes shimmer-move {
              0% {
                transform: translateX(-80%);
              }
              100% {
                transform: translateX(110%);
              }
            }
          `}</style>
        </section>
      </main>
    </>
  )
}
