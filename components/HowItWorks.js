const steps = [
  {
    number: 1,
    title: 'Sign Up',
    desc: 'Create your free Lunara account in under 60 seconds.',
    imgSrc: '/images/mockup-signup.png',
    imgAlt: 'Sign Up mockup',
  },
  {
    number: 2,
    title: 'Connect & Configure',
    desc: 'Link your CRM, set goals, and personalize your funnel.',
    imgSrc: '/images/mockup-configure.png',
    imgAlt: 'Configure mockup',
  },
  {
    number: 3,
    title: 'Launch & Optimize',
    desc: 'Go live and let our AI continuously A/B test.',
    imgSrc: '/images/mockup-launch.png',
    imgAlt: 'Launch mockup',
  },
]

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-32 bg-gray-900 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        How It Works
      </h2>

      {/* Step Flow Graphic */}
      <div className="flex justify-center items-center mb-16 space-x-4">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                {step.number}
              </div>
              <span className="mt-2 text-white text-sm font-medium">
                {step.title}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mockup Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center space-y-4">
            <img
              src={step.imgSrc}
              alt={step.imgAlt}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}