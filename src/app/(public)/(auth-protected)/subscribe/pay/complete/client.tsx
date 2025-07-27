"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import axios from "@/lib/axios";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { PATH } from "@/constants/path";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

const CompleteClient = () => {
  const router = useRouter();

  // 결제 토큰 조회
  const searchParams = useSearchParams();
  const pgToken = searchParams.get("pg_token");

  //tid 조회
  const { tid, setTid } = usePaymentStore();

  // 결제 완료 창 표시 여부
  const [isComplete, setIsComplete] = useState(false);

  const [paymentFailed, setPaymentFailed] = useState(false);

  // 결제 완료 버튼 클릭 시 결제 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get("/v1/test/payment/success", {
        params: { pgToken, tid },
      });
      if (response.status === 200) {
        setIsComplete(true); // 성공 화면 보여주기
      }
    } catch (error) {
      console.error(error);
      const response = await axios.get("/v1/test/payment/fail", {
        params: { pgToken, tid },
      });
      if (response.status === 200) {
        setPaymentFailed(true);
        setTid(null);
      }
    }
  };

  // 성공 상태일 때 자동 이동
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        router.push(PATH.SUBSCRIBE + "/receiver");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, router]);

  return (
    <>
      {!isComplete ? (
        <form
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-4"
          onSubmit={handleSubmit}
        >
          <Result
            title="결제 완료 버튼을 눌러주세요!"
            description="버튼을 누르시면 카카오 페이 결제가 완료됩니다."
            imageType="payment"
          />
          <GreenBasicButton color="300">결제 완료 하기</GreenBasicButton>
        </form>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
          <Result
            title="결제가 완료되었어요"
            description="받는 분의 정보와 주소를 입력하고"
            description2="가족 생성을 완료해보세요!"
            imageType="payment"
          />
        </div>
      )}
      {paymentFailed && (
        <AlertDialog
          title="결제 실패"
          content="결제에 실패했습니다. 다시 시도해주세요."
          setIsOpen={setPaymentFailed}
          onAction={() => {
            router.push(PATH.SUBSCRIBE + "/pay");
          }}
        />
      )}
    </>
  );
};

export default CompleteClient;
