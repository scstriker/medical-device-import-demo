export interface IndicatorLeaf {
  name: string;
  target: string;
  status: string;
}

export interface IndicatorCategory {
  name: string;
  description: string;
  indicators: IndicatorLeaf[];
}

export const indicatorCategories: IndicatorCategory[] = [
  {
    name: "进出口与国际贸易",
    description: "判断进口依赖、出口能力、贸易伙伴、海外市场和供应链安全。",
    indicators: [{ name: "进出口", target: "进出口指标", status: "已接入" }]
  },
  {
    name: "审评注册与上市准入",
    description: "回答产品能否上市、审批速度、证照结构和监管准入口径。",
    indicators: [{ name: "注册证", target: "注册证指标", status: "新增" }]
  },
  { name: "创新医疗器械与研发能力", description: "观察创新审批、研发投入、专利和临床试验进展。", indicators: [] },
  { name: "产品与技术", description: "梳理产品名称、规格型号、技术路线和国产替代关系。", indicators: [] },
  { name: "产业链与供应链", description: "识别核心材料、关键零部件、本地供应商和供应链风险。", indicators: [] },
  { name: "企业主体与资质", description: "摸清谁在做、谁有资质、谁值得扶持。", indicators: [] },
  { name: "招投标采购与市场应用", description: "观察采购结果、医院应用、价格带和国产品牌中标情况。", indicators: [] },
  { name: "地方投入与财政资金", description: "回答政府投了什么、投向哪里、效果如何。", indicators: [] },
  { name: "产业园区与公共平台", description: "观察空间载体、公共平台、园区企业和产业承载能力。", indicators: [] },
  { name: "国家和地方政策", description: "汇总政策方向、专项支持、兑现情况和监管变化。", indicators: [] },
  { name: "平台数据库与商业机构", description: "作为结构化补充和交叉验证来源。", indicators: [] },
  { name: "医疗需求与临床场景", description: "连接疾病负担、诊疗需求、科室场景和设备配置。", indicators: [] },
  { name: "国内外监管与国际比较", description: "比较海外准入、监管库、临床试验和国际竞争格局。", indicators: [] },
  { name: "质量监管与风险预警", description: "关注不良事件、召回、质量抽检和上市后风险。", indicators: [] },
  { name: "网页更新与研究报告", description: "跟踪政府网站、企业动态、公众号和研究报告线索。", indicators: [] }
];
