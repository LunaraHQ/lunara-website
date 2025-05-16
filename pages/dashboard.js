import { useRouter } from "next/router";
import { useEffect } from "react";

const FEATURE_CARDS = [
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

  if (!session) return null; // Loading state handled by _app.js

  const firstName =
    session?.user?.user_metadata?.full_name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0];

  return (
    <div className="py-10 px-4 md:px-12">
      <div className="bg-gradient-to-r from-[#6E41FF] via-[#8C64FF] to-[#322769] rounded-3xl p-8 mb-10 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome, {firstName}!
        </h1>
        <p className="text-lg">All your features. One dashboard. Get more from every connection.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {FEATURE_CARDS.map((feature) => (
          <div
            key={feature.slug}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 cursor-pointer flex flex-col justify-between"
            onClick={() => router.push(`/features/${feature.slug}`)}
          >
            <div>
              <h2 className="font-bold text-xl text-[#6E41FF] mb-2">{feature.name}</h2>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-[#8C64FF] font-bold hover:underline">
                {/** Add conditional logic if unlocked/locked */}
                View Feature
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
