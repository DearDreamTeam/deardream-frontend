import { use } from "react";
import PostEditor from "../../_components/post-editor/post-editor";
import { usePostStore } from "@/stores/usePostStore";

const Edit = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const postId = parseInt(id);

  const { getAPostcard } = usePostStore();
  const postcard = getAPostcard(postId);

  return <PostEditor postcard={postcard} />;
};

export default Edit;
