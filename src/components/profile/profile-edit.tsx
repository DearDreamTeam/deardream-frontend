// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import Pencil from "@/public/icons/common/pencil.svg";
import { useEffect, useRef, useState } from "react";
import SenderProfile from "./sender-profile";
import RecieverProfile from "./receiver-profile";
import { useUserStore } from "@/stores/useUserInfoStore";
import Image from "next/image";
import { UserProfileInfo } from "@/types/user-info";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";

// 이미지 URL을 포맷팅하는 함수
const formatImageUrl = (url?: string): string => {
  const kakaoDefaultImage =
    "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg";

  const cleanedUrl = url?.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (!cleanedUrl || cleanedUrl === kakaoDefaultImage) {
    console.log("default image url");
    return "/images/default-img.svg";
  }

  return cleanedUrl;
};

interface ProfileEditProps {
  isSender?: boolean; // 프로필 타입을 구분하기 위한 선택적 속성
  isInvite?: boolean; // 초대 프로필 여부
  setEditUserProfile?: React.Dispatch<React.SetStateAction<UserProfileInfo>>;
  editUserProfile?: UserProfileInfo; // 현재 편집 중인 프로필
  setEditReceiverProfile?: React.Dispatch<
    React.SetStateAction<ReceiverProfileInfo>
  >;
  editReceiverProfile?: ReceiverProfileInfo; // 현재 편집 중인 수신자 프로
  setSelectedFile?: (file: File | null) => void; // 이미지 파일 설정 함수
}

// 프로필 편집 컴포넌트
const ProfileEdit = ({
  isSender,
  isInvite,
  setSelectedFile, // 이미지 파일 설정 함수
  setEditUserProfile,
  editUserProfile,
  setEditReceiverProfile,
  editReceiverProfile,
}: ProfileEditProps) => {
  //todo: userProfile을 직접 사용하지 않고, editUserProfile을 사용하도록 변경
  const { userProfile } = useUserStore();

  const { receiver } = useReceiverStore();

  const inputRef = useRef<HTMLInputElement>(null);

  // 이미지 URL 상태
  // useState의 초기값에 인자를 2개 넘기는 오류 수정
  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(
      editUserProfile ? editUserProfile.profileImage : receiver?.profileImage,
    ),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setSelectedFile) {
      setSelectedFile(file);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string); // 미리보기 용
    };
    reader.readAsDataURL(file);
  };

  // 프로필 정보가 모두 입력되었는지 확인
  useEffect(() => {
    console.log("postUser:", editUserProfile, userProfile);
  }, [editUserProfile]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="relative mt-8 h-[98px] w-[98px]">
          <Image
            src={imageUrl || "/images/default-img.svg"}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
            onError={() => setImageUrl("/images/default-img.svg")} // 이미지 로드 실패 시 기본 이미지로 설정
          />
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute right-0 bottom-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[40px] bg-green-300 p-1"
          >
            <Pencil />
          </div>
        </div>
        <div className="flex-start text-label-2 text-grey-700 flex flex-col gap-2">
          이름
          <input
            type="text"
            className="text-headline-3 text-grey-700 placeholder:text-grey-300 border-grey-300 w-80 border-b-1 border-solid py-2 focus:ring-0 focus:outline-none"
            placeholder="이름을 입력해주세요"
            value={
              editUserProfile
                ? editUserProfile.name
                : editReceiverProfile?.name || ""
            }
            onChange={(e) => {
              if (setEditUserProfile) {
                setEditUserProfile((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              } else if (setEditReceiverProfile) {
                setEditReceiverProfile((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }
            }}
          />
        </div>
        <div className="flex-start text-label-2 flex flex-col gap-2">
          생일
          <BirthSelect
            birth={
              editUserProfile
                ? editUserProfile.birth
                : editReceiverProfile?.birth || ""
            }
            calendarType={
              editUserProfile
                ? editUserProfile.calendarType
                : editReceiverProfile?.calendarType
            }
            setEditUserProfile={setEditUserProfile}
            setEditReceiverProfile={setEditReceiverProfile}
          />
        </div>
        {isInvite ? (
          <SenderProfile
            editUserProfile={editUserProfile}
            setEditUserProfile={setEditUserProfile}
          />
        ) : isSender ? null : (
          <RecieverProfile
            setEditReceiverProfile={setEditReceiverProfile}
            editReceiverProfile={editReceiverProfile}
          />
        )}
      </div>
    </>
  );
};
export default ProfileEdit;
