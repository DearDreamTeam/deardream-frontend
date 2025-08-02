import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const ADMIN_STORAGE_KEY = "deardream-admin";

interface SuperAdminState {
  individuals: IndividualsDto[];
  institutions: InstitutionsDto[];
  setIndividuals: (individuals: IndividualsDto[]) => void;
  setInstitutions: (institutions: InstitutionsDto[]) => void;
  pivotDate: Date;
  setPivotDate: (newPivotDate: Date) => void;
}

export const useSuperAdminStore = create<SuperAdminState>()(
  persist(
    immer((set) => ({
      individuals: [],
      institutions: [],
      pivotDate: new Date(),
      setPivotDate: (newPivotDate) => set({ pivotDate: newPivotDate }),
      setIndividuals: (individuals) => set({ individuals }),
      setInstitutions: (institutions) => set({ institutions }),
    })),
    {
      name: ADMIN_STORAGE_KEY,
    },
  ),
);
