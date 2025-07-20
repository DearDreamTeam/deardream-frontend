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
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import SenderProfileEdit from "@/components/profile/sender-profile-edit";
import Loading from "@/components/loading-fallback/loading";

//경로 상수
import { PATH } from "@/constants/path";

//카카오 로그인
import { kakaoLogin } from "@/lib/kakao-login";

const ProfileClient = () => {
  //카카오 로그인 코드 추출
  const searchParams = useSearchParams();
  const kakaoCode = searchParams.get("code");

  //초대 코드 추출
  const familylink = searchParams.get("state");

  //전역 상태 관리
  const { setUserKaKaoInfo, updateUserProfile, userProfile } = useUserStore();
  const { familyLink, setFamilyLink } = useInvitationStore();

  //프로필 등록 상태 관리
  const [editUserProfile, setEditUserProfile] = useState(userProfile);
  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);

  //로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  //라우터
  const router = useRouter();

  //프로필 등록 유효성 검사
  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    (familylink ? !editUserProfile?.relation?.trim() : false);

  //프로필 이미지 선택 상태 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //초대 코드 저장
  useEffect(() => {
    if (familylink) setFamilyLink(familylink);
  }, [familylink]);

  //카카오 로그인 처리
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!kakaoCode) {
        setIsLoading(false); // 코드 없으면 바로 끝냄
        return;
      }

      try {
        await kakaoLogin(kakaoCode, setUserKaKaoInfo, updateUserProfile);
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false); // 로그인 요청 완료 후 로딩 종료
      }
    };

    fetchUserInfo();
  }, [kakaoCode, setUserKaKaoInfo, updateUserProfile]);

  //프로필 정보 수정 할 때마다 전역 상태 관리 프로필 정보 업데이트
  useEffect(() => {
    if (userProfile) {
      setEditUserProfile(userProfile);
    }
  }, [userProfile]);

  //프로필 정보 서버에 저장
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
      alert("프로필 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 등록된 유저는 홈으로
  const shouldRedirect = !isLoading && userProfile?.id !== 0;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(PATH.HOME);
    }
  }, [shouldRedirect, router]);

  // 로딩 조건 체크 ( 로딩 상태 + 사용자 프로필 준비 전 → 렌더링 차단)
  if (isLoading || !userProfile || shouldRedirect) {
    return <Loading />;
  }

  return (
    <>
      {!isLoading ? (
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
              <SenderProfileEdit
                isInvite={Boolean(familyLink)}
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
