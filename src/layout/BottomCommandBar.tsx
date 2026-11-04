import type { EChartsOption } from "echarts";
import EChartPanel from "../components/charts/EChartPanel";
import { useAppStore } from "../store/appStore";

const importTrendRows = [
  ["2025-10", 1.62],
  ["2025-11", 1.68],
  ["2025-12", 1.73],
  ["2026-01", 1.81],
  ["2026-02", 1.86],
  ["2026-03", 1.94],
  ["2026-04", 2.01],
  ["2026-05", 2.04]
];

const suggestedQuestions = ["进口额度趋势如何？", "哪些品类进口依赖最高？", "这份结论依据是什么？"];

const importTrendOption: EChartsOption = {
  color: ["#044470"],
  grid: { bottom: 34, left: 44, right: 18, top: 28 },
  tooltip: {
    trigger: "axis",
    valueFormatter: (value) => `${value} 亿元`
  },
  xAxis: {
    axisLine: { lineStyle: { color: "#d5dde5" } },
    axisTick: { show: false },
    data: importTrendRows.map((row) => row[0]),
    type: "category"
  },
  yAxis: {
    axisLabel: { formatter: "{value}" },
    name: "亿元",
    splitLine: { lineStyle: { color: "#d5dde5" } },
    type: "value"
  },
  series: [
    {
      areaStyle: { color: "rgba(15, 118, 110, 0.10)" },
      data: importTrendRows.map((row) => row[1]),
      lineStyle: { width: 3 },
      name: "进口额度",
      smooth: true,
      symbol: "circle",
      symbolSize: 7,
      type: "line"
    }
  ]
};

export default function BottomCommandBar() {
  const chatOpen = useAppStore((state) => state.commandAssistantOpen);
  const question = useAppStore((state) => state.commandQuestion);
  const commandAnswered = useAppStore((state) => state.commandAnswered);
  const setCommandQuestion = useAppStore((state) => state.setCommandQuestion);
  const submitCommandQuestion = useAppStore((state) => state.submitCommandQuestion);
  const openCommandAssistant = useAppStore((state) => state.openCommandAssistant);
  const closeCommandAssistant = useAppStore((state) => state.closeCommandAssistant);

  const openEmptyAssistant = () => {
    setCommandQuestion(question);
    openCommandAssistant();
  };

  const submitQuestion = () => {
    if (question.trim()) {
      submitCommandQuestion();
    }
  };

  return (
    <footer className="command-bar">
      {!chatOpen ? (
        <button className="command-fab" onClick={openEmptyAssistant}>
          <span>问</span>
          智能问数
        </button>
      ) : null}

      <section className={chatOpen ? "command-assistant-panel open" : "command-assistant-panel"} aria-hidden={!chatOpen} aria-label="贴边助手">
        <header className="command-assistant-header">
          <div>
            <strong>智能问数</strong>
            <span>围绕指标、报告和图表提问</span>
          </div>
          <button onClick={closeCommandAssistant}>关闭</button>
        </header>

        <div className="command-assistant-body">
          {commandAnswered ? (
            <section className="command-result" aria-label="智能问数回答">
              <div className="command-answer-text">
                <strong>回答</strong>
                <p>进口额度近八期整体上升，最近一期增速放缓。建议在报告中同步说明来源口径差异，并把高依赖品类列为后续跟踪重点。</p>
                <small>引用依据：海关统计口径、国际贸易校验口径、进出口分析报告。</small>
              </div>
              <EChartPanel className="command-result-chart" height={220} option={importTrendOption} />
              <p className="command-source-note">横轴为月份，纵轴为进口额度，单位：亿元；数据为当前演示口径，用于说明趋势图生成效果。</p>
            </section>
          ) : (
            <section className="command-empty-state" aria-label="智能问数未生成回答">
              <strong>输入问题后生成回答</strong>
              <p>发送后会生成结论、引用依据和趋势图。当前不会在打开面板时直接给出答案。</p>
              <div>
                <span>示例问题</span>
                <div className="command-suggestions">
                  {suggestedQuestions.map((item) => (
                    <button key={item} onClick={() => setCommandQuestion(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="command-assistant-input">
          <textarea value={question} onChange={(event) => setCommandQuestion(event.target.value)} placeholder="进口额度趋势如何？" />
          <button disabled={!question.trim()} onClick={submitQuestion}>
            发送
          </button>
        </div>
      </section>
    </footer>
  );
}
