import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message || "Error sending reset email.");
    } else {
      setMessage("Check your inbox for reset instructions.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a103e] via-[#322769] to-[#130b24]">
      <div className="relative max-w-md w-full rounded-2xl p-8 shadow-[0_8px_40px_rgba(110,65,255,0.25)] bg-gradient-to-b from-[#221446]/90 via-[#251654]/95 to-[#12092e]/95 border border-[#36206c]">
        <h1 className="text-2xl font-extrabold mb-2 text-white text-center drop-shadow-glow">
          Forgot your password?
        </h1>
        <p className="mb-6 text-[#b2a1e3] text-center">We'll email you a link to reset it.</p>
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <input
            type="email"
            className="px-4 py-3 rounded-xl bg-[#170e2d]/80 border border-[#302057] text-white placeholder-[#c0b7e7] focus:ring-2 focus:ring-[#8C64FF] focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {message && <div className="text-green-400 text-sm text-center">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Sending email..." : "Send reset link"}
          </button>
        </form>
        {/* Star overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at 60% 60%, #fff3 1px, transparent 30%), radial-gradient(circle at 40% 20%, #fff2 2px, transparent 60%)"
          }}
        />
      </div>
    </div>
  );
}
