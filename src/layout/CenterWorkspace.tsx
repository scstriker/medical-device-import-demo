import { useAppStore } from "../store/appStore";
import ChartGallery from "../pages/ChartGallery";
import Dashboard from "../pages/Dashboard";
import EvidenceDetail from "../pages/EvidenceDetail";
import Home from "../pages/Home";
import IndicatorCatalog from "../pages/IndicatorCatalog";
import RegistrationDashboard from "../pages/RegistrationDashboard";
import ReportCenter from "../pages/ReportCenter";
import WikiGraph from "../pages/WikiGraph";

export default function CenterWorkspace() {
  const currentPage = useAppStore((state) => state.currentPage);
  const pages: Record<string, JSX.Element> = {
    home: <Home />,
    首页: <Home />,
    指标: <IndicatorCatalog />,
    进出口指标: <Dashboard />,
    注册证指标: <RegistrationDashboard />,
    报告: <ReportCenter />,
    图表: <ChartGallery />,
    图谱: <WikiGraph />,
    证据详情: <EvidenceDetail />
  };

  return <main className="center-workspace">{pages[currentPage] ?? <Home />}</main>;
}
