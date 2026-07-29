import { useEffect, useMemo, useState } from "react";
import type { EChartsOption } from "echarts";
import EChartPanel from "../components/charts/EChartPanel";
import { useAppStore } from "../store/appStore";

const importTrendRows = [
  ["2025-06", 1.42],
  ["2025-07", 1.51],
  ["2025-08", 1.59],
  ["2025-09", 1.54],
  ["2025-10", 1.66],
  ["2025-11", 1.73],
  ["2025-12", 1.81],
  ["2026-01", 1.76],
  ["2026-02", 1.88],
  ["2026-03", 1.96],
  ["2026-04", 1.91],
  ["2026-05", 2.04]
];

const sourceRows = [
  { name: "德国", value: 31 },
  { name: "日本", value: 24 },
  { name: "美国", value: 18 },
  { name: "瑞士", value: 12 },
  { name: "其他", value: 15 }
];

const importRiskRows = [
  { name: "高端影像设备", value: 72 },
  { name: "植入介入器械", value: 58 },
  { name: "核心零部件", value: 47 },
  { name: "生命支持设备", value: 35 },
  { name: "检验分析设备", value: 29 }
];

const registrationRows = [
  { month: "2025-12", domestic: 86, imported: 24 },
  { month: "2026-01", domestic: 91, imported: 25 },
  { month: "2026-02", domestic: 97, imported: 27 },
  { month: "2026-03", domestic: 105, imported: 28 },
  { month: "2026-04", domestic: 112, imported: 29 },
  { month: "2026-05", domestic: 118, imported: 31 }
];

const registrationShareRows = [
  { name: "国产注册证", value: 79 },
  { name: "进口注册证", value: 21 }
];

const registrationRankRows = [
  { name: "高端影像", value: 42 },
  { name: "植入介入", value: 36 },
  { name: "体外诊断", value: 31 },
  { name: "康复设备", value: 24 },
  { name: "手术设备", value: 18 }
];

const chartMatrixCards = [
  {
    id: "import",
    title: "进口额度",
    category: "进出口与国际贸易",
    summary: "保留当前较清晰的进口额度趋势图，并补充来源结构和高依赖品类。",
    chartCount: "三张核心图",
    status: "已配置"
  },
  {
    id: "registration",
    title: "注册证",
    category: "审评注册与上市准入",
    summary: "新增注册证趋势、国产与进口结构、重点品类排名，观察注册证结构变化和替代节奏。",
    chartCount: "三张核心图",
    status: "新增"
  },
  {
    id: "source",
    title: "来源集中度",
    category: "风险识别",
    summary: "后续可单独展开来源国、供应商和品类集中风险。",
    chartCount: "待配置",
    status: "预览"
  },
  {
    id: "procurement",
    title: "招投标结构",
    category: "招投标采购与市场应用",
    summary: "后续可展示国产中标占比、价格带和重点医院采购结构。",
    chartCount: "待配置",
    status: "预览"
  }
];

const palette = {
  teal: "#0f766e",
  tealLight: "#b6dfd8",
  blue: "#2563eb",
  amber: "#b7791f",
  ink: "#182230",
  muted: "#667085",
  line: "#dfe5ed"
};

function baseGrid(left = 42) {
  return {
    left,
    right: 22,
    top: 24,
    bottom: 36
  };
}

function importTrendOption(): EChartsOption {
  return {
    color: [palette.teal],
    grid: baseGrid(),
    tooltip: { trigger: "axis", valueFormatter: (value) => `${Number(value).toFixed(2)} 亿元` },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: importTrendRows.map(([month]) => month),
      axisLine: { lineStyle: { color: palette.line } },
      axisLabel: { color: palette.muted }
    },
    yAxis: {
      type: "value",
      name: "亿元",
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: "#eef2f6" } }
    },
    series: [
      {
        name: "进口额度",
        type: "line",
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(15, 118, 110, 0.12)" },
        markPoint: {
          data: [{ name: "本期高点", coord: ["2026-05", 2.04], value: 2.04 }],
          label: { color: "#ffffff" }
        },
        data: importTrendRows.map(([, value]) => value)
      }
    ]
  };
}

function importStructureOption(): EChartsOption {
  return {
    color: [palette.teal, palette.blue, palette.amber, palette.tealLight, "#94a3b8"],
    tooltip: { trigger: "item", formatter: "{b}: {c}%" },
    series: [
      {
        name: "来源结构",
        type: "pie",
        radius: ["48%", "72%"],
        center: ["50%", "54%"],
        label: { formatter: "{b}\n{c}%", color: palette.ink },
        data: sourceRows
      }
    ]
  };
}

function importRiskOption(): EChartsOption {
  return {
    color: [palette.amber],
    grid: { left: 102, right: 28, top: 18, bottom: 28 },
    tooltip: { trigger: "axis", valueFormatter: (value) => `${value}%` },
    xAxis: {
      type: "value",
      max: 80,
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: "#eef2f6" } }
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: importRiskRows.map((row) => row.name),
      axisLabel: { color: palette.ink }
    },
    series: [
      {
        name: "进口依赖度",
        type: "bar",
        barWidth: 16,
        label: { show: true, position: "right", formatter: "{c}%" },
        data: importRiskRows.map((row) => row.value)
      }
    ]
  };
}

function registrationTrendOption(): EChartsOption {
  return {
    color: [palette.teal, palette.blue],
    grid: baseGrid(),
    legend: { top: 0, right: 0, textStyle: { color: palette.muted } },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: registrationRows.map((row) => row.month),
      axisLabel: { color: palette.muted }
    },
    yAxis: {
      type: "value",
      name: "件",
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: "#eef2f6" } }
    },
    series: [
      {
        name: "国产注册证",
        type: "bar",
        stack: "total",
        data: registrationRows.map((row) => row.domestic)
      },
      {
        name: "进口注册证",
        type: "bar",
        stack: "total",
        data: registrationRows.map((row) => row.imported)
      }
    ]
  };
}

function registrationShareOption(): EChartsOption {
  return {
    color: [palette.teal, palette.blue],
    tooltip: { trigger: "item", formatter: "{b}: {c}%" },
    series: [
      {
        name: "注册证结构",
        type: "pie",
        radius: ["45%", "72%"],
        center: ["50%", "54%"],
        label: { formatter: "{b}\n{c}%", color: palette.ink },
        data: registrationShareRows
      }
    ]
  };
}

function registrationRankOption(): EChartsOption {
  return {
    color: [palette.teal],
    grid: { left: 86, right: 28, top: 18, bottom: 28 },
    tooltip: { trigger: "axis", valueFormatter: (value) => `${value} 件` },
    xAxis: {
      type: "value",
      max: 48,
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: "#eef2f6" } }
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: registrationRankRows.map((row) => row.name),
      axisLabel: { color: palette.ink }
    },
    series: [
      {
        name: "注册证数量",
        type: "bar",
        barWidth: 16,
        label: { show: true, position: "right", formatter: "{c}" },
        data: registrationRankRows.map((row) => row.value)
      }
    ]
  };
}

const dashboardConfigs = {
  import: {
    title: "进口额度图表组",
    description: "围绕进口额度趋势、来源结构和高依赖品类，快速判断外部依赖风险。",
    defaultNote: "2026-05 进口额度二点零四亿元，海关口径与国际贸易库存在轻微差异。",
    topics: [
      {
        id: "import-trend",
        title: "进口依赖上升",
        chartTitle: "进口额度趋势",
        metric: "近十二个月进口额",
        summary: "五月进口额达到二点零四亿元，较去年六月上升约四成，需要继续跟踪高端设备依赖。",
        target: "进出口指标",
        option: importTrendOption
      },
      {
        id: "import-source",
        title: "来源集中度高",
        chartTitle: "风险集中度",
        metric: "重点品类进口风险",
        summary: "高端影像设备和植入介入器械贡献最高，前五类合计占据主要风险敞口。",
        target: "进出口指标",
        option: importRiskOption
      },
      {
        id: "import-structure",
        title: "来源结构需关注",
        chartTitle: "结构占比",
        metric: "来源国占比",
        summary: "德国、日本和美国仍是主要来源，供应安全需要结合品类和替代能力判断。",
        target: "进出口指标",
        option: importStructureOption
      }
    ],
    miniCharts: [
      { title: "结构占比", action: "看指标", target: "进出口指标", option: importStructureOption },
      { title: "风险集中度", action: "看来源", target: "进出口指标", option: importRiskOption }
    ]
  },
  registration: {
    title: "注册证图表组",
    description: "围绕注册证新增趋势、国产与进口结构、重点品类排名，判断产品准入和替代节奏。",
    defaultNote: "2026-05 国产注册证新增一百一十八件，进口注册证新增三十一件。",
    topics: [
      {
        id: "registration-trend",
        title: "国产注册证增长较快",
        chartTitle: "注册证新增趋势",
        metric: "近六个月新增注册证",
        summary: "国产注册证新增更快，说明本土供给活跃度提升，但仍要观察高端品类准入质量。",
        target: "注册证指标",
        option: registrationTrendOption
      },
      {
        id: "registration-share",
        title: "进口注册证仍集中",
        chartTitle: "国产与进口结构占比",
        metric: "国产与进口注册证结构",
        summary: "进口注册证占比不高，但集中在高端影像和植入介入器械，风险不能只看总量。",
        target: "注册证指标",
        option: registrationShareOption
      },
      {
        id: "registration-rank",
        title: "高端品类替代要分阶段",
        chartTitle: "重点品类注册证排名",
        metric: "重点品类注册证数量",
        summary: "高端影像、植入介入和体外诊断仍是观察重点，替代节奏需要分品类推进。",
        target: "注册证指标",
        option: registrationRankOption
      }
    ],
    miniCharts: [
      { title: "国产与进口结构占比", action: "看结构", target: "注册证指标", option: registrationShareOption },
      { title: "重点品类注册证排名", action: "看品类", target: "注册证指标", option: registrationRankOption }
    ]
  }
};

export default function ChartGallery() {
  const setPage = useAppStore((state) => state.setPage);
  const [activeChartId, setActiveChartId] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState("import-trend");
  const [selectedPoint, setSelectedPoint] = useState("先从图表矩阵选择一个图表主题。");

  useEffect(() => {
    document.querySelector(".center-workspace")?.scrollTo({ top: 0 });
  }, [activeChartId]);

  const scrollWorkspaceTop = () => {
    requestAnimationFrame(() => {
      document.querySelector(".center-workspace")?.scrollTo({ top: 0 });
    });
  };

  const activeDashboard = activeChartId ? dashboardConfigs[activeChartId as keyof typeof dashboardConfigs] : null;
  const dashboardTopics = activeDashboard?.topics ?? [];
  const selectedTopic = dashboardTopics.find((topic) => topic.id === activeTopic) ?? dashboardTopics[0];

  const mainOption = useMemo(() => selectedTopic?.option() ?? importTrendOption(), [selectedTopic]);

  const openChartCard = (card: (typeof chartMatrixCards)[number]) => {
    if (!(card.id in dashboardConfigs)) {
      return;
    }
    const config = dashboardConfigs[card.id as keyof typeof dashboardConfigs];
    setActiveChartId(card.id);
    setActiveTopic(config.topics[0].id);
    setSelectedPoint(config.defaultNote);
    scrollWorkspaceTop();
  };

  const onChartClick = (params: unknown) => {
    const item = params as { name?: string; value?: number | string | Array<number | string>; seriesName?: string };
    const value = Array.isArray(item.value) ? item.value.join(" / ") : item.value;
    setSelectedPoint(`${item.name ?? "当前点"}：${item.seriesName ?? selectedTopic?.metric ?? "指标"} ${value ?? ""}。`);
  };

  const openTopic = (topic: (typeof dashboardTopics)[number]) => {
    setPage(topic.target);
  };

  if (!activeDashboard) {
    return (
      <section className="page chart-gallery-page chart-matrix-page">
        <div className="page-header">
          <div>
            <span className="eyebrow">图表</span>
            <h1>图表矩阵</h1>
          </div>
          <p className="page-note">先选少量核心图表主题，不和十五类指标完全一一对应。</p>
        </div>

        <div className="chart-matrix-grid" aria-label="图表矩阵">
          {chartMatrixCards.map((card) => {
            const enabled = card.id in dashboardConfigs;
            return (
              <article className={`chart-matrix-card ${enabled ? "" : "muted"}`} key={card.id}>
                <div>
                  <span>{card.category}</span>
                  <h2>{card.title}</h2>
                  <p>{card.summary}</p>
                </div>
                <div className="chart-matrix-card-footer">
                  <em>{card.chartCount}</em>
                  {enabled ? (
                    <button onClick={() => openChartCard(card)}>打开图表</button>
                  ) : (
                    <small>{card.status}</small>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="page chart-gallery-page chart-command-center">
      <div className="page-header">
        <div>
          <span className="eyebrow">图表</span>
          <h1>{activeDashboard.title}</h1>
        </div>
        <div className="chart-filter-row" aria-label="图表筛选">
          <button
            onClick={() => {
              setActiveChartId(null);
              scrollWorkspaceTop();
            }}
          >
            返回图表矩阵
          </button>
          <button>近十二个月</button>
          <button>全国</button>
          <button>医疗装备</button>
        </div>
      </div>

      <p className="page-note">{activeDashboard.description}</p>

      <div className="chart-hero-layout">
        <section className="chart-main-panel">
          <div className="chart-panel-header">
            <div>
              <span>图表组</span>
              <h2>{selectedTopic.chartTitle}</h2>
            </div>
            <button onClick={() => openTopic(selectedTopic)}>深入查看</button>
          </div>
          <EChartPanel className="echart-panel" height={300} option={mainOption} onChartClick={onChartClick} />
          <div className="chart-click-note">
            <span>点击解释</span>
            <p>{selectedPoint}</p>
            <small>引用依据：海关统计、药监公开查询、已核验行业报告。</small>
          </div>
        </section>

        <aside className="chart-mini-stack" aria-label="图表小结">
          {activeDashboard.miniCharts.map((chart) => (
            <section className="chart-card compact-chart-card" key={chart.title}>
              <div className="card-title">
                <h2>{chart.title}</h2>
                <button onClick={() => setPage(chart.target)}>{chart.action}</button>
              </div>
              <EChartPanel className="echart-panel" height={160} option={chart.option()} />
            </section>
          ))}
        </aside>
      </div>

      <div className="chart-topic-strip" aria-label="图表判断卡">
        {dashboardTopics.map((topic) => (
          <button
            className={selectedTopic.id === topic.id ? "active" : ""}
            key={topic.id}
            onClick={() => {
              setActiveTopic(topic.id);
              setSelectedPoint(topic.summary);
            }}
          >
            <span>{topic.metric}</span>
            <strong>{topic.title}</strong>
            <small>{topic.summary}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
