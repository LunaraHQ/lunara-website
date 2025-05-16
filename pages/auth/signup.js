// pages/auth/signup.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data.user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] px-6">
      <div className="max-w-md w-full bg-[#130b24] rounded-3xl p-8 shadow-lg border border-[#352a5c]">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-glow">
          Create your Lunara account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-purple-300 mb-1 font-semibold">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#27134e] text-white border border-[#6E41FF] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your full name"
            />
          </div>

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
              placeholder="Choose a strong password"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-purple-400">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="underline hover:text-white cursor-pointer"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
