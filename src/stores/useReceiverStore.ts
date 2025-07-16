import { create } from "zustand";

export interface ReceiverProfileInfo {
  leaderId: number;
  name: string;
  birth: string;
  phone: string;
  calendarType: "SOLAR" | "LUNAR";
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
