// app/page.tsx
"use client";
import SelectModal from "@/components/select/select-modal";
import Arrow from "@/public/icons/back/arrow.svg";
import { useState } from "react";

const Profile = () => {
  const [selected, setSelected] = useState({
    relationship: "부모님", // 기본값 필수
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="absolute inset-0 z-[100] mx-auto flex flex-col rounded-lg bg-[#FCFCFE] shadow-lg md:max-w-[375px]">
        <div className="flex items-center p-4 text-2xl font-semibold">
          <Arrow className="cursor-pointer" />
          프로필 설정
        </div>
        <div className="flex w-full flex-col items-center gap-10 border-t-1 border-solid border-[#EBEBF0]">
          <div className="mt-8 h-[98px] w-[98px] rounded-full bg-blue-400" />
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
            <input
              type="date"
              className="w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              placeholder="날짜를 입력해주세요"
            />
          </div>
          <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
            받는 분과의 관계
            <button
              className="w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-left text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              onClick={() => setIsModalOpen(true)}
            >
              관계를 선택해주세요
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
