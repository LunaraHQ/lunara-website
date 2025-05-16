import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import PricingTable from "../components/PricingTable";
import HomeContent from "../components/HomeContent";
import HowItWorks from "../components/HowItWorks";
// Import your features section (see note below)

// If your features live in components/features/FeatureCards.js or similar, import like this:
// import FeatureCards from "../components/features/FeatureCards";
//
// If they're split into multiple cards/components, let me know and I'll help you combine them.

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted && session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
    return () => { mounted = false; };
  }, [router]);

  return (
    <main className="bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF] min-h-screen">
      {/* HERO SECTION */}
      <HeroSection />

      {/* MAIN HOME CONTENT */}
      <HomeContent />

      {/* HOW IT WORKS SECTION */}
      <HowItWorks />

      {/* 9x FEATURE CARDS SECTION */}
      {/* Uncomment and correct import path if your features are a component: */}
      {/* <FeatureCards /> */}

      {/* PRICING TABLE */}
      <PricingTable />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
