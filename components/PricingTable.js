// components/PricingTable.js
import React from 'react'

const plans = [
  {
    name: 'Starter',
    price: 29,
    features: ['5 funnels', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Scale',
    price: 99,
    featured: true,
    features: ['Unlimited funnels', 'Advanced analytics', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 299,
    features: ['Dedicated account manager', 'SLA & compliance', 'Custom integrations'],
  },
]

export default function PricingTable() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-2xl p-6 ${
            plan.featured
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-200'
          } shadow-lg`}
        >
          {plan.featured && (
            <p className="text-sm font-semibold uppercase mb-2">Most Popular</p>
          )}
          <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
          <div className="text-4xl font-bold mb-4">
            €{plan.price}
          </div>
          <ul className="mb-6 space-y-2">
            {plan.features.map((feat) => (
              <li key={feat} className="flex items-center">
                <span className="mr-2">✓</span> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-2 rounded-full bg-white text-gray-900 font-medium hover:opacity-90 transition">
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  )
}
