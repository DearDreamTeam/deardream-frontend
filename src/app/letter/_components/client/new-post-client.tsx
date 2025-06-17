"use client";

import { usePostStore } from "@/stores/usePostStore";
import PostEditor from "../post-editor/post-editor";

const NewPostClient = () => {
  const { addPost } = usePostStore();
  return <PostEditor submitAction={addPost} />;
};

export default NewPostClient;
