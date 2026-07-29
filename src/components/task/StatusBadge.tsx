export default function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    draft: "草稿",
    running: "更新中",
    completed: "已完成",
    failed: "失败",
    verified: "已核验",
    conflict: "存在冲突",
    pending: "待核验"
  };

  return <span className="status-badge">{labels[status] ?? status}</span>;
}
