"use client";
import Result from "@/components/result/result";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const FamilyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const createFamily = async () => {
      try {
        const response = await axios.post("/v1/family");
        if (response.status === 200) {
          router.push("/subscribe/family/complete");
        }
      } catch (error) {
        console.error(error);
        alert("가족 생성에 실패했습니다. 다시 시도해주세요.");
      }
    };
    createFamily();
  }, []);
  return (
    <Result
      title="가족 생성이 되는 중이에요"
      description="잠시만 기다려주세요"
    />
  );
};
export default FamilyPage;
