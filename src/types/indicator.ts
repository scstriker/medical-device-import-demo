export interface IndicatorSummary {
  indicator_id: string;
  name: string;
  value: number;
  status: "verified" | "pending" | "conflict";
}
