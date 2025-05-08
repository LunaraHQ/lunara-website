import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const features = [
  {
    title: 'Adaptive Funnels',
    desc: 'Personalized journeys for every visitor.',
    icon: '/icons/icon_funnel.png',
  },
  {
    title: 'Unified Dashboard',
    desc: 'Track everything in one smart console.',
    icon: '/icons/icon_dashboard.png',
  },
  {
    title: 'Bank-Grade Security',
    desc: 'SOC-2, GDPR, and zero-trust by default.',
    icon: '/icons/icon_security.png',
  },
]

const valueProps = [
  { title: 'Built for Growth', desc: 'Scales effortlessly from startup to enterprise.' },
  { title: 'AI that Learns', desc: 'Funnels improve automatically based on user behavior.' },
  { title: 'You Own Everything', desc: 'Your data. Your brand. No vendor lock-in.' },
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

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <motion.div style={{ background }} className="fixed inset-0 -z-30" />
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-60" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-40" />

      <main className="relative z-10 text-white font-sans">
        {/* Hero */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-md animate-pulse">
            Lunara
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 mb-4">
            AI-powered funnels built for orbit
          </p>
          <p className="text-md md:text-lg text-gray-400 mb-6 max-w-md">
            Built for scale, designed for clarity, secured for enterprise.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition relative overflow-hidden"
          >
            View Pricing
          </button>
        </section>

        {/* Features - Full Logo Cards */}
        <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl bg-black/60 backdrop-blur-md overflow-hidden p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={f.icon}
                alt={f.title}
                className="h-40 object-contain opacity-60 group-hover:opacity-100 transition duration-300"
              />
            </motion.div>
          ))}
        </section>

        {/* Why Lunara */}
        <section className="py-20 bg-white/5">
          <h2 className="text-3xl font-bold text-center text-purple-300 mb-10">
            Why Lunara?
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            {valueProps.map((v, i) => (
              <div key={i} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-6">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl shadow-lg relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-purple-400 text-2xl"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">
                Choose Your Plan
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
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
                    features: ['Dedicated manager', 'SLA & SSO', 'Custom integrations'],
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
            </div>
          </div>
        )}
      </main>
    </>
  )
}
