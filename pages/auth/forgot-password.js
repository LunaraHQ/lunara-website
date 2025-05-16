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
    <div className="min-h-screen bg-gradient-to-br from-[#6E41FF] via-[#8C64FF] to-[#322769] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-[#6E41FF]">Forgot your password?</h1>
        <p className="mb-6 text-gray-500">We'll email you a link to reset it.</p>
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
          <input
            type="email"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {message && <div className="text-green-600 text-sm">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Sending email..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}
