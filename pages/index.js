import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

// --- Starfield init (client only) ---
function useStarfield() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = document.getElementById('starfield')
    const ctx = canvas.getContext('2d')
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      s: Math.random() * 0.4 + 0.1
    }))
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    function draw() {
      ctx.fillStyle = 'rgba(10,10,30,0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        star.y += star.s
        if (star.y > canvas.height) star.y = 0
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }
    draw()
  }, [])
}

export default function Home() {
  const { scrollY } = useScroll()
  const bgRaw = useTransform(scrollY, [0, 800], ['#0a0a1a', '#ffffff'])
  const bg = useSpring(bgRaw, { stiffness: 50, damping: 20 })

  // comet motion
  const xRaw = useTransform(scrollY, [0, 3000], ['2%', '98%'])
  const yRaw = useTransform(scrollY, [0, 3000], ['2%', '98%'])
  const cometX = useSpring(xRaw, { stiffness: 120, damping: 25 })
  const cometY = useSpring(yRaw, { stiffness: 120, damping: 25 })

  useStarfield()

  return (
    <>
      <Head>
        <title>Lunara — Next-Gen Sales Funnels</title>
        <meta name="description" content="AI-powered funnels for tomorrow’s revenue." />
      </Head>

      {/* Background & Starfield */}
      <motion.div
        style={{ backgroundColor: bg }}
        className="fixed inset-0 -z-20 transition-colors duration-500"
      />
      <canvas id="starfield" className="fixed inset-0 -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-white/10">
        <Image src="/logo.svg" alt="Lunara" width={40} height={40} />
        <ul className="flex space-x-8 text-white">
          {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
            <li key={item} className="hover:underline cursor-pointer">{item}</li>
          ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
          Sign In
        </button>
      </nav>

      <main className="relative pt-24">

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-extrabold text-white mb-4"
          >
            Banking Reimagined in Space
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/80 mb-8 max-w-lg"
          >
            Launch your revenue into orbit with Lunara’s AI-powered funnels and enterprise-grade security.
          </motion.p>
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
          >
            Get Started
          </motion.button>
        </section>

        {/* Comet */}
        <motion.div
          style={{
            x: cometX,
            y: cometY,
            background: 'radial-gradient(circle, #fff, #0ea5e9)'
          }}
          className="w-16 h-16 rounded-full shadow-2xl fixed"
        />

        {/* Features Grid */}
        <section id="features" className="py-32 bg-white">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              {
                title: 'Intelligent Funnels',
                icon: '/icons/funnel.svg',
                desc: 'Adaptive lead capture that guides prospects through cosmic-grade journeys.'
              },
              {
                title: 'Unified Dashboard',
                icon: '/icons/dashboard.svg',
                desc: 'See transactions, CRM, and analytics on one Mission Control panel.'
              },
              {
                title: 'Enterprise Security',
                icon: '/icons/shield.svg',
                desc: 'AES-256 encryption, SOC-2 compliance, and zero-trust policies from launch.'
              }
            ].map(({ title, icon, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-2xl text-center shadow"
              >
                <Image src={icon} alt={title} width={64} height={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 bg-gradient-to-b from-white to-gray-100">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              {
                tier: 'Starter',
                price: '$29/mo',
                features: ['5 Funnels', 'Basic Analytics', 'Email Support']
              },
              {
                tier: 'Business',
                price: '$79/mo',
                features: ['20 Funnels', 'Advanced Analytics', 'Priority Support']
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                features: ['Unlimited Funnels', 'Dedicated Account', '24/7 Support']
              }
            ].map(({ tier, price, features }) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <h3 className="text-2xl font-semibold mb-4">{tier}</h3>
                <p className="text-3xl font-bold mb-6">{price}</p>
                <ul className="space-y-2 mb-6">
                  {features.map(f => <li key={f} className="text-gray-600">✓ {f}</li>)}
                </ul>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="py-24 bg-blue-600">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Launch?</h2>
            <p className="text-white/80 mb-8">Get Lunara and propel your revenue into new horizons.</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg">
              Sign Up Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
            {['Product', 'Company', 'Resources', 'Legal'].map(section => (
              <div key={section}>
                <h4 className="text-white mb-4 font-semibold">{section}</h4>
                <ul className="space-y-2">
                  {['Overview','Blog','Support','Terms'].map(link => (
                    <li key={link} className="hover:text-white cursor-pointer">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-sm">© 2025 Lunara. All rights reserved.</div>
        </footer>
      </main>
    </>
  )
}
