"use client";
import Result from "@/components/result/result";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const FamilyPage = () => {
  const router = useRouter();
  const hasRunRef = useRef(false); // 추가

  const waitForFamilyRegistered = async (maxAttempts = 5) => {
    for (let i = 0; i < maxAttempts; i++) {
      const response = await axios.get("/v1/users/me");
      if (response.data.result.familyRegistered) return true;
      await new Promise((res) => setTimeout(res, 500));
    }
    return false;
  };

  const postLink = async () => {
    const response = await axios.post("/v1/family/link");
    if (response.status === 200) {
      return response.data.result.link;
    }
    return null;
  };

  useEffect(() => {
    if (hasRunRef.current) return; // 두 번째 실행 방지
    hasRunRef.current = true;

    const createFamily = async () => {
      try {
        const postResponse = await axios.post("/v1/family");
        if (postResponse.status === 200) {
          const isRegistered = await waitForFamilyRegistered();
          const isLink = await postLink();
          if (isRegistered && isLink) {
            router.push("/subscribe/family/complete");
          } else {
            alert("가족 등록 정보가 서버에 반영되지 않았습니다.");
          }
        }
      } catch (error) {
        console.error("가족 생성 실패:", error);
        alert("가족 생성에 실패했습니다. 다시 시도해주세요.");
      }
    };

    createFamily();
  }, [router]);

  return (
    <Result
      title="가족 생성이 되는 중이에요"
      description="잠시만 기다려주세요"
    />
  );
};
export default FamilyPage;
