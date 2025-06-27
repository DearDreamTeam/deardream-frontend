// app/page.tsx
"use client";
import GrayBasicButton from "@/components/button/gray-basic-button";
import RedBasicButton from "@/components/button/red-basic-button";
import Header from "@/components/common/header";

const Address = () => {
  return (
    <>
      <Header>주소 및 수령 방식</Header>
      <div className="mt-10 flex h-full w-full flex-col items-center">
        <div className="w-full text-center text-xl leading-loose font-semibold text-black">
          수령 방식을 선택해주세요
        </div>
        <div className="flex w-96 flex-col gap-4 rounded-[5px] p-4">
          <GrayBasicButton>가정으로 받고 싶어요</GrayBasicButton>
          <RedBasicButton>기관으로 받고 싶어요</RedBasicButton>
        </div>
      </div>
    </>
  );
};
export default Address;
