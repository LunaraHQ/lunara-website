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
    <div className="min-h-screen bg-gradient-to-br from-[#6E41FF] via-[#8C64FF] to-[#322769] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-[#6E41FF]">Create your Lunara account</h1>
        <p className="mb-6 text-gray-500">Start your free pilot today!</p>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <a href="/auth/signin" className="text-[#6E41FF] hover:underline">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
