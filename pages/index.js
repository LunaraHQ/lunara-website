import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";
import PricingTable from "../components/PricingTable";
import Testimonials from "../components/Testimonials";
import Hero from "../components/Hero";
// DO NOT import NavBar here—it is handled globally in _app.js!

export default function Home() {
  const router = useRouter();

  // Redirect logged-in users to dashboard
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
      {/* HERO/HEADER SECTION */}
      <Hero />

      {/* 9x FEATURE CARDS */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FeatureCards />
        </div>
      </section>

      {/* PRICING TABLE */}
      <section id="pricing" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <PricingTable />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-[#221843]/60">
        <div className="max-w-4xl mx-auto px-4">
          <Testimonials />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
