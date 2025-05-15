// components/PricingTable.js
import React from 'react'

const features = [
  { name: 'Meetings & Events', price: 19 },
  { name: 'Sales Funnel', price: 29 },
  { name: 'CX Management', price: 25 },
  { name: 'CRM & Client Management', price: 35 },
  { name: 'AI Chatbot & Automation', price: 39 },
  { name: 'Analytics & Reporting', price: 19 },
  { name: 'Team Management', price: 14 },
  { name: 'E-commerce Tools', price: 29 },
  { name: 'Loyalty & Membership', price: 19 },
]

const plans = [
  {
    name: 'Core Access',
    price: 29,
    features: [
      'Access to dashboard',
      'Account admin',
      'Standard support',
      'Add features as needed (see below)',
    ],
  },
  {
    name: 'Feature Add-Ons',
    custom: true,
    features: features.map((f) => `${f.name}: €${f.price}/mo`),
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Dedicated account manager',
      'SLA & compliance',
      'Custom integrations',
      'Volume discounts',
    ],
  },
]

export default function PricingTable() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-2xl p-6 ${
            plan.highlight
              ? 'bg-purple-700 text-white ring-4 ring-purple-400'
              : 'bg-gray-800 text-gray-200'
          } shadow-lg`}
        >
          {plan.highlight && (
            <p className="text-sm font-semibold uppercase mb-2 text-yellow-200">Add Features</p>
          )}
          <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
          <div className="text-4xl font-bold mb-4">
            {plan.price ? `€${plan.price}` : plan.price === 0 ? 'Free' : ''}
            {plan.custom ? <span className="text-base font-normal">Custom</span> : ''}
          </div>
          <ul className="mb-6 space-y-2">
            {plan.features.map((feat) => (
              <li key={feat} className="flex items-center">
                <span className="mr-2">✓</span> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-2 rounded-full bg-white text-gray-900 font-medium hover:opacity-90 transition">
            {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
          </button>
        </div>
      ))}
    </div>
  )
}
