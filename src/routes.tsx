import Dashboard from "./pages/Dashboard";
import ChartGallery from "./pages/ChartGallery";
import EvidenceDetail from "./pages/EvidenceDetail";
import Home from "./pages/Home";
import IndicatorCatalog from "./pages/IndicatorCatalog";
import RegistrationDashboard from "./pages/RegistrationDashboard";
import ReportCenter from "./pages/ReportCenter";
import WikiGraph from "./pages/WikiGraph";

export const routes = [
  { key: "home", label: "首页", component: Home },
  { key: "indicators", label: "指标", component: IndicatorCatalog },
  { key: "import-export-indicator", label: "进出口指标", component: Dashboard },
  { key: "registration-indicator", label: "注册证指标", component: RegistrationDashboard },
  { key: "reports", label: "报告", component: ReportCenter },
  { key: "charts", label: "图表", component: ChartGallery },
  { key: "graph", label: "图谱", component: WikiGraph },
  { key: "evidence-detail", label: "证据详情", component: EvidenceDetail }
];
