// components/DashboardSidebar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const FEATURES = [
  { slug: "meetings-events", name: "Meetings & Events" },
  { slug: "sales-funnel", name: "Sales Funnel" },
  { slug: "cx-management", name: "CX Management" },
  { slug: "crm", name: "CRM & Client Management" },
  { slug: "ai-chatbot", name: "AI Chatbot & Automation" },
  { slug: "analytics", name: "Analytics & Reporting" },
  { slug: "team-management", name: "Team Management" },
  { slug: "ecommerce", name: "E-commerce Tools" },
  { slug: "loyalty", name: "Loyalty & Membership" },
];

export default function DashboardSidebar({ session }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const displayName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "Account";

  // For demo, all features are "locked"; replace with user feature check as needed
  const unlockedFeatures = [];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24] text-white shadow-lg p-6 flex flex-col z-40">
      <div className="mb-10 text-center font-bold text-2xl">
        {displayName}&apos;s Account
      </div>

      <nav className="flex flex-col gap-4 flex-grow">
        <Link
          href="/dashboard"
          className="px-4 py-3 rounded-lg hover:bg-[#6E41FF]/30 transition"
        >
          My Dashboard
        </Link>

        {FEATURES.map(({ slug, name }) => {
          const unlocked = unlockedFeatures.includes(slug);
          return (
            <Link
              key={slug}
              href={`/features/${slug}`}
              className={`px-4 py-3 rounded-lg transition ${
                unlocked
                  ? "bg-[#6E41FF]/50 hover:bg-[#6E41FF]/70"
                  : "hover:bg-[#6E41FF]/20 opacity-70 cursor-not-allowed"
              }`}
              tabIndex={unlocked ? 0 : -1}
              aria-disabled={!unlocked}
            >
              {name} {unlocked ? "" : "(Locked)"}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <Link
          href="/dashboard/add-features"
          className="block text-center px-4 py-3 rounded-lg bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] font-semibold hover:scale-105 transition"
        >
          Add Features
        </Link>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg bg-red-600 font-semibold hover:scale-105 transition"
          type="button"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
