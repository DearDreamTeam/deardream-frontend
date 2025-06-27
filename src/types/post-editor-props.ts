import { Post } from "./post-type";
import { PostState } from "@/stores/usePostStore";

export interface PostEditorProps {
  postcard?: Post;
  submitAction: PostState["addPost"] | PostState["editPost"];
}
