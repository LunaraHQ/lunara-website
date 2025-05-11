// components/HowItWorks.js
import React from 'react'
import { UserPlus, Link2, Zap } from 'lucide-react'

const steps = [
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

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-32 bg-gray-900 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">
        How It Works
      </h2>
      <div className="grid gap-12 grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg"
          >
            <Icon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
