import { useAppStore } from "../store/appStore";

const updateTickerItems = [
  {
    typeLabel: "标准更新记录",
    updatedAt: "2026-04-17 14:24:16",
    issueNo: "52013",
    recordCountLabel: "更新题录",
    recordCount: "2611",
    textCountLabel: "更新文本",
    textCount: "1521"
  },
  {
    typeLabel: "注册证更新记录",
    updatedAt: "2026-04-18 09:10:32",
    issueNo: "52014",
    recordCountLabel: "更新注册证",
    recordCount: "384",
    textCountLabel: "更新文本",
    textCount: "219"
  },
  {
    typeLabel: "海关数据更新记录",
    updatedAt: "2026-04-18 16:42:08",
    issueNo: "52015",
    recordCountLabel: "更新题录",
    recordCount: "1720",
    textCountLabel: "更新文本",
    textCount: "906"
  },
  {
    typeLabel: "招采数据更新记录",
    updatedAt: "2026-04-19 08:30:45",
    issueNo: "52016",
    recordCountLabel: "更新中标记录",
    recordCount: "643",
    textCountLabel: "更新公告文本",
    textCount: "388"
  }
];

const rollingTickerItems = [...updateTickerItems, updateTickerItems[0]];

export default function TopBar() {
  const currentPage = useAppStore((state) => state.currentPage);
  const pageName = currentPage === "home" ? "首页" : currentPage;
  const isHomePage = currentPage === "home" || currentPage === "首页";
  const pageDescriptions: Record<string, string> = {
    指标: "指标矩阵",
    进出口指标: "医疗装备进出口分析",
    注册证指标: "医疗器械注册证总览",
    报告: "报告书架",
    图表: "图表矩阵",
    图谱: "产业图谱",
    证据详情: "引用依据详情"
  };

  return (
    <header className={`top-bar ${isHomePage ? "home-top-bar" : ""}`}>
      <div className="top-title">
        <span>{pageName}</span>
        {isHomePage ? (
          <div className="home-update-ticker" aria-label="数据更新跑马灯">
            <span className="home-update-ticker-label">数据更新</span>
            <strong className="home-update-ticker-count">今日已更新 {updateTickerItems.length} 批次</strong>
            <div className="home-update-ticker-window">
              <div className="home-update-ticker-track">
                {rollingTickerItems.map((item, index) => (
                  <div className="home-update-ticker-record" aria-hidden={index === rollingTickerItems.length - 1} key={`${item.typeLabel}-${item.issueNo}-${index}`}>
                    <strong>[ {item.typeLabel} ]</strong>
                    <span>{item.updatedAt}</span>
                    <span>第 {item.issueNo} 期</span>
                    <span>
                      {item.recordCountLabel} <b>{item.recordCount}</b> 条
                    </span>
                    <span>
                      {item.textCountLabel} <b>{item.textCount}</b> 条
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <strong>{pageDescriptions[currentPage] ?? "领导证据系统"}</strong>
        )}
      </div>
    </header>
  );
}
