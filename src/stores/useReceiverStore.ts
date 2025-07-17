import { create } from "zustand";

export interface ReceiverProfileInfo {
  id?: number;
  leaderId: number;
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
interface ReceiverState {
  receiver: ReceiverProfileInfo;
  setReceiver: (info: Partial<ReceiverProfileInfo>) => void;
  resetReceiver: () => void;
}

export const useReceiverStore = create<ReceiverState>((set) => ({
  receiver: {
    id: 0,
    leaderId: 0,
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
}));
