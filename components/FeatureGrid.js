const features = [
  { icon: '/icons/rocket.svg', title: 'Adaptive Funnels', desc: 'Personalized journeys that evolve with your users.' },
  { icon: '/icons/dashboard.svg', title: 'Unified Dashboard', desc: 'Everything you need—CRM, analytics, automations.' },
  { icon: '/icons/shield.svg', title: 'Enterprise-Grade Security', desc: 'SOC-2, GDPR, and zero-trust from day one.' },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      {features.map((f) => (
        <div key={f.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <img src={f.icon} alt={f.title} className="mx-auto mb-4 h-16" />
          <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-300">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
