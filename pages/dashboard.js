import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useSession } from "../hooks/useSession";

export default function Dashboard() {
  const router = useRouter();
  const { session, loading } = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/auth/signin");
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#1a1336]/95 rounded-2xl shadow-2xl border border-[#6E41FF]/40 p-10">
        <h1 className="text-3xl font-extrabold text-[#B09CFF] mb-4">Welcome to your Lunara Dashboard</h1>
        <p className="text-[#B09CFF]/80 mb-8">
          Here you’ll access all your SaaS features, analytics, and more. This area is only for logged-in users!
        </p>
        {/* Add your dashboard navigation/components here */}
      </div>
    </div>
  );
}
