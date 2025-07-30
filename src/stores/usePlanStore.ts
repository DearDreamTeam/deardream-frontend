// stores/useInvitationStore.ts
import { create } from "zustand";

interface PlanInfo {
  isActive: boolean;
  type: "HOME" | "INSTITUTION";
}

interface PlanState {
  plan: PlanInfo;
  setPlan: (plan: PlanInfo) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plan: {
    isActive: false,
    type: "HOME",
  },
  setPlan: (plan: PlanInfo) => set({ plan }),
  clearPlan: () =>
    set({
      plan: { isActive: false, type: "HOME" },
    }),
}));
