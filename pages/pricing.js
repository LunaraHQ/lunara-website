// pages/pricing.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import {
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

// Same master list again (or import from a shared utils file):
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
  const [userFeatures, setUserFeatures] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/signin");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("features")
        .eq("id", session.user.id)
        .single();
      setUserFeatures(Array.isArray(data.features) ? data.features : []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;

  // Build your “basket” of everything they haven't yet unlocked:
  const toUnlock = ALL_FEATURES.filter(
    (f) => !userFeatures.includes(f.slug)
  );

  const handleCheckout = async () => {
    // Example: Upsert all remaining features in one go
    const newFeatures = [...userFeatures, ...toUnlock.map((f) => f.slug)];
    await supabase
      .from("profiles")
      .update({ features: newFeatures })
      .eq("id", (await supabase.auth.getSession()).data.session.user.id);
    router.push("/dashboard");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 inline-flex items-center">
        <ShoppingCart className="w-6 h-6 mr-2 text-purple-600" />
        Your Basket
      </h1>

      {toUnlock.length === 0 ? (
        <p>All features already unlocked! 🎉</p>
      ) : (
        <>
          <ul className="space-y-2 mb-6">
            {toUnlock.map(({ name, slug }) => (
              <li
                key={slug}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span>{name}</span>
                <CheckCircle className="w-5 h-5 text-gray-400" />
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Unlock All &amp; Return to Dashboard
          </button>
        </>
      )}
    </div>
  );
}
