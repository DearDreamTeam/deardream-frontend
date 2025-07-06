import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const POSTBOX_STORAGE_KEY = "deardream-postbox";

export interface Newsletter {
  pdfId: number;
  coverImgUrl: string;
  timestamp: number;
  liked: boolean;
}

interface PostboxState {
  newsletters: Newsletter[];
  setLikedNews: (pdfId: number) => void;
}

const defaultData: Newsletter[] = Array.from({ length: 10 }, (_, i) => ({
  pdfId: i,
  coverImgUrl: `/mock/cover-${i + 1}.png`,
  timestamp: new Date(2025, 7 - i, 1).getTime(),
  liked: false,
}));

export const useLettersStore = create<PostboxState>()(
  persist(
    immer((set) => ({
      newsletters: defaultData,
      setLikedNews: (pdfId: number) =>
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
