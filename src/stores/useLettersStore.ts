import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const POSTBOX_STORAGE_KEY = "deardream-postbox";

export interface Newsletter {
  deliveryStatus: string; // 배송 상태
  pdfUrl: string;
  thumbnailUrl: string;
  yearMonthType: string;
  archiveId: number;
}

interface PostboxState {
  newsletters: Newsletter[];
  bookmarks: number[];
  setNewsletters: (newsletters: Newsletter[]) => void;
  setBookmarks: (pdfIds: number[]) => void;
  setLikedToggle: (pdfId: number) => void;
}

export const useLettersStore = create<PostboxState>()(
  persist(
    immer((set) => ({
      newsletters: [],
      bookmarks: [],
      setNewsletters: (newsletters) => set({ newsletters: newsletters }),
      setBookmarks: (archiveIds) => set({ bookmarks: archiveIds }),
      setLikedToggle: (archiveId) =>
        set((state) => {
          if (state.bookmarks) {
            const updatedBookmarks = state.bookmarks.includes(archiveId)
              ? state.bookmarks.filter((id) => id !== archiveId)
              : [...state.bookmarks, archiveId];

            return {
              bookmarks: updatedBookmarks,
            };
          }
        }),
    })),
    {
      name: POSTBOX_STORAGE_KEY,
    },
  ),
);
