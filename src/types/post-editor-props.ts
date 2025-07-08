import { PostFront } from "./post-type";
import { PostState } from "@/stores/usePostStore";

export interface PostEditorProps {
  postcard?: PostFront;
  submitAction: PostState["addPost"] | PostState["editPost"];
}
