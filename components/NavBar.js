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
    <header className="w-full bg-gradient-to-r from-[#6E41FF] via-[#8C64FF] to-[#322769] shadow-lg z-40">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-wide">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[#8C64FF] shadow-sm">Lunara</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-white/90 hover:text-white transition font-semibold">
            Dashboard
          </Link>
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              className="text-white/90 hover:text-white transition font-semibold flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={featuresOpen}
            >
              Features
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {featuresOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl z-40 border border-gray-200">
                <ul className="py-2">
                  {FEATURES.map((feature) => (
                    <li key={feature.slug}>
                      <Link
                        href={`/features/${feature.slug}`}
                        className="block px-5 py-2 text-gray-800 hover:bg-[#F3F0FF] hover:text-[#6E41FF] transition rounded"
                      >
                        {feature.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link href="/how-it-works" className="text-white/90 hover:text-white transition font-semibold">
            How It Works
          </Link>
          <Link href="/pricing" className="text-white/90 hover:text-white transition font-semibold">
            Pricing
          </Link>
          <Link href="/pilot" className="text-white/90 hover:text-white transition font-semibold">
            Pilot
          </Link>
          <button
            className="text-white/90 hover:text-white transition font-semibold"
            onClick={onContactOpen}
            type="button"
          >
            Contact
          </button>
        </div>

        {/* Auth/Account Buttons */}
        <div className="flex items-center gap-3">
          {!session && (
            <>
              <Link href="/auth/signin" className="px-4 py-2 rounded-xl bg-white/90 text-[#6E41FF] font-bold shadow hover:bg-white hover:text-[#8C64FF] transition">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 rounded-xl border border-white/60 text-white font-bold hover:bg-white hover:text-[#6E41FF] transition">
                Sign Up
              </Link>
            </>
          )}
          {session && (
            <div className="flex items-center gap-2">
              <span className="text-white/90 font-semibold px-3 py-1 rounded bg-[#8C64FF]/50">
                Hi, {displayName}
              </span>
              <button
                className="px-3 py-2 rounded-xl bg-white/80 text-[#8C64FF] font-bold shadow hover:bg-white hover:text-[#6E41FF] transition"
                onClick={handleSignOut}
                type="button"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
