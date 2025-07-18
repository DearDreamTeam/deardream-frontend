"use client";
import Result from "@/components/result/result";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CompletePage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <Result
      title="회원 탈퇴가 완료되었어요"
      description="이어드림과 함께 해주셔서 감사합니다"
    />
  );
};
export default CompletePage;
