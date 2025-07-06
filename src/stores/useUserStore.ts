import { UserInfo, UserProfile } from "@/types/user-info";
import { create } from "zustand";

interface UserState {
  userInfo: UserInfo | null;
  userProfile: UserProfile | null;
  setUserInfo: (info: UserInfo) => void;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (update: Partial<UserProfile>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  userProfile: null,

  setUserInfo: (info) => set({ userInfo: info }),

  setUserProfile: (profile) => set({ userProfile: profile }),

  updateUserProfile: (update) =>
    set((state) => ({
      userProfile: {
        ...{
          name: "",
          profileImage: "",
          birth: "",
          calendarType: "SOLAR",
          relation: "",
          otherRelation: "",
        },
        ...(state.userProfile ?? {}),
        ...update,
      },
    })),

  clearUser: () => set({ userInfo: null, userProfile: null }),
}));
