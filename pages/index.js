// pages/index.js
import HeroSection from "../components/HeroSection";
import HomeContent from "../components/HomeContent";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] min-h-screen flex flex-col">
      <HeroSection />
      <HomeContent />
      <HowItWorks />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Redirect logged-in users to dashboard
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    };
  }

  return {
    props: {},
  };
}
