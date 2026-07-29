import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
FRONTEND = ROOT / "frontend"


def read(relative_path: str) -> str:
    return (FRONTEND / relative_path).read_text(encoding="utf-8")


def test_prd02_vite_typescript_structure_exists():
    required_files = [
        "package.json",
        "vite.config.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/routes.tsx",
        "src/api/client.ts",
        "src/api/indicator.ts",
        "src/api/evidence.ts",
        "src/api/wiki.ts",
        "src/api/agent.ts",
        "src/api/task.ts",
        "src/data/indicatorCatalog.ts",
        "src/layout/AppShell.tsx",
        "src/layout/LeftSidebar.tsx",
        "src/layout/TopBar.tsx",
        "src/layout/CenterWorkspace.tsx",
        "src/layout/BottomCommandBar.tsx",
        "src/pages/Home.tsx",
        "src/pages/Dashboard.tsx",
        "src/pages/IndicatorCatalog.tsx",
        "src/pages/RegistrationDashboard.tsx",
        "src/pages/ChartGallery.tsx",
        "src/pages/WikiGraph.tsx",
        "src/pages/ReportCenter.tsx",
        "src/pages/EvidenceDetail.tsx",
        "src/store/appStore.ts",
        "src/store/taskStore.ts",
        "src/store/evidenceStore.ts",
        "src/types/artifact.ts",
        "src/types/task.ts",
        "src/types/evidence.ts",
        "src/types/indicator.ts",
        "src/mock/mockData.json",
        "src/components/chat/ChatMessage.tsx",
        "src/components/chat/PromptChips.tsx",
        "src/components/chat/CommandInput.tsx",
        "src/components/dashboard/KPICard.tsx",
        "src/components/dashboard/TrendChart.tsx",
        "src/components/dashboard/BreakdownChart.tsx",
        "src/components/charts/EChartPanel.tsx",
        "src/components/evidence/YAMLViewer.tsx",
        "src/components/evidence/MarkdownViewer.tsx",
        "src/components/evidence/RawSourcePreview.tsx",
        "src/components/graph/WikiGraphCanvas.tsx",
        "src/components/graph/GraphNode.tsx",
        "src/components/graph/GraphEdge.tsx",
        "src/components/report/ReportPreview.tsx",
        "src/components/report/TemplateSelector.tsx",
        "src/components/task/TaskHistoryItem.tsx",
        "src/components/task/TaskTable.tsx",
        "src/components/task/StatusBadge.tsx",
    ]

    for relative_path in required_files:
        assert (FRONTEND / relative_path).exists(), relative_path

    package = json.loads(read("package.json"))
    assert package["scripts"]["dev"].startswith("vite")
    for dependency in ["react", "typescript", "vite", "echarts", "@xyflow/react", "antd", "zustand"]:
        assert dependency in {**package["dependencies"], **package["devDependencies"]}


def test_leader_business_ia_replaces_all_purpose_workspace():
    app_shell = read("src/layout/AppShell.tsx")
    for symbol in ["LeftSidebar", "TopBar", "CenterWorkspace", "BottomCommandBar"]:
        assert symbol in app_shell
    assert "RightEvidenceDrawer" not in app_shell

    top_bar = read("src/layout/TopBar.tsx")
    for token in [
        "数据更新跑马灯",
        "updateTickerItems",
        "home-update-ticker",
        "今日已更新",
        "标准更新记录",
        "2026-04-17 14:24:16",
        'issueNo: "52013"',
        "更新题录",
        "更新文本",
        "recordCount: \"2611\"",
        "textCount: \"1521\"",
        "第 {item.issueNo} 期",
        "home-update-ticker-count",
        "home-update-ticker-record",
    ]:
        assert token in top_bar
    styles = read("src/styles.css")
    for token in ["translateY", "homeUpdateTicker", "animation-play-state: paused"]:
        assert token in styles
    for forbidden in [
        "当前专题",
        "医疗装备进口总额证据卡",
        "医疗器械产业决策首页",
        "海关统计口径已同步",
        "数据已核验",
        "存在口径冲突",
        "演示数据",
        "研究员",
        "mockData",
        "errorBook",
    ]:
        assert forbidden not in top_bar
    assert "homeUpdateTicker" in styles and "translateX" not in styles[styles.index("homeUpdateTicker"):styles.index(".top-actions")]

    sidebar = read("src/layout/LeftSidebar.tsx")
    assert "领导证据系统" in sidebar
    for label in ["首页", "指标", "报告", "图表", "图谱"]:
        assert label in sidebar
    for token in [
        "indicatorCategories",
        "指标分类树",
        "indicatorTreeOpen",
        "setIndicatorTreeOpen",
        "tree-toggle-button",
        "展开指标分类",
        "toggleCategory(category.name)",
        "setPage(indicator.target)",
        "leaf-active",
    ]:
        assert token in sidebar
    assert "setPage(category.name)" not in sidebar
    for forbidden in ["查看月报", "打开专题", "历史报告", "搜索历史报告", "新建数据任务", "证据库", "数据任务", "数据源管理", "文档解析", "数据采集", "Leadership", "Evidence OS", "医疗器械产业决策系统"]:
        assert forbidden not in sidebar

    home = read("src/pages/Home.tsx")
    for token in ["分析首页", "进口额度趋势如何", "气泡问题", "右侧抽屉", "关闭抽屉", "关键指标", "风险提示", "近期报告", "数据更新", "drawerOpen", "bubble-cloud"]:
        assert token in home
    for token in ["setCommandQuestion(question.label)", "openCommandAssistant()", "openDrawer(card.drawerTitle,"]:
        assert token in home
    assert "submitCommandQuestion()" not in home
    for forbidden in [
        "openDrawer(question.drawerTitle)",
        "右侧摘要",
        "home-summary-drawer",
        "bubble-question-panel",
        "bubble-grid",
        "关键指标、风险提示、近期报告和数据更新已汇总",
        "采集与解析由外部系统完成",
        "解析一份券商研究报告并入库",
        "数据采集",
        "文档解析",
        "任务调度",
        "medical_device",
        "source_conflict",
        "领导驾驶舱",
        "驾驶舱",
        "领导汇报",
    ]:
        assert forbidden not in home

    command_bar = read("src/layout/BottomCommandBar.tsx")
    for token in [
        "chatOpen",
        "openCommandAssistant",
        "closeCommandAssistant",
        "command-fab",
        "command-assistant-panel",
        "command-assistant-header",
        "command-assistant-body",
        "command-assistant-input",
        "贴边助手",
        "智能问数",
        "围绕指标、报告和图表提问",
        "进口额度趋势如何",
        "setCommandQuestion",
        "submitCommandQuestion",
        "commandAnswered",
        "EChartPanel",
        "importTrendRows",
        "importTrendOption",
        "输入问题后生成回答",
        "示例问题",
        "单位：亿元",
        "横轴为月份",
        "发送",
        "关闭",
    ]:
        assert token in command_bar
    styles = read("src/styles.css")
    for token in ["position: fixed", ".command-fab", ".command-assistant-panel", ".command-empty-state", ".command-result-chart", "right: 0", "translateX(104%)", "border-left"]:
        assert token in styles
    for forbidden in ["问指标", "看报告", "查证据", "生成摘要", "打开图谱", "数据采集", "文档解析", "任务调度", "Pipeline", "Agent tools", "run-button", ">运行<", "command-popover", "trendBars", "mini-trend"]:
        assert forbidden not in command_bar
    assert ".mini-trend" not in styles


def test_business_consumption_pages_and_evidence_detail_cover_acceptance():
    mock = json.loads(read("src/mock/mockData.json"))

    assert len(mock["tasks"]) >= 3
    assert len(mock["evidence"]) >= 5
    assert len(mock["indicators"]) >= 3
    assert mock["graph"]["nodes"] and mock["graph"]["edges"]
    assert mock["reportPreview"]["citations"]
    assert len(mock["errorBook"]) >= 1

    artifact_types = {artifact["type"] for artifact in mock["artifacts"]}
    assert {
        "kpi_card",
        "echarts_chart",
        "data_table",
        "evidence_card",
        "graph_view",
        "report_preview",
        "review_task",
    }.issubset(artifact_types)
    assert all(artifact["evidenceIds"] for artifact in mock["artifacts"])

    indicator_data = read("src/data/indicatorCatalog.ts")
    catalog = read("src/pages/IndicatorCatalog.tsx")
    assert "indicatorCategories.map" in catalog
    for token in ["指标矩阵", "十五类指标矩阵", "indicator-matrix", "indicator-matrix-card", "个次级指标", "matrix-leaf-actions", "setPage(indicator.target)"]:
        assert token in catalog
    for forbidden in ["<details", "indicator-branch", "coming-soon", "后续接入"]:
        assert forbidden not in catalog
    for category in [
        "进出口与国际贸易",
        "审评注册与上市准入",
        "创新医疗器械与研发能力",
        "产品与技术",
        "产业链与供应链",
        "企业主体与资质",
        "招投标采购与市场应用",
        "地方投入与财政资金",
        "产业园区与公共平台",
        "国家和地方政策",
        "平台数据库与商业机构",
        "医疗需求与临床场景",
        "国内外监管与国际比较",
        "质量监管与风险预警",
        "网页更新与研究报告",
    ]:
        assert category in indicator_data
    for leaf in ["进出口", "注册证", "进出口指标", "注册证指标"]:
        assert leaf in indicator_data

    dashboard = read("src/pages/Dashboard.tsx")
    for token in ["KPICard", "TrendChart", "BreakdownChart", "查看证据详情"]:
        assert token in dashboard
    for forbidden in ["ECharts", "TrendChart</h2>", "BreakdownChart</h2>", "HS Breakdown", "verified"]:
        assert forbidden not in dashboard

    registration = read("src/pages/RegistrationDashboard.tsx")
    for token in ["注册证", "国产注册证", "进口注册证", "审评状态", "风险提示", "引用依据"]:
        assert token in registration

    chart_component = read("src/components/charts/EChartPanel.tsx")
    for token in ["echarts.init", "setOption", "ResizeObserver", "dispose"]:
        assert token in chart_component

    charts = read("src/pages/ChartGallery.tsx")
    for token in [
        "图表矩阵",
        "chartMatrixCards",
        "activeChartId",
        "setActiveChartId",
        "返回图表矩阵",
        "进口额度",
        "注册证",
        "来源集中度",
        "招投标结构",
        "图表组",
        "进口额度趋势",
        "结构占比",
        "风险集中度",
        "进口依赖上升",
        "来源集中度高",
        "进口额度图表组",
        "注册证图表组",
        "注册证新增趋势",
        "国产与进口结构占比",
        "重点品类注册证排名",
        "国产注册证增长较快",
        "进口注册证仍集中",
        "高端品类替代要分阶段",
        "注册证结构变化",
        "EChartPanel",
        "activeTopic",
        "setActiveTopic",
        "onChartClick",
        "setPage(topic.target)",
        "趋势",
        "结构",
        "集中度",
    ]:
        assert token in charts
    assert 'useState<string | null>(null)' in charts
    assert 'setActiveChartId(card.id)' in charts
    assert 'setActiveChartId(null)' in charts
    for forbidden in ["生成更多图表", "本版边界", "聊天窗口", "问答输入", "CommandInput", "驾驶舱", "百万元", "196", "领导高频"]:
        assert forbidden not in charts

    evidence_detail = read("src/pages/EvidenceDetail.tsx")
    for field in ["证据编号", "指标口径", "来源名称", "来源类型", "原始链接", "原始文件", "网页快照", "截图位置", "原始哈希", "获取时间", "解析版本", "质量状态", "可信度", "权威等级", "人工复核", "冲突状态", "结构化元数据", "证据正文"]:
        assert field in evidence_detail
    for forbidden in ["YAML front matter", "Markdown evidence body", "Source summary"]:
        assert forbidden not in evidence_detail


def test_report_shelf_export_and_chinese_visible_copy():
    report = read("src/pages/ReportCenter.tsx")
    for token in [
        "报告书架",
        "进出口分析报告",
        "注册证结构报告",
        "产业简报",
        "导出报告",
        "报告封面",
        "核心结论",
        "引用依据",
        "text/html",
        "report-card",
        "report-hover-preview",
        "hoverPreviewDirection",
        "coverClass",
        "coverSubtitle",
        "coverIssue",
        "coverMetric",
        "coverPeriod",
        "report-cover-kicker",
        "report-cover-subtitle",
        "report-cover-art",
        "report-cover-linework",
        "report-cover-code",
        "report-cover-visual",
        "report-cover-metric",
        "report-cover-footer",
        "医疗装备行业数据研究",
        "MED-DATA",
        "import-cover",
        "registration-cover",
        "industry-cover",
    ]:
        assert token in report
    styles = read("src/styles.css")
    for token in ["report-card:hover .report-hover-preview", "report-card:focus-within .report-hover-preview", "left-preview", "right-preview"]:
        assert token in styles
    for forbidden in ["右侧预览", "report-preview-panel", "selectedId", "setSelectedId", "Report template selector", "Indicator selector", "Region/time selector", "Outline generator", "Report preview", "Evidence citation panel", "Export HTML", "Export Markdown", "Markdown", "HTML /"]:
        assert forbidden not in report


def test_static_prototypes_exist_and_old_public_shell_is_removed():
    indicator_html = (ROOT / "prototypes/leader_indicator_dashboard.html").read_text(encoding="utf-8")
    report_html = (ROOT / "prototypes/leader_report_portal.html").read_text(encoding="utf-8")

    for token in ["指标概览", "关键指标", "风险提示", "近期报告"]:
        assert token in indicator_html

    for token in ["报告书架", "进出口分析报告", "右侧预览", "导出报告"]:
        assert token in report_html

    for forbidden in ["Leadership", "Evidence OS", "Mock", "Report preview", "Markdown", "Export", "Evidence citation"]:
        assert forbidden not in indicator_html
        assert forbidden not in report_html
    for forbidden in ["驾驶舱", "领导版摘要", "领导业务"]:
        assert forbidden not in indicator_html
        assert forbidden not in report_html

    assert not (ROOT / "public/index.html").exists()
    assert not (ROOT / "public/app.js").exists()
