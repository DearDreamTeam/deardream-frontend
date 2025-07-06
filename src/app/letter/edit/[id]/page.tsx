import { use } from "react";
import EditPostClient from "../../_components/client/edit-post-client";

const Edit = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const postId = parseInt(id);

  return <EditPostClient postId={postId} />;
};

export default Edit;
