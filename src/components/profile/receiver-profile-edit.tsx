// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import { useState } from "react";

import { formatImageUrl } from "@/utils/format-image-url";
import ProfileNameInput from "./ common/profile-name-input";
import ProfileImageUploader from "./ common/profile-image-uploader";
import { ReceiverProfileInfo } from "@/stores/useReceiverStore";
import ReceiverProfile from "./receiver-profile";

interface ReceiverProfileEditProps {
  isInvite?: boolean; // 초대 프로필 여부
  setEditReceiverProfile?: React.Dispatch<
    React.SetStateAction<ReceiverProfileInfo>
  >;
  editReceiverProfile?: ReceiverProfileInfo; // 현재 편집 중인 프로필
  setSelectedFile?: (file: File | null) => void; // 이미지 파일 설정 함수
}

// 프로필 편집 컴포넌트
const ReceiverProfileEdit = ({
  setSelectedFile, // 이미지 파일 설정 함수
  setEditReceiverProfile,
  editReceiverProfile,
}: ReceiverProfileEditProps) => {
  //todo: userProfile을 직접 사용하지 않고, editUserProfile을 사용하도록 변경

  // 이미지 URL 상태
  // useState의 초기값에 인자를 2개 넘기는 오류 수정
  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(editReceiverProfile?.profileImage),
  );

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
          name={editReceiverProfile?.name || ""}
          onChange={(val) =>
            setEditReceiverProfile?.((prev) => ({ ...prev, name: val }))
          }
        />
        <div className="flex-start text-label-2 flex flex-col gap-2">
          생일
          <BirthSelect
            birth={editReceiverProfile?.birth || ""}
            calendarType={editReceiverProfile?.calendarType}
            setEditReceiverProfile={setEditReceiverProfile}
          />
        </div>
        <ReceiverProfile
          setEditReceiverProfile={setEditReceiverProfile}
          editReceiverProfile={editReceiverProfile}
        />
      </div>
    </>
  );
};
export default ReceiverProfileEdit;
