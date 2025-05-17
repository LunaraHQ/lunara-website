import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import HeroSection from "../components/HeroSection";
import HomeContent from "../components/HomeContent";
import HowItWorks from "../components/HowItWorks";
import PricingTable from "../components/PricingTable";
import Footer from "../components/Footer";
// import FeatureCards from "../components/features/FeatureCards"; // Uncomment when ready

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
      <HeroSection />
      <HomeContent />
      <HowItWorks />
      {/* <FeatureCards /> */}
      <PricingTable />
      <Footer />
    </main>
  );
}
