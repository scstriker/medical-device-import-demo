import mockData from "../mock/mockData.json";
import { useAppStore } from "../store/appStore";
import { useEvidenceStore } from "../store/evidenceStore";

function KPICard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="kpi-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>已关联证据</small>
    </div>
  );
}

function TrendChart() {
  const bars = [42, 55, 61, 50, 68, 74, 80, 72, 88, 94, 86, 100];
  return (
    <div className="chart-card">
      <div className="card-title">
        <h2>进口额度趋势图</h2>
        <span>2025-06 至 2026-05</span>
      </div>
      <div className="trend-bars">
        {bars.map((bar, index) => (
          <i key={index} style={{ height: `${bar}%` }} />
        ))}
      </div>
    </div>
  );
}

function BreakdownChart() {
  const rows = [
    ["德国", 72],
    ["日本", 48],
    ["美国", 36],
    ["瑞士", 22]
  ];
  return (
    <div className="chart-card">
      <div className="card-title">
        <h2>主要来源国对比图</h2>
        <span>按进口额</span>
      </div>
      <div className="rank-bars">
        {rows.map(([name, value]) => (
          <div className="rank-row" key={name}>
            <span>{name}</span>
            <b style={{ width: `${value}%` }} />
            <em>{value}%</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const setPage = useAppStore((state) => state.setPage);
  const openEvidence = useEvidenceStore((state) => state.openEvidence);
  const indicator = mockData.indicators[0];
  const showEvidence = (evidenceId: string) => {
    openEvidence(evidenceId);
    setPage("证据详情");
  };

  return (
    <section className="page dashboard-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">指标</span>
          <h1>医疗装备进口总额</h1>
        </div>
        <div className="filter-row">
          <button>时间筛选</button>
          <button>地区筛选</button>
          <button>来源筛选</button>
        </div>
      </div>
      <div className="kpi-grid">
        <KPICard label={indicator.name} value={indicator.value.toLocaleString("zh-CN")} />
        <KPICard label="数据状态" value="存在口径冲突" />
        <KPICard label="证据数" value={mockData.evidence.length} />
      </div>
      <div className="dashboard-grid">
        <TrendChart />
        <BreakdownChart />
      </div>
      <div className="table-card">
        <div className="card-title">
          <h2>税则品类明细</h2>
          <button onClick={() => showEvidence("ev_20260625_customs_import_total_001")}>查看证据详情</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>税则号</th>
              <th>品类</th>
              <th>金额</th>
              <th>质量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9018</td>
              <td>诊断与手术设备</td>
              <td>1,200,000</td>
              <td><span className="quality-pill quality-ok">已核验</span></td>
            </tr>
            <tr>
              <td>9021</td>
              <td>康复与植入器械</td>
              <td>800,000</td>
              <td><span className="quality-pill quality-ok">已核验</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
