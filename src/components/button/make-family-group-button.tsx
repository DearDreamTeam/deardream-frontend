import { PATH } from "@/constants/path";
import Link from "next/link";
import Group from "@/public/icons/buttons/group.svg";

const MakeFamilyGroupButton = () => {
  return (
    <Link href={PATH.MYPAGE}>
      <button className="button">
        <Group />
        <span>가족 그룹 만들러 가기</span>
      </button>
    </Link>
  );
};

export default MakeFamilyGroupButton;
