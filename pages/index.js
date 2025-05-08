import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Home() {
  const { scrollY } = useScroll()

  // Dynamic hue shift: 0→360° every 10 seconds
  const hue = useTransform(
    scrollY,
    [0, 500],
    [0, 360],
    { clamp: false }
  )
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })

  // Comet motion path
  const x = useTransform(scrollY, [0, 3000], ['10%', '90%'])
  const y = useTransform(scrollY, [0, 3000], ['10%', '90%'])
  const cometX = useSpring(x, { stiffness: 120, damping: 25 })
  const cometY = useSpring(y, { stiffness: 120, damping: 25 })

  // Starfield layers
  const canvas1 = useRef(null)
  const canvas2 = useRef(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const initLayer = (canvas, speedFactor, count) => {
      const ctx = canvas.getContext('2d')
      const stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.2 + 0.05
      }))
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const draw = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        stars.forEach(star => {
          star.y += star.s * speedFactor
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
      <Head>
        <title>Lunara · Space-Age Funnels</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      {/* Background gradient */}
      <motion.div
        style={{
          background: hueSpring.interpolate(h => `hsl(${h}, 20%, 5%)`)
        }}
        className="fixed inset-0 -z-30 transition-colors duration-500"
      />

      {/* Starfields */}
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-70" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-50" />

      {/* Drifting Comet */}
      <motion.div
        style={{
          x: cometX,
          y: cometY
        }}
        className="fixed w-16 h-16 rounded-full shadow-2xl"
      >
        <div className="w-full h-full bg-gradient-to-br from-white to-blue-400 rounded-full blur-xl opacity-80" />
      </motion.div>

      <main className="relative z-10 text-white">
        {/* Hero */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-extrabold mb-4">Lunara</h1>
          <p className="text-xl max-w-md mb-8">
            Next-gen sales funnels powered by AI, launched into orbit.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition">
            Get Started
          </button>
        </section>

        {/* Features */}
        <section className="py-32 px-6 max-w-4xl mx-auto space-y-16">
          {[
            {
              title: 'Adaptive Lead Funnels',
              desc: 'Intelligently guide prospects through a personalized cosmic journey.'
            },
            {
              title: 'Unified Control Center',
              desc: 'One dashboard to track CRM, analytics, and automations in real time.'
            },
            {
              title: 'Enterprise Security',
              desc: 'Bank-grade encryption, SOC-2 compliance, zero-trust from day one.'
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold mb-2">{f.title}</h2>
              <p className="text-white/80">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="h-screen flex items-center justify-center px-4">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg"
          >
            Request Early Access
          </motion.button>
        </section>
      </main>
    </>
  )
}
