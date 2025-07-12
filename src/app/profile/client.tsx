"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserInfoStore";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import { registerUser } from "@/api/profile";

const ProfileClient = () => {
  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get("code");

  const { setUserKaKaoInfo, updateUserProfile, userKaKaoInfo, userProfile } =
    useUserStore();

  const [editUserProfile, setEditUserProfile] = useState(userProfile);

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() || !editUserProfile?.birth?.trim();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!kakaoCode) return;
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await axios.get(API_URL + "/users/login/kakao", {
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

        //프로필 저장이 않은 경우
        localStorage.setItem("tempToken", tempToken);
        //이미 프로필이 있다면 accessToken, refreshToken 저장
        if (newAccessToken && newRefreshToken) {
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          console.log("액세스 토큰 저장:", newAccessToken);
          const res = await axiosInstance.get("/v1/users/me");
          console.log("사용자 정보:", res.data.result);
          // 사용자 정보가 있다면 상태에 저장
          updateUserProfile({
            id: res.data.result.id,
            name: res.data.result.name,
            profileImage: res.data.result.profileImage,
            birth: res.data.result.birth,
            calendarType: res.data.result.calendarType,
            relation: res.data.result.relation,
            otherRelation: res.data.result.otherRelation,
            familylink: res.data.result.familylink,
            familyRegistered: res.data.result.familyRegistered,
            role: res.data.result.role,
          });

          return;
        }
        //카카오에서 받은 사용자 정보를 상태에 저장 처음 로그인시 temp 이미 프로필이 있다면 accessToken, refreshToken 저장

        setUserKaKaoInfo({
          tempToken,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          registered,
          familyRegistered,
          email,
          name,
          profileImage,
        });

        // 사용자 프로필 정보 설정
        updateUserProfile({
          name,
          profileImage,
        });
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        window.location.href = "/login";
      }
    };

    fetchUserInfo();
  }, [kakaoCode, setUserKaKaoInfo, updateUserProfile]);

  useEffect(() => {
    setEditUserProfile(userProfile);
  }, [userProfile]);

  const handleSubmitProfile = async () => {
    if (isProfileIncomplete) {
      alert("이름과 생일을 입력해주세요.");
      return;
    }

    try {
      const response = await registerUser(editUserProfile, selectedFile);
      console.log("프로필 업데이트 성공:", response.data);
      window.location.href = "/home";
      if (response.status === 200) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("프로필 등록 실패:", error);
    }
  };

  useEffect(() => {
    if (!userProfile) {
      console.log("사용자 프로필이 아직 설정되지 않았습니다.");
      return;
    }
    if (userProfile?.id != "") {
      console.log(userProfile.id);
      console.log("실제로 반영된 userProfile:", userProfile);
      window.location.href = "/home";
    }
  }, [userProfile]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitProfile(); // 이 함수 안에서 유효성 검사 + axios 처리
        }}
        className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        {userKaKaoInfo ? (
          <>
            <div>
              <Header>프로필 설정</Header>
              <ProfileEdit
                isSender={false}
                isInvite={false}
                setEditUserProfile={setEditUserProfile}
                editUserProfile={editUserProfile}
                setSelectedFile={setSelectedFile}
              />
            </div>
            <div className="flex h-14 w-full items-center justify-center">
              <GreenBasicButton disabled={isProfileIncomplete}>
                저장
              </GreenBasicButton>
            </div>
          </>
        ) : (
          <div className="text-grey-800 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-green-100 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-green-600"></div>
            <div className="text-xl font-semibold">
              정보를 불러오는 중입니다
            </div>
            <p className="text-grey-500 animate-pulse text-base">
              잠시만 기다려 주세요...
            </p>
          </div>
        )}
      </form>
    </>
  );
};

export default ProfileClient;
