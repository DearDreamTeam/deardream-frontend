import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaymentState {
  tid: string | null;
  setTid: (tid: string | null) => void;
  clearTid: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      tid: null,
      setTid: (tid) => set({ tid }),
      clearTid: () => set({ tid: null }),
    }),
    {
      name: "payment-storage", // localStorage key 이름
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
