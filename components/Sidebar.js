import { useRouter } from "next/router";
import { FiHome, FiUser, FiBarChart2, FiCalendar } from "react-icons/fi";

const navItems = [
  { icon: <FiHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FiUser />, label: "CRM", href: "/dashboard/crm" },
  { icon: <FiBarChart2 />, label: "Analytics", href: "/dashboard/analytics" },
  { icon: <FiCalendar />, label: "Events", href: "/dashboard/events" },
  // Add more items as you build out your SaaS!
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="h-screen w-60 bg-[#18102b] border-r border-[#6E41FF]/30 flex flex-col py-8 px-6 shadow-2xl">
      <div className="flex items-center mb-10">
        <span className="text-2xl font-extrabold tracking-wider text-[#B09CFF] select-none">Lunara</span>
      </div>
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ icon, label, href }) => (
          <button
            key={label}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-[#B09CFF] hover:bg-[#2a1a44] hover:text-white transition
              ${router.pathname === href ? "bg-[#2a1a44] text-white" : ""}
            `}
            onClick={() => router.push(href)}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-xs text-[#6E41FF]/70 pl-1">
        © {new Date().getFullYear()} Lunara
      </div>
    </aside>
  );
}
