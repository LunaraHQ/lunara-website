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
  Star,
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

  return (
    <aside className={`fixed z-40 top-0 left-0 h-screen bg-gradient-to-b from-[#1a103e] via-[#6E41FF] to-[#221446] shadow-2xl transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col border-r border-[#27134e]/60`}>
      {/* Collapse Button */}
      <button
        className="absolute top-4 right-[-18px] bg-[#241c3e] text-[#8C64FF] border border-[#3a285c] rounded-full shadow p-1 z-10"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{ transition: "background 0.2s" }}
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
      {/* Sidebar Content */}
      <div className={`flex flex-col items-center mt-10 gap-2 ${collapsed ? "px-0" : "px-4"}`}>
        <div className="w-full mb-8 text-white font-extrabold text-lg flex items-center justify-center select-none">
          <span className="block px-3 py-2 rounded-full bg-gradient-to-r from-[#23194b]/80 to-[#6E41FF]/80 shadow-inner text-white text-center tracking-wider" style={{ letterSpacing: ".03em" }}>
            {displayName}'s
            <span className="ml-1 font-normal text-[#b7a6e5]">Account</span>
          </span>
        </div>
        {/* Feature nav links */}
        {features.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition
              ${router.pathname === item.href
                ? "bg-gradient-to-r from-[#6E41FF]/40 to-[#23194b]/80 text-white shadow-lg"
                : "text-[#b7a6e5] hover:bg-[#23194b]/80 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
            style={{ fontWeight: 600, fontSize: "1rem" }}
          >
            <span className="text-2xl drop-shadow-glow">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <button
          className="w-full mt-auto mb-6 flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-[#6E41FF]/30 to-[#23194b]/80 text-white font-bold hover:bg-gradient-to-r hover:from-[#8C64FF]/60 hover:to-[#23194b]/90 shadow transition"
          onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
        >
          <Power />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
      {/* Subtle star field overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        background: "radial-gradient(circle at 30% 30%, #fff3 1px, transparent 25%), radial-gradient(circle at 70% 80%, #fff1 1.5px, transparent 40%)",
        zIndex: 1,
      }} />
    </aside>
  );
}
