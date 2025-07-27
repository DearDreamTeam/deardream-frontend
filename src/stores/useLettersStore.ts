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
  liked: boolean; // 즐겨찾기 여부
}

interface PostboxState {
  newsletters: Newsletter[];
  setNewsletters: (newsletters: Newsletter[]) => void;
  setLikedStatus: (pdfIds: number[]) => void;
  setLikedToggle: (pdfId: number) => void;
}

export const useLettersStore = create<PostboxState>()(
  persist(
    immer((set) => ({
      newsletters: [],
      setNewsletters: (newsletters) => set({ newsletters: newsletters }),
      setLikedStatus: (archiveIds) =>
        set((state) => {
          if (state.newsletters) {
            const updatedNewsletters = state.newsletters.map((news) =>
              archiveIds.includes(news.archiveId)
                ? {
                    ...news,
                    liked: true,
                  }
                : news,
            );

            return {
              newsletters: updatedNewsletters,
            };
          }
        }),
      setLikedToggle: (archiveId) =>
        set((state) => {
          if (state.newsletters) {
            const updatedNewsletters = state.newsletters.map((news) =>
              news.archiveId === archiveId
                ? {
                    ...news,
                    liked: !news.liked,
                  }
                : news,
            );

            return {
              newsletters: updatedNewsletters,
            };
          }
        }),
    })),
    {
      name: POSTBOX_STORAGE_KEY,
    },
  ),
);
