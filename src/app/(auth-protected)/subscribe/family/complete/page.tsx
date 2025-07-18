"use client";
import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import { PATH } from "@/constants/path";

const CompletePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      <Result
        title="가족 생성이 완료되었어요"
        description="지금 바로 첫 소식을 남기러 가볼까요?"
      />
      <GreenBasicButton color="300" link={PATH.LETTER_LIST}>
        소식 남기러 가기
      </GreenBasicButton>
    </div>
  );
};
export default CompletePage;
