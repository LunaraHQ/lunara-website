// pages/dashboard/add-features.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import {
  PlusCircle,
  ChevronRight,
} from "lucide-react";

// Mirror the same feature list you use in your sidebar:
const ALL_FEATURES = [
  { name: "CRM", slug: "crm", icon: PlusCircle },
  { name: "Analytics", slug: "analytics", icon: PlusCircle },
  { name: "Events", slug: "events", icon: PlusCircle },
  { name: "CX Management", slug: "cx-management", icon: PlusCircle },
  { name: "AI Chatbot", slug: "ai-chatbot-automation", icon: PlusCircle },
  { name: "E-commerce Tools", slug: "ecommerce-tools", icon: PlusCircle },
  { name: "Loyalty & Membership", slug: "loyalty-membership", icon: PlusCircle },
  { name: "Team Management", slug: "team-management", icon: PlusCircle },
];

export default function AddFeatures() {
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
      const { data, error } = await supabase
        .from("profiles")
        .select("features")
        .eq("id", session.user.id)
        .single();
      if (data && Array.isArray(data.features)) {
        setUserFeatures(data.features);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;

  // Only show features they don't already have:
  const locked = ALL_FEATURES.filter(
    (f) => !userFeatures.includes(f.slug)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Locked Features
      </h1>
      {locked.length === 0 ? (
        <p>You’ve unlocked everything! 🎉</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {locked.map(({ name, slug, icon: Icon }) => (
              <li
                key={slug}
                className="flex items-center space-x-3 p-4 border rounded-lg"
              >
                <Icon className="w-6 h-6 text-purple-600" />
                <span className="font-medium">{name}</span>
              </li>
            ))}
          </ul>
          <Link href="/pricing">
            <button className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600">
              Upgrade Plan
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
