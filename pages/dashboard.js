import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useSession } from "../hooks/useSession";

export default function Dashboard() {
  const router = useRouter();
  const { session, loading } = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/"); // Not logged in? Go to landing page
    }
  }, [session, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/"); // Go to landing page after logout
  };

  if (loading || !session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF]">
      <header className="w-full flex items-center justify-between px-8 py-6 border-b border-[#6E41FF]/20 bg-[#18102b]/70 shadow">
        <span className="text-2xl font-extrabold text-[#B09CFF] tracking-wider">Lunara Dashboard</span>
        <div className="flex items-center gap-6">
          <span className="text-[#B09CFF]/80 font-medium text-sm">
            Hi, {session?.user?.email || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-[#6E41FF] text-white font-bold px-5 py-2 rounded-xl shadow hover:bg-[#4b299c] transition"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-[#1a1336]/95 rounded-2xl shadow-2xl border border-[#6E41FF]/40 p-10 mt-10">
          <h1 className="text-3xl font-extrabold text-[#B09CFF] mb-4">Welcome to your Lunara Dashboard</h1>
          <p className="text-[#B09CFF]/80 mb-8">
            Here you’ll access all your SaaS features, analytics, and more. This area is only for logged-in users!
          </p>
          {/* Place dashboard features, stats, widgets, etc. here */}
          <div className="text-sm text-[#6E41FF]/60 text-center mt-8">
            <span>Ready to get started? Explore your tools using the navigation above!</span>
          </div>
        </div>
      </main>
    </div>
  );
}
