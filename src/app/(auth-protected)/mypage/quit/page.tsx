"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import axios from "@/lib/axios";
import Check from "@/public/icons/common/check.svg";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useState } from "react";

interface UserPostInfo {
  name: string;
  messageCount: number;
  planType: "PERSONAL" | "INSTITUTION" | "NONE";
  willDeliverCount: number;
}
const userPostInfo: UserPostInfo = {
  name: "김수진",
  messageCount: 5,
  planType: "PERSONAL",
  willDeliverCount: 2,
};

const QuitItem = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="text-label-2 mt-4 flex w-full justify-between bg-green-100 px-6 py-4">
      <p>{text}</p>
      <p>{children}</p>
    </div>
  );
};
const QuitPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { userProfile } = useUserStore();

  const handleClick = async () => {
    if (!isChecked) {
      alert("회원 탈퇴 약관에 동의해주세요.");
      return;
    } else {
      const res = await axios.delete("/v1/users/me");
      if (res.status !== 200) {
        alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        return;
      } else {
        window.location.href = "/mypage/quit/complete";
      }
    }
  };

  return (
    <>
      <form
        className="relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
        onSubmit={handleClick}
      >
        <Header>회원 탈퇴</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          <div className="text-headline-1">
            {userProfile.name}님, <br />
            탈퇴 하시기 전에 꼭 확인해주세요
            <p className="text-label-2 text-grey-500 mt-2 mb-4">
              탈퇴 후 재가입은 14일이 지나야 할 수 있어요
            </p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="text-title-2">
              그동안 쌓아온 <br /> 소중한 추억들을 전부 잃어버려요
              <QuitItem text="그동안 모인 소식">
                {userPostInfo.messageCount}개
              </QuitItem>
            </div>
            <div className="text-title-2">
              이용 중이신 플랜이 중지되며, <br />더 이상 서비스를 이용하실 수
              없어요
              <QuitItem text="구독 중인 플랜">
                {userPostInfo.planType === "NONE"
                  ? "구독 중인 플랜이 없습니다"
                  : userPostInfo.planType === "PERSONAL"
                    ? "개인 플랜"
                    : "기관 플랜"}
              </QuitItem>
            </div>
            <div className="text-title-2">
              이번달 소식지는 제작 및 배송되지 않아요
              <QuitItem text="발송 예정 소식지">
                {userPostInfo.willDeliverCount}개
              </QuitItem>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center gap-4">
          <div className="flex gap-2">
            <div
              onClick={() => setIsChecked(!isChecked)}
              className={`${
                !isChecked ? "bg-grey-300" : "bg-green-700"
              } inline-flex h-6 w-6 items-center justify-center rounded-full p-1`}
            >
              <Check />
            </div>
            <span className="text-sm text-gray-800">
              [필수] 회원 탈퇴 약관을 확인했으며, 이에 동의합니다.
            </span>
          </div>
          <GreenBasicButton disabled={!isChecked}>
            회원 탈퇴하기
          </GreenBasicButton>
        </div>
      </form>
    </>
  );
};

export default QuitPage;
