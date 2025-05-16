import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import {
  UserCircle,
  LayoutDashboard,
  CheckSquare,
  LineChart,
  Power,
  Layers,
  Settings,
} from "lucide-react";

const features = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { label: "My Features", href: "/dashboard/features", icon: <Layers /> },
  { label: "Add Features", href: "/dashboard/add-features", icon: <CheckSquare /> },
  { label: "Analytics", href: "/dashboard/analytics", icon: <LineChart /> },
  { label: "Account", href: "/dashboard/account", icon: <UserCircle /> },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings /> },
];

export default function DashboardSidebar({ session }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const displayName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.email?.split("@")[0] ||
    "My Account";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside className={`fixed z-30 top-0 left-0 h-screen bg-gradient-to-b from-[#6E41FF] via-[#8C64FF] to-[#322769] shadow-2xl transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col`}>
      {/* Collapse button */}
      <button
        className="absolute top-4 right-[-18px] bg-white text-[#8C64FF] rounded-full shadow p-1 z-10"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10 17l5-5-5-5" stroke="#8C64FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M14 7l-5 5 5 5" stroke="#8C64FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {/* Sidebar content */}
      <div className={`flex flex-col items-center mt-10 gap-2 ${collapsed ? "px-0" : "px-4"}`}>
        <div className="w-full mb-8 text-white font-bold text-lg flex items-center justify-center">
          <span className="block px-3 py-2 rounded-full bg-white/10">{displayName}'s Account</span>
        </div>
        {features.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition ${
              router.pathname === item.href
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
        <button
          className="w-full mt-auto mb-6 flex items-center gap-3 px-3 py-2 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 transition"
          onClick={handleLogout}
        >
          <Power />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
