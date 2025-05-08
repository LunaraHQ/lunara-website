
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const features = [
  {
    title: 'Adaptive Funnels',
    icon: '/icons/icon_funnel.png',
  },
  {
    title: 'Unified Dashboard',
    icon: '/icons/icon_dashboard.png',
  },
  {
    title: 'Bank-Grade Security',
    icon: '/icons/icon_security.png',
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
      <motion.div style={{ background }} className="fixed inset-0 -z-30" />
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-60" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-40" />

      <main className="relative z-10 text-white font-sans">
        <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative aspect-square bg-black/60 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={f.icon}
                alt={f.title}
                className="w-4/5 h-4/5 object-contain opacity-60 group-hover:opacity-100 transition duration-300"
              />
            </motion.div>
          ))}
        </section>
      </main>
    </>
  )
}
