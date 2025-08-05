import { create } from "zustand";

export interface ReceiverProfileInfo {
  id?: number;
  leaderId: number;
  familyId?: number;
  name: string;
  birth: string;
  phone: string;
  calendarType: "SOLAR" | "LUNAR";
  profileImage?: string;
  profileImageKey?: string;
  address: {
    deliveryType: "HOME" | "INSTITUTION" | "NONE";
    recipientName: string;
    recipientPhone: string;
    postalCode: string;
    address: string;
    addressDetail?: string;
    institutionName: string;
    institutionPhone: string;
    code: string;
  };
}
export interface ReceiverProfileImage {
  profileImage: File | null;
  profileImageKey?: string;
}

interface ReceiverState {
  receiver: ReceiverProfileInfo;
  setReceiver: (info: Partial<ReceiverProfileInfo>) => void;
  resetReceiver: () => void;
  receiverImage: ReceiverProfileImage;
  setReceiverImage: (image: ReceiverProfileImage) => void;
  resetReceiverImage: () => void;
  resetReceiverAddress: () => void;
}

export const useReceiverStore = create<ReceiverState>((set) => ({
  receiver: {
    id: 0,
    leaderId: 0,
    familyId: 0,
    name: "",
    birth: "",
    phone: "",
    calendarType: "SOLAR",
    address: {
      deliveryType: "HOME",
      recipientName: "",
      recipientPhone: "",
      postalCode: "",
      address: "",
      addressDetail: "",
      institutionName: "",
      institutionPhone: "",
      code: "",
    },
  },
  setReceiver: (info) =>
    set((state) => ({
      receiver: {
        ...state.receiver,
        ...info,
      },
    })),

  resetReceiver: () =>
    set({
      receiver: {
        id: 0,
        leaderId: 0,
        familyId: 0,
        name: "",
        birth: "",
        phone: "",
        calendarType: "SOLAR",
        address: {
          deliveryType: "HOME",
          recipientName: "",
          recipientPhone: "",
          postalCode: "",
          address: "",
          addressDetail: "",
          institutionName: "",
          institutionPhone: "",
          code: "",
        },
      },
    }),
  receiverImage: {
    profileImage: null,
  },
  setReceiverImage: (image) => set({ receiverImage: { ...image } }),
  resetReceiverImage: () => set({ receiverImage: { profileImage: null } }),
  resetReceiverAddress: () =>
    set((state) => ({
      receiver: {
        ...state.receiver,
        address: {
          deliveryType: "HOME",
          recipientName: "",
          recipientPhone: "",
          postalCode: "",
          address: "",
          addressDetail: "",
          institutionName: "",
          institutionPhone: "",
          code: "",
        },
      },
    })),
}));
