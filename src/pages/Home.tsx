import { useState } from "react";
import { useAppStore } from "../store/appStore";

const summaryCards = [
  {
    title: "关键指标",
    value: "3",
    drawerTitle: "关键指标",
    detail: "本月重点看进口额、注册证和国产品牌中标占比。进口额口径仍需关注，注册证新增保持稳定。"
  },
  {
    title: "风险提示",
    value: "1",
    drawerTitle: "风险提示",
    detail: "当前主要风险来自进出口口径差异，建议在汇报中明确海关主源和国际校验源的差异。"
  },
  {
    title: "近期报告",
    value: "2",
    drawerTitle: "近期报告",
    detail: "已整理进出口分析报告和产业简报，可直接打开预览或导出汇报版本。"
  }
];

const bubbleQuestions = [
  { label: "进口额度趋势如何？", summary: "进口额近十二个月整体上行，但五月出现口径差异，建议标注来源口径。", target: "进出口指标" },
  { label: "哪些品类进口依赖最高？", summary: "高端影像、植入器械和部分核心部件仍需重点跟踪。", target: "进出口指标" },
  { label: "生成进出口分析报告", summary: "可在报告书架打开进出口分析报告，并导出中文网页报告。", target: "报告" },
  { label: "注册证有什么变化？", summary: "注册证总量稳定增长，进口注册证集中在高端影像和植入器械。", target: "注册证指标" },
  { label: "这份结论依据是什么？", summary: "依据以海关、药监公开口径和已核验报告为主，详情从指标页进入。", target: "进出口指标" },
  { label: "打开产业图谱", summary: "图谱保持当前版本，用于查看指标、证据、实体和报告之间的关系。", target: "图谱" }
];

const drawerSections = [
  {
    title: "关键指标",
    items: ["医疗装备进口总额：整体上行，需保留口径说明。", "注册证数量：新增保持稳定，进口注册证集中在高端设备。", "国产品牌中标占比：继续观察招采结构变化。"]
  },
  {
    title: "风险提示",
    items: ["海关主源与国际贸易校验口径存在差异。", "高端影像和植入器械仍有进口依赖。", "正式汇报建议同步给出口径说明和引用来源。"]
  },
  {
    title: "近期报告",
    items: ["进出口分析报告已可预览和导出。", "产业简报保留为后续补充材料。", "注册证结构报告已预留书架位置。"]
  },
  {
    title: "数据更新",
    items: ["海关统计口径已同步。", "药监注册证公开查询已接入演示数据。", "图谱关系保留当前版本，不改变交互结构。"]
  }
];

export default function Home() {
  const setPage = useAppStore((state) => state.setPage);
  const setCommandQuestion = useAppStore((state) => state.setCommandQuestion);
  const openCommandAssistant = useAppStore((state) => state.openCommandAssistant);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDrawerTitle, setActiveDrawerTitle] = useState("关键指标");
  const [activeSummary, setActiveSummary] = useState(bubbleQuestions[0]);
  const activeSection = drawerSections.find((section) => section.title === activeDrawerTitle) ?? drawerSections[0];

  const openDrawer = (title: string, summary?: { label: string; summary: string; target: string }) => {
    setActiveDrawerTitle(title);
    if (summary) {
      setActiveSummary(summary);
    }
    setDrawerOpen(true);
  };

  const askQuestion = (question: (typeof bubbleQuestions)[number]) => {
    setActiveSummary(question);
    setCommandQuestion(question.label);
    openCommandAssistant();
  };

  return (
    <section className="welcome home-focus-layout">
      <div className="home-main">
        <div className="welcome-panel quiet-hero">
          <div className="welcome-copy">
            <span className="eyebrow">分析首页</span>
            <h1>需要分析哪个医疗器械产业问题？</h1>
          </div>
          <div className="welcome-metrics">
            {summaryCards.map((card) => (
              <button
                className="home-metric-card"
                key={card.title}
                onClick={() => openDrawer(card.drawerTitle, { label: card.title, summary: card.detail, target: "指标" })}
              >
                <strong>{card.value}</strong>
                <span>{card.title}</span>
                <em className="metric-tooltip">{card.detail}</em>
              </button>
            ))}
          </div>
        </div>

        <section className="bubble-cloud-section" aria-label="气泡问题">
          <span className="eyebrow">气泡问题</span>
          <div className="bubble-cloud">
            {bubbleQuestions.map((question, index) => (
              <button className={`cloud-bubble bubble-${index}`} key={question.label} onClick={() => askQuestion(question)}>
                {question.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={drawerOpen ? "drawer-scrim show" : "drawer-scrim"} onClick={() => setDrawerOpen(false)} />
      <aside className={drawerOpen ? "home-insight-drawer open" : "home-insight-drawer"} aria-label="右侧抽屉" aria-hidden={!drawerOpen}>
        <div className="drawer-title-row">
          <div>
            <span className="eyebrow">右侧抽屉</span>
            <h2>{activeSection.title}</h2>
          </div>
          <button onClick={() => setDrawerOpen(false)}>关闭抽屉</button>
        </div>
        <strong>{activeSummary.label}</strong>
        <p>{activeSummary.summary}</p>
        <div className="drawer-section-tabs">
          {drawerSections.map((section) => (
            <button className={section.title === activeDrawerTitle ? "active" : ""} key={section.title} onClick={() => setActiveDrawerTitle(section.title)}>
              {section.title}
            </button>
          ))}
        </div>
        <div className="drawer-insight-list">
          {activeSection.items.map((item) => (
            <article key={item}>{item}</article>
          ))}
        </div>
        <button className="drawer-primary-action" onClick={() => setPage(activeSummary.target)}>查看详情</button>
      </aside>
    </section>
  );
}
