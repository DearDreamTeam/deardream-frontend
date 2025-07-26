"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import GreenBox from "@/components/mypage/green-box";
import axios from "axios";
import Check from "@/public/icons/common/check.svg"; // Assuming you have a green check icon
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "@/stores/usePaymentStore";

const PayPage = () => {
  const { userProfile } = useUserStore();
  const { setTid } = usePaymentStore();

  const [isPaymentCheck] = useState(true);
  // 전체 약관 동의
  const [isAllCheck, setIsAllCheck] = useState(false);
  // 가격, 내용 등 상품 저옵에 대한 정기구독 안내를 확인하였으며, 이에 동의합니다.
  const [isCheck2, setIsCheck2] = useState(false);
  // 개인정보 수집 및 이용에 동의합니다.
  const [isCheck3, setIsCheck3] = useState(false);
  // SMS 광고성 정보 수신에 동의합니다
  const [isCheck4, setIsCheck4] = useState(false);

  const router = useRouter();

  // 결제 가능 여부
  const isAbleSubmit = isPaymentCheck && isCheck2 && isCheck3;

  const today = new Date();

  // 이번 달 (오늘 날짜)
  const formattedCurrentMonth = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

  // 다음 달 같은 날짜
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const formattedNextMonth = `${nextMonth.getFullYear()}. ${nextMonth.getMonth() + 1}. ${nextMonth.getDate()}`;

  // 다음 결제일 (다음 달 + 하루)
  const nextSubscribe = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate() + 1,
  );
  const formattedNextSubscribe = `${nextSubscribe.getFullYear()}. ${nextSubscribe.getMonth() + 1}. ${nextSubscribe.getDate()}`;

  // 전체 약관 동의
  const handleAllCheck = () => {
    setIsAllCheck(!isAllCheck);
    setIsCheck2(true);
    setIsCheck3(true);
    setIsCheck4(true);
  };

  const handleCheck2 = () => {
    setIsCheck2(!isCheck2);
    setIsAllCheck(false);
  };

  const handleCheck3 = () => {
    setIsCheck3(!isCheck3);
    setIsAllCheck(false);
  };

  const handleCheck4 = () => {
    setIsCheck4(!isCheck4);
    setIsAllCheck(false);
  };

  useEffect(() => {
    if (isCheck2 && isCheck3 && isCheck4) {
      setIsAllCheck(true);
    } else {
      setIsAllCheck(false);
    }
  }, [isCheck2, isCheck3, isCheck4]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAbleSubmit) return;
    try {
      console.log(userProfile?.id);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const SECRET_KEY = process.env.NEXT_PUBLIC_KAKAO_PAY_KEY;
      console.log(SECRET_KEY);
      const response = await axios.post(
        API_URL + "/v1/test/payment/ready", // POST body는 없음
        null,
        {
          params: {
            userId: userProfile?.id, // 쿼리스트링 ?userId=123
          },
          headers: {
            Host: "open-api.kakaopay.com",
            Authorization: `SecretKey ${SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        setTid(response.data.result.tid);
        router.push(response.data.result.next_redirect_pc_url);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("이미 구독 중인 상품이 있어요");
        } else if (error.response?.status === 401) {
          alert("로그인 후 이용해주세요");
        } else if (error.response?.status === 403) {
          alert("권한이 없어요");
        } else if (error.response?.status === 404) {
          alert("존재하지 않는 상품이에요");
        }
      }
    }
  };

  return (
    <>
      <form
        className="bg-grey-0 flex h-screen w-full flex-col items-center justify-between p-4 pt-0"
        onSubmit={handleSubmit}
      >
        <Header>결제 정보 입력</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          이어드림 월 정기 구독
          <GreenBox text="개인 플랜 구독권">월 8,900원</GreenBox>
          <div className="text-label-2 border-grey-200 text-grey-500 flex w-full justify-between border-b-1 p-3">
            구독 기간
            <span className="text-grey-600">
              {formattedCurrentMonth} ~ {formattedNextMonth}
            </span>
          </div>
          <div className="text-label-2 border-grey-200 text-grey-500 flex w-full justify-between border-b-1 p-3">
            다음 결제일{" "}
            <span className="text-grey-600">{formattedNextSubscribe}</span>
          </div>
          <div className="text-title-2 mt-4 flex h-full w-full flex-col">
            결제 수단
            <div className="text-title-3 text-grey-800 mt-2 flex w-full items-center gap-2">
              <div
                // onClick={() => setIsPaymentCheck(!isPaymentCheck)}
                className={`${!isPaymentCheck ? "bg-grey-300" : "bg-green-300"} inline-flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
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
                onClick={handleAllCheck}
                className={`${!isAllCheck ? "bg-grey-300" : "bg-green-300"} inline-flex min-h-[24px] min-w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              전체 약관 동의
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={handleCheck2}
                className={`${!isCheck2 ? "bg-grey-300" : "bg-green-300"} inline-flex min-h-[24px] min-w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [필수] 가격, 내용 등 상품 저옵에 대한 정기구독 안내를
              확인하였으며, 이에 동의합니다.
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={handleCheck3}
                className={`${!isCheck3 ? "bg-grey-300" : "bg-green-300"} inline-flex min-h-[24px] min-w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [필수] 개인정보 수집 및 이용에 동의합니다.{" "}
            </div>
            <div className="text-body-2 text-grey-500 grey-0space-normal mt-4 flex w-full items-center gap-2">
              <div
                onClick={handleCheck4}
                className={`${!isCheck4 ? "bg-grey-300" : "bg-green-300"} inline-flex min-h-[24px] min-w-[24px] cursor-pointer flex-col items-center justify-center rounded-full`}
              >
                <Check />
              </div>
              [선택] SMS 광고성 정보 수신에 동의합니다{" "}
            </div>
          </div>
        </div>

        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton color="300" disabled={!isAbleSubmit}>
            결제하기
          </GreenBasicButton>
        </div>
      </form>
    </>
  );
};
export default PayPage;
