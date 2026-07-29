import { indicatorCategories } from "../data/indicatorCatalog";
import { useAppStore } from "../store/appStore";

export default function IndicatorCatalog() {
  const setPage = useAppStore((state) => state.setPage);

  return (
    <section className="page indicator-catalog-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">指标</span>
          <h1>指标矩阵</h1>
        </div>
        <p className="page-note">十五类指标按业务主题呈现，有次级指标的分类可直接进入分析页面。</p>
      </div>

      <div className="indicator-matrix" aria-label="十五类指标矩阵">
        {indicatorCategories.map((category) => (
          <article className="indicator-matrix-card" key={category.name}>
            <div>
              <h2>{category.name}</h2>
              <span>{category.indicators.length} 个次级指标</span>
            </div>
            {category.indicators.length > 0 ? (
              <div className="matrix-leaf-actions">
                {category.indicators.map((indicator) => (
                  <button key={indicator.name} onClick={() => setPage(indicator.target)}>
                    {indicator.name}
                  </button>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
