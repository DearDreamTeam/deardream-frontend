"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//전역 상태 관리
import { useUserStore } from "@/stores/useUserInfoStore";
import { useInvitationStore } from "@/stores/useInvitationStore";

//프로필 등록 api
import { registerUser } from "@/api/profile";

//컴포넌트
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import GreenBasicButton from "@/components/button/profile-green-basic-button";

//경로 상수
import { PATH } from "@/constants/path";
import Loading from "@/components/loading-fallback/loading";
import { kakaoLogin } from "@/lib/kakao-login";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

const ProfileClient = () => {
  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get("code");
  const familylink = searchParams.get("state");

  const { setUserKaKaoInfo, updateUserProfile, userKaKaoInfo, userProfile } =
    useUserStore();

  const { familyLink, setFamilyLink } = useInvitationStore();

  const [editUserProfile, setEditUserProfile] = useState(userProfile);
  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);

  const router = useRouter();

  //프로필 등록 유효성 검사
  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    (familylink ? !editUserProfile?.relation?.trim() : false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (familylink) setFamilyLink(familylink);
  }, [familylink]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!kakaoCode) return;
      try {
        await kakaoLogin(kakaoCode, setUserKaKaoInfo, updateUserProfile);
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchUserInfo();
  }, [kakaoCode, setUserKaKaoInfo, updateUserProfile]);

  useEffect(() => {
    if (userProfile) {
      setEditUserProfile(userProfile);
    }
  }, [userProfile]);

  const handleSubmitProfile = async () => {
    if (isProfileIncomplete) {
      alert("이름과 생일을 입력해주세요.");
      return;
    }

    try {
      const response = await registerUser(
        editUserProfile,
        selectedFile,
        familylink,
      );
      console.log("프로필 등록 성공:", response.data);

      if (response.status === 200) {
        localStorage.setItem(
          "accessToken",
          response.data.result.accessToken || "",
        );
        localStorage.setItem(
          "refreshToken",
          response.data.result.refreshToken || "",
        );
        setIsProfileSubmitted(true);
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
    if (userProfile?.id != 0) {
      console.log(userProfile.id);
      console.log("실제로 반영된 userProfile:", userProfile);
      window.location.href = "/home";
    }
  }, [userProfile]);

  return (
    <>
      {userKaKaoInfo ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitProfile(); // 이 함수 안에서 유효성 검사 + axios 처리
            }}
            className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
          >
            <div>
              <Header>프로필 설정</Header>
              <ProfileEdit
                isSender={true}
                isInvite={userProfile.familyId || familyLink ? true : false}
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
          </form>
        </>
      ) : (
        <Loading />
      )}
      {isProfileSubmitted && (
        <AlertDialog
          title="프로필 등록 완료"
          content="프로필이 성공적으로 등록 되었습니다."
          setIsOpen={setIsProfileSubmitted}
          onAction={() => {
            router.push(PATH.HOME);
          }}
        />
      )}
    </>
  );
};

export default ProfileClient;
