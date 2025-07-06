// app/page.tsx
"use client";
import RedBasicButton from "@/components/button/red-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

const Profile = () => {
  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get("code");

  const { setUserInfo, setUserProfile, userInfo } = useUserStore();

  // 카카오 로그인 API 호출 함수
  const fetchUserInfo = async () => {
    if (!kakaoCode) return;

    try {
      const response = await axios.get("/users/login/kakao", {
        params: {
          code: kakaoCode,
        },
      });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("카카오 로그인 성공:", response.data);

      return response.data;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      window.location.href = "/login";
      return null;
    }
  };

  // 사용자 정보를 가져오는 useEffect 훅 처음 실행 될 때만 실행
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserInfo();
      if (userData && userData.result) {
        const { accessToken, refreshToken, email, name, profileImage } =
          userData.result;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setUserInfo({ accessToken, refreshToken, email, name, profileImage });

        setUserProfile({
          name,
          profileImage,
          birth: {
            year: "",
            month: "",
            day: "",
            calendarType: "SOLAR",
          },
          relation: "",
          otherRelation: "",
        });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header>프로필 설정</Header>
      {userInfo ? (
        <ProfileEdit isSender={true} isInvite={false} />
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
