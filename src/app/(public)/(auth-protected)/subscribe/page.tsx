"use client";

import Header from "@/components/common/header";
import GreenBasicButton from "@/components/button/green-basic-button";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";
import Check from "@/public/icons/common/check.svg";

import { useReceiverStore } from "@/stores/useReceiverStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { PATH } from "@/constants/path";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const PlanPage = () => {
  const [planType, setPlanType] = useState<"HOME" | "INSTITUTION">("HOME");

  const { setReceiver } = useReceiverStore();
  const { userProfile } = useUserStore();
  const router = useRouter();

  // 하나의 useEffect로 통합
  useEffect(() => {
    if (!userProfile.id) return;
    setReceiver({
      leaderId: userProfile.id,
      address: {
        deliveryType: planType,
        recipientName: "",
        recipientPhone: "",
        postalCode: "",
        address: "",
        addressDetail: "",
        institutionName: "",
        institutionPhone: "",
        code: "",
      },
    });
  }, [planType, userProfile.id, setReceiver]);

  // 버튼 클릭 핸들러
  const handleNext = useCallback(() => {
    router.push(PATH.SUBSCRIBE + "/receiver");
  }, [router]);

  return (
    <div className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between pt-0">
      <Header link={PATH.HOME}>플랜 선택</Header>

      {/* 개인 플랜 */}
      <div className="overflow-auto-hide-scroll h-full w-full">
        <div className="border-grey-200 overflow-auto-hide-scroll mt-3 flex w-full flex-col gap-2 border-b-1 border-solid p-3">
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              onClick={() => setPlanType("HOME")}
              className={`${
                planType === "HOME" ? "bg-green-700" : "bg-grey-500"
              } inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full`}
            >
              <Check />
            </div>
            <span className="text-title-2 text-grey-700">개인 플랜</span>
          </div>
          <PersonalPlanUse isActive={planType === "HOME"} planType="HOME" />
          <div
            className={`text-title-1 ${
              planType === "HOME" ? "text-green-300" : "text-grey-700"
            } w-full text-right`}
          >
            월 8,900원
          </div>
        </div>

        {/* 기관 플랜 */}
        <div className="border-grey-200 mt-3 flex w-full flex-col gap-2 border-b-1 border-solid p-3">
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              onClick={() => setPlanType("INSTITUTION")}
              className={`${
                planType === "INSTITUTION" ? "bg-green-700" : "bg-grey-500"
              } inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full`}
            >
              <Check />
            </div>
            <span className="text-title-2 text-grey-700">기관 플랜</span>
          </div>

          <InstitutionPlanUse
            isActive={planType === "INSTITUTION"}
            planType="INSTITUTION"
          />

          <div
            className={`text-title-1 ${
              planType === "INSTITUTION" ? "text-green-300" : "text-grey-700"
            } w-full text-right`}
          >
            월 0원
          </div>
        </div>
        <div className="text-grey-500 text-label-2 p-3">
          이어드림과 제휴한 기관 (요양시설 등) 의 구성원 분들만 이용할 수 있는
          플랜이에요
        </div>
      </div>

      <div className="m-4 flex h-14 w-full items-center justify-center px-4">
        <GreenBasicButton color="300" onClick={handleNext}>
          저장
        </GreenBasicButton>
      </div>
    </div>
  );
};

export default PlanPage;
