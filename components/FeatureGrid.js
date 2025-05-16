const features = [
  { icon: '/icons/rocket.svg', title: 'Adaptive Funnels', desc: 'Personalized journeys that evolve with your users.' },
  { icon: '/icons/dashboard.svg', title: 'Unified Dashboard', desc: 'Everything you need—CRM, analytics, automations.' },
  { icon: '/icons/shield.svg', title: 'Enterprise-Grade Security', desc: 'SOC-2, GDPR, and zero-trust from day one.' },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-32 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-gradient-to-br from-[#27134e]/90 via-[#1a103e]/90 to-[#130b24]/90 border border-[#352a5c] rounded-2xl p-8 text-center shadow-[0_8px_32px_#8C64FF22] group transition-all hover:scale-105 hover:shadow-[0_8px_48px_#8C64FF55]"
        >
          <div className="flex justify-center mb-4">
            <img
              src={f.icon}
              alt={f.title}
              className="h-16 w-16 drop-shadow-[0_2px_16px_#8C64FF66] transition-all group-hover:scale-110"
              draggable={false}
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-[#8C64FF] drop-shadow-glow">
            {f.title}
          </h3>
          <p className="text-[#d2c6f7]">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
