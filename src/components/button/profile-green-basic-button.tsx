"use client";

import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";

const GreenBasicButton = ({ children }: { children: React.ReactNode }) => {
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

    const response = await axios.post("/v1/users/register", {
      name: userProfile.name,
      profileImage: userProfile.profileImage,
      birth: `${userProfile.birth}`,
      calendarType: userProfile.calendarType,
      familyLink: userProfile.familylink,
    });
    if (response.status === 200) {
      alert("프로필이 성공적으로 업데이트되었습니다.");
      console.log("Profile updated successfully:", response.data);
      localStorage.setItem("accessToken", response.data.result.accessToken);
      localStorage.setItem("refreshToken", response.data.result.refreshToken);
      window.location.href = "/home";
    } else {
      console.error("Failed to update profile:", response.data);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
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
