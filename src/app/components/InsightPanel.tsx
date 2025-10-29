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
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">AI Insights</h2>
      {loading ? (
        <p className="text-gray-400">Generating insights...</p>
      ) : insight ? (
        <div>
          <p className="font-medium mb-2">Summary:</p>
          <p className="text-sm text-gray-700 mb-4">{insight.summary}</p>
          <p className="font-medium">Sentiment:</p>
          <p
            className={`text-sm ${
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
      ) : (
        <p className="text-gray-400">No insights yet</p>
      )}
    </div>
  );
}
