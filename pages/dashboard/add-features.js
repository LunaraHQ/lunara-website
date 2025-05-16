// pages/dashboard/add-features.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const ALL_FEATURES = [
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

export default function AddFeatures({ session }) {
  const router = useRouter();
  const [unlockedFeatures, setUnlockedFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.replace("/auth/signin");
      return;
    }

    // TODO: Fetch user unlocked features from your DB or Supabase profile metadata
    // For now, simulate none unlocked
    setUnlockedFeatures([]);
    setLoading(false);
  }, [session, router]);

  if (loading) return <p className="text-white p-10 text-center">Loading...</p>;

  // Features user doesn't have yet
  const lockedFeatures = ALL_FEATURES.filter(
    (f) => !unlockedFeatures.includes(f.slug)
  );

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24] text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">Add Features</h1>

      {lockedFeatures.length === 0 ? (
        <p>You have access to all features.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {lockedFeatures.map(({ slug, name }) => (
            <li
              key={slug}
              className="rounded-lg border border-purple-600 p-4 bg-[#130b24] hover:bg-[#27134e] transition cursor-pointer"
              onClick={() => alert(`Add feature: ${name} - Implement upgrade flow`)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  alert(`Add feature: ${name} - Implement upgrade flow`);
                }
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/pricing"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] font-semibold shadow hover:scale-105 transition"
        >
          Upgrade Plan
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
