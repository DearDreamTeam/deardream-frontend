import Home from "@/public/icons/gnb/house-active.svg";
import Write from "@/public/icons/gnb/edit-active.svg";
import Postbox from "@/public/icons/gnb/mail-active.svg";
import My from "@/public/icons/gnb/person-active.svg";

import HomeInactive from "@/public/icons/gnb/house-inactive.svg";
import WriteInactive from "@/public/icons/gnb/edit-inactive.svg";
import PostboxInactive from "@/public/icons/gnb/mail-inactive.svg";
import MyInactive from "@/public/icons/gnb/person-inactive.svg";

import { PATH } from "./path";

export const NAV_ITEMS = [
  {
    activeIcon: Home,
    inactiveIcon: HomeInactive,
    label: "홈",
    href: PATH.HOME,
  },
  {
    activeIcon: Write,
    inactiveIcon: WriteInactive,
    label: "소식 작성",
    href: PATH.LETTER_WRITE,
  },
  {
    activeIcon: Postbox,
    inactiveIcon: PostboxInactive,
    label: "소식함",
    href: PATH.LETTER_LIST,
  },
  {
    activeIcon: My,
    inactiveIcon: MyInactive,
    label: "마이",
    href: PATH.MYPAGE,
  },
];
