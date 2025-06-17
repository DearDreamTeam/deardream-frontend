import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "@/types/post-type";

const POST_STORAGE_KEY = "deardream-post";

export interface PostState {
  post: Post[];
  addPost: (letter: Post) => void;
  deletePost: (postId: Post["postId"]) => void;
  editPost: (postId: Post["postId"], letter: Post) => void;
  getAPostcard: (postId: Post["postId"]) => Post | undefined;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      post: [],
      addPost: (letter: Post) => set({ post: [letter, ...get().post] }),
      deletePost: (postId: Post["postId"]) => {
        const newPost = get().post.filter(
          (postcard) => postcard.postId !== postId,
        );
        return set({ post: [...newPost] });
      },
      editPost: (postId: Post["postId"], letter: Post) => {
        const newPost = get().post.map((postcard) => {
          if (postcard.postId !== postId) return postcard;
          return letter;
        });
        return set({ post: [...newPost] });
      },
      getAPostcard: (postId: Post["postId"]) => {
        const letter = get().post.find(
          (postcard) => postcard.postId === postId,
        );
        return letter;
      },
    }),
    { name: POST_STORAGE_KEY },
  ),
);
