// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import { useEffect, useState } from "react";
import SenderProfile from "./sender-profile";
import { useUserStore } from "@/stores/useUserInfoStore";
import { UserProfileInfo } from "@/types/user-info";
import { formatImageUrl } from "@/utils/format-image-url";
import ProfileNameInput from "./ common/profile-name-input";
import ProfileImageUploader from "./ common/profile-image-uploader";

interface SenderProfileEditProps {
  isInvite?: boolean; // 초대 프로필 여부
  setEditUserProfile?: React.Dispatch<React.SetStateAction<UserProfileInfo>>;
  editUserProfile?: UserProfileInfo; // 현재 편집 중인 프로필
  setSelectedFile?: (file: File | null) => void; // 이미지 파일 설정 함수
}

// 프로필 편집 컴포넌트
const SenderProfileEdit = ({
  isInvite,
  setSelectedFile, // 이미지 파일 설정 함수
  setEditUserProfile,
  editUserProfile,
}: SenderProfileEditProps) => {
  //todo: userProfile을 직접 사용하지 않고, editUserProfile을 사용하도록 변경
  const { userProfile } = useUserStore();

  // 이미지 URL 상태
  // useState의 초기값에 인자를 2개 넘기는 오류 수정
  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(editUserProfile?.profileImage),
  );

  // 프로필 정보가 모두 입력되었는지 확인
  useEffect(() => {
    console.log("postUser:", editUserProfile, userProfile);
  }, [editUserProfile, userProfile]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <ProfileImageUploader
          imageUrl={imageUrl}
          onFileSelect={(file) => {
            setSelectedFile?.(file);
            const reader = new FileReader();
            reader.onloadend = () => setImageUrl(reader.result as string);
            reader.readAsDataURL(file);
          }}
        />
        <ProfileNameInput
          name={editUserProfile?.name || ""}
          onChange={(val) =>
            setEditUserProfile?.((prev) => ({ ...prev, name: val }))
          }
        />
        <div className="flex-start text-label-2 flex flex-col gap-2">
          생일
          <BirthSelect
            birth={editUserProfile?.birth || ""}
            calendarType={editUserProfile?.calendarType}
            setEditUserProfile={setEditUserProfile}
          />
        </div>
        {isInvite && (
          <SenderProfile
            editUserProfile={editUserProfile}
            setEditUserProfile={setEditUserProfile}
          />
        )}
      </div>
    </>
  );
};
export default SenderProfileEdit;
