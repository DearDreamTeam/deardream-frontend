"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Result from "@/components/result/result";

const CompletePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/subscribe/receiver");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Result
        title="결제가 완료되었어요"
        description="받는 분의 정보와 주소를 입력하고"
        description2="가족 생성을 완료해보세요!"
      />
    </>
  );
};

export default CompletePage;
