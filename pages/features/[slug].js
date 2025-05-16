// pages/features/[slug].js
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";

// Inline marketing copy for each feature slug
const MARKETING_CONTENT = {
  events: {
    title: "Meetings & Events",
    description:
      "Host events, manage RSVPs, send reminders, and keep your attendees engaged with Lunara’s Events module.",
  },
  analytics: {
    title: "Sales Funnel Analytics",
    description:
      "Capture leads, track campaigns, and optimize your pipeline in real time with our Analytics dashboard.",
  },
  "cx-management": {
    title: "CX Management",
    description:
      "Run surveys, gather reviews, and deliver outstanding customer experiences with our CX tools.",
  },
  "ai-chatbot-automation": {
    title: "AI Chatbot Automation",
    description:
      "Engage visitors 24/7, qualify leads, and automate support with Lunara’s AI-driven chatbot.",
  },
  crm: {
    title: "CRM & Client Management",
    description:
      "Centralize your contacts, log interactions, and forecast sales—all from a single CRM interface.",
  },
  "ecommerce-tools": {
    title: "E-commerce Tools",
    description:
      "Set up your storefront, process payments, manage inventory, and grow online sales seamlessly.",
  },
  "loyalty-membership": {
    title: "Loyalty & Membership",
    description:
      "Create reward programs, tiered memberships, and subscription plans to boost customer retention.",
  },
  "team-management": {
    title: "Team Management",
    description:
      "Assign roles, control permissions, and collaborate with your team in one unified workspace.",
  },
};

// Server-side props: detect if user is logged in via Supabase cookie
export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  return {
    props: {
      isLoggedIn: !!user,
      slug: params.slug,
    },
  };
}

export default function FeaturePage({ isLoggedIn, slug }) {
  const router = useRouter();
  const [FeatureComponent, setFeatureComponent] = useState(null);

  // If not logged in, render marketing explainer
  if (!isLoggedIn) {
    const content = MARKETING_CONTENT[slug] || {
      title: "Feature Coming Soon",
      description: "Check back later for details on this powerful module.",
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {content.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
          {content.description}
        </p>
        <Link href="/auth/signin">
          <a className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600">
            Sign In to Explore
          </a>
        </Link>
      </div>
    );
  }

  // If logged in, dynamically import the in-app stub component
  useEffect(() => {
    import(`../../components/features/${slug}`)
      .then((mod) => {
        setFeatureComponent(() => mod.default);
      })
      .catch(() => {
        // If the stub doesn’t exist, send them back to dashboard
        router.replace("/dashboard");
      });
  }, [slug, router]);

  // While loading the stub module, show your spinner
  if (!FeatureComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Finally, render the in-app feature stub
  return <FeatureComponent />;
}
