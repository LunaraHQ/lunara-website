import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Funnel, LayoutDashboard, ShieldCheck } from 'lucide-react'

/* --- Data: icon + caption --- */
const features = [
  {
    title: 'Adaptive Funnels',
    desc: 'Guided journeys that learn & improve.',
    icon: Funnel,
  },
  {
    title: 'Unified Dashboard',
    desc: 'All your analytics in one console.',
    icon: LayoutDashboard,
  },
  {
    title: 'Bank-Grade Security',
    desc: 'SOC-2 & GDPR compliance out-of-the-box.',
    icon: ShieldCheck,
  },
]

export default function HomeContent() {
  /* hue-shift background */
  const { scrollY } = useScroll()
  const hue = useTransform(scrollY, [0, 500], [260, 300], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(hueSpring, h => `hsl(${h}, 30%, 8%)`)

  /* starfield */
  const canvas1 = useRef(null)
  const canvas2 = useRef(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const init = (c, speed, count) => {
      const ctx = c.getContext('2d')
      const stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.2 + 0.05,
      }))
      c.width = window.innerWidth
      c.height = window.innerHeight
      const draw = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0, 0, c.width, c.height)
        stars.forEach(s => {
          s.y += s.s * speed
          if (s.y > c.height) s.y = 0
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI)
          ctx.fillStyle = 'white'
          ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }
    init(canvas1.current, 1, 150)
    init(canvas2.current, 0.5, 100)
  }, [])

  return (
    <>
      <motion.div style={{ background }} className="fixed inset-0 -z-30" />
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-60" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-40" />

      <main className="relative z-10 text-white font-sans">
        {/* --- Feature cards with captions --- */}
        <section
          id="features"
          className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {features.map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-black/60 backdrop-blur-md rounded-2xl p-8
                         flex flex-col items-center text-center aspect-square
                         transform transition-all duration-300
                         hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
            >
              <Icon
                className="w-28 h-28 md:w-32 md:h-32 text-purple-300
                           opacity-60 group-hover:opacity-100
                           transition duration-300"
                strokeWidth={1.4}
              />
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-300 text-sm max-w-[14rem]">
                {desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* --- Pricing (unchanged) --- */}
        <section id="pricing" className="py-20 bg-white/5 text-center">
          <h2 className="text-3xl font-bold text-purple-300 mb-8">
            Simple, Scalable Pricing
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
            {[
              {
                name: 'Starter',
                price: 29,
                features: ['Up to 5 funnels', 'Basic analytics', 'Email support'],
              },
              {
                name: 'Scale',
                price: 99,
                features: ['Unlimited funnels', 'Advanced analytics', 'Priority support'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 299,
                features: [
                  'Dedicated manager',
                  'SLA & SSO',
                  'Custom integrations',
                ],
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl ${
                  p.highlight
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <div className="text-4xl font-extrabold mb-4">€{p.price}</div>
                <ul className="mb-6 space-y-2 text-sm">
                  {p.features.map((f, j) => (
                    <li key={j}>• {f}</li>
                  ))}
                </ul>
                <button className="w-full bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                  Select
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
