import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo, UserProfile } from "@/types/user-info";

const defaultProfile: UserProfile = {
  id: 0,
  name: "",
  profileImage: "",
  birth: "",
  calendarType: "SOLAR",
  relation: "",
  otherRelation: "",
  familylink: null,
  familyRegistered: false,
  role: "LEADER",
};

interface UserState {
  userKaKaoInfo: UserInfo | null;
  userProfile: UserProfile;
  setUserKaKaoInfo: (info: UserInfo) => void;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (update: Partial<UserProfile>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userKaKaoInfo: null,
      userProfile: defaultProfile,

      setUserKaKaoInfo: (info) => set({ userKaKaoInfo: info }),

      setUserProfile: (profile) => set({ userProfile: profile }),

      updateUserProfile: (update) =>
        set((state) => ({
          userProfile: {
            ...defaultProfile,
            ...state.userProfile,
            ...update,
          },
        })),

      clearUser: () =>
        set({
          userKaKaoInfo: null,
          userProfile: defaultProfile,
        }),
    }),
    {
      name: "user-store", // localStorage key
      partialize: (state) => ({
        userKaKaoInfo: state.userKaKaoInfo,
        userProfile: state.userProfile,
      }),
    },
  ),
);
