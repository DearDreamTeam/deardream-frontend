import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { User } from "@/types/user-type";
import { FAMILY_RELATION } from "@/constants/family-relation";
import { FAMILY_ROLE } from "@/constants/family-role";

const USER_STORAGE_KEY = "deardream-user";

interface UserState {
  user: User;
}

const defaultUser: User = {
  userId: 777,
  kakaoId: "mmm",
  name: "김영서",
  profileImage: "https://avatars.githubusercontent.com/u/88617509?v=4",
  createdAt: 1749965489473,
  birth: 964224000000,
  role: FAMILY_ROLE.LEADER,
  relation: FAMILY_RELATION.DAUGHTER,
  familyId: 22,
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: defaultUser,
      setUser: (userData: User) => set({ user: userData }),
      setFamilyId: (familyId: number) =>
        set((state) => {
          if (state.user) state.user.familyId = familyId;
        }),
    })),
    {
      name: USER_STORAGE_KEY,
    },
  ),
);
