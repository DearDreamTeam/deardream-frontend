import { User } from "./user-type";

/* back으로 보낼 데이터 */
export interface PostLetter {
  authorId: User["userId"];
  content: string;
  images: File[];
}

/* store에 저장될 데이터 */
export interface Post {
  authorId: number;
  authorName: string;
  authorProfileImg: string;
  content: string;
  createdAt: string;
  imageUrls: string[];
  postId: number;
  relations: string;
  aspectIndex: number;
}
