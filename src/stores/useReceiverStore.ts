import { create } from "zustand";

export interface ReceiverProfileInfo {
  name: string;
  birth: string;
  calendarType: "SOLAR" | "LUNAR";
  phone: string;
  deliveryType: "PERSONAL" | "INSTITUTION" | "NONE";
  address: string;
  addressDetail: string;
  postalCode: string;
  code: string;
}

interface ReceiverState {
  receiver: ReceiverProfileInfo;
  setReceiver: (info: Partial<ReceiverProfileInfo>) => void;
  resetReceiver: () => void;
}

export const useReceiverStore = create<ReceiverState>((set) => ({
  receiver: {
    name: "",
    birth: "",
    calendarType: "SOLAR",
    phone: "",
    deliveryType: "PERSONAL",
    address: "",
    addressDetail: "",
    postalCode: "",
    code: "",
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
        name: "",
        birth: "",
        calendarType: "SOLAR",
        phone: "",
        deliveryType: "PERSONAL",
        address: "",
        addressDetail: "",
        postalCode: "",
        code: "",
      },
    }),
}));
