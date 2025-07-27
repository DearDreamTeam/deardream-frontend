"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import { PATH } from "@/constants/path";

const FamilyJoinPage = () => {
  const searchParams = useSearchParams();
  const familyLink = searchParams.get("familyLink");
  const hasRunRef = useRef(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const postLink = async () => {
      try {
        const response = await axios.post("/v1/family/join", null, {
          params: { code: familyLink },
        });

        if (response.data.isSuccess) {
          setIsComplete(true);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("가족 가입 실패:", error);
        setIsError(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    };

    postLink();
  }, [familyLink, router]);

  if (isError) {
    return (
      <Result
        imageType="family"
        title="가족 구성원 등록에 실패했어요"
        description="다시 시도해주세요."
      />
    );
  }

  if (!isComplete) {
    return (
      <Result
        imageType="family"
        title="가족 구성원 등록이 진행 중이에요"
        description="잠시만 기다려주세요"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      <Result
        imageType="family"
        title="가족 등록이 완료되었어요"
        description="지금 바로 첫 소식을 남기러 가볼까요?"
      />
      <GreenBasicButton color="300" link={PATH.HOME} newTab={true}>
        소식 남기러 가기
      </GreenBasicButton>
    </div>
  );
};

export default FamilyJoinPage;
