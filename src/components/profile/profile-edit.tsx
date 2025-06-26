// app/page.tsx
"use client";
import BirthSelect from "@/components/select/birth-select";
import Pencil from "@/public/icons/common/pencil.svg";
import { useRef, useState } from "react";
import SenderProfile from "./sender-profile";
import RecieverProfile from "./receiver-profile";
interface ProfileEditProps {
  isSender?: boolean; // 프로필 타입을 구분하기 위한 선택적 속성
  isInvite?: boolean; // 초대 프로필 여부
}
const ProfileEdit = ({ isSender, isInvite }: ProfileEditProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      <div className="flex w-full flex-col items-center gap-10 border-t-1 border-solid border-[#EBEBF0]">
        <div className="relative mt-8 h-[98px] w-[98px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200" />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute right-0 bottom-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[40px] bg-rose-500 p-1"
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
