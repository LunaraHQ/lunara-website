// pages/auth/signin.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data?.session) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] px-6">
      <div className="max-w-md w-full bg-[#130b24] rounded-3xl p-8 shadow-lg border border-[#352a5c]">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-glow">
          Sign In to Lunara
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-purple-300 mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#27134e] text-white border border-[#6E41FF] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-purple-300 mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#27134e] text-white border border-[#6E41FF] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your password"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-center font-semibold">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] text-white font-bold py-3 rounded-xl shadow hover:scale-105 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-purple-400">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/signup"
            className="underline hover:text-white cursor-pointer"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
