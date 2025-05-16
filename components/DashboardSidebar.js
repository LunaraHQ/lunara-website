import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import {
  Home,
  Users,
  BarChart3,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "CRM", href: "/dashboard/crm", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Pricing", href: "/dashboard/pricing", icon: CreditCard },
  { name: "Profile", href: "/dashboard/profile", icon: Settings },
];

export default function DashboardSidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setUser(data.session.user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
      else setUser(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Get first name if available
  const firstName = user?.user_metadata?.name
    ? user.user_metadata.name.split(" ")[0]
    : null;

  return (
    <aside
      className="
        fixed top-0 left-0 h-full w-64
        bg-gradient-to-b from-purple-900/90 via-purple-800/95 to-black/95
        shadow-2xl z-50 flex flex-col items-center py-8 px-3
        border-r border-purple-700/30
        backdrop-blur-lg
      "
      style={{ minWidth: 220 }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center mb-10 select-none">
        <img
          src="/images/lunara-logo.png"
          alt="Lunara"
          className="h-10 w-10 rounded-xl mr-3"
        />
        <span className="text-white font-extrabold text-2xl tracking-wide drop-shadow-lg">
          Lunara
        </span>
      </Link>
      {/* Nav */}
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-lg transition
                  ${
                    router.pathname === href
                      ? "bg-purple-700/70 text-white shadow-lg"
                      : "text-purple-100 hover:bg-purple-700/40 hover:text-white"
                  }
                `}
              >
                <Icon className="w-6 h-6 mr-3 opacity-80" />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* User & Logout */}
      <div className="mt-10 w-full flex flex-col items-center space-y-4">
        {firstName && (
          <span className="text-purple-200/80 font-semibold text-base mb-2">
            Hi, {firstName}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-white text-purple-800 font-semibold rounded-xl shadow hover:bg-purple-200 transition"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
