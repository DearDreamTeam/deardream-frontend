import Home from "@/public/icons/admin/home.svg";
import Chart from "@/public/icons/admin/chart-square.svg";
import Setting from "@/public/icons/admin/setting.svg";

export const ADMIN_NAV_ITEM = [
  {
    icon: Home,
    label: "이용자 현황",
    href: `/admin/organization`,
  },
  {
    icon: Chart,
    label: "통계",
    href: `/admin/organization/chart`,
  },
  {
    icon: Setting,
    label: "환경설정",
    href: `/admin/organization/setting`,
  },
];
