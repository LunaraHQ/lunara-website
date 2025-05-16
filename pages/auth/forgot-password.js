import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../hooks/useSession";

export default function ForgotPassword() {
  const router = useRouter();
  const { session, loading } = useSession();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && session) {
      router.replace("/dashboard");
    }
  }, [session, loading, router]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage("If an account with that email exists, a reset link has been sent.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#6E41FF] via-[#201845] to-black">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#6E41FF] mb-4 text-center">Reset your password</h1>
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
          {message && <div className="text-green-600 text-sm">{message}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#6E41FF] text-white font-bold rounded-lg hover:bg-[#5034b8] transition"
          >
            Send Reset Email
          </button>
        </form>
        <div className="text-center mt-6">
          <button
            className="text-[#6E41FF] hover:underline font-semibold"
            onClick={() => router.push("/auth/signin")}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
