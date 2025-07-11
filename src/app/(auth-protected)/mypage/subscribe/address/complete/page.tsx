"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Result from "@/components/result/result";
import { PATH } from "@/constants/path";

const CompletePage = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2 p-4">
        <Result
          title="주소 변경 완료!"
          description="주소가 성공적으로 변경되었어요"
          description2="새 주소로 받아보실 소식을 남기러 가볼까요?"
        />
        <GreenBasicButton link={PATH.LETTER_LIST}>
          소식 남기러 가기
        </GreenBasicButton>
      </div>
    </>
  );
};
export default CompletePage;
