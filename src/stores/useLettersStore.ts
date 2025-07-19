import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const POSTBOX_STORAGE_KEY = "deardream-postbox";

export interface Newsletter {
  pdfId: number;
  coverImgUrl: string;
  timestamp: number;
  status: string; // 배송 상태
  liked: boolean; // 즐겨찾기 여부
}

interface PostboxState {
  newsletters: Newsletter[];
  setNewsletters: (newsletters: Newsletter[]) => void;
  setLikedStatus: (pdfIds: number[]) => void;
  setLikedToggle: (pdfId: number) => void;
}

/*
const defaultData: Newsletter[] = Array.from({ length: 10 }, (_, i) => ({
  pdfId: i,
  coverImgUrl: `/mock/cover-${i + 1}.png`,
  timestamp: new Date(2025, 7 - i, 1).getTime(),
  liked: false,
  status: i > 1 ? 2 : i,
}));
*/

export const useLettersStore = create<PostboxState>()(
  persist(
    immer((set) => ({
      newsletters: [],
      setNewsletters: (newsletters) => set({ newsletters: newsletters }),
      setLikedStatus: (pdfIds) =>
        set((state) => {
          if (state.newsletters) {
            const updatedNewsletters = state.newsletters.map((news) =>
              pdfIds.includes(news.pdfId)
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
      setLikedToggle: (pdfId) =>
        set((state) => {
          if (state.newsletters) {
            const updatedNewsletters = state.newsletters.map((news) =>
              news.pdfId === pdfId
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
