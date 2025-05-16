import Link from "next/link";
import { useState } from "react";

const FEATURES = [
  { slug: "meetings-events", name: "Meetings & Events", price: 50 },
  { slug: "sales-funnel", name: "Sales Funnel", price: 40 },
  { slug: "cx-management", name: "CX Management", price: 30 },
  { slug: "crm", name: "CRM & Client Management", price: 45 },
  { slug: "ai-chatbot", name: "AI Chatbot & Automation", price: 60 },
  { slug: "analytics", name: "Analytics & Reporting", price: 55 },
  { slug: "team-management", name: "Team Management", price: 35 },
  { slug: "ecommerce", name: "E-commerce Tools", price: 50 },
  { slug: "loyalty", name: "Loyalty & Membership", price: 40 },
];

function getDiscountRate(count) {
  if (count >= 6) return 0.2;
  if (count >= 4) return 0.15;
  if (count >= 2) return 0.1;
  return 0;
}

export default function PricingTable() {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (slug) => {
    setSelectedFeatures((prev) =>
      prev.includes(slug) ? prev.filter((f) => f !== slug) : [...prev, slug]
    );
  };

  const totalPrice = selectedFeatures.reduce((sum, slug) => {
    const feature = FEATURES.find((f) => f.slug === slug);
    return sum + (feature ? feature.price : 0);
  }, 0);

  const discountRate = getDiscountRate(selectedFeatures.length);
  const discountAmount = totalPrice * discountRate;
  const finalPrice = totalPrice - discountAmount;

  return (
    <section
      id="pricing"
      className="max-w-5xl mx-auto p-8 bg-black/60 backdrop-blur-md rounded-3xl text-white"
      aria-label="Pricing Table"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">
        Simple, Scalable Pricing
      </h2>
      <p className="mb-8 text-center text-gray-300">
        Select the features you want. Pay only for what you use — with discounts for bundling!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {FEATURES.map(({ slug, name, price }) => (
          <label
            key={slug}
            className="cursor-pointer rounded-lg border border-gray-700 p-4 flex flex-col items-center hover:border-purple-500 transition"
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFeatures.includes(slug)}
              onChange={() => toggleFeature(slug)}
            />
            <div
              className={`w-6 h-6 mb-3 rounded border-2 border-purple-500 flex items-center justify-center ${
                selectedFeatures.includes(slug) ? "bg-purple-600" : "bg-transparent"
              }`}
            >
              {selectedFeatures.includes(slug) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="font-semibold text-lg">{name}</span>
            <span className="text-purple-400 mt-1">€{price} / month</span>
          </label>
        ))}
      </div>

      <div className="mt-10 text-center text-xl font-semibold">
        <p>Total Price: €{totalPrice.toFixed(2)}</p>
        {discountRate > 0 && (
          <p className="text-green-400">
            Discount: {Math.round(discountRate * 100)}% (-€{discountAmount.toFixed(2)})
          </p>
        )}
        <p className="mt-3 text-2xl text-purple-300">Final Price: €{finalPrice.toFixed(2)}</p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-center text-gray-300">
          Want to try these out?{" "}
          <Link href="/auth/signup">
            <a className="text-purple-400 font-semibold hover:underline">Sign up now!</a>
          </Link>
        </p>
        <button
          disabled
          className="px-8 py-3 rounded-full bg-gray-700 text-gray-400 cursor-not-allowed font-bold shadow"
        >
          Checkout & Continue
        </button>
      </div>
    </section>
  );
}
