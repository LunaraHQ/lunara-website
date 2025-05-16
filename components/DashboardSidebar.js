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

  useEffect(() => {
    const saved = window.localStorage.getItem("lunaraSidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);
  useEffect(() => {
    window.localStorage.setItem("lunaraSidebarCollapsed", collapsed ? "true" : "false");
  }, [collapsed]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("id, name, features")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const userFeatures = Array.isArray(profile?.features)
    ? profile.features.map((f) => f.toLowerCase())
    : [];

  const firstName = profile?.name
    ? profile.name.split(" ")[0]
    : null;

  if (loading) {
    return (
      <aside
        className="fixed top-0 left-0 h-full w-16 flex items-center justify-center bg-gradient-to-b from-purple-900/90 via-purple-800/95 to-black/95 shadow-2xl z-50"
        style={{ minWidth: 64 }}
      >
        <span className="text-purple-200/80 font-semibold animate-pulse">
          ...
        </span>
      </aside>
    );
  }

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-50
        bg-gradient-to-b from-purple-900/90 via-purple-800/95 to-black/95
        shadow-2xl border-r border-purple-700/30
        backdrop-blur-lg
        flex flex-col items-center
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
      style={{ minWidth: collapsed ? 64 : 220, width: collapsed ? 64 : 220 }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={`
          absolute top-5 right-[-18px] z-10 bg-purple-800 hover:bg-purple-700
          border border-purple-600 shadow-xl rounded-full w-9 h-9 flex items-center justify-center
          transition-all
        `}
        style={{ outline: "none" }}
      >
        {collapsed ? <ChevronsRight size={22} /> : <ChevronsLeft size={22} />}
      </button>
      {/* Logo (PNG only, never ICO) */}
      <Link href="/dashboard" className="flex items-center mb-10 mt-2 select-none">
        <img
          src="/lunara-favicon.png"
          alt="Lunara"
          className="h-10 w-10 rounded-xl"
        />
        {!collapsed && (
          <span className="ml-2 text-white font-extrabold text-2xl tracking-wide drop-shadow-lg">
            Lunara
          </span>
        )}
      </Link>
      {/* Dashboard/Home always visible */}
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-3 rounded-xl font-medium text-lg transition
                ${router.pathname === "/dashboard"
                  ? "bg-purple-700/70 text-white shadow-lg"
                  : "text-purple-100 hover:bg-purple-700/40 hover:text-white"
                }
              `}
            >
              <Home className="w-6 h-6 mr-3 opacity-80" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          {/* Only show features the user has */}
          {ALL_FEATURES.filter(f => userFeatures.includes(f.slug)).map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link
                href={path}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-lg transition
                  ${router.pathname === path
                    ? "bg-purple-700/70 text-white shadow-lg"
                    : "text-purple-100 hover:bg-purple-700/40 hover:text-white"
                  }
                `}
              >
                <Icon className="w-6 h-6 mr-3 opacity-80" />
                {!collapsed && <span>{name}</span>}
              </Link>
            </li>
          ))}
          {/* Always show Add More Features */}
          <li>
            <Link
              href="/dashboard/add-features"
              className={`flex items-center px-4 py-3 mt-4 rounded-xl font-medium text-lg transition
                ${router.pathname === "/dashboard/add-features"
                  ? "bg-purple-700/70 text-white shadow-lg"
                  : "text-purple-100 hover:bg-purple-700/40 hover:text-white"
                }
              `}
            >
              <PlusCircle className="w-6 h-6 mr-3 opacity-80" />
              {!collapsed && <span>Add More Features</span>}
            </Link>
          </li>
        </ul>
      </nav>
      {/* User & Logout */}
      <div className="mt-10 w-full flex flex-col items-center space-y-4 pb-4">
        {!collapsed && firstName && (
          <span className="text-purple-200/80 font-semibold text-base mb-2">
            Hi, {firstName}
          </span>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center px-4 py-2 bg-white text-purple-800 font-semibold rounded-xl shadow hover:bg-purple-200 transition`}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
