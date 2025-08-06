"use client";

import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import { PATH } from "@/constants/path";

const FamilyCreationPage = () => {
  return (
    <div className="overflow-auto-hide-scroll flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      (
      <>
        <Result
          title="가족 생성이 완료되었어요"
          description="추가 정보를 입력해주세요"
          imageType="family"
        />
        <GreenBasicButton color="300" link={PATH.RELATION}>
          정보 입력하러 가기
        </GreenBasicButton>
        <GreenBasicButton color="100" link={PATH.HOME} newTab={true}>
          <span className="text-green-300">나중에 입력하기</span>
        </GreenBasicButton>
      </>
    </div>
  );
};

export default FamilyCreationPage;
