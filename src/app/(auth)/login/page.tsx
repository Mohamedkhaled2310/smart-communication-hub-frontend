"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import { AxiosError } from "axios";
import { loginSchema } from "../../../validations/auth.schema";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {user, fetchUser} = useAuthStore();
  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user, router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = loginSchema.validate({ email, password }, { abortEarly: false });


    if (error) {
      error.details.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/login",
        { email, password },
      );

     
       await fetchUser();

      toast.success("Successful Login !");
      router.push("/chat");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Invalid credentials");
    }    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <Toaster />
      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-sm border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Tawassul Login
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 font-semibold rounded-xl text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
