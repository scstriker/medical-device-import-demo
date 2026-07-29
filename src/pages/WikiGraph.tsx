import mockData from "../mock/mockData.json";

const nodeTypeLabels: Record<string, string> = {
  "Indicator node": "指标",
  "Evidence node": "证据",
  "Entity node": "实体",
  "Report node": "报告",
  "Error node": "风险"
};

const nodeLabelOverrides: Record<string, string> = {
  evidence_un: "国际贸易校验证据",
  entity_hs_9018: "税则号九零一八"
};

const edgeLabels: Record<string, string> = {
  supports: "支撑",
  conflicts_with: "存在口径差异",
  derived_from: "来源于",
  mentions: "写入"
};

const nodeNameById = Object.fromEntries(
  mockData.graph.nodes.map((node) => [node.id, nodeLabelOverrides[node.id] ?? node.label])
);

export default function WikiGraph() {
  return (
    <section className="page graph-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">图谱</span>
          <h1>产业图谱</h1>
        </div>
        <div className="filter-row">
          <button>节点展开</button>
          <button>边过滤</button>
          <button>缩放平移</button>
        </div>
      </div>
      <div className="graph-layout">
        <div className="graph-canvas">
          <span>拖拽节点 / 缩放平移 / 边过滤</span>
          {mockData.graph.nodes.map((node, index) => (
            <button className={`graph-node node-${index}`} key={node.id}>
              {nodeTypeLabels[node.type] ?? node.type}: {nodeLabelOverrides[node.id] ?? node.label}
            </button>
          ))}
        </div>
        <aside className="edge-panel">
          <h2>关系解释</h2>
          {mockData.graph.edges.map((edge) => (
            <p key={edge.id}>{nodeNameById[edge.source]} {edgeLabels[edge.type] ?? "关联"} {nodeNameById[edge.target]}</p>
          ))}
        </aside>
      </div>
    </section>
  );
}
