import { Post } from "./post-type";
import { User } from "./user-type";

export interface PostcardProps {
  postId: Post["postId"];
  name: User["name"];
  relation: User["relation"];
  profileImg: User["profileImage"];
  createdAt: Post["createdAt"];
  content: Post["content"];
  postImg: string[]; // url[]
}
