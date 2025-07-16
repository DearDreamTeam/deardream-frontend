"use client";

import Header from "@/components/common/header";
import { useState } from "react";
import Check from "@/public/icons/common/check.svg"; // Assuming you have a green check icon
import GreenBasicButton from "@/components/button/green-basic-button";
import { PATH } from "@/constants/path";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";

const PlanPage = () => {
  const [isActive] = useState(true);
  const [planType, setPlanType] = useState<"HOME" | "INSTITUTION" | "NONE">(
    "HOME",
  ); // "HOME" | "INSTITUTION" | "NONE"
  return (
    <div className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0">
      <div>
        <Header>플랜 변경</Header>
        <div className="text-grey-400 border-grey-200 flex w-full flex-col justify-center gap-2 border-b-1 border-solid p-3">
          지금 플랜
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              className={`inline-flex h-[24px] w-[24px] flex-col items-center justify-center rounded-full bg-green-700`}
            >
              <Check />
            </div>
            {planType === "HOME" ? (
              <span className="text-title-2 text-grey-700">개인 플랜</span>
            ) : (
              <span className="text-title-2 text-grey-700">기관 플랜</span>
            )}
          </div>
          {isActive &&
            (planType === "HOME" ? (
              <PersonalPlanUse isActive={isActive} planType={planType} />
            ) : (
              <InstitutionPlanUse isActive={isActive} planType={planType} />
            ))}
          <div
            className={`text-title-1 ${isActive ? "text-green-300" : "text-grey-700"} w-full text-right`}
          >
            {isActive
              ? planType === "HOME"
                ? "월 8,900원"
                : planType === "INSTITUTION"
                  ? "월 0원"
                  : "구독 없음"
              : planType === "HOME"
                ? "월 8,900원"
                : planType === "INSTITUTION"
                  ? "월 0원"
                  : "구독 없음"}
          </div>
        </div>
        {isActive && planType === "INSTITUTION" && (
          <div className="text-grey-500 text-label-2 p-3">
            이어드림과 제휴한 기관 (요양시설 등) 의 구성원 분들만 이용할 수 있는
            플랜이에요
          </div>
        )}
        <div className="text-grey-400 border-grey-200 flex w-full flex-col justify-center gap-2 border-b-1 border-solid p-3">
          다른 플랜
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              onClick={() =>
                setPlanType(planType === "HOME" ? "INSTITUTION" : "HOME")
              }
              className={`bg-grey-500 inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
            >
              <Check />
            </div>
            {planType !== "HOME" ? (
              <span className="text-title-2 text-grey-700">개인 플랜</span>
            ) : (
              <span className="text-title-2 text-grey-700">기관 플랜</span>
            )}
          </div>
          {isActive &&
            (planType !== "HOME" ? (
              <PersonalPlanUse isActive={!isActive} planType={planType} />
            ) : (
              <InstitutionPlanUse isActive={!isActive} planType={planType} />
            ))}
          <div className={`text-title-1 tex-grey-700 w-full text-right`}>
            {isActive && planType !== "HOME" ? "월 8,900원" : "월 0원"}
          </div>
        </div>
        {isActive && planType === "HOME" && (
          <div className="text-grey-500 text-label-2 p-3">
            이어드림과 제휴한 기관 (요양시설 등) 의 구성원 분들만 이용할 수 있는
            플랜이에요
          </div>
        )}
      </div>
      <div className="flex h-14 w-full items-center justify-center">
        <GreenBasicButton
          color="300"
          link={
            planType === "HOME"
              ? PATH.MYPAGE + "/subscribe/plan/pay"
              : PATH.MYPAGE + "/subscribe/plan/complete"
          }
        >
          변경
        </GreenBasicButton>
      </div>
    </div>
  );
};
export default PlanPage;
