// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import Pencil from "@/public/icons/common/pencil.svg";
import { useEffect, useRef, useState } from "react";
import SenderProfile from "./sender-profile";
import RecieverProfile from "./receiver-profile";
import { useUserStore } from "@/stores/useUserInfoStore";
import Image from "next/image";
import { UserProfile } from "@/types/user-info";

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

const resizeImage = (file: File, maxSize: number): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    const img = new window.Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = maxSize / Math.max(img.width, img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.4)); // 압축 품질
    };

    reader.readAsDataURL(file);
  });
};
interface ProfileEditProps {
  isSender?: boolean; // 프로필 타입을 구분하기 위한 선택적 속성
  isInvite?: boolean; // 초대 프로필 여부
  setEditUserProfile: (profile: UserProfile) => void; // 프로필 업데이트 함수
  editUserProfile: UserProfile; // 현재 편집 중인 프로필
}

// 프로필 편집 컴포넌트
const ProfileEdit = ({
  isSender,
  isInvite,
  // setEditUserProfile,
  // editUserProfile,
}: ProfileEditProps) => {
  //todo: userProfile을 직접 사용하지 않고, editUserProfile을 사용하도록 변경
  const { userKaKaoInfo, userProfile, updateUserProfile } = useUserStore();
  // const [editUserProfile, setEditUserProfile] = useState(userProfile);
  // useEffect(() => {
  //   if (userProfile) {
  //     setEditUserProfile(userProfile);
  //   }
  // }, [userProfile, setEditUserProfile]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(userKaKaoInfo?.profileImage),
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resizedBase64 = await resizeImage(file, 250);
    setImageUrl(resizedBase64);
    console.log("resizedBase64:", resizedBase64);
    console.log("imagefile:", imageUrl);
    updateUserProfile({
      ...(userProfile ?? {}),
      profileImage: resizedBase64,
    });
  };

  useEffect(() => {
    console.log("postUser:", userProfile);
  }, [userProfile]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="relative mt-8 h-[98px] w-[98px]">
          <Image
            src={imageUrl || "/images/default-img.svg"}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
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
        <div className="flex-start text-label-2 flex flex-col gap-2">
          이름
          <input
            type="text"
            className="text-headline-3 text-grey-700 placeholder:text-grey-300 border-grey-300 w-80 border-b-1 border-solid py-2 focus:ring-0 focus:outline-none"
            placeholder="이름을 입력해주세요"
            value={userProfile?.name}
            onChange={(e) =>
              updateUserProfile({
                ...userProfile,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex-start text-label-2 flex flex-col gap-2">
          생일
          <BirthSelect
            birth={userProfile.birth}
            calendarType={userProfile.calendarType}
          />
        </div>
        {isSender ? <SenderProfile /> : isInvite ? <RecieverProfile /> : null}
      </div>
    </>
  );
};
export default ProfileEdit;
