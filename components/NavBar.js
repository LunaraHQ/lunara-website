import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const FEATURES = [
  { name: "Meetings & Events", slug: "meetings-events" },
  { name: "Sales Funnel", slug: "sales-funnel" },
  { name: "CX Management", slug: "cx-management" },
  { name: "CRM & Client Management", slug: "crm" },
  { name: "AI Chatbot & Automation", slug: "ai-chatbot" },
  { name: "Analytics & Reporting", slug: "analytics" },
  { name: "Team Management", slug: "team-management" },
  { name: "E-commerce Tools", slug: "ecommerce" },
  { name: "Loyalty & Membership", slug: "loyalty" },
];

export default function NavBar({ onContactOpen, session }) {
  const router = useRouter();
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const displayName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "Account";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#1a103e] via-[#6E41FF] to-[#221446] shadow-xl z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl tracking-wider text-white drop-shadow-glow">
          <span className="bg-gradient-to-r from-[#8C64FF] to-[#6E41FF] text-white px-4 py-2 rounded-2xl shadow-inner">
            Lunara
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition">
            Dashboard
          </Link>
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              className="text-[#e0d3fc] hover:text-white font-semibold text-lg flex items-center gap-1 transition"
              aria-haspopup="true"
              aria-expanded={featuresOpen}
            >
              Features
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {featuresOpen && (
              <div className="absolute left-0 mt-2 w-60 rounded-xl bg-[#130b24] shadow-2xl z-50 border border-[#352a5c] backdrop-blur-sm">
                <ul className="py-2">
                  {FEATURES.map((feature) => (
                    <li key={feature.slug}>
                      <Link
                        href={`/features/${feature.slug}`}
                        className="block px-5 py-2 text-[#bb9cff] hover:bg-[#23194b] hover:text-white transition rounded"
                      >
                        {feature.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link href="/how-it-works" className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition">
            How It Works
          </Link>
          <Link href="/pricing" className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition">
            Pricing
          </Link>
          <Link href="/pilot" className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition">
            Pilot
          </Link>
          <button
            className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition"
            onClick={onContactOpen}
            type="button"
          >
            Contact
          </button>
        </div>

        {/* Auth/Account Buttons */}
        <div className="flex items-center gap-4">
          {!session && (
            <>
              <Link href="/auth/signin" className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-bold shadow hover:scale-105 transition">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-5 py-2 rounded-2xl border border-[#6E41FF] text-[#6E41FF] font-bold bg-[#130b24] hover:bg-gradient-to-r hover:from-[#6E41FF] hover:to-[#8C64FF] hover:text-white transition">
                Sign Up
              </Link>
            </>
          )}
          {session && (
            <div className="flex items-center gap-3">
              <span className="text-[#e0d3fc] font-semibold px-3 py-1 rounded-xl bg-[#23194b]/80">
                Hi, {displayName}
              </span>
              <button
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8C64FF] to-[#6E41FF] text-white font-bold shadow hover:scale-105 transition"
                onClick={handleSignOut}
                type="button"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* Tiny space dust overlay for space vibes */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#6E41FF]/30 to-transparent opacity-50 pointer-events-none"></div>
    </header>
  );
}
