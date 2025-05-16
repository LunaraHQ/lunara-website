// pages/pricing.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const ALL_FEATURES = [
  { name: "CRM", slug: "crm" },
  { name: "Analytics", slug: "analytics" },
  { name: "Events", slug: "events" },
  { name: "CX Management", slug: "cx-management" },
  { name: "AI Chatbot", slug: "ai-chatbot-automation" },
  { name: "E-commerce Tools", slug: "ecommerce-tools" },
  { name: "Loyalty & Membership", slug: "loyalty-membership" },
  { name: "Team Management", slug: "team-management" },
];

export default function Pricing() {
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/signin");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("features")
        .eq("id", session.user.id)
        .single();
      setUnlocked(Array.isArray(data.features) ? data.features : []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;

  const toUnlock = ALL_FEATURES.filter((f) => !unlocked.includes(f.slug));

  const toggle = (slug) => {
    setSelected((s) =>
      s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]
    );
  };

  const handleCheckout = () => {
    // TODO: swap this for your payment page/link
    const params = selected.join(",");
    router.push(`/checkout?features=${params}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Select Features to Unlock</h1>
      {toUnlock.length === 0 ? (
        <p>All features already unlocked! 🎉</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
        >
          <ul className="space-y-3 mb-6">
            {toUnlock.map(({ name, slug }) => (
              <li key={slug} className="flex items-center">
                <input
                  id={slug}
                  type="checkbox"
                  className="mr-3"
                  checked={selected.includes(slug)}
                  onChange={() => toggle(slug)}
                />
                <label htmlFor={slug}>{name}</label>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            disabled={selected.length === 0}
            className={`px-5 py-2 rounded ${
              selected.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-600 text-white"
            }`}
          >
            Checkout & Continue
          </button>
        </form>
      )}
    </div>
  );
}
