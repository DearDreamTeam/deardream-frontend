"use client";

import Header from "@/components/common/header";
import { useEffect, useState } from "react";

type PlanTypeInfo = "HOME" | "INSTITUTION" | "NONE";

import { useRouter } from "next/navigation";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";
import { PATH } from "@/constants/path";
import { usePlanStore } from "@/stores/usePlanStore";

const SubScribePage = () => {
  const { plan } = usePlanStore();

  const [isActive] = useState(plan.isActive);
  const router = useRouter();

  const [planType, setPlanType] = useState<PlanTypeInfo>(plan.type);

  useEffect(() => {
    if (!plan.isActive) {
      router.push(PATH.SUBSCRIBE);
      return;
    }
    setPlanType(plan.type);
  }, [plan.type, router, plan.isActive]);

  return (
    <>
      <div className="bg-grey-0 overflow-auto-hide-scroll relative flex h-full w-full flex-col items-center p-4 pt-0">
        <div className="flex w-full flex-col items-center">
          <Header>나의 정기 구독</Header>
          <div className="border-grey-200 relative w-screen max-w-[768px] border-b-1 border-solid p-4">
            <div className="flex items-center gap-2">
              {isActive ? (
                <label className="text-title-2 rounded bg-green-100 px-2 py-1 text-green-300">
                  활성화
                </label>
              ) : (
                <label className="text-title-2 text-grey-400 bg-grey-100 rounded px-2 py-1">
                  비활성화
                </label>
              )}
              {planType === "HOME" ? (
                <span className="text-title-2 text-grey-700">개인 플랜</span>
              ) : planType === "INSTITUTION" ? (
                <span className="text-title-2 text-grey-700">기관 플랜</span>
              ) : (
                <span className="ttext-title-2 text-grey-700">구독 없음</span>
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
          <div className="text-title-2 flex h-full w-full flex-col">
            <div className="flex flex-col gap-2 py-2">
              <div className="text-label-1 text-grey-400">구독</div>
              <div className="flex flex-col gap-5">
                <div
                  className="text-title-2 text-grey-700 cursor-pointer"
                  onClick={() => router.push("/mypage/subscribe/address")}
                >
                  주소 변경
                </div>
                <div
                  className="text-title-2 text-grey-800 cursor-pointer"
                  onClick={() => router.push("/mypage/subscribe/quit")}
                >
                  구독 해지
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubScribePage;
