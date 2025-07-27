"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import GreenBox from "@/components/mypage/green-box";
import { PATH } from "@/constants/path";
import Check from "@/public/icons/common/check.svg"; // Assuming you have a green check icon
import { useState } from "react";

const PayPage = () => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <>
      <div className="bg-grey-0 flex h-screen w-full flex-col items-center justify-between p-4 pt-0">
        <Header>결제 정보 입력</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          이어드림 월 정기 구독
          <GreenBox text="개인 플랜 구독권">월 8,900원</GreenBox>
          <div className="text-label-2 border-grey-200 text-grey-500 flex w-full justify-between border-b-1 p-3">
            구독 기간
            <span className="text-grey-600">2024.01.01 ~ 2024.01.31</span>
          </div>
          <div className="text-label-2 border-grey-200 text-grey-500 flex w-full justify-between border-b-1 p-3">
            다음 결제일 <span className="text-grey-600">2024.01.31</span>
          </div>
          <div className="text-title-2 mt-4 flex h-full w-full flex-col">
            결제 수단
            <div className="text-title-3 text-grey-800 mt-2 flex w-full items-center gap-2">
              <div
                onClick={() => setIsCheck(!isCheck)}
                className={`${isCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              카카오페이
            </div>
            <span className="text-body-2 text-grey-500 mt-1">
              아직은 카카오페이로만 결제가 가능해요
            </span>
            <div className="text-title-2 text-grey-800 mt-4 flex w-full items-center gap-2">
              <div
                onClick={() => setIsCheck(!isCheck)}
                className={`${isCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              전체 약관 동의
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={() => setIsCheck(!isCheck)}
                className={`${isCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [필수] 가격, 내용 등 상품 저옵에 대한 정기구독 안내를
              확인하였으며, 이에 동의합니다.
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={() => setIsCheck(!isCheck)}
                className={`${isCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [필수] 개인정보 수집 및 이용에 동의합니다.{" "}
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={() => setIsCheck(!isCheck)}
                className={`${isCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [선택] SMS 광고성 정보 수신에 동의합니다{" "}
            </div>
          </div>
        </div>

        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton
            color="300"
            link={PATH.MYPAGE + "/subscribe/plan/pay/complete"}
          >
            결제하기
          </GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default PayPage;
