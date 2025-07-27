import Link from "next/link";
import Group from "@/public/icons/buttons/group.svg";

const MakeFamilyGroupButton = () => {
  return (
    // 이부분 링크 넘어가는게 느려서 수정
    <Link href="/subscribe" className="button flex items-center gap-2">
      <Group />
      <span>가족 그룹 만들러 가기</span>
    </Link>
  );
};

export default MakeFamilyGroupButton;
