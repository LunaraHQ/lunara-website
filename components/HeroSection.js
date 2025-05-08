
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-purple-900 to-black opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Lunara
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-purple-300 mb-4 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        AI-powered funnels built for orbit.
      </motion.p>
      <motion.p
        className="text-md md:text-lg text-gray-400 mb-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Scalable. Secure. Stunningly simple.
      </motion.p>
      <div className="flex gap-4">
        <a
          href="#pricing"
          className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition"
        >
          Get Started
        </a>
        <a
          href="#features"
          className="border border-purple-400 text-purple-300 font-semibold px-6 py-3 rounded-full hover:bg-purple-900/30 transition"
        >
          Learn More
        </a>
      </div>
    </section>
  )
}
