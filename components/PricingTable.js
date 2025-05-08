const plans = [
  { name: 'Starter', price: 29, features: ['5 funnels', 'Basic analytics', 'Email support'], popular: false },
  { name: 'Scale', price: 99, features: ['Unlimited funnels', 'Advanced analytics', 'Priority support'], popular: true },
  { name: 'Enterprise', price: 299, features: ['Dedicated account manager', 'SLA & compliance', 'Custom integrations'], popular: false },
]

export default function PricingTable() {
  return (
    <section id="pricing" className="py-32 px-6 bg-black/80">
      <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`p-8 rounded-2xl shadow-lg ${
              p.popular ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-100'
            }`}
          >
            {p.popular && <div className="text-sm uppercase mb-2">Most Popular</div>}
            <h3 className="text-2xl font-semibold mb-4">{p.name}</h3>
            <div className="text-5xl font-extrabold mb-4">${p.price}</div>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-center">
                  <span className="mr-2">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
