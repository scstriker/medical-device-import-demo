import { create } from "zustand";
import mockData from "../mock/mockData.json";
import type { TaskRecord } from "../types/task";

interface TaskState {
  tasks: TaskRecord[];
  currentTaskId: string | null;
  createTaskFromPrompt: (title: string) => TaskRecord;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockData.tasks as TaskRecord[],
  currentTaskId: "task_001",
  createTaskFromPrompt: (title) => {
    const task: TaskRecord = {
      id: `task_${String(get().tasks.length + 1).padStart(3, "0")}`,
      title,
      type: "indicator_analysis",
      status: "running",
      createdAt: new Date().toISOString()
    };
    set((state) => ({ tasks: [task, ...state.tasks], currentTaskId: task.id }));
    return task;
  }
}));
