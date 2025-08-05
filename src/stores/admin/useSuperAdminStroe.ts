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
  setPivotDate: (newDate: Date | string) => void;
  updatePivotDate: (value: -1 | 1) => void;
}

export const useSuperAdminStore = create<SuperAdminState>()(
  persist(
    immer((set) => ({
      individuals: [],
      institutions: [],
      pivotDate: new Date(),
      setPivotDate: (date) => set({ pivotDate: new Date(date) }),
      updatePivotDate: (value) =>
        set((state) => ({
          pivotDate: new Date(
            new Date(state.pivotDate).getFullYear(),
            new Date(state.pivotDate).getMonth() + value,
            1,
          ),
        })),
      setIndividuals: (individuals) => set({ individuals }),
      setInstitutions: (institutions) => set({ institutions }),
    })),
    {
      name: ADMIN_STORAGE_KEY,
    },
  ),
);
