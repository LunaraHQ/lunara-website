// components/HomeContent.js
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function HomeContent() {
  const { scrollY } = useScroll()

  // Background hue shift
  const hue = useTransform(scrollY, [0, 500], [0, 360], { clamp: false })
  const hueSpring = useSpring(hue, { stiffness: 10, damping: 50 })
  const background = useTransform(
    hueSpring,
    (h) => `hsl(${h}, 20%, 5%)`
  )

  // Base trajectory
  const baseX = useTransform(scrollY, [0, 3000], ['0vw', '-30vw'])
  const baseY = useTransform(scrollY, [0, 3000], ['40vh', '-80vh'])

  // Floating jitter
  const jitterX = useTransform(scrollY, [0,1000,2000,3000], [0,60,-60,0])
  const jitterY = useTransform(scrollY, [0,1000,2000,3000], [0,-30,30,0])

  // Combine + spring
  const finalX = useSpring(
    useTransform([baseX, jitterX], ([x, j]) => `calc(${x} + ${j}px)`),
    { stiffness: 120, damping: 25 }
  )
  const finalY = useSpring(
    useTransform([baseY, jitterY], ([y, j]) => `calc(${y} + ${j}px)`),
    { stiffness: 120, damping: 25 }
  )

  // Spin
  const rotate = useTransform(scrollY, [0,3000], [0,1080], { clamp: false })

  // Starfields
  const canvas1 = useRef(null)
  const canvas2 = useRef(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const init = (c,s,n) => {
      const ctx = c.getContext('2d')
      const stars = Array.from({ length: n }, () => ({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
        r: Math.random()*1.2+0.2,
        s: Math.random()*0.2+0.05,
      }))
      c.width = window.innerWidth; c.height = window.innerHeight
      const draw = () => {
        ctx.fillStyle='rgba(0,0,0,0.1)'
        ctx.fillRect(0,0,c.width,c.height)
        stars.forEach(star => {
          star.y += star.s*s
          if (star.y>c.height) star.y=0
          ctx.beginPath()
          ctx.arc(star.x,star.y,star.r,0,2*Math.PI)
          ctx.fillStyle='white'; ctx.fill()
        })
        requestAnimationFrame(draw)
      }
      draw()
    }
    init(canvas1.current,1,150)
    init(canvas2.current,0.5,100)
  }, [])

  return (
    <>
      {/* Background */}
      <motion.div style={{ background }} className="fixed inset-0 -z-30" />

      {/* Stars */}
      <canvas ref={canvas1} className="fixed inset-0 -z-20 opacity-70" />
      <canvas ref={canvas2} className="fixed inset-0 -z-20 opacity-50" />

      {/* Textured Asteroid */}
      <motion.div
        style={{ x: finalX, y: finalY, rotate }}
        className="fixed left-1/2 -translate-x-1/2 bottom-[30vh] w-[50vw] h-[50vw] max-w-lg max-h-lg"
      >
        <img
          src="/asteroid-texture.png"
          alt="Asteroid"
          className="w-full h-full object-cover rounded-full shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.7))' }}
        />
      </motion.div>

      {/* Page content */}
      <main className="relative z-10 text-white">
        {/* …your hero, features, CTA sections… */}
      </main>
    </>
  )
}
