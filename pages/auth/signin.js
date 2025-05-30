import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../hooks/useSession";

export default function SignIn() {
  const router = useRouter();
  const { session, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && session) {
      router.replace("/dashboard");
    }
  }, [session, loading, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else if (data?.session) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#140a29] via-[#341a66] to-[#6E41FF] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-[#6E41FF]/40 bg-[#1a1336]/95 relative">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          {/* For logo image: */}
          {/* <img src="/lunara-logo.svg" alt="Lunara Logo" className="h-16 mb-2" /> */}
          <span className="text-4xl font-extrabold tracking-wider text-[#B09CFF] drop-shadow-[0_2px_16px_rgba(110,65,255,0.4)] select-none">
            Lunara
          </span>
          <span className="uppercase text-xs tracking-widest text-[#6E41FF] mt-1 opacity-70">
            SaaS Login
          </span>
        </div>
        <h1 className="text-xl font-semibold text-center text-[#B09CFF] mb-8">Welcome back</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-[#6E41FF]">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-[#2b2051] border border-[#6E41FF]/40 rounded-lg text-[#E6E6FA] placeholder-[#8c7abf] focus:outline-none focus:ring-2 focus:ring-[#6E41FF] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="name@lunara.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-[#6E41FF]">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-[#2b2051] border border-[#6E41FF]/40 rounded-lg text-[#E6E6FA] placeholder-[#8c7abf] focus:outline-none focus:ring-2 focus:ring-[#6E41FF] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          {errorMsg && (
            <div className="text-red-400 text-sm text-center font-medium">{errorMsg}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#6E41FF] text-white font-bold rounded-lg shadow-lg hover:bg-[#4b299c] transition text-lg tracking-wide"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-between mt-8">
          <button
            className="text-xs text-[#B09CFF] hover:underline font-semibold"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Forgot Password?
          </button>
          <button
            className="text-xs text-[#B09CFF] hover:underline font-semibold"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="absolute inset-x-0 -bottom-8 flex justify-center opacity-30 select-none pointer-events-none">
          <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
            <ellipse cx="100" cy="20" rx="90" ry="12" fill="#6E41FF" />
          </svg>
        </div>
      </div>
    </div>
  );
}
