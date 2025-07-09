import { Post } from "./post-type";
import { User } from "./user-type";

/* front에서 postcard에 표시할 때 필요한 데이터 */
export interface PostcardProps {
  postId: Post["postId"];
  name: User["name"];
  relation: User["relation"];
  profileImg: User["profileImage"];
  createdAt: Post["createdAt"];
  content: Post["content"];
  postImg: string[]; // url[]
  aspectIndex: Post["aspectIndex"];
}
