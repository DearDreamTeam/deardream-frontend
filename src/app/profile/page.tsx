// app/page.tsx
"use client";
import RedBasicButton from "@/components/button/red-basic-button";
import Header from "@/components/common/header";
import ProfileEdit, { UserInfo } from "@/components/profile/profile-edit";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserInfo>();
  const kakaoCode = searchParams.get("code");
  const fetchUserInfo = async () => {
    if (!kakaoCode) return;

    try {
      const response = await axios.get("/users/login/kakao", {
        params: {
          code: kakaoCode,
        },
      });

      return response.data;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        console.log("User Info:", userInfo.result);
      }
      if (userInfo && userInfo.result) {
        setUserData(userInfo.result);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header>프로필 설정</Header>
      {userData ? (
        <ProfileEdit isSender={true} isInvite={false} user={userData} />
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-[#F0FBF0] px-4 text-center text-gray-800">
          <div className="border-opacity-50 h-12 w-12 animate-spin rounded-full border-t-4 border-green-600"></div>
          <div className="text-xl font-semibold">정보를 불러오는 중입니다</div>
          <p className="animate-pulse text-base text-gray-500">
            잠시만 기다려 주세요...
          </p>
        </div>
      )}
      <div className="absolute right-0 bottom-5 left-0 mx-auto flex h-14 w-full items-center justify-center md:w-[375px]">
        <RedBasicButton>저장</RedBasicButton>
      </div>
    </>
  );
};
export default Profile;
