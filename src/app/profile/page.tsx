// app/page.tsx
"use client";
import Arrow from "@/public/icons/back/arrow.svg";

const Profile = () => {
  return (
    <>
      <div className="absolute inset-0 z-[100] mx-auto flex rounded-lg bg-[#FCFCFE] shadow-lg md:max-w-[375px]">
        <div className="absolute top-4 flex items-center text-lg font-semibold">
          <Arrow className="cursor-pointer" />
          프로필 설정
        </div>
        <div className="mt-12 flex w-full flex-col items-center border-t-1 border-solid border-[#EBEBF0]">
          <div className="mt-4 h-[98px] w-[98px] rounded-full bg-blue-400" />
          이름
          <input
            type="text"
            className="mt-2 w-[280px] rounded-md border border-solid border-[#EBEBF0] bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="이름을 입력해주세요"
          />
          생일
          <input
            type="date"
            className="mt-2 w-[280px] rounded-md border border-solid border-[#EBEBF0] bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="생일을 입력해주세요"
          />
          받는 분 과의 관계
          <input
            type="text"
            className="mt-2 w-[280px] rounded-md border border-solid border-[#EBEBF0] bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="받는 분과의 관계를 입력해주세요"
          />
        </div>
        <div className="absolute right-0 bottom-5 left-0 mx-auto inline-flex h-14 w-[90%] items-center justify-center gap-2.5 rounded bg-rose-500 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="text-center text-lg leading-loose font-semibold text-white">
            초대 수락하기
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
