"use client";

import { registerUser } from "@/api/profile";
import { useUserStore } from "@/stores/useUserInfoStore";
import React from "react";

const GreenBasicButton = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string;
}) => {
  const { userProfile } = useUserStore();

  const isProfileIncomplete =
    !userProfile?.name?.trim() || !userProfile.birth?.trim();

  const handleUpdateProfile = async () => {
    if (isProfileIncomplete) {
      alert("프로필 정보를 모두 입력해주세요.");
      return;
    }
    if (type == "register") {
      try {
        const response = await registerUser(userProfile!);

        if (response.status === 200) {
          alert("프로필이 성공적으로 업데이트되었습니다.");
          window.location.href = "/home";
        }
      } catch (e) {
        console.error("프로필 등록 오류:", e);
        alert("프로필 등록에 실패했습니다.");
      }
    } else if (type == "update") {
      try {
        const response = await registerUser(userProfile!);

        if (response.status === 200) {
          alert("프로필이 성공적으로 업데이트되었습니다.");
          window.location.href = "/mypage";
        }
      } catch (e) {
        console.error("프로필 업데이트 오류:", e);
        alert("프로필 업데이트에 실패했습니다.");
      }
    }
  };
  return (
    <div
      className={`px-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        isProfileIncomplete
          ? "bg-grey-200 text-grey-500 cursor-not-allowed"
          : "text-grey-0 bg-green-300"
      } cursor-pointer`}
      aria-disabled={isProfileIncomplete}
      onClick={handleUpdateProfile}
    >
      <div className="text-headline-3">{children}</div>
    </div>
  );
};
export default GreenBasicButton;
