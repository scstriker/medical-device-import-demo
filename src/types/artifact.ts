export type ArtifactType =
  | "kpi_card"
  | "echarts_chart"
  | "data_table"
  | "evidence_card"
  | "markdown_page"
  | "graph_view"
  | "report_preview"
  | "review_task";

export interface Artifact {
  id: string;
  type: ArtifactType;
  title: string;
  taskId: string;
  evidenceIds: string[];
  createdAt: string;
  status: "draft" | "verified" | "conflict" | "exported";
  payload: unknown;
}
