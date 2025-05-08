export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black/0 to-black"
    >
      <h1 className="text-6xl md:text-8xl font-extrabold mb-4">Launch Your Funnels Into Orbit</h1>
      <p className="text-xl md:text-2xl max-w-2xl mb-8">
        AI-powered, data-driven, and designed for conversion. Get started in minutes.
      </p>
      <div className="space-x-4">
        <a
          href="#pricing"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Get Started
        </a>
        <a href="#features" className="underline hover:text-blue-400">
          Learn More
        </a>
      </div>
    </section>
  )
}
