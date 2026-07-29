import { useAppStore } from "../store/appStore";
import { useEvidenceStore } from "../store/evidenceStore";

const reports = [
  {
    id: "import-export",
    title: "进出口分析报告",
    tag: "可导出",
    updatedAt: "二零二六年六月二十五日",
    status: "已核验",
    coverClass: "import-cover",
    coverKicker: "进出口监测",
    coverSubtitle: "医疗装备行业数据研究",
    coverIssue: "MED-DATA 2026 / 05",
    coverMetric: "2.04 亿元",
    coverPeriod: "二零二六年五月",
    coverFooter: "进口金额、来源结构、口径差异",
    summary: "围绕医疗装备进口金额、出口金额、贸易伙伴结构和进口依赖风险形成汇报摘要。",
    conclusions: ["进口金额保持上行，但最近一期增速放缓。", "高端设备进口来源仍集中，建议跟踪替代窗口。", "海关主源与国际校验源存在口径差异，报告中需要注明。"]
  },
  {
    id: "registration",
    title: "注册证结构报告",
    tag: "规划中",
    updatedAt: "待接入",
    status: "未生成",
    coverClass: "registration-cover",
    coverKicker: "审评注册",
    coverSubtitle: "医疗装备行业数据研究",
    coverIssue: "MED-DATA REG / 06",
    coverMetric: "149 件",
    coverPeriod: "近月新增",
    coverFooter: "国产注册证、进口注册证、审评状态",
    summary: "后续用于展示国产注册证、进口注册证和审评状态。",
    conclusions: []
  },
  {
    id: "industry-brief",
    title: "产业简报",
    tag: "草稿",
    updatedAt: "待完善",
    status: "草稿",
    coverClass: "industry-cover",
    coverKicker: "产业观察",
    coverSubtitle: "医疗装备行业数据研究",
    coverIssue: "MED-DATA BRIEF / DRAFT",
    coverMetric: "区域简报",
    coverPeriod: "材料草稿",
    coverFooter: "园区载体、重点企业、政策动态",
    summary: "后续用于承接区域产业、园区载体和重点企业动态。",
    conclusions: []
  }
];

const hoverPreviewDirection = (index: number) => (index === reports.length - 1 ? "left-preview" : "right-preview");

function exportImportReport() {
  const content = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <title>进出口分析报告</title>
  <style>
    body { font-family: "Microsoft YaHei", "Segoe UI", sans-serif; margin: 40px; color: #172033; line-height: 1.8; }
    h1 { margin-bottom: 8px; }
    section { margin-top: 24px; }
    li { margin: 8px 0; }
  </style>
</head>
<body>
  <h1>进出口分析报告</h1>
  <p>生成时间：二零二六年六月二十五日</p>
  <section>
    <h2>核心结论</h2>
    <ul>
      <li>医疗装备进口金额保持上行，最近一期增速放缓。</li>
      <li>出口金额维持增长，重点市场仍需要分品类观察。</li>
      <li>进口依赖风险集中在高端影像和植入器械，建议继续跟踪来源国集中度。</li>
    </ul>
  </section>
  <section>
    <h2>口径说明</h2>
    <p>进口金额以海关统计口径为主，国际贸易校验库用于交叉核验。因品类映射存在差异，正式汇报需保留口径说明。</p>
  </section>
  <section>
    <h2>引用来源</h2>
    <p>海关统计口径、国际贸易校验口径、已核验研究报告。</p>
  </section>
</body>
</html>`;
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "进出口分析报告.html";
  link.click();
  URL.revokeObjectURL(url);
}

export default function ReportCenter() {
  const setPage = useAppStore((state) => state.setPage);
  const openEvidence = useEvidenceStore((state) => state.openEvidence);

  const showEvidence = () => {
    openEvidence("ev_20260625_customs_import_total_001");
    setPage("证据详情");
  };

  return (
    <section className="page report-shelf-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">报告</span>
          <h1>报告书架</h1>
        </div>
        <button onClick={exportImportReport}>导出报告</button>
      </div>

      <div className="report-shelf-layout">
        <section className="report-shelf">
          {reports.map((report, index) => (
            <article className={`report-card ${hoverPreviewDirection(index)}`} key={report.id}>
              <button aria-label={`${report.title}报告封面`} className={`report-cover ${report.coverClass}`}>
                <span className="report-cover-code">{report.coverIssue}</span>
                <span className="report-cover-kicker">{report.coverKicker}</span>
                <strong>{report.title}</strong>
                <small className="report-cover-subtitle">{report.coverSubtitle}</small>
                <div className="report-cover-art" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="report-cover-visual" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="report-cover-linework" aria-hidden="true" />
                <div className="report-cover-metric">
                  <b>{report.coverMetric}</b>
                  <small>{report.coverPeriod}</small>
                </div>
                <div className="report-cover-footer">
                  <span>{report.coverFooter}</span>
                  <em>{report.tag}</em>
                </div>
              </button>
              <aside className="report-hover-preview" aria-label={`${report.title}浮窗预览`}>
                <div className="card-title">
                  <h2>{report.title}</h2>
                  <span>{report.status}</span>
                </div>
                <p>{report.summary}</p>
                <h3>报告结构</h3>
                <div className="report-outline-pills">
                  <span>核心结论</span>
                  <span>趋势变化</span>
                  <span>结构拆解</span>
                  <span>风险提示</span>
                  <span>引用依据</span>
                </div>
                <div className="item-actions">
                  <button onClick={showEvidence}>查看依据</button>
                  <button onClick={exportImportReport}>导出报告</button>
                </div>
                <h3>领导摘要</h3>
                <div className="insight-list">
                  {(report.conclusions.length ? report.conclusions.slice(0, 2) : ["该报告尚未生成，后续接入数据后展示。"]).map((item) => (
                    <article key={item}>{item}</article>
                  ))}
                </div>
                <small className="report-preview-meta">依据：海关统计口径、国际贸易校验口径、已核验研究报告。</small>
              </aside>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
