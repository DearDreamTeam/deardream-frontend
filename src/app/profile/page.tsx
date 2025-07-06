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
      <ProfileEdit isSender={true} isInvite={false} user={userData} />
      <div className="absolute right-0 bottom-5 left-0 mx-auto flex h-14 w-full items-center justify-center md:w-[375px]">
        <RedBasicButton>저장</RedBasicButton>
      </div>
    </>
  );
};
export default Profile;
