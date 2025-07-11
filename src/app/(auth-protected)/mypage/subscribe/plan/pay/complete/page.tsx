"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Result from "@/components/result/result";
import { PATH } from "@/constants/path";

const CompletePage = () => {
  const router = useRouter();
  const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(PATH.MYPAGE + "/subscribe/address");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return planType === "PERSONAL" ? (
    <Result
      title="결제가 완료되었어요"
      description="소식지를 받을 주소를 등록해주세요"
    />
  ) : (
    <Result
      title="변경이 완료되었어요!"
      description="소식지를 받아보실 기관 주소를 등록해주세요"
    />
  );
};

export default CompletePage;
