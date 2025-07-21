"use client";
import Result from "@/components/result/result";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import { PATH } from "@/constants/path";

const FamilyInviteClient = () => {
  const router = useRouter();
  const hasRunRef = useRef(false); // 추가
  const searchParams = useSearchParams();
  const familyLink = searchParams.get("familyLink");

  useEffect(() => {
    if (hasRunRef.current) return; // 두 번째 실행 방지

    const postLink = async () => {
      hasRunRef.current = true;
      try {
        const response = await axios.post("/v1/family/join", null, {
          params: {
            code: familyLink,
          },
        });
        if (response.data.isSuccess) {
          router.push(PATH.FAMILY_COMPLETE);
        } else {
          alert("가족 가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("가족 가입 실패:", error);
        alert("가족 가입에 실패했습니다. 다시 시도해주세요.");
      }
      return null;
    };

    postLink();
  }, [router, familyLink]);

  return (
    <Result
      title="가족 가입이 진행 되는 중이에요"
      description="잠시만 기다려주세요"
    />
  );
};
export default FamilyInviteClient;
