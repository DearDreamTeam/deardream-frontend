"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Result from "@/components/result/result";
import { PATH } from "@/constants/path";
import { useState } from "react";

const CompletePage = () => {
  const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 p-4">
      {planType === "PERSONAL" ? (
        <Result
          title="구독이 해지되었어요"
          description="앞으로는 소식지를 받아보실 수 없어요."
          description2="소식함에 쌓인 지난 소식지들은"
          description3="구독 해지 후 14일 동안만 이용 가능해요."
          description4="사라지기 전에 미리 다운로드 받아주세요!"
        />
      ) : (
        <Result
          title="소식지 제작이 중단되었어요"
          description="소식지 제작은 잠시 중단되었지만"
          description2="소식함 열람 및 다운로드는 계속 이용하실 수 있어요."
          description3="마이 -> 나의 정기 구독 -> 플랜 관리에서"
          description4="언제든 다시 플랜을 활성화 해주세요!"
        />
      )}
      <GreenBasicButton link={PATH.LETTER_LIST}>
        소식함 보러가기
      </GreenBasicButton>
    </div>
  );
};
export default CompletePage;
