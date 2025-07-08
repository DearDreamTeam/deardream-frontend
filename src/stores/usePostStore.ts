import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostFront } from "@/types/post-type";

const POST_STORAGE_KEY = "deardream-post";

export interface PostState {
  post: PostFront[];
  addPost: (letter: PostFront) => void;
  deletePost: (postId: PostFront["postId"]) => void;
  editPost: (postId: PostFront["postId"], letter: PostFront) => void;
  getAPostcard: (postId: PostFront["postId"]) => PostFront | undefined;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      post: [],
      addPost: (letter) => set({ post: [letter, ...get().post] }),
      deletePost: (postId) => {
        const newPost = get().post.filter(
          (postcard) => postcard.postId !== postId,
        );
        return set({ post: [...newPost] });
      },
      editPost: (postId, letter) => {
        const newPost = get().post.map((postcard) => {
          if (postcard.postId !== postId) return postcard;
          return letter;
        });
        return set({ post: [...newPost] });
      },
      getAPostcard: (postId) => {
        const letter = get().post.find(
          (postcard) => postcard.postId === postId,
        );
        return letter;
      },
    }),
    { name: POST_STORAGE_KEY },
  ),
);
