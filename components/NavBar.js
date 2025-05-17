import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
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

  // To prevent flicker, handle dropdown open state with mouse events AND focus
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown if click occurs outside menu
  // (Optional improvement, but helps on mobile)
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target) &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       setFeaturesOpen(false);
  //     }
  //   }
  //   if (featuresOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [featuresOpen]);

  // Keep open on hover/focus; close on mouse leave and blur
  const handleDropdownOpen = () => setFeaturesOpen(true);
  const handleDropdownClose = () => setFeaturesOpen(false);

  return (
    <header className="w-full bg-gradient-to-r from-[#1a103e] via-[#6E41FF] to-[#221446] shadow-xl z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-2xl tracking-wider text-white drop-shadow-glow"
        >
          <span className="bg-gradient-to-r from-[#8C64FF] to-[#6E41FF] text-white px-4 py-2 rounded-2xl shadow-inner">
            Lunara
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
          >
            Dashboard
          </Link>

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <button
              ref={buttonRef}
              className="text-[#e0d3fc] hover:text-white font-semibold text-lg flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
              aria-haspopup="true"
              aria-expanded={featuresOpen}
              tabIndex={0}
              onFocus={handleDropdownOpen}
              onBlur={(e) => {
                // Only close if focus is moving outside the dropdown
                setTimeout(() => {
                  if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(document.activeElement)
                  ) {
                    handleDropdownClose();
                  }
                }, 0);
              }}
              type="button"
            >
              Features
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {featuresOpen && (
              <div
                ref={dropdownRef}
                className="absolute left-0 mt-3 w-64 rounded-2xl
                  bg-gradient-to-br from-[#251654ee] via-[#221446cc] to-[#6E41FF22]
                  shadow-[0_6px_32px_rgba(140,100,255,0.22)] z-50 border border-[#352a5c]
                  backdrop-blur-md ring-1 ring-[#6E41FF33] ring-inset"
                tabIndex={-1}
                onFocus={handleDropdownOpen}
                onBlur={(e) => {
                  // Only close if focus is moving outside button
                  setTimeout(() => {
                    if (
                      buttonRef.current &&
                      !buttonRef.current.contains(document.activeElement) &&
                      !dropdownRef.current.contains(document.activeElement)
                    ) {
                      handleDropdownClose();
                    }
                  }, 0);
                }}
              >
                <ul className="py-3">
                  {FEATURES.map((feature) => (
                    <li key={feature.slug}>
                      <Link
                        href={`/features/${feature.slug}`}
                        className="block px-5 py-2 text-[#bb9cff] hover:bg-[#6E41FF33] hover:text-white font-semibold transition rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
                        onClick={() => setFeaturesOpen(false)}
                        tabIndex={0}
                      >
                        {feature.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {session ? (
            <Link
              href="/pricing"
              className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
            >
              Pricing
            </Link>
          ) : (
            <Link
              href="/#pricing"
              className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
            >
              Pricing
            </Link>
          )}

          <Link
            href="/pilot"
            className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
          >
            Pilot
          </Link>
          <button
            className="text-[#e0d3fc] hover:text-white font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
            onClick={onContactOpen}
            type="button"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!session && (
            <>
              <Link
                href="/auth/signin"
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 rounded-2xl border border-[#6E41FF] text-[#6E41FF] font-bold bg-[#130b24] hover:bg-gradient-to-r hover:from-[#6E41FF] hover:to-[#8C64FF] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
              >
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
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8C64FF] to-[#6E41FF] text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-[#8C64FF] focus:ring-offset-2"
                onClick={handleSignOut}
                type="button"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#6E41FF]/30 to-transparent opacity-50 pointer-events-none"></div>
    </header>
  );
}
