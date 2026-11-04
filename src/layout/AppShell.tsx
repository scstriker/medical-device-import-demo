import { useEffect, useState } from "react";
import BottomCommandBar from "./BottomCommandBar";
import CenterWorkspace from "./CenterWorkspace";
import LeftSidebar from "./LeftSidebar";
import TopBar from "./TopBar";
import { useAppStore } from "../store/appStore";

const tabs = ["首页", "指标", "图表", "报告", "图谱"];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("itei-theme") === "dark" ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("itei-theme", theme);
  }, [theme]);
  return <button className="itei-theme-toggle" aria-label="切换深色或浅色主题" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "深色模式" : "浅色模式"}</button>;
}

export default function AppShell() {
  const currentPage = useAppStore((state) => state.currentPage);
  const setPage = useAppStore((state) => state.setPage);
  return (
    <div className="app-shell">
      <LeftSidebar />
      <section className="workspace-frame">
        <div className="itei-top-region"><TopBar /></div>
        <CenterWorkspace />
        <footer className="itei-app-footer">
          <span>ITEI · 医疗器械产业研究与证据平台</span>
          <span>演示数据 · 仅供界面与交互验证</span>
          <ThemeToggle />
        </footer>
        <BottomCommandBar />
        <nav className="itei-mobile-nav" aria-label="移动端主导航">
          {tabs.map((tab, i) => <button key={tab} aria-current={(currentPage === tab || (tab === "首页" && currentPage === "home")) ? "page" : undefined} onClick={() => setPage(tab)}><span>{String(i + 1).padStart(2,"0")}</span>{tab}</button>)}
        </nav>
      </section>
    </div>
  );
}
