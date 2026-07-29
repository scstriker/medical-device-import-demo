import { getMock } from "./client";

export async function queryAgent(query: string) {
  const artifacts = await getMock((data) => data.artifacts);
  return {
    query,
    answer: "已根据引用依据生成可保存结果，并提示待核验或存在冲突的状态。",
    evidenceIds: artifacts[0].evidenceIds,
    artifacts: artifacts.slice(0, 2)
  };
}
