"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import axios from "@/lib/axios";
import { usePaymentStore } from "@/stores/usePaymentStore";

const CompletePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pgToken = searchParams.get("pg_token");
  const { tid } = usePaymentStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(pgToken, tid);
      const response = await axios.get("/v1/test/payment/success", {
        params: {
          pgToken: pgToken,
          tid: tid,
        },
      });
      if (response.status === 200) {
        router.push("/subscribe/complete");
      }
    } catch (error) {
      console.error(error);
      const response = await axios.get("/v1/test/payment/fail", {
        params: {
          pgToken: pgToken,
          tid: tid,
        },
      });
      if (response.status === 200) {
        alert("결제 실패 다시 결제해주세요");
        router.push("/subscribe/pay");
      }
    }
  };

  return (
    <>
      <form
        className="flex h-full w-full flex-col items-center justify-center gap-2 p-4"
        onSubmit={handleSubmit}
      >
        <Result title="결제 완료 버튼을 눌러주세요!" description="" />
        <GreenBasicButton color="300">결제 완료 하기</GreenBasicButton>
      </form>
    </>
  );
};

export default CompletePage;
