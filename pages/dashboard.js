// pages/dashboard.js
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Smile,
  Bot,
  Users,
  ShoppingCart,
  Gift,
} from "lucide-react";

// Server‐side redirect for unauthenticated users
export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    };
  }
  return { props: {} };
}

const ALL_FEATURES = [
  /* your same array of { name, slug, description, icon } */
];

export default function Dashboard() {
  const [profile, setProfile] = useState({ name: "", features: [] });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data } = await supabase
        .from("profiles")
        .select("name, features")
        .eq("id", session.user.id)
        .single();

      setProfile({
        name: data.name,
        features: Array.isArray(data.features) ? data.features : [],
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;

  const firstName = profile.name.split(" ")[0] || "";
  const unlocked = profile.features.map((f) => f.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-6">
      <h1 className="text-3xl font-bold text-white mb-2">
        Welcome, {firstName}!
      </h1>
      <p className="text-purple-200 mb-8">
        Preview any of Lunara’s modular features below. Upgrade to unlock full access!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_FEATURES.map(({ name, slug, description, icon: Icon }) => {
          const isUnlocked = unlocked.includes(slug);
          const href = isUnlocked
            ? `/features/${slug}`
            : "/dashboard/add-features";

          return (
            <Link href={href} key={slug}>
              <a className="block group">
                <div className="relative p-6 bg-purple-800 rounded-lg hover:bg-purple-700 transition">
                  <Icon className="w-10 h-10 text-purple-300 mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {name}
                  </h2>
                  <p className="text-purple-200">{description}</p>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="px-3 py-1 bg-purple-600 text-white rounded">
                        Click to Unlock
                      </span>
                    </div>
                  )}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
