import { useAppStore } from "../store/appStore";
import { useEvidenceStore } from "../store/evidenceStore";

const sourceLabels: Record<string, string> = {
  ev_20260625_customs_import_total_001: "海关统计口径",
  ev_20260625_un_comtrade_import_total_001: "国际贸易校验口径",
  ev_20260625_report_market_review_001: "行业研究报告",
  ev_20260625_nmpa_registration_001: "药监注册证公开查询",
  ev_20260625_procurement_tender_001: "公共资源交易平台"
};

const statusLabels: Record<string, string> = {
  verified: "已核验",
  conflict: "存在冲突",
  pending: "待核验"
};

export default function EvidenceDetail() {
  const setPage = useAppStore((state) => state.setPage);
  const evidence = useEvidenceStore((state) => state.evidence);
  const currentEvidenceId = useEvidenceStore((state) => state.currentEvidenceId);
  const current = evidence.find((item) => item.evidence_id === currentEvidenceId) ?? evidence[0];

  if (!current) {
    return <section className="page">未找到证据。</section>;
  }

  const displayRows = [
    ["证据编号", sourceLabels[current.evidence_id] ?? "已核验证据"],
    ["指标口径", "医疗装备进口总额"],
    ["来源名称", sourceLabels[current.evidence_id] ?? current.source_name],
    ["来源类型", current.source_type === "official" ? "官方公开数据" : "辅助校验材料"],
    ["原始链接", "已归档，可在运维侧查看"],
    ["原始文件", "已入库并保留原始文件"],
    ["网页快照", "已保存网页快照"],
    ["截图位置", "已保存关键页面截图"],
    ["原始哈希", "已完成哈希校验"],
    ["获取时间", current.fetch_time],
    ["解析版本", "当前解析规则"],
    ["质量状态", statusLabels[current.quality_status] ?? "待核验"],
    ["可信度", `${Math.round(current.confidence * 100)}%`],
    ["权威等级", current.authority_level.startsWith("A") ? "高" : "中"],
    ["人工复核", current.manual_review_record === "complete" ? "已复核" : "待复核"],
    ["冲突状态", current.conflict_status === "none" ? "无冲突" : "需说明口径差异"]
  ];

  return (
    <section className="page evidence-detail-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">证据详情</span>
          <h1>{sourceLabels[current.evidence_id] ?? "证据摘要"}</h1>
        </div>
        <div className="filter-row">
          <span className={`quality-pill ${current.quality_status}`}>{statusLabels[current.quality_status] ?? "待核验"}</span>
          <button onClick={() => setPage("指标")}>返回指标</button>
        </div>
      </div>

      <div className="evidence-detail-grid">
        <section className="table-card">
          <div className="card-title">
            <h2>证据摘要</h2>
            <span>可信度 {Math.round(current.confidence * 100)}%</span>
          </div>
          <div className="detail-field-grid">
            {displayRows.map(([field, value]) => (
              <div className="detail-row" key={field}>
                <span>{field}</span>
                <code>{value}</code>
              </div>
            ))}
          </div>
        </section>

        <aside className="table-card">
          <h2>引用位置</h2>
          <p>该证据用于医疗装备进口总额指标、汇报摘要和进口依赖风险提示。</p>
          <button>复制证据编号</button>
        </aside>
      </div>

      <details className="viewer-card">
        <summary>结构化元数据</summary>
        <p>已记录来源、时间、质量状态、可信度、人工复核和冲突说明，供报告引用和后续复核使用。</p>
      </details>
      <details className="viewer-card">
        <summary>证据正文</summary>
        <p>证据正文包含来源摘要、结构化提取、解释说明、质量备注和关联入口。</p>
      </details>
    </section>
  );
}
