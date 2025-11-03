"use client";

import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { registerSchema } from "../../../validations/auth.schema";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = registerSchema.validate(form, { abortEarly: false });
    if (error) {
      error.details.forEach((err) => toast.error(err.message));
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 px-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-sm border border-blue-100 transition-transform duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
  
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              
            />
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </div>
  
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
  
}