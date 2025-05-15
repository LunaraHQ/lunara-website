// components/PricingTable.js
import React, { useState } from 'react'

const allFeatures = [
  { name: 'Meetings & Events', price: 19, key: 'meetings-events' },
  { name: 'Sales Funnel', price: 29, key: 'sales-funnel' },
  { name: 'CX Management', price: 25, key: 'cx-management' },
  { name: 'CRM & Client Management', price: 35, key: 'crm-client-management' },
  { name: 'AI Chatbot & Automation', price: 39, key: 'ai-chatbot-automation' },
  { name: 'Analytics & Reporting', price: 19, key: 'analytics-reporting' },
  { name: 'Team Management', price: 14, key: 'team-management' },
  { name: 'E-commerce Tools', price: 29, key: 'ecommerce-tools' },
  { name: 'Loyalty & Membership', price: 19, key: 'loyalty-membership' },
]

export default function PricingTable() {
  const [selected, setSelected] = useState([])

  const toggleFeature = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const getTotal = () => {
    const total = selected
      .map((k) => allFeatures.find((f) => f.key === k).price)
      .reduce((a, b) => a + b, 0)
    // 20% discount if they pick 3 or more
    if (selected.length >= 3) return Math.round(total * 0.8)
    return total
  }

  return (
    <div>
      <h3 className="text-lg mb-4 text-gray-200">
        Pick only the features you need. <span className="text-purple-300">Add 3 or more and save 20%!</span>
      </h3>
      <div className="grid gap-5 sm:grid-cols-3 mb-8">
        {allFeatures.map((feat) => (
          <div
            key={feat.key}
            onClick={() => toggleFeature(feat.key)}
            className={`cursor-pointer rounded-xl p-6 transition
              border-2 ${selected.includes(feat.key) ? 'border-purple-400 bg-purple-900' : 'border-gray-700 bg-gray-800'}
              hover:border-purple-300 hover:bg-purple-800 shadow-lg text-left`}
          >
            <h4 className="text-xl font-semibold mb-2">{feat.name}</h4>
            <div className="text-2xl font-bold mb-2">€{feat.price}/mo</div>
            <span className={`inline-block px-2 py-1 text-xs rounded ${selected.includes(feat.key) ? 'bg-purple-400 text-black' : 'bg-gray-700 text-gray-300'}`}>
              {selected.includes(feat.key) ? 'Selected' : 'Click to add'}
            </span>
          </div>
        ))}
      </div>
      <div className="mb-4 text-lg text-gray-100">
        <strong>
          Total: {selected.length === 0 ? '€0' : `€${getTotal()}/mo`}
          {selected.length >= 3 && (
            <span className="ml-2 text-green-400">(20% Bundle Discount Applied!)</span>
          )}
        </strong>
      </div>
      <button
        className={`w-full py-3 rounded-full font-semibold text-lg transition 
          ${selected.length > 0 ? 'bg-purple-500 hover:bg-purple-400 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
        disabled={selected.length === 0}
      >
        {selected.length > 0 ? 'Start Free Trial' : 'Select Features Above'}
      </button>
    </div>
  )
}
