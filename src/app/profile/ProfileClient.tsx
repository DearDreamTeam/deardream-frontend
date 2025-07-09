"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserInfoStore";
import axios from "@/lib/axios";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import GreenBasicButton from "@/components/button/green-basic-button";

const ProfileClient = () => {
  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get("code");

  const { setUserInfo, setUserProfile, userInfo } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!kakaoCode) return;

      try {
        const response = await axios.get("/users/login/kakao", {
          params: { code: kakaoCode },
        });

        const data = response.data;
        if (!data || !data.result) throw new Error("잘못된 로그인 응답");

        const { accessToken, refreshToken, email, name, profileImage } =
          data.result;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setUserInfo({ accessToken, refreshToken, email, name, profileImage });
        setUserProfile({
          name,
          profileImage,
          birth: "",
          calendarType: "SOLAR",
          relation: "",
          otherRelation: "",
        });
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        window.location.href = "/login";
      }
    };

    fetchUserInfo();
  }, [kakaoCode, setUserInfo, setUserProfile]);

  return (
    <>
      <Header>프로필 설정</Header>
      {userInfo ? (
        <ProfileEdit isSender={true} isInvite={false} />
      ) : (
        <div className="text-grey-800 flex h-screen w-full flex-col items-center justify-center gap-6 bg-green-100 px-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-green-600"></div>
          <div className="text-xl font-semibold">정보를 불러오는 중입니다</div>
          <p className="text-grey-500 animate-pulse text-base">
            잠시만 기다려 주세요...
          </p>
        </div>
      )}
      <div className="absolute right-0 bottom-5 left-0 mx-auto flex h-14 w-full items-center justify-center md:w-[375px]">
        <GreenBasicButton>저장</GreenBasicButton>
      </div>
    </>
  );
};

export default ProfileClient;
