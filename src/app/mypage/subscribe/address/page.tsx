"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import { PATH } from "@/constants/path";
import { useState } from "react";
const AddressPage = () => {
  const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-between bg-white p-4">
        <Header>주소 변경</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          <div className="text-grey-500 flex w-full flex-col gap-10">
            <div className="flex w-full flex-col gap-2">
              주소
              <input
                type="text"
                placeholder="기관 건물, 지번 또는 도로명 검색"
                className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="상세 주소를 입력해주세요"
                className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
              />
            </div>
            {planType === "INSTITUTION" && (
              <>
                <div>
                  기관 주소
                  <input
                    type="text"
                    placeholder="기관 주소를 입력해주세요"
                    className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
                  />
                </div>
              </>
            )}
            <div>
              받는 분
              <input
                type="text"
                placeholder="받는 분의 이름을 입력해주세요"
                className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
              />
            </div>
            <div>
              연락처
              <input
                type="text"
                placeholder="연락처를 입력해주세요"
                className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton link={PATH.MYPAGE + "/subscribe/address/complete"}>
            저장
          </GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default AddressPage;
