"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Result from "@/components/result/result";
import axios from "@/lib/axios";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { PATH } from "@/constants/path";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import Loading from "@/components/loading-fallback/loading";
import GreenBasicButton from "@/components/button/green-basic-button";

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

  useEffect(() => {
    if (!pgToken || !tid) return;
    const checkPayment = async () => {
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
    checkPayment();
  }, [pgToken, setTid, tid]);

  return (
    <>
      {!isComplete ? (
        <Loading />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
          <Result
            title="결제가 완료되었어요"
            description="소식지를 작성하러 가볼까요?"
            imageType="payment"
          />
          <GreenBasicButton color="300" link={PATH.HOME} newTab={true}>
            소식지 작성하기
          </GreenBasicButton>
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
