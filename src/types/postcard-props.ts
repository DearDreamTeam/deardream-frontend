import { Post } from "./post-type";

/* front에서 postcard에 표시할 때 필요한 데이터 */
export interface PostcardProps extends Post {
  aspectIndex: Post["aspectIndex"];
}
