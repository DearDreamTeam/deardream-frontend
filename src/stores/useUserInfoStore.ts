import { create } from "zustand";
import { UserInfo, UserProfileInfo } from "@/types/user-info";

const defaultProfile: UserProfileInfo = {
  id: -1,
  kakaoId: 0,
  name: "",
  profileImage: "",
  birth: "",
  calendarType: "SOLAR",
  relation: "",
  otherRelation: "",
  role: "DEFAULT",
  createdAt: "",
  familyId: 0,
  registered: false,
  familyRegistered: false,
};

interface UserState {
  userKaKaoInfo: UserInfo | null;
  userProfile: UserProfileInfo;
  setUserKaKaoInfo: (info: UserInfo) => void;
  setUserProfile: (profile: UserProfileInfo) => void;
  updateUserProfile: (update: Partial<UserProfileInfo>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
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
}));
