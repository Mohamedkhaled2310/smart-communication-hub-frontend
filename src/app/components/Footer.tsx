import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vconnect — Real-time Chat with AI
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    );}