import Home from "@/public/icons/gnb/house.svg";
import Write from "@/public/icons/gnb/edit.svg";
import Postbox from "@/public/icons/gnb/mail.svg";
import My from "@/public/icons/gnb/person.svg";
import { PATH } from "./path";

export const NAV_ITEMS = [
  { icon: Home, label: "홈", href: PATH.HOME },
  { icon: Write, label: "소식 작성", href: PATH.LETTER_WRITE },
  { icon: Postbox, label: "소식함", href: PATH.LETTER_LIST },
  { icon: My, label: "마이", href: PATH.MYPAGE },
];
