"use client";

import Header from "@/components/common/header";
import { useState } from "react";

type PlanTypeInfo = "PERSONAL" | "INSTITUTION" | "NONE";

import { useRouter } from "next/navigation";
import PersonalPlanUse from "@/components/profile/plan/personal-plan-use";
import InstitutionPlanUse from "@/components/profile/plan/institution-plan-use";

const SubScribePage = () => {
  const [isActive] = useState(true);
  const [planType] = useState<PlanTypeInfo>("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"
  const router = useRouter();
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center bg-white p-4 pt-0">
        <Header>나의 정기 구독</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          <div className="border-grey-200 relative border-b-1 border-solid pb-2">
            <div className="my-2 flex items-center gap-2">
              {isActive ? (
                <label className="text-title-2 rounded bg-green-100 px-2 py-1 text-green-300">
                  활성화
                </label>
              ) : (
                <label className="text-title-2 text-grey-400 bg-grey-100 rounded px-2 py-1">
                  비활성화
                </label>
              )}
              {planType === "PERSONAL" ? (
                <span className="text-title-2 text-grey-700">개인 플랜</span>
              ) : planType === "INSTITUTION" ? (
                <span className="text-title-2 text-grey-700">기관 플랜</span>
              ) : (
                <span className="ttext-title-2 text-grey-700">구독 없음</span>
              )}
            </div>
            {isActive &&
              (planType === "PERSONAL" ? (
                <PersonalPlanUse isActive={isActive} planType={planType} />
              ) : (
                <InstitutionPlanUse isActive={isActive} planType={planType} />
              ))}

            <div
              className={`text-title-1 ${isActive ? "text-green-300" : "text-grey-700"} w-full text-right`}
            >
              {isActive
                ? planType === "PERSONAL"
                  ? "월 8,900원"
                  : planType === "INSTITUTION"
                    ? "월 0원"
                    : "구독 없음"
                : planType === "PERSONAL"
                  ? "월 8,900원"
                  : planType === "INSTITUTION"
                    ? "월 0원"
                    : "구독 없음"}
            </div>
          </div>
          {planType === "PERSONAL" && (
            <div className="text-label-1 p-2">2025.09.01 결제 예정</div>
          )}
          <div className="mt-3 flex flex-col gap-2 py-2">
            <div className="text-label-1 text-grey-400">구독</div>
            <div className="flex flex-col gap-3">
              <div
                className="text-title-2 cursor-pointer"
                onClick={() => router.push("/mypage/subscribe/address")}
              >
                주소 변경
              </div>
              <div
                className="text-title-2 cursor-pointer"
                onClick={() => router.push("/mypage/subscribe/plan")}
              >
                플랜 변경
              </div>
              <div
                className="text-title-2 cursor-pointer"
                onClick={() => router.push("/mypage/subscribe/quit")}
              >
                구독 해지
              </div>
              <div
                className="text-title-2 cursor-pointer"
                onClick={() => router.push("/mypage/payhistory")}
              >
                결제 내역
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubScribePage;
