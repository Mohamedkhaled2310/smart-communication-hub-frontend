import { LogIn, MessageSquare, UserPlus } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
return (
<header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-16">
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow">
        <MessageSquare className="w-5 h-5" />
      </div>
      <div>
        <Link href="/" className="text-lg font-bold">
          Vconnect
        </Link>
        <p className="text-xs text-gray-500 -mt-0.5">Real-time chat + AI</p>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <nav className="hidden md:flex items-center space-x-6 text-sm">
        <a href="#features" className="text-gray-600 hover:text-gray-900">
          Features
        </a>
        <a href="#how" className="text-gray-600 hover:text-gray-900">
          How it works
        </a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </a>
      </nav>

      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
        >
          <LogIn className="w-4 h-4" /> Login
        </Link>

        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:scale-[1.02] transition shadow"
        >
          <UserPlus className="w-4 h-4" /> Register
        </Link>
      </div>
    </div>
  </div>
</div>
</header>
)}