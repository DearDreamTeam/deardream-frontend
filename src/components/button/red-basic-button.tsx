"use client";

import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";
import React from "react";

const RedBasicButton = ({ children }: { children: React.ReactNode }) => {
  const { userProfile } = useUserStore();

  const isProfileIncomplete =
    !userProfile?.name?.trim() || !userProfile.birth?.trim();

  const handleUpdateProfile = async () => {
    if (isProfileIncomplete) {
      alert("프로필 정보를 모두 입력해주세요.");
      return;
    }
    if (!userProfile) {
      console.error("User profile is not defined.");
      alert("프로필 정보가 없습니다. 다시 시도해주세요.");
      window.location.href = "/login";
      return;
    }
    const token = localStorage.getItem("accessToken");
    console.log("Updating profile with token:", token);
    const data = {
      name: userProfile.name,
      profileImage: userProfile.profileImage,
      birth: `${userProfile.birth}`,
      calendarType: userProfile.calendarType,
    };
    console.log("Profile data to be sent:", data);
    const response = await axios.patch("/v1/users/me", {
      data: {
        name: userProfile.name,
        profileImage: userProfile.profileImage,
        birth: `${userProfile.birth}`,
        calendarType: userProfile.calendarType,
      },
    });
    if (response.status === 200) {
      alert("프로필이 성공적으로 업데이트되었습니다.");
      console.log("Profile updated successfully:", response.data);
    } else {
      console.error("Failed to update profile:", response.data);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div
      className={`px-auto mx-2 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        isProfileIncomplete ? "cursor-not-allowed bg-gray-400" : "bg-green-700"
      } cursor-pointer`}
      aria-disabled={isProfileIncomplete}
      onClick={handleUpdateProfile}
    >
      <div className="text-lg font-semibold text-white">{children}</div>
    </div>
  );
};
export default RedBasicButton;
