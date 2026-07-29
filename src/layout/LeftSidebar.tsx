import { useEffect, useMemo, useState } from "react";
import { indicatorCategories } from "../data/indicatorCatalog";
import { useAppStore } from "../store/appStore";

const navItems = ["报告", "图表", "图谱"];

export default function LeftSidebar() {
  const currentPage = useAppStore((state) => state.currentPage);
  const setPage = useAppStore((state) => state.setPage);
  const activePage = currentPage === "home" ? "首页" : currentPage;
  const indicatorTargets = useMemo(
    () => indicatorCategories.flatMap((category) => category.indicators.map((indicator) => indicator.target)),
    []
  );
  const isIndicatorActive = activePage === "指标" || indicatorTargets.includes(activePage);
  const [indicatorTreeOpen, setIndicatorTreeOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(indicatorCategories.map((category) => [category.name, category.indicators.length > 0]))
  );

  useEffect(() => {
    const activeCategory = indicatorCategories.find((category) =>
      category.indicators.some((indicator) => indicator.target === activePage)
    );
    if (activeCategory) {
      setIndicatorTreeOpen(true);
      setOpenCategories((state) => ({ ...state, [activeCategory.name]: true }));
    }
  }, [activePage]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((state) => ({ ...state, [categoryName]: !state[categoryName] }));
  };

  return (
    <aside className="left-sidebar">
      <div className="brand-block">
        <div className="brand-mark">械</div>
        <div>
          <div className="project-title">领导证据系统</div>
          <div className="project-subtitle">医疗器械证据中台</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button className={activePage === "首页" ? "active" : ""} onClick={() => setPage("首页")}>
          <span className="nav-dot" />
          首页
        </button>
        <div className={`sidebar-tree ${isIndicatorActive ? "active" : ""}`}>
          <div className="tree-parent-row">
            <button
              aria-expanded={indicatorTreeOpen}
              aria-label={indicatorTreeOpen ? "收起指标分类" : "展开指标分类"}
              className="tree-toggle-button"
              onClick={() => setIndicatorTreeOpen((isOpen) => !isOpen)}
            >
              {indicatorTreeOpen ? "▾" : "▸"}
            </button>
            <button className={`tree-parent ${isIndicatorActive ? "active" : ""}`} onClick={() => setPage("指标")}>
              <span className="nav-dot" />
              <span>指标</span>
            </button>
          </div>
          {indicatorTreeOpen ? (
            <div className="sidebar-indicator-tree" aria-label="指标分类树">
              {indicatorCategories.map((category) => {
                const categoryOpen = openCategories[category.name];
                const hasLeaves = category.indicators.length > 0;
                return (
                  <div className="sidebar-indicator-branch" key={category.name}>
                    <button
                      aria-expanded={hasLeaves ? categoryOpen : undefined}
                      className="sidebar-category-button"
                      onClick={() => {
                        if (hasLeaves) {
                          toggleCategory(category.name);
                        }
                      }}
                    >
                      <span className={`category-caret ${hasLeaves ? "" : "empty"}`}>
                        {hasLeaves ? (categoryOpen ? "▾" : "▸") : "•"}
                      </span>
                      <span className="category-label">{category.name}</span>
                    </button>
                    {categoryOpen && hasLeaves ? (
                      <div className="sidebar-indicator-leaves">
                        {category.indicators.map((indicator) => (
                          <button
                            className={activePage === indicator.target ? "active leaf-active" : ""}
                            key={indicator.name}
                            onClick={() => setPage(indicator.target)}
                          >
                            <span>{indicator.name}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {navItems.map((item) => (
          <button className={activePage === item ? "active" : ""} key={item} onClick={() => setPage(item)}>
            <span className="nav-dot" />
            {item}
          </button>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <button>系统设置</button>
        <button>关于</button>
      </footer>
    </aside>
  );
}
