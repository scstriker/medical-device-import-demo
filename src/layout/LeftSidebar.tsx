import { useEffect, useState } from "react";
import { indicatorCategories } from "../data/indicatorCatalog";
import { useAppStore } from "../store/appStore";

const links = ["报告", "图表", "图谱"];
export default function LeftSidebar() {
  const page = useAppStore(s => s.currentPage);
  const setPage = useAppStore(s => s.setPage);
  const active = page === "home" ? "首页" : page;
  const indicatorActive = active === "指标" || indicatorCategories.some(c=>c.indicators.some(i=>i.target===active));
  const [expanded,setExpanded] = useState(true);
  const [open,setOpen] = useState<Record<string,boolean>>(() => Object.fromEntries(indicatorCategories.map(c=>[c.name, !!c.indicators.length])));
  useEffect(()=>{
    const c=indicatorCategories.find(c=>c.indicators.some(i=>i.target===active));
    if(c){setExpanded(true);setOpen(v=>({...v,[c.name]:true}));}
  },[active]);
  return <aside className="left-sidebar" aria-label="主导航">
    <div className="brand-block">
      <div className="brand-mark" aria-label="ITEI">ITEI</div>
      <div><div className="project-title">医疗器械产业数据系统</div><div className="project-subtitle">产业研究与证据平台</div></div>
    </div>
    <nav className="sidebar-nav">
      <button className={active==="首页"?"active":""} onClick={()=>setPage("首页")}><span className="nav-dot"/>01　首页</button>
      <div className={indicatorActive?"sidebar-tree active":"sidebar-tree"}>
        <div className="tree-parent-row">
          <button className="tree-toggle-button" aria-expanded={expanded} aria-label={expanded?"收起指标目录":"展开指标目录"} onClick={()=>setExpanded(v=>!v)}>{expanded?"−":"+"}</button>
          <button className={indicatorActive?"tree-parent active":"tree-parent"} onClick={()=>setPage("指标")}><span className="nav-dot"/>02　指标</button>
        </div>
        {expanded && <div className="sidebar-indicator-tree" aria-label="指标分类树">
          {indicatorCategories.map((c,index)=><div className="sidebar-indicator-branch" key={c.name}>
            <button className="sidebar-category-button" aria-expanded={c.indicators.length?!!open[c.name]:undefined} onClick={()=>{if(c.indicators.length)setOpen(v=>({...v,[c.name]:!v[c.name]}));}}>
              <span className="category-caret">{c.indicators.length?(open[c.name]?"−":"+"):"·"}</span>
              <span className="category-label">{String(index+1).padStart(2,"0")}　{c.name}</span>
            </button>
            {open[c.name]&&c.indicators.length>0&&<div className="sidebar-indicator-leaves">
              {c.indicators.map(i=><button key={i.name} className={active===i.target?"active leaf-active":""} onClick={()=>setPage(i.target)}>{i.name}</button>)}
            </div>}
          </div>)}
        </div>}
      </div>
      {links.map((label,i)=><button className={active===label?"active":""} key={label} onClick={()=>setPage(label)}><span className="nav-dot"/>{String(i+3).padStart(2,"0")}　{label}</button>)}
    </nav>
    <footer className="sidebar-footer"><div className="project-subtitle">机械工业仪器仪表综合技术经济研究所（ITEI）</div><div className="project-subtitle">UI 演示版 · 数据非正式发布</div></footer>
  </aside>;
}
