import { create } from "zustand";
import mockData from "../mock/mockData.json";
import type { EvidenceCard } from "../types/evidence";

interface EvidenceState {
  evidence: EvidenceCard[];
  currentEvidenceId: string | null;
  openEvidence: (evidenceId: string) => void;
  markReviewed: (evidenceId: string) => void;
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  evidence: mockData.evidence as EvidenceCard[],
  currentEvidenceId: "ev_20260625_customs_import_total_001",
  openEvidence: (currentEvidenceId) => set({ currentEvidenceId }),
  markReviewed: (evidenceId) =>
    set((state) => ({
      evidence: state.evidence.map((item) =>
        item.evidence_id === evidenceId
          ? { ...item, manual_review_record: "complete", quality_status: "verified" }
          : item
      )
    }))
}));
