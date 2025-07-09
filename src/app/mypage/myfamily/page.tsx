"use client";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
// import RedSpan from "@/components/common/red-span";
import Crown from "@/public/icons/common/crown.svg";
import { useState } from "react";
import Image from "next/image";
import Add from "@/public/icons/common/add.svg";
import ShareOptions from "@/components/modal/share-options/share-options";

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
const receiverInfo: UserInfo = {
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

const PersonInfo = ({
  children,
  isReceiver,
}: {
  children: UserInfo;
  isReceiver: boolean;
}) => {
  return (
    <div className="flex h-16 w-full items-center gap-3">
      <div className="relative h-[54px] min-w-[54px]">
        <Image
          src={"/images/default-img.svg"}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <span className="text-title-2 flex gap-1">
          {children.name} {children.isLeader && <Crown />}
        </span>
        {!isReceiver ? (
          <span className="text-label-2 text-grey-400">
            {children.relationship}
          </span>
        ) : (
          <span className="text-label-2 text-grey-400">받는 분 정보 수정</span>
        )}
      </div>
    </div>
  );
};

const MyFamilyPage = () => {
  //   const [isleader, setIsLeader] = useState(false);
  const [user] = useState<UserInfo>(curUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header>나의 가족</Header>

      <div className="flex w-full flex-col justify-center p-4">
        {/* 프로필 섹션 */}
        {!user.isPaying && (
          <>
            <GreenBasicButton>가족 그룹 만들기</GreenBasicButton>
          </>
        )}

        {user.isPaying && (
          <>
            <div className="mb-4 flex w-full flex-col">
              <div className="text label-2 text-grey-400 w-full">받는 분</div>
              <PersonInfo isReceiver={true}>{receiverInfo}</PersonInfo>
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="text label-2 text-grey-400 w-full">구성원</div>
              {familyInfo.map((member, index) => (
                <PersonInfo key={index} isReceiver={false}>
                  {member}
                </PersonInfo>
              ))}
            </div>
            <div
              className="mt-4 flex w-full cursor-pointer items-center gap-3"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green-100 p-1.5">
                <Add />
              </div>
              <div className="text-title-2 text-grey-500">새 멤버 초대하기</div>
            </div>
          </>
        )}
      </div>
      {isOpen && <ShareOptions setIsOpen={setIsOpen} />}
    </>
  );
};

export default MyFamilyPage;
