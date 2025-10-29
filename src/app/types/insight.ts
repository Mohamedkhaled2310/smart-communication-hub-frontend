export interface Insight {
  conversationId: number;
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
}
