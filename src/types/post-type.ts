import { User } from "./user-type";

export interface Post {
  postId: number;
  authorId: User["userId"];
  familyId: User["familyId"];
  content: string;
  imgFiles: File[];
  createdAt: number /* timestamp */;
  imgUrls: string[] /* temp */;
}
