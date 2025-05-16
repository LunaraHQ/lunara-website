import { useRouter } from "next/router";
import { useEffect } from "react";

const FEATURES = [
  { name: "Meetings & Events", slug: "meetings-events", desc: "Automate bookings & reminders." },
  { name: "Sales Funnel", slug: "sales-funnel", desc: "Lead capture and pipeline tools." },
  { name: "CX Management", slug: "cx-management", desc: "Collect feedback & boost loyalty." },
  { name: "CRM", slug: "crm", desc: "Track every client touchpoint." },
  { name: "AI Chatbot", slug: "ai-chatbot", desc: "24/7 support and lead automation." },
  { name: "Analytics", slug: "analytics", desc: "Dashboards and predictive insights." },
  { name: "Team Management", slug: "team-management", desc: "Shifts, tasks, and comms." },
  { name: "E-commerce Tools", slug: "ecommerce", desc: "Recover carts, optimize checkout." },
  { name: "Loyalty", slug: "loyalty", desc: "Membership & rewards programs." },
];

export default function Dashboard({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/auth/signin");
    }
  }, [session, router]);

  if (!session) return null;

  const firstName =
    session?.user?.user_metadata?.full_name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24] pb-20">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#27134e] via-[#6E41FF] to-[#23194b] p-10 shadow-[0_4px_40px_rgba(110,65,255,0.13)] overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-glow">
            Welcome, {firstName}!
          </h1>
          <p className="text-lg text-[#e0d3fc] mb-0">
            Your mission control for sales, events, analytics & more.
          </p>
          {/* Space stars/nebula overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: "radial-gradient(circle at 30% 40%, #6E41FF33 0%, transparent 70%), radial-gradient(circle at 70% 80%, #8C64FF22 0%, transparent 80%)"
            }}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.slug}
            className="relative bg-gradient-to-br from-[#1a103e] via-[#27134e] to-[#130b24] rounded-2xl p-6 shadow-[0_2px_20px_rgba(110,65,255,0.23)] border border-[#261c44] group transition-all hover:shadow-[0_6px_32px_rgba(140,100,255,0.35)] hover:border-[#6E41FF] cursor-pointer flex flex-col justify-between"
            onClick={() => router.push(`/features/${feature.slug}`)}
            style={{ minHeight: 170 }}
          >
            <div>
              {/* Glowing icon/circle top center */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6E41FF] to-[#8C64FF] shadow-[0_0_16px_4px_rgba(140,100,255,0.25)] flex items-center justify-center text-white text-xl font-bold">
                  {feature.name[0]}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-1">{feature.name}</h2>
              <p className="text-[#b6a6e5] text-center">{feature.desc}</p>
            </div>
            <button className="mt-4 mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-semibold shadow hover:scale-105 transition">
              Explore
            </button>
            {/* Space stars overlay for extra vibe */}
            <div className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 80% 10%, #fff1 0%, transparent 60%), radial-gradient(circle at 30% 60%, #fff2 0%, transparent 75%)"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
