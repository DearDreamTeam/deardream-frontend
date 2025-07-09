"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { useState } from "react";
const AddressPage = () => {
  const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">(
    "INSTITUTION",
  ); // "PERSONAL" | "INSTITUTION" | "NONE"
  const router = useRouter();
  return (
    <>
      <Header>주소 변경</Header>
      <div className="flex h-full w-full flex-col justify-between p-4">
        <div className="flex w-full flex-col gap-5 p-4">
          <div>
            주소
            <input
              type="text"
              placeholder="기관 건물, 지번 또는 도로명 검색"
              className="border-grey-200 text-label-1 text-grey-700 focus:none w-full border-b p-2 focus:outline-none"
            />
          </div>
          <div>
            상세 주소
            <input
              type="text"
              placeholder="상세 주소를 입력해주세요"
              className="border-grey-200 text-label-1 text-grey-700 focus:none w-full border-b p-2 focus:outline-none"
            />
          </div>
          {planType === "INSTITUTION" && (
            <>
              <div>
                기관 주소
                <input
                  type="text"
                  placeholder="기관 주소를 입력해주세요"
                  className="border-grey-200 text-label-1 text-grey-700 focus:none w-full border-b p-2 focus:outline-none"
                />
              </div>
            </>
          )}
          <div>
            받는 분
            <input
              type="text"
              placeholder="받는 분의 이름을 입력해주세요"
              className="border-grey-200 text-label-1 text-grey-700 focus:none w-full border-b p-2 focus:outline-none"
            />
          </div>
          <div>
            연락처
            <input
              type="text"
              placeholder="연락처를 입력해주세요"
              className="border-grey-200 text-label-1 text-grey-700 focus:none w-full border-b p-2 focus:outline-none"
            />
          </div>
        </div>
        <div
          className="mb-15"
          onClick={() => router.push("/mypage/subscribe/plan/complete")}
        >
          <GreenBasicButton>저장</GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default AddressPage;
