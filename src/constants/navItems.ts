import Home from "@/public/icons/gnb/home.svg";
import Write from "@/public/icons/gnb/write.svg";
import InboxOn from "@/public/icons/gnb/inbox-on.svg";
import My from "@/public/icons/gnb/mypage.svg";
import { PATH } from "./path";

export const NAV_ITEMS = [
  { icon: Home, label: "홈", href: PATH.HOME },
  { icon: Write, label: "소식 작성", href: PATH.LETTER_WRITE },
  { icon: InboxOn, label: "소식함", href: PATH.LETTER_LIST },
  { icon: My, label: "마이페이지", href: PATH.MYPAGE },
];
