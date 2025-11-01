import Link from "next/link";
import { MessageSquare, Cpu, Zap } from "lucide-react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
              Vconnect — Real-time Chat with AI
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              دردش مع أصدقائك أو زملائك فورياً، واستخدم مساعد الذكاء الاصطناعي
              لتحليل المحادثات، استخلاص الأفكار، واقتراح الردود — كل ذلك بسلاسة
              وآمان.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition"
              >
                <MessageSquare className="w-5 h-5" /> Open Chat
              </Link>

              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 hover:shadow transition"
              >
                <Cpu className="w-4 h-4 text-gray-600" /> AI Insights
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Real-time</h4>
                  <p className="text-sm text-gray-500">
                    رسائل فورية بدون تأخير، قائمة دردشات متزامنة.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <Cpu className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">AI powered</h4>
                  <p className="text-sm text-gray-500">
                    تلخيص، تحليل المشاعر، واقتراح ردود ذكية.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-white/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-sm">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">vconnect demo</div>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    Mohamed:{" "}
                    <span className="font-medium">
                      Hey! did you see the update?
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    You:{" "}
                    <span className="font-medium bg-blue-600 text-white px-3 py-1 rounded-full">
                      Yep, looks great
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    AI:{" "}
                    <span className="font-medium italic">
                      Summary: positive — team excited
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Type a message..."
                  />
                  <button className="px-3 py-2 rounded-lg bg-blue-600 text-white">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

<Footer />
    </div>
  );
}
