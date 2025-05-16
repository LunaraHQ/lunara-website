import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../hooks/useSession"; // adjust this path if your session hook lives elsewhere

export default function SignIn() {
  const router = useRouter();
  const { session, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && session) {
      router.replace("/dashboard");
    }
  }, [session, loading, router]);

  // Handle sign in
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#6E41FF] via-[#201845] to-black">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#6E41FF] mb-4 text-center">Sign in to Lunara</h1>
        <form onSubmit={handleSignIn} className="space-y-5">
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
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E41FF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && (
            <div className="text-red-600 text-sm">{errorMsg}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#6E41FF] text-white font-bold rounded-lg hover:bg-[#5034b8] transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-700">Don&apos;t have an account?</span>
          <button
            className="ml-2 text-[#6E41FF] hover:underline font-semibold"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-2">
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
