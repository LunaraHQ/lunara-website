// pages/dashboard.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Dashboard({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/auth/signin");
  }, [session, router]);

  if (!session) return null;

  const firstName =
    session.user.user_metadata?.full_name?.split(" ")[0] ||
    session.user.email.split("@")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24] p-8 text-white">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-glow">
        Welcome, {firstName}!
      </h1>
      {/* Dashboard sidebar + features grid should go here */}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
