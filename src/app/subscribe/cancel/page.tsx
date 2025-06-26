// app/page.tsx
"use client";
import GrayBasicButton from "@/components/button/gray-basic-button";
import RedBasicButton from "@/components/button/red-basic-button";
import Header from "@/components/common/header";
const Cancel = () => {
  return (
    <>
      <Header>구독 해지하기 </Header>
      <div className="relative flex h-full w-full justify-center">
        <div className="relative flex h-full w-full flex-col gap-4 px-6 pt-6">
          <div className="text-xl leading-loose font-semibold text-neutral-900">
            정말 구독을 해지하시겠어요?
          </div>

          <p className="text-base leading-normal font-normal text-zinc-600">
            해지하시면 다음 달부터 월 8,900원의 결제가 중단되며, 더 이상
            이어드림 소식지가 발송되지 않습니다.
          </p>
        </div>
        <div className="absolute bottom-20 flex w-96 flex-col gap-4 rounded-[5px] bg-white p-4">
          <GrayBasicButton>기관에서 받고 싶어요(무료)</GrayBasicButton>
          <RedBasicButton>주소를 바꾸고 싶어요</RedBasicButton>
        </div>
      </div>
    </>
  );
};
export default Cancel;
