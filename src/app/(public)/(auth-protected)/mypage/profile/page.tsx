// app/page.tsx
"use client";
//react
import { useState } from "react";
//stores
import { useUserStore } from "@/stores/useUserInfoStore";
import { updateProfile } from "@/api/profile";
import { AxiosError } from "axios";
//components
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import SenderProfileEdit from "@/components/profile/sender-profile-edit";

const Profile = () => {
  // 유저 정보 전역 상태
  const { userProfile, updateUserProfile } = useUserStore();
  // 편집 중인 프로필 정보
  const [editUserProfile, setEditUserProfile] = useState(userProfile);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 저장 완료 상태
  const [showAlert, setShowAlert] = useState(false);
  // 저장 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 프로필 수정 실패 상태
  const [message, setMessage] = useState("");

  // 프로필 정보 유효성 검사
  const isProfileIncomplete =
    !editUserProfile?.name?.trim() || !editUserProfile?.birth?.trim();

  //프로필 업데이트
  const handleSave = async () => {
    if (isProfileIncomplete) {
      alert("이름과 생일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateProfile(editUserProfile, selectedFile);
      console.log("프로필 업데이트 성공:", response.data);
      if (response.data.isSuccess) {
        console.log("프로필 업데이트 성공:", response.data);
        setShowAlert(true);
      }
      if (response.data.result.profileImage) {
        const updatedProfile = {
          ...editUserProfile,
          profileImage: response.data.result.profileImage,
        };
        // 프로필 정보 업데이트
        setEditUserProfile(updatedProfile); //로컬
        updateUserProfile(updatedProfile); //전역
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          setMessage(error.response?.data.message);
        } else if (error.response?.status === 413) {
          setMessage("이미지 파일 크기가 너무 큽니다.");
        } else if (error.response?.status === 415) {
          setMessage("이미지 파일 형식이 올바르지 않습니다.");
        } else {
          setMessage("이미지 파일은 1MB 이하 제한입니다.");
        }
      } else {
        setMessage("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isProfileIncomplete || isLoading) {
            return;
          }
          handleSave(); // 이 함수 안에서 유효성 검사 + axios 처리
        }}
        className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        <div>
          <Header>내 정보 수정</Header>
          <SenderProfileEdit
            isInvite={userProfile.familyRegistered}
            setEditUserProfile={setEditUserProfile}
            editUserProfile={editUserProfile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <GreenBasicButton disabled={isProfileIncomplete || isLoading}>
          {isLoading ? "저장 중..." : "저장"}
        </GreenBasicButton>
      </form>
      {showAlert && (
        <AlertDialog
          title="프로필 수정이 완료되었습니다."
          content=""
          setIsOpen={setShowAlert}
          onAction={() => {
            window.location.href = "/mypage";
          }}
        />
      )}
      {message && (
        <AlertDialog
          title="프로필 수정 실패"
          content={message}
          setIsOpen={() => setMessage("")}
        />
      )}
    </>
  );
};
export default Profile;
