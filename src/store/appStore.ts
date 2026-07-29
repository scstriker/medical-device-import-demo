import { create } from "zustand";

interface AppState {
  currentPage: string;
  sidebarCollapsed: boolean;
  commandAssistantOpen: boolean;
  commandQuestion: string;
  commandAnswered: boolean;
  setPage: (page: string) => void;
  setCommandQuestion: (question: string) => void;
  submitCommandQuestion: () => void;
  openCommandAssistant: () => void;
  closeCommandAssistant: () => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: "home",
  sidebarCollapsed: false,
  commandAssistantOpen: false,
  commandQuestion: "进口额度趋势如何？",
  commandAnswered: false,
  setPage: (currentPage) => set({ currentPage }),
  setCommandQuestion: (commandQuestion) => set({ commandQuestion, commandAnswered: false }),
  submitCommandQuestion: () => set({ commandAnswered: true }),
  openCommandAssistant: () => set({ commandAssistantOpen: true }),
  closeCommandAssistant: () => set({ commandAssistantOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
}));
