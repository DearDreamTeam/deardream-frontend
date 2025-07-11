import { Post } from "@/types/post-type";

export const PATH = {
  HOME: "/home", //홈
  LETTER_WRITE: "/letter/new", //소식 작성
  LETTER_EDIT: (id: Post["postId"]) => `/letter/edit/${id}`, //소식 수정
  LETTER_LIST: "/letters", //소식함
  MYPAGE: "/mypage", //마이
  LOGIN: "/login", //로그인
  PROFILE: "/mypage/profile", //프로필
  MY_FAMILY: "/mypage/myfamily", //나의 가족
};
