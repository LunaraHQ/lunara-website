import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF]">
      <div className="max-w-2xl p-10 rounded-3xl shadow-2xl border border-[#6E41FF]/40 bg-[#1a1336]/95 text-center">
        <h1 className="text-5xl font-extrabold text-[#B09CFF] mb-4 tracking-wide">Lunara</h1>
        <p className="text-lg text-[#B09CFF]/80 mb-8">
          Welcome to the future of sales and lead management.<br />
          <span className="text-[#6E41FF] font-semibold">Sign in or create an account to access your dashboard.</span>
        </p>
        {/* Add buttons or marketing content here */}
      </div>
    </div>
  );
}
