import { useAppStore } from "../store/appStore";
import { useEvidenceStore } from "../store/evidenceStore";

function MetricCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <article className="kpi-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

export default function RegistrationDashboard() {
  const setPage = useAppStore((state) => state.setPage);
  const openEvidence = useEvidenceStore((state) => state.openEvidence);
  const showEvidence = () => {
    openEvidence("ev_20260625_nmpa_registration_001");
    setPage("证据详情");
  };

  return (
    <section className="page dashboard-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">注册证指标</span>
          <h1>医疗器械注册证总览</h1>
        </div>
        <div className="filter-row">
          <button onClick={() => setPage("指标")}>返回指标矩阵</button>
          <button onClick={showEvidence}>查看引用依据</button>
        </div>
      </div>

      <div className="kpi-grid">
        <MetricCard title="国产注册证" value="1,248" note="近十二个月新增三百一十六件" />
        <MetricCard title="进口注册证" value="286" note="高端影像和植入器械占比较高" />
        <MetricCard title="待审评事项" value="42" note="十五项超过常规审评周期" />
      </div>

      <div className="dashboard-grid">
        <section className="chart-card">
          <div className="card-title">
            <h2>审评状态</h2>
            <span>按办理阶段汇总</span>
          </div>
          <div className="rank-bars">
            {[
              ["已批准", 78],
              ["审评中", 42],
              ["补充资料", 26],
              ["待受理", 18]
            ].map(([name, value]) => (
              <div className="rank-row" key={name}>
                <span>{name}</span>
                <b style={{ width: `${value}%` }} />
                <em>{value}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-card">
          <div className="card-title">
            <h2>风险提示</h2>
            <span>证照结构</span>
          </div>
          <div className="insight-list">
            <article>
              <strong>进口替代窗口</strong>
              <p>部分高值设备进口注册证仍集中在少数跨国企业，国产注册证增速较快但临床替代仍需跟踪。</p>
            </article>
            <article>
              <strong>到期复核压力</strong>
              <p>未来六个月有一批注册证进入延续窗口，建议提前核查重点企业和重点品类。</p>
            </article>
          </div>
        </section>
      </div>

      <section className="table-card">
        <div className="card-title">
          <h2>引用依据</h2>
          <button onClick={showEvidence}>查看证据详情</button>
        </div>
        <p>注册证数量、审评状态和进口注册结构来自药监公开查询口径，本版为演示数据。</p>
      </section>
    </section>
  );
}
