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
    <section id="howitworks" className="py-24 bg-gradient-to-br from-[#23194b]/70 to-[#12092e]/80 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
        How It Works
      </h2>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-[#251654]/70 via-[#27134e]/60 to-[#130b24]/50 backdrop-blur-md rounded-2xl shadow-md"
          >
            <Icon className="w-14 h-14 text-[#8C64FF] mb-5" />
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-[#d2c6f7]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
