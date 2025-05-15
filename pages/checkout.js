// pages/checkout.js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
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

function getCheckoutBasket() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(sessionStorage.getItem('lunaraBasket')) || []
  } catch {
    return []
  }
}
function clearCheckoutBasket() {
  if (typeof window !== 'undefined') sessionStorage.removeItem('lunaraBasket')
}

export default function Checkout() {
  const router = useRouter()
  const [selected, setSelected] = useState([])
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setSelected(getCheckoutBasket())
  }, [])

  const features = allFeatures.filter(f => selected.includes(f.key))
  const totalRaw = features.reduce((sum, f) => sum + f.price, 0)
  const bundle = features.length >= 3
  const total = bundle ? Math.round(totalRaw * 0.8) : totalRaw

  function handleInput(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields.')
      return
    }
    setSuccess(true)
    clearCheckoutBasket()
    setTimeout(() => router.push('/'), 2500)
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Checkout | Lunara</title>
        </Head>
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4 py-16 text-center">
          <div className="bg-black/80 p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-purple-200">Thank You!</h1>
            <p className="mb-4 text-gray-200 text-lg">
              Your Lunara account has been created.<br />
              We'll be in touch soon!
            </p>
            <span className="text-purple-300">Redirecting to home...</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Checkout | Lunara</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-800 via-purple-900 to-black px-4 py-16">
        <div className="bg-black/90 p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center">
          <div className="mb-6 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-purple-400 mr-2" />
            <h1 className="text-3xl font-extrabold text-purple-200">Checkout</h1>
          </div>
          <h2 className="text-lg font-semibold mb-4 text-purple-100">Your Selected Features</h2>
          {features.length === 0 ? (
            <p className="text-gray-300 mb-8">No features selected. <a href="/#pricing" className="underline text-purple-300">Return to Pricing</a></p>
          ) : (
            <>
              <ul className="mb-4 text-gray-200 text-left max-w-xs mx-auto space-y-2">
                {features.map(f => (
                  <li key={f.key} className="flex justify-between items-center border-b border-gray-700 pb-1">
                    {f.name} <span className="ml-2">€{f.price}</span>
                  </li>
                ))}
              </ul>
              {bundle && (
                <div className="text-green-400 mb-2 text-sm font-semibold">
                  20% Bundle Discount Applied!
                </div>
              )}
              <div className="text-xl font-bold mb-6 text-white">
                Total: €{total}/mo
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <h3 className="text-md font-semibold text-gray-300 mb-2">Create Your Account</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold py-2 rounded-full shadow-lg hover:scale-105 transition"
            >
              Complete Checkout
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
