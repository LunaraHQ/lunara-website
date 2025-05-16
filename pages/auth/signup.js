import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Could not sign up.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24]">
      <div className="relative max-w-md w-full rounded-2xl p-8 shadow-[0_8px_40px_rgba(110,65,255,0.25)] bg-gradient-to-b from-[#221446]/90 via-[#251654]/95 to-[#12092e]/95 border border-[#36206c]">
        <h1 className="text-3xl font-extrabold mb-3 text-white text-center drop-shadow-glow">
          Create your <span className="bg-gradient-to-r from-[#8C64FF] to-[#6E41FF] text-transparent bg-clip-text">Lunara</span> account
        </h1>
        <form onSubmit={handleSignUp} className="flex flex-col gap-5 mt-4">
          <input
            type="text"
            className="px-4 py-3 rounded-xl bg-[#170e2d]/80 border border-[#302057] text-white placeholder-[#c0b7e7] focus:ring-2 focus:ring-[#8C64FF] focus:outline-none"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            className="px-4 py-3 rounded-xl bg-[#170e2d]/80 border border-[#302057] text-white placeholder-[#c0b7e7] focus:ring-2 focus:ring-[#8C64FF] focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            className="px-4 py-3 rounded-xl bg-[#170e2d]/80 border border-[#302057] text-white placeholder-[#c0b7e7] focus:ring-2 focus:ring-[#8C64FF] focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <div className="flex justify-between items-center text-xs text-[#b2a1e3] mt-2">
            <a href="/auth/signin" className="hover:underline hover:text-[#8C64FF] transition">Already have an account?</a>
          </div>
        </form>
        {/* Star overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at 20% 70%, #fff3 1px, transparent 30%), radial-gradient(circle at 80% 10%, #fff2 2px, transparent 60%)"
          }}
        />
      </div>
    </div>
  );
}
