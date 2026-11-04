import { useAppStore } from "../store/appStore";

const records = [
  { name: "标准更新", total: "2,611", date: "2026-04-17" },
  { name: "注册证更新", total: "384", date: "2026-04-18" },
  { name: "海关数据更新", total: "1,720", date: "2026-04-18" },
  { name: "招采数据更新", total: "643", date: "2026-04-19" }
];
const pageNames: Record<string,string> = {
  home:"首页",首页:"首页",指标:"指标矩阵",进出口指标:"医疗装备进出口分析",
  注册证指标:"医疗器械注册证总览",报告:"专题报告",图表:"数据图表",
  图谱:"产业知识图谱",证据详情:"证据档案"
};

export default function TopBar() {
  const currentPage = useAppStore(s => s.currentPage);
  const page = pageNames[currentPage] ?? currentPage;
  return <header className={currentPage === "home" || currentPage === "首页" ? "top-bar home-top-bar" : "top-bar"}>
    <div className="top-title">
      <span>{page}</span>
      {(currentPage === "home" || currentPage === "首页") ?
        <div className="home-update-ticker" aria-label="演示数据更新历史">
          <strong className="home-update-ticker-label">数据更新</strong>
          <strong className="home-update-ticker-count">历史记录 {records.length} 批次</strong>
          <div className="home-update-ticker-window">
            <div className="home-update-ticker-track">
              {[...records, records[0]].map((record,i) =>
                <div className="home-update-ticker-record" aria-hidden={i === records.length} key={i}>
                  <strong>{record.name}</strong><span>{record.date}</span><span>更新 {record.total} 条</span>
                </div>)}
            </div>
          </div>
        </div> : <strong>医疗器械产业研究与证据平台</strong>}
    </div>
  </header>;
}
