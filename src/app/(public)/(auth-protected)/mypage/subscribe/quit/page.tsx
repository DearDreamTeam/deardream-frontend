"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import RibbonImage from "@/components/images/ribbon-image";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import { PATH } from "@/constants/path";
import { usePlanStore } from "@/stores/usePlanStore";
import { useState } from "react";

const QuitPage = () => {
  const { plan } = usePlanStore();
  const [planType] = useState<"HOME" | "INSTITUTION">(plan.type); // "PERSONAL" | "INSTITUTION" | "NONE"
  const [isActive] = useState(plan.isActive);

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-between p-4 pt-0">
        <Header>구독 해지</Header>
        <div className="overflow-auto-hide-scroll h-full w-full">
          <div className="text-title-2 flex w-full flex-col items-center justify-center gap-2 py-10">
            <RibbonImage />
            <div className="text-label-2 text-center">
              {planType === "HOME" ? (
                <>
                  [개인 플랜] 구독은 소속 기관에서 관리하고 있어요
                  <br />
                  필요시 소식지 제작 및 배송을 중단 할 수 있지만
                  <br />
                  아래 혜택들을 이용할 수 없게 돼요
                  <br />
                  그래도 중단하시겠어요?
                </>
              ) : (
                <>
                  [기관 플랜] 구독은 소속 기관에서 관리하고 있어요
                  <br />
                  필요시 소식지 제작 및 배송을 중단 할 수 있지만
                  <br />
                  아래 혜택들을 이용할 수 없게 돼요
                  <br />
                  그래도 중단하시겠어요?
                </>
              )}
            </div>
          </div>
          <div className="text-headline-3 flex w-full flex-col justify-center gap-2 border-t border-b border-gray-200 py-4">
            {planType === "HOME" ? (
              <>
                개인 플랜
                <PersonalPlanUse isActive={isActive} />
              </>
            ) : (
              <>
                기관 플랜
                <InstitutionPlanUse isActive={isActive} />
              </>
            )}
          </div>
          <div className="text-body-2 text-grey-300 grey-0space-normal">
            {planType === "HOME" ? (
              <>
                이어드림 서버 최적화를 위해, 소식함 속 PDF는 구독 취소 후 14일
                간 이용 가능하며, 이후 삭제돼요.
              </>
            ) : (
              <>
                소식지 제작이 잠시 중단 되더라도, 현재 소속 기관의 구독이
                해지되지 않으면 언제든 다시 시작 할 수 있어요. 또힌, PDF 열람 및
                다운로드 기능은 그대로 유지돼요.
              </>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2">
          <GreenBasicButton color="300" link={PATH.MYPAGE}>
            계속 소식지 받아오기
          </GreenBasicButton>
          <GreenBasicButton
            color="100"
            link={PATH.MYPAGE + "/subscribe/quit/complete"}
          >
            <span className="text-green-300">소식지 그만받기</span>
          </GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default QuitPage;
