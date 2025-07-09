"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
// import RedSpan from "@/components/common/red-span";
import Bell from "@/public/icons/common/bell.svg";
import { useState } from "react";
import Image from "next/image";

const PersonInfo = ({ children }: { children: UserInfo }) => {
  return (
    <article className="flex h-16 w-full items-center gap-4 rounded bg-white px-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
      <div className="relative mt-8 h-[98px] w-[98px]">
        <Image
          src={"/images/default-img.svg"}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-lg font-medium text-black">{children.name}</span>
      {/* <RedSpan>대표자</RedSpan> */}
    </article>
  );
};
interface UserInfo {
  name: string;
  relationship: string;
  isLeader: boolean;
  isPaying?: boolean; // 선택적 속성, 기본값은 false
}
const curUser: UserInfo = {
  name: "김수진",
  relationship: "딸",
  isLeader: true,
  isPaying: true, // 기본값은 true로 설정
};
const recieverInfo: UserInfo = {
  name: "김영화",
  relationship: "어머니",
  isLeader: false,
};
const familyInfo: UserInfo[] = [
  { name: "김수진", relationship: "딸", isLeader: true },
  { name: "김영희", relationship: "어머니", isLeader: false },
  { name: "김철수", relationship: "아버지", isLeader: false },
  { name: "김민수", relationship: "형제", isLeader: false },
];
const MyFamilyPage = () => {
  //   const [isleader, setIsLeader] = useState(false);
  const [user] = useState<UserInfo>(curUser);

  return (
    <>
      <Header>나의 가족</Header>

      <main className="mt-20 flex w-full justify-center">
        <div className="flex w-80 flex-col items-center gap-8">
          {/* 프로필 섹션 */}
          <section className="flex flex-col items-center gap-4">
            <div className="flex gap-2 text-sm text-gray-600">
              <Bell />
              {user.isPaying ? (
                <span>
                  {familyInfo.length}명의 가족이 함께 소식을 만들어가고 있어요!
                </span>
              ) : (
                <span className="text-center">
                  아직 소식지를 작성할 가족 그룹이 없습니다.
                  <br />
                  가족 그룹을 만들어보세요!
                </span>
              )}
            </div>
          </section>
          {!user.isPaying && (
            <>
              <GreenBasicButton>가족 그룹 만들기</GreenBasicButton>
            </>
          )}

          {user.isPaying && (
            <>
              <div className="flex w-full flex-col gap-2">
                <h2 className="w-full text-lg font-semibold text-black">
                  받는 분
                </h2>
                <PersonInfo>{recieverInfo}</PersonInfo>
              </div>

              <div className="flex w-full flex-col gap-2">
                <h2 className="w-full text-lg font-semibold text-black">
                  구성원
                </h2>
                {familyInfo.map((member, index) => (
                  <PersonInfo key={index}>{member}</PersonInfo>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default MyFamilyPage;
