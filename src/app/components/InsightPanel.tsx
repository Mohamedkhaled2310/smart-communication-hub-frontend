"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { Insight } from "../types/insight";

export default function InsightPanel({ receiver }: any) {
  const [insight, setInsight] = useState<Insight>();
  const [loading, setLoading] = useState(false);

const fetchInsights = async () => {
  try {
    setLoading(true);
    const { data } = await api.get<Insight>(`/insights/${receiver.id}`);
    setInsight(data);
  } catch (error) {
    console.error("Failed to load insights", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchInsights();
  }, [receiver]);
  

  return (
    <div className="h-full overflow-y-auto p-6 bg-linear-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-5 bg-blue-500 rounded-sm"></span>
        AI Insights
      </h2>
  
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-500 animate-pulse">
          <p>Generating insights...</p>
        </div>
      ) : insight ? (
        <div className="space-y-4">
          {/* Summary Section */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-1">Summary</p>
            <p className="text-gray-600 text-sm leading-relaxed">{insight.summary}</p>
          </div>
  
          {/* Sentiment Section */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-1">Sentiment</p>
            <p
              className={`text-base font-medium capitalize ${
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
        <div className="flex items-center justify-center h-40 text-gray-400">
          <p>No insights yet</p>
        </div>
      )}
    </div>
  );
  
}
