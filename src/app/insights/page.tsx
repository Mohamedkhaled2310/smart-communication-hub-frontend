"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import api from "../lib/api";
import { Insight } from "../types/insight";

export default function InsightsPage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const name = searchParams.get("name");

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<Insight | null>(null);

  useEffect(() => {
    if (!receiverId) return;

    const fetchInsights = async () => {
      try {
        const { data } = await api.get(`/insights/${receiverId}`, {
          withCredentials: true,
        });
        setInsight(data);
      } catch {
        setInsight(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [receiverId]);

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-white to-blue-50 p-6 relative">
      {/* --- Header --- */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/chat")}
          className="p-2 rounded-full hover:bg-blue-100 transition"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-3">
          AI Insights for {name || "User"}
        </h1>
      </div>

      {/* --- Content --- */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto border border-blue-100">
        {loading ? (
          <p className="text-gray-400 text-center mt-10 animate-pulse">
            Generating insights...
          </p>
        ) : insight ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {insight.summary}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700">Sentiment</h2>
              <p
                className={`mt-1 text-lg font-medium ${
                  insight.sentiment === "positive"
                    ? "text-green-500"
                    : insight.sentiment === "negative"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {insight.sentiment}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No insights available yet.
          </p>
        )}
      </div>
    </div>
  );
}
