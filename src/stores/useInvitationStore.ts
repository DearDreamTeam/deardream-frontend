// stores/useInvitationStore.ts
import { create } from "zustand";

interface InvitationState {
  familyLink: string | null;
  setFamilyLink: (link: string | null) => void;
  clearFamilyLink: () => void;
}

export const useInvitationStore = create<InvitationState>((set) => ({
  familyLink: null,
  setFamilyLink: (link) => set({ familyLink: link }),
  clearFamilyLink: () => set({ familyLink: null }),
}));
