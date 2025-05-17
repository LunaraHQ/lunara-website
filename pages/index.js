import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import HeroSection from "../components/HeroSection";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
// import FeatureCards from "../components/features/FeatureCards"; // If needed

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
    <main className="min-h-screen">
      <HeroSection />

      <HomeContent />

      {/* SVG Separator */}
      <div className="w-full">
        <svg width="100%" height="60" viewBox="0 0 1920 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60C400 20 1520 100 1920 60V0H0V60Z" fill="#1a1336" fillOpacity="0.16"/>
        </svg>
      </div>

      <HowItWorks />

      {/* Another SVG Separator before Footer (optional) */}
      <div className="w-full">
        <svg width="100%" height="60" viewBox="0 0 1920 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C400 40 1520 -40 1920 0V60H0V0Z" fill="#1a1336" fillOpacity="0.18"/>
        </svg>
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
