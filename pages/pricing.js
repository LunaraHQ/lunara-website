import { useState } from "react";
import { useRouter } from "next/router";

const ALL_FEATURES = [
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

export default function Pricing({ session }) {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const handleSelect = (slug) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
    );
  };

  const handleCheckout = () => {
    // Placeholder for payment logic
    router.push(`/checkout?features=${selected.join(",")}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] py-12 px-4">
      <div className="max-w-4xl mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-[#23194b] via-[#27134e] to-[#130b24] p-10 border border-[#352a5c]">
        <h1 className="text-4xl font-extrabold text-white mb-2 text-center drop-shadow-glow">Choose Your Features</h1>
        <p className="mb-8 text-[#e0d3fc] text-lg text-center">Only pay for what you need. Start with a pilot or build your ideal Lunara suite.</p>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {ALL_FEATURES.map((feature) => (
            <label
              key={feature.slug}
              className={`flex items-center gap-4 rounded-xl p-5 border-2 cursor-pointer transition-all ${selected.includes(feature.slug) ? "border-[#6E41FF] bg-[#251654]/70" : "border-[#251654] hover:border-[#8C64FF]"}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(feature.slug)}
                onChange={() => handleSelect(feature.slug)}
                className="accent-[#8C64FF] w-5 h-5"
              />
              <div>
                <span className="font-bold text-white">{feature.name}</span>
                <p className="text-[#b2a1e3] text-sm">{feature.desc}</p>
              </div>
            </label>
          ))}
        </form>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!selected.length}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white hover:scale-105 transition disabled:opacity-50"
        >
          {selected.length ? "Checkout & Continue" : "Select features to continue"}
        </button>
      </div>
    </div>
  );
}
