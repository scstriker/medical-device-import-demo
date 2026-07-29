import mockData from "../mock/mockData.json";

export async function getMock<T>(selector: (data: typeof mockData) => T): Promise<T> {
  return selector(mockData);
}

export { mockData };
