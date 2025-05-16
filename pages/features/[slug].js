import { useRouter } from "next/router";

const FEATURE_CONTENT = {
  "meetings-events": {
    title: "Meetings & Events",
    desc: "Automate bookings, attendee management, and reminders—all in one place.",
  },
  "sales-funnel": {
    title: "Sales Funnel",
    desc: "Convert more leads with powerful, automated funnel tools.",
  },
  "cx-management": {
    title: "CX Management",
    desc: "Capture feedback, track reviews, and boost customer loyalty.",
  },
  "crm": {
    title: "CRM & Client Management",
    desc: "Keep all your client info, notes, and sales activities in one secure hub.",
  },
  "ai-chatbot": {
    title: "AI Chatbot & Automation",
    desc: "Let Lunara handle 24/7 chats, support, and lead qualification.",
  },
  "analytics": {
    title: "Analytics & Reporting",
    desc: "Custom dashboards and predictive analytics at your fingertips.",
  },
  "team-management": {
    title: "Staff & Team Management",
    desc: "Manage shifts, tasks, and internal comms with ease.",
  },
  "ecommerce": {
    title: "E-commerce Tools",
    desc: "Recover carts, optimize pricing, and boost conversions.",
  },
  "loyalty": {
    title: "Loyalty & Membership",
    desc: "Reward loyal customers with scalable programs.",
  },
};

export default function FeatureDetail({ session }) {
  const router = useRouter();
  const { slug } = router.query;
  const feature = FEATURE_CONTENT[slug];

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-[#6E41FF] bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24]">
        Feature not found.
      </div>
    );
  }

  // Show stub content if logged in (expand later for real app features)
  if (session) {
    return (
      <div className="py-20 px-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24]">
        <div className="bg-gradient-to-r from-[#27134e] via-[#6E41FF] to-[#23194b] text-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 text-center border border-[#352a5c]">
          <h1 className="text-4xl font-bold mb-4">{feature.title}</h1>
          <p className="mb-8 text-lg text-[#e0d3fc]">{feature.desc}</p>
          <div className="bg-[#23194b]/80 text-[#6E41FF] p-6 rounded-2xl shadow text-xl font-semibold border border-[#322769]">
            <span>Feature module coming soon. Check back for updates!</span>
          </div>
        </div>
      </div>
    );
  }

  // Guest view (marketing)
  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24]">
      <div className="bg-gradient-to-br from-[#23194b] via-[#27134e] to-[#130b24] rounded-3xl shadow-2xl max-w-2xl w-full p-10 text-center border border-[#352a5c]">
        <h1 className="text-4xl font-bold text-white mb-4">{feature.title}</h1>
        <p className="mb-8 text-[#e0d3fc] text-lg">{feature.desc}</p>
        <a
          href="/auth/signin"
          className="inline-block bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
        >
          Sign In to Explore
        </a>
      </div>
    </div>
  );
}
