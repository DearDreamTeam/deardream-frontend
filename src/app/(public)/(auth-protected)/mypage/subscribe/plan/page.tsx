"use client";

import Header from "@/components/common/header";
import { useEffect, useState } from "react";
import Check from "@/public/icons/common/check.svg"; // Assuming you have a green check icon
import GreenBasicButton from "@/components/button/green-basic-button";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";

import type { FC } from "react";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { PATH } from "@/constants/path";

const PlanPage: FC = () => {
  const [planType, setPlanType] = useState<"HOME" | "INSTITUTION" | "NONE">(
    "HOME",
  ); // "PERSONAL" | "INSTITUTION" | "NONE"
  const { receiver, setReceiver } = useReceiverStore();
  const { userProfile } = useUserStore();

  useEffect(() => {
    setReceiver({
      address: {
        ...receiver.address,
        deliveryType: planType,
      },
    });
  }, [planType, setReceiver]);

  useEffect(() => {
    setReceiver({
      leaderId: userProfile.id,
    });
  }, [userProfile, setReceiver]);

  return (
    <div className="bg-grey-0 overflow-auto-hide-scroll relative flex h-full w-full flex-col items-center justify-between p-4 pt-0">
      <div>
        <Header link={PATH.HOME}>플랜 재구독</Header>
        <div className="border-grey-200 mt-3 flex w-full flex-col justify-center gap-2 border-b-1 border-solid p-3">
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              onClick={() => setPlanType("HOME")}
              className={`${planType === "HOME" ? "bg-green-700" : "bg-grey-500"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
            >
              <Check />
            </div>
            <span className="text-title-2 text-grey-700">개인 플랜</span>
          </div>

          <PersonalPlanUse isActive={planType == "HOME"} planType={planType} />

          <div
            className={`text-title-1 ${planType == "HOME" ? "text-green-300" : "text-grey-700"} w-full text-right`}
          >
            월 8,900원
          </div>
        </div>

        <div className="border-grey-200 mt-3 flex w-full flex-col justify-center gap-2 border-b-1 border-solid p-3">
          <div className="text-headline-3 text-grey-400 flex items-center gap-2">
            <div
              onClick={() => setPlanType("INSTITUTION")}
              className={`${planType === "INSTITUTION" ? "bg-green-700" : "bg-grey-500"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
            >
              <Check />
            </div>
            <span className="text-title-2 text-grey-700">기관 플랜</span>
          </div>
          <InstitutionPlanUse
            isActive={planType == "INSTITUTION"}
            planType={planType}
          />
          <div
            className={`text-title-1 ${planType == "INSTITUTION" ? "text-green-300" : "text-grey-700"} w-full text-right`}
          >
            월 0원
          </div>
        </div>
        <div className="text-grey-500 text-label-2 p-3">
          이어드림과 제휴한 기관 (요양시설 등) 의 구성원 분들만 이용할 수 있는
          플랜이에요
        </div>
      </div>
      <GreenBasicButton color="300" link={PATH.SUBSCRIBE_PLAN + "/address"}>
        저장
      </GreenBasicButton>
    </div>
  );
};
export default PlanPage;

// {isActive && planType === "INSTITUTION" && (
//   <div className="text-grey-500 text-label-2 p-3">
//     이어드림과 제휴한 기관 (요양시설 등) 의 구성원 분들만 이용할 수 있는
//     플랜이에요
//   </div>
// )}
