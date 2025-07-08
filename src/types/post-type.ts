import { User } from "./user-type";

export interface Post {
  postId: number;
  authorId: User["userId"];
  familyId: User["familyId"];
  content: string;
  createdAt: number /* timestamp */;
  aspectIndex: number;
}

/* back으로 보낼 데이터 */
export interface PostBack extends Post {
  imgFiles: File[];
}

/* store에 저장될 데이터 */
export interface PostFront extends Post {
  imgUrls: string[];
}
