// app/page.tsx
"use client";
import { updateProfile } from "@/api/profile";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useState } from "react";

const Profile = () => {
  const { userProfile, updateUserProfile } = useUserStore();
  const [editUserProfile, setEditUserProfile] = useState(userProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() || !editUserProfile?.birth?.trim();

  const handleSave = async () => {
    // 여기에 프로필 저장 로직을 추가합니다.
    console.log("저장할 프로필 정보:", editUserProfile, selectedFile);
    // 예: await updateProfile(editUserProfile, selectedFile);
    if (isProfileIncomplete) {
      alert("이름과 생일을 입력해주세요.");
      return;
    }

    try {
      const response = await updateProfile(editUserProfile, selectedFile);
      console.log("프로필 업데이트 성공:", response.data);
      updateUserProfile(editUserProfile); // 상태 업데이트
      window.location.href = "/mypage";
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(); // 이 함수 안에서 유효성 검사 + axios 처리
        }}
        className="bg-grey-0 relative flex h-screen w-full flex-col items-center justify-between p-4 pt-0"
      >
        <div>
          <Header>내 정보 수정</Header>
          <ProfileEdit
            isSender={true}
            isInvite={false}
            setEditUserProfile={setEditUserProfile}
            editUserProfile={editUserProfile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton>저장</GreenBasicButton>
        </div>
      </form>
    </>
  );
};
export default Profile;
