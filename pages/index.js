import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

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

  // --- GUESTS SEE YOUR MARKETING HOMEPAGE BELOW ---
  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF]">
        <div className="max-w-2xl p-10 rounded-3xl shadow-2xl border border-[#6E41FF]/40 bg-[#1a1336]/95 text-center">
          <h1 className="text-5xl font-extrabold text-[#B09CFF] mb-4 tracking-wide">Lunara</h1>
          <p className="text-lg text-[#B09CFF]/80 mb-8">
            Welcome to the future of sales and lead management.<br />
            <span className="text-[#6E41FF] font-semibold">Sign in or create an account to access your dashboard.</span>
          </p>
          {/* ----- PUT ALL YOUR MARKETING HERO, FEATURES, PRICING, ETC. BELOW ----- */}
          <div className="mt-8">
            <a
              href="/auth/signin"
              className="inline-block bg-[#6E41FF] text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-[#4b299c] transition text-lg"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="inline-block ml-4 bg-[#201845] text-[#B09CFF] font-bold px-8 py-3 rounded-xl border border-[#6E41FF] hover:bg-[#321e5c] transition text-lg"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>
      {/* --- Add more sections: features, pricing, testimonials, logos, etc. --- */}
      {/* <section>...</section> */}
      {/* <footer>...</footer> */}
    </main>
  );
}
