// components/HowItWorks.js
import React from 'react'

const steps = [
  { number: 1, title: 'Sign Up', desc: 'Create your free Lunara account in under 60 seconds.' },
  { number: 2, title: 'Connect & Configure', desc: 'Link your CRM, set goals, and personalize your funnel.' },
  { number: 3, title: 'Launch & Optimize', desc: 'Go live and let our AI continuously A/B test.' },
]

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-32 bg-gray-900 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div className="max-w-4xl mx-auto space-y-12">
        {steps.map((s) => (
          <div key={s.number} className="flex items-center space-x-6">
            <div className="text-4xl font-extrabold text-blue-500">{s.number}</div>
            <div>
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
