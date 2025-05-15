// components/HomeContent.js
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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
} from 'lucide-react'
import PricingTable from './PricingTable'

const features = [
  {
    title: 'Meetings & Events',
    desc: 'Effortlessly manage bookings, registration, and reminders for any event.',
    icon: Calendar,
  },
  {
    title: 'Sales Funnel',
    desc: 'Capture leads, automate outreach, and visualize your entire pipeline.',
    icon: TrendingUp,
  },
  {
    title: 'CX Management',
    desc: 'Collect feedback, manage reviews, and analyze guest experience in real-time.',
    icon: Smile,
  },
  {
    title: 'CRM & Client Management',
    desc: 'Track interactions, centralize contacts, and forecast your sales.',
    icon: Users,
  },
  {
    title: 'AI Chatbot & Automation',
    desc: 'Provide instant support, qualify leads, and automate routine tasks.',
    icon: Bot,
  },
  {
    title: 'Analytics & Reporting',
    desc: 'Build custom dashboards and uncover actionable business insights.',
    icon: BarChart3,
  },
  {
    title: 'Team Management',
    desc: 'Schedule shifts, assign tasks, and streamline team communication.',
    icon: Users, // <-- changed from UsersCog to Users
  },
  {
    title: 'E-commerce Tools',
    desc: 'Recover abandoned carts and boost conversions with smart offers.',
    icon: ShoppingCart,
  },
  {
    title: 'Loyalty & Membership',
    desc: 'Reward returning customers and manage memberships with ease.',
    icon: Gift,
  },
]

export default function HomeContent() {
  const { scrollY } = useScroll()
  const hue = useTransform(scrollY, [0, 500], [260, 300], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(hueSpring, h => `hsl(${h}, 30%, 8%)`)

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
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        stars.forEach(star => {
          star.y += star.s * speed
          if (star.y > canvas.height) star.y = 0
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
          ctx.fillStyle = 'white'
          ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }
    initLayer(canvas1.current, 1, 150)
    initLayer(canvas2.current, 0.5, 100)
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
        className="fixed inset-0 -z-20 opacity-60"
        aria-hidden="true"
      />
      <canvas
        ref={canvas2}
        className="fixed inset-0 -z-20 opacity-40"
        aria-hidden="true"
      />

      <main id="main-content" className="relative z-10 text-white font-sans">
        {/* Features */}
        <section
          id="features"
          className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          <h2 className="sr-only">Our Key Features</h2>
          {features.map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-black/60 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center aspect-square transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <Icon
                className="w-20 h-20 md:w-24 md:h-24 text-purple-300 opacity-80 group-hover:opacity-100 transition duration-300"
                strokeWidth={1.4}
              />
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-gray-200 text-sm max-w-[14rem]">
                {desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Tech & Security */}
        <section
          id="security"
          className="py-20 px-6 bg-gray-900"
          aria-labelledby="security-heading"
        >
          <h2
            id="security-heading"
            className="text-3xl font-bold text-center text-white mb-8"
          >
            Enterprise-Grade Tech & Security
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white p-4">
              <Cloud className="mx-auto mb-4 w-12 h-12 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Global CDN</h3>
              <p>Lightning-fast performance worldwide via Vercel’s edge network.</p>
            </div>

            <div className="text-white p-4">
              <ShieldCheck className="mx-auto mb-4 w-12 h-12 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">SOC 2 & GDPR</h3>
              <p>Built-in compliance to keep your data—and your guests—secure.</p>
            </div>

            <div className="text-white p-4">
              <Lock className="mx-auto mb-4 w-12 h-12 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Data Encryption</h3>
              <p>All data encrypted in transit (TLS) and at rest.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-20 bg-white/5 text-center"
          aria-labelledby="pricing-heading"
        >
          <h2
            id="pricing-heading"
            className="text-3xl font-bold text-purple-300 mb-8"
          >
            Simple, Scalable Pricing
          </h2>
          <div className="max-w-4xl mx-auto px-6">
            <PricingTable />
          </div>
        </section>
      </main>
    </>
  )
}
