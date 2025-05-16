import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] px-6">
      <div className="relative max-w-3xl w-full flex flex-col items-center bg-gradient-to-br from-[#23194b] via-[#27134e] to-[#130b24] rounded-3xl shadow-2xl p-10 mt-20 border border-[#352a5c]">
        <h1 className="text-5xl font-extrabold text-white mb-6 text-center drop-shadow-glow">
          Launch from the Moon.<br />Grow Beyond the Stars.
        </h1>
        <p className="text-xl text-[#e0d3fc] mb-8 text-center">
          Lunara empowers your business with modular AI tools for sales, events, analytics, and more.<br />
          <span className="block mt-4 text-base text-[#8C64FF] font-semibold">
            “Some people like to shoot for the stars and land on the moon, at Lunara, we launch from the moon.”
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/pricing" className="bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-bold px-7 py-4 rounded-xl shadow hover:scale-105 transition text-center">
            See Pricing
          </Link>
          <Link href="/auth/signup" className="bg-[#23194b] border border-[#8C64FF] text-[#8C64FF] font-bold px-7 py-4 rounded-xl shadow hover:bg-[#322769] hover:text-white transition text-center">
            Get Started
          </Link>
        </div>
        {/* Decorative star overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            background: "radial-gradient(circle at 80% 20%, #fff2 1.5px, transparent 40%), radial-gradient(circle at 10% 80%, #fff1 1.5px, transparent 40%)"
          }}
        />
      </div>
    </main>
  );
}
