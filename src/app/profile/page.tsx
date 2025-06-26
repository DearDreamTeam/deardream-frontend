// app/page.tsx
"use client";
import Header from "@/components/common/header";
import BirthSelect from "@/components/select/birth-select";
import SelectModal from "@/components/select/select-modal";
import Pencil from "@/public/icons/common/pencil.svg";
import { useRef, useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [selected, setSelected] = useState({
    relationship: "", // 기본값 필수
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="absolute inset-0 z-[100] mx-auto flex flex-col rounded-lg bg-[#FCFCFE] shadow-lg md:max-w-[375px]">
        <Header>프로필 설정</Header>
        <div className="flex w-full flex-col items-center gap-10 border-t-1 border-solid border-[#EBEBF0]">
          <div className="relative mt-8 h-[98px] w-[98px]">
            {imageUrl ? (
              <Image
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
          <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
            받는 분과의 관계
            <button
              className="w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-left text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              onClick={() => setIsModalOpen(true)}
            >
              {selected.relationship ? (
                <span className="text-[#1C1C1C]">{selected.relationship}</span>
              ) : (
                <span className="text-[#9A9A9A]">관계를 선택해주세요</span>
              )}
            </button>
          </div>
          {isModalOpen && (
            <SelectModal
              selected={selected}
              setSelected={setSelected}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
        <div className="absolute right-0 bottom-5 left-0 mx-auto inline-flex h-14 w-[90%] items-center justify-center gap-2.5 rounded bg-rose-500 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="text-center text-lg leading-loose font-semibold text-white">
            저장
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
