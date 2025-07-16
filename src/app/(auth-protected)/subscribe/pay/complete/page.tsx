"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Result from "@/components/result/result";

const CompletePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/subscribe/receiver/address");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Result
        title="결제가 완료되었어요"
        description="소식지를 받을 주소를 등록해주세요"
      />
    </>
  );
};

export default CompletePage;
