"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserInfoStore";
import axios from "@/lib/axios";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import GreenBasicButton from "@/components/button/profile-green-basic-button";

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
        console.log("카카오 로그인 응답:", data);

        const {
          tempToken,
          newAccessToken,
          newRefreshToken,
          email,
          name,
          profileImage,
          registered,
          familyRegistered,
        } = data.result;

        localStorage.setItem("tempToken", tempToken);

        if (newAccessToken && newRefreshToken) {
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          console.log("액세스 토큰 저장:", newAccessToken);
        }

        setUserInfo({
          tempToken,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          registered,
          familyRegistered,
          email,
          name,
          profileImage,
        });

        setUserProfile({
          name,
          profileImage,
          birth: "",
          calendarType: "SOLAR",
          relation: "",
          otherRelation: "",
          familylink: null,
        });

        if (data.result.registered) {
          // 이미 등록된 사용자라면 프로필 페이지로 리다이렉트
          window.location.href = "/home";
          return;
        }
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
      <div className="relative flex h-screen w-full flex-col items-center justify-between bg-white p-4">
        <div>
          <Header>프로필 설정</Header>
          {userInfo ? (
            <ProfileEdit isSender={false} isInvite={false} />
          ) : (
            <div className="text-grey-800 flex h-screen w-full flex-col items-center justify-center gap-6 bg-green-100 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-green-600"></div>
              <div className="text-xl font-semibold">
                정보를 불러오는 중입니다
              </div>
              <p className="text-grey-500 animate-pulse text-base">
                잠시만 기다려 주세요...
              </p>
            </div>
          )}
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton>저장</GreenBasicButton>
        </div>
      </div>
    </>
  );
};

export default ProfileClient;
