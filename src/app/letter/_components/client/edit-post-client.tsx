"use client";

import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types/post-type";
import PostEditor from "../post-editor/post-editor";

const EditPostClient = ({ postId }: { postId: Post["postId"] }) => {
  const { getAPostcard, editPost } = usePostStore();
  const postcard = getAPostcard(postId);

  return <PostEditor postcard={postcard} submitAction={editPost} />;
};

export default EditPostClient;
