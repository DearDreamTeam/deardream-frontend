"use client";

import { useEffect, useRef, useState } from "react";
import Result from "@/components/result/result";
import GreenBasicButton from "@/components/button/green-basic-button";
import axios from "@/lib/axios";
import { PATH } from "@/constants/path";

const FamilyCreationPage = () => {
  const hasRunRef = useRef(false);
  const [isComplete, setIsComplete] = useState(false);

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
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const createFamily = async () => {
      try {
        const postResponse = await axios.post("/v1/family");
        if (postResponse.status === 200) {
          const isRegistered = await waitForFamilyRegistered();
          const isLink = await postLink();
          if (isRegistered && isLink) {
            setIsComplete(true); // ✅ 완료 상태 표시
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
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      {isComplete ? (
        <>
          <Result
            title="가족 생성이 완료되었어요"
            description="지금 바로 첫 소식을 남기러 가볼까요?"
            imageType="family"
          />
          <GreenBasicButton color="300" link={PATH.HOME} newTab={true}>
            소식 남기러 가기
          </GreenBasicButton>
        </>
      ) : (
        <Result
          title="가족 생성이 되는 중이에요"
          description="잠시만 기다려주세요"
          imageType="family"
        />
      )}
    </div>
  );
};

export default FamilyCreationPage;
