export type TaskType =
  | "indicator_analysis"
  | "ingestion"
  | "parsing"
  | "compile_wiki"
  | "quality_check"
  | "report_generation"
  | "manual_review";

export interface TaskRecord {
  id: string;
  title: string;
  type: TaskType;
  status: "draft" | "running" | "completed" | "failed";
  createdAt: string;
}
