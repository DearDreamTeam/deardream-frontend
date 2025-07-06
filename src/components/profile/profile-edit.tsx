// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import Pencil from "@/public/icons/common/pencil.svg";
import { useRef, useState } from "react";
import SenderProfile from "./sender-profile";
import RecieverProfile from "./receiver-profile";
export interface UserInfo {
  accessToken: string;
  email: string;
  name: string;
  profileImage: string;
  refreshToken: string;
}
interface ProfileEditProps {
  isSender?: boolean; // 프로필 타입을 구분하기 위한 선택적 속성
  isInvite?: boolean; // 초대 프로필 여부
  user?: UserInfo; // 사용자 정보
}

const formatImageUrl = (url?: string): string => {
  const kakaoDefaultImage =
    "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg";

  const cleanedUrl = url?.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (!cleanedUrl || cleanedUrl === kakaoDefaultImage) {
    console.log("default image url");
    return "/images/defaultImg.svg";
  }

  return cleanedUrl;
};

const ProfileEdit = ({ isSender, isInvite, user }: ProfileEditProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(user?.profileImage),
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="relative mt-8 h-[98px] w-[98px]">
          <img
            src={imageUrl || "/images/defaultImg.svg"}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
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
            className="absolute right-0 bottom-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[40px] bg-green-700 p-1"
          >
            <Pencil />
          </div>
        </div>
        <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
          이름
          <input
            type="text"
            className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
            placeholder="이름을 입력해주세요"
            value={user?.name}
          />
        </div>
        <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
          생일
          <BirthSelect />
        </div>
        {isSender ? isInvite && <SenderProfile /> : <RecieverProfile />}
      </div>
    </>
  );
};
export default ProfileEdit;
