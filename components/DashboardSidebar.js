// components/DashboardSidebar.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import {
  Home,
  Users,
  BarChart3,
  Calendar,
  Smile,
  Bot,
  ShoppingCart,
  Gift,
  PlusCircle,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const ALL_FEATURES = [
  { name: "CRM", slug: "crm", icon: Users, path: "/dashboard/crm" },
  { name: "Analytics", slug: "analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Events", slug: "events", icon: Calendar, path: "/dashboard/events" },
  { name: "CX Management", slug: "cx-management", icon: Smile, path: "/dashboard/cx-management" },
  { name: "AI Chatbot", slug: "ai-chatbot-automation", icon: Bot, path: "/dashboard/ai-chatbot-automation" },
  { name: "E-commerce Tools", slug: "ecommerce-tools", icon: ShoppingCart, path: "/dashboard/ecommerce-tools" },
  { name: "Loyalty & Membership", slug: "loyalty-membership", icon: Gift, path: "/dashboard/loyalty-membership" },
  { name: "Team Management", slug: "team-management", icon: Users, path: "/dashboard/team-management" },
];

export default function DashboardSidebar() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Load collapse state
  useEffect(() => {
    const saved = window.localStorage.getItem("lunaraSidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);
  useEffect(() => {
    window.localStorage.setItem("lunaraSidebarCollapsed", collapsed ? "true" : "false");
  }, [collapsed]);

  // Fetch profile/features
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return setLoading(false);
      const { data } = await supabase
        .from("profiles")
        .select("name, features")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const userFeatures = Array.isArray(profile?.features)
    ? profile.features.map((f) => f.toLowerCase())
    : [];

  const firstName = profile?.name?.split(" ")[0] || null;

  if (loading) {
    return (
      <aside className="fixed top-0 left-0 h-full w-16 flex items-center justify-center bg-gradient-to-b from-purple-900 to-black z-50">
        <span className="text-purple-300 animate-pulse">…</span>
      </aside>
    );
  }

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-50 flex flex-col items-center
        bg-gradient-to-b from-purple-900 to-black shadow-xl border-r border-purple-700
        transition-all duration-300 ${collapsed ? "w-16" : "w-64"}
      `}
      style={{ minWidth: collapsed ? 64 : 220 }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute top-4 right-[-18px] w-8 h-8 flex items-center justify-center bg-purple-800 border border-purple-600 rounded-full shadow hover:bg-purple-700 z-10"
      >
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>

      {/* Logo with safe fallback */}
      <Link href="/dashboard" className="flex items-center mt-4 mb-8 select-none">
        <img
          src="/lunara-favicon.png"
          alt="Lunara logo"
          className="h-10 w-10 rounded-xl"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/favicon.ico";
          }}
        />
        {!collapsed && (
          <span className="ml-2 text-white font-extrabold text-2xl tracking-wide">
            Lunara
          </span>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className={`flex items-center px-4 py-3 rounded-lg transition ${
              router.pathname === "/dashboard"
                ? "bg-purple-700 text-white"
                : "text-purple-100 hover:bg-purple-700/50 hover:text-white"
            }`}>
              <Home className="w-6 h-6 mr-3" />
              {!collapsed && "Dashboard"}
            </Link>
          </li>

          {ALL_FEATURES.filter(f => userFeatures.includes(f.slug)).map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link href={path} className={`flex items-center px-4 py-3 rounded-lg transition ${
                router.pathname === path
                  ? "bg-purple-700 text-white"
                  : "text-purple-100 hover:bg-purple-700/50 hover:text-white"
              }`}>
                <Icon className="w-6 h-6 mr-3" />
                {!collapsed && name}
              </Link>
            </li>
          ))}

          <li>
            <Link href="/dashboard/add-features" className={`flex items-center px-4 py-3 mt-4 rounded-lg transition ${
              router.pathname === "/dashboard/add-features"
                ? "bg-purple-700 text-white"
                : "text-purple-100 hover:bg-purple-700/50 hover:text-white"
            }`}>
              <PlusCircle className="w-6 h-6 mr-3" />
              {!collapsed && "Add More Features"}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="mb-6 w-full flex flex-col items-center">
        {!collapsed && firstName && <div className="text-purple-200 mb-2">Hi, {firstName}</div>}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-white text-purple-800 rounded-lg shadow hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-2" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
