// pages/pricing.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const FEATURES = [
  { slug: "meetings-events", name: "Meetings & Events", desc: "Automate bookings & reminders." },
  { slug: "sales-funnel", name: "Sales Funnel", desc: "Lead capture and pipeline tools." },
  { slug: "cx-management", name: "CX Management", desc: "Collect feedback & boost loyalty." },
  { slug: "crm", name: "CRM & Client Management", desc: "Track every client touchpoint." },
  { slug: "ai-chatbot", name: "AI Chatbot & Automation", desc: "24/7 support and lead automation." },
  { slug: "analytics", name: "Analytics & Reporting", desc: "Dashboards and predictive insights." },
  { slug: "team-management", name: "Team Management", desc: "Shifts, tasks, and comms." },
  { slug: "ecommerce", name: "E-commerce Tools", desc: "Recover carts, optimize checkout." },
  { slug: "loyalty", name: "Loyalty & Membership", desc: "Membership & rewards programs." },
];

export default function Pricing({ session }) {
  const router = useRouter();
  const [userFeatures, setUserFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (!session) {
      router.replace("/auth/signin");
      return;
    }
    // Simulate fetching user’s unlocked features (replace with real API call)
    // For now assume none unlocked, all locked
    setUserFeatures([]); 
    setLoading(false);
  }, [session, router]);

  const toggleFeature = (slug) => {
    setSelectedFeatures((prev) =>
      prev.includes(slug) ? prev.filter((f) => f !== slug) : [...prev, slug]
    );
  };

  if (loading) {
    return <p className="text-center p-10 text-white">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24] p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Upgrade Your Plan</h1>

      <p className="mb-6 text-center text-gray-300">
        Select new features to add to your account. Features you already have are marked below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map(({ slug, name, desc }) => {
          const unlocked = userFeatures.includes(slug);
          const checked = unlocked || selectedFeatures.includes(slug);
          return (
            <label
              key={slug}
              className={`cursor-pointer rounded-lg p-4 border ${
                unlocked ? "border-green-500 bg-green-900" : "border-gray-700 bg-black/40"
              } flex flex-col`}
            >
              <input
                type="checkbox"
                className="hidden"
                disabled={unlocked}
                checked={checked}
                onChange={() => toggleFeature(slug)}
              />
              <span className="font-semibold text-lg">
                {name} {unlocked && <span className="text-green-400 text-sm">(Unlocked)</span>}
              </span>
              <p className="mt-1 text-gray-300 text-sm">{desc}</p>
            </label>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button
          disabled={selectedFeatures.length === 0}
          onClick={() => alert("Checkout flow goes here!")}
          className={`px-8 py-3 rounded-full font-bold shadow transition ${
            selectedFeatures.length > 0
              ? "bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white hover:scale-105"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Checkout & Continue
        </button>

        <Link
          href="/dashboard"
          className="px-8 py-3 rounded-full border border-purple-600 font-semibold text-purple-400 hover:bg-purple-800 transition"
        >
          Back to Dashboard
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
