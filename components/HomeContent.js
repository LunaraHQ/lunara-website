// components/HomeContent.js
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function HomeContent() {
  const { scrollY } = useScroll()

  // Background hue shift
  const hue = useTransform(scrollY, [0, 500], [0, 360], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(hueSpring, h => `hsl(${h}, 20%, 5%)`)

  // Starfield layers
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
      {/* Background gradient */}
      <motion.div
        style={{ background }}
        className="fixed inset-0 -z-30 transition-colors duration-500"
      />

      {/* Starfields */}
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-70" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-50" />

      <main className="relative z-10 text-white">
        {/* Hero Section */}
        <section
          id="hero"
          className="h-screen flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-6xl font-extrabold mb-4">Lunara</h1>
          <p className="text-xl max-w-md mb-8">
            Next-gen sales funnels powered by AI, launched into orbit.
          </p>
          <a
            href="#features"
            className="underline hover:text-blue-400 text-lg"
          >
            Explore Features
          </a>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: '/icons/rocket.svg',
              title: 'Adaptive Funnels',
              desc: 'Personalized journeys that evolve with your users.',
            },
            {
              icon: '/icons/dashboard.svg',
              title: 'Unified Dashboard',
              desc: 'Everything you need—CRM, analytics, automations.',
            },
            {
              icon: '/icons/shield.svg',
              title: 'Enterprise-Grade Security',
              desc: 'SOC-2, GDPR, and zero-trust from day one.',
            },
          ].map(f => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            >
              <img
                src={f.icon}
                alt={f.title}
                className="mx-auto mb-4 h-16 w-16"
              />
              <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* How It Works */}
        <section
          id="howitworks"
          className="py-32 bg-gray-900 px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                number: 1,
                title: 'Sign Up',
                desc: 'Create your free Lunara account in under 60 seconds.',
              },
              {
                number: 2,
                title: 'Connect & Configure',
                desc: 'Link your CRM, set goals, and personalize your funnel.',
              },
              {
                number: 3,
                title: 'Launch & Optimize',
                desc: 'Go live and let our AI continuously A/B test.',
              },
            ].map(s => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6"
              >
                <div className="text-4xl font-extrabold text-blue-500">
                  {s.number}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                  <p className="text-gray-300">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Table */}
        <section
          id="pricing"
          className="py-32 px-6 bg-black/80"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Pricing Plans
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 29,
                features: ['5 funnels', 'Basic analytics', 'Email support'],
                popular: false,
              },
              {
                name: 'Scale',
                price: 99,
                features: [
                  'Unlimited funnels',
                  'Advanced analytics',
                  'Priority support',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 299,
                features: [
                  'Dedicated account manager',
                  'SLA & compliance',
                  'Custom integrations',
                ],
                popular: false,
              },
            ].map(p => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl shadow-lg ${
                  p.popular
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-100'
                }`}
              >
                {p.popular && (
                  <div className="text-sm uppercase mb-2">Most Popular</div>
                )}
                <h3 className="text-2xl font-semibold mb-4">
                  {p.name}
                </h3>
                <div className="text-5xl font-extrabold mb-4">
                  ${p.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center">
                      <span className="mr-2">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer will render below via Footer component */}
      </main>
    </>
  )
}
