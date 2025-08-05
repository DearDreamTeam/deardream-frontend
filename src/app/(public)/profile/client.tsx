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

//타입
import { AxiosError } from "axios";

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

  //프로필 서버 전달 상태
  const [message, setMessage] = useState<string>("");

  //초대 코드 저장
  useEffect(() => {
    if (familylink) setFamilyLink(familylink);
  }, [familylink, setFamilyLink]);

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
        setMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        localStorage.clear();
        window.location.href = PATH.LOGIN;
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
      setIsLoading(true);
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
      }
      router.push(PATH.HOME);
    } catch (error: unknown) {
      console.error("프로필 등록 실패:", error);
      if (error instanceof AxiosError && error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("관리자에게 문의해주세요.");
      }
    }
  };

  const [hasNavigated, setHasNavigated] = useState(false);

  // 리다이렉션 처리 (가입된 유저만)
  useEffect(() => {
    if (!isLoading && userProfile && !hasNavigated && userProfile.id > 0) {
      setHasNavigated(true);
      if (familyLink && !userProfile.familyRegistered) {
        router.replace(PATH.RELATION + "?familyLink=" + familyLink);
      } else {
        router.replace(PATH.HOME);
      }
    }
  }, [isLoading, userProfile, familyLink, hasNavigated, router]);

  // 아직 로딩 중이거나, userProfile이 없거나, 리다이렉트 중이면 <Loading />
  if (isLoading || !userProfile || hasNavigated) {
    return <Loading />;
  }

  // 아직 프로필 등록 전인 상태 (id === 0)이면 폼 보여줌
  if (userProfile.id === 0) {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitProfile();
          }}
          className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
        >
          <div>
            <Header>프로필 설정</Header>
            <SenderProfileEdit
              isInvite={Boolean(familylink)}
              setEditUserProfile={setEditUserProfile}
              editUserProfile={editUserProfile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <div className="flex h-14 w-full items-center justify-center">
            <GreenBasicButton disabled={isProfileIncomplete || isLoading}>
              {isLoading ? "등록 중..." : "저장"}
            </GreenBasicButton>
          </div>
        </form>
        {message && (
          <AlertDialog
            title="프로필 등록 실패"
            content={message}
            setIsOpen={() => setMessage("")}
            onAction={() => {
              window.location.href = PATH.LOGIN;
            }}
          />
        )}
      </>
    );
  }

  // 혹시나 잘못된 상태면 fallback 처리
  return <Loading />;
};

export default ProfileClient;
