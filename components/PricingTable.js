// components/PricingTable.js
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'

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
  const [showCart, setShowCart] = useState(false)

  const toggleFeature = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
    setShowCart(true)
  }

  const getTotal = () => {
    const total = selected
      .map((k) => allFeatures.find((f) => f.key === k).price)
      .reduce((a, b) => a + b, 0)
    if (selected.length >= 3) return Math.round(total * 0.8)
    return total
  }

  const cartFeatures = allFeatures.filter(f => selected.includes(f.key))

  const handleCheckout = () => {
    sessionStorage.setItem('lunaraBasket', JSON.stringify(selected))
    window.location.href = '/checkout'
  }

  return (
    <div className="relative">
      {/* Sticky Basket Icon */}
      {selected.length > 0 && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center bg-purple-700 rounded-full shadow-lg px-4 py-2 cursor-pointer transition hover:bg-purple-600"
          style={{ minWidth: '60px' }}
          onClick={() => setShowCart(v => !v)}
        >
          <ShoppingCart className="text-white w-6 h-6" />
          <span className="ml-2 text-white font-bold">{selected.length}</span>
        </div>
      )}

      {/* Cart Popup */}
      {showCart && selected.length > 0 && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 border border-purple-500 rounded-2xl p-6 shadow-2xl w-80">
          <h3 className="text-lg font-semibold mb-4 text-white">Your Basket</h3>
          <ul className="mb-4 space-y-2 text-gray-200">
            {cartFeatures.map(f => (
              <li key={f.key} className="flex justify-between items-center">
                {f.name}
                <span className="ml-2">€{f.price}</span>
              </li>
            ))}
          </ul>
          {selected.length >= 3 && (
            <div className="text-green-400 mb-2 text-sm">
              20% Bundle Discount Applied!
            </div>
          )}
          <div className="text-xl font-bold mb-4 text-white">
            Total: €{getTotal()}/mo
          </div>
          <button
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-full transition"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

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
        onClick={selected.length > 0 ? handleCheckout : undefined}
      >
        {selected.length > 0 ? 'Proceed to Checkout' : 'Select Features Above'}
      </button>
    </div>
  )
}
