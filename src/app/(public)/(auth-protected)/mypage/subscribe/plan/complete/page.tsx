"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Result from "@/components/result/result";
import { PATH } from "@/constants/path";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserInfoStore";
import Loading from "@/components/loading-fallback/loading";

const CompletePage = () => {
  const { userProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const rejoinPlan = async () => {
      try {
        const response = await axios.post(
          `/v1/test/payment/request/rejoin`,
          null,
          {
            params: {
              familyId: userProfile.familyId,
            },
          },
        );
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    rejoinPlan();
  }, [userProfile.familyId]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
        <Result
          title="플랜 변경 완료!"
          description="플랜가 성공적으로 변경되었어요"
          description2="새 플랜으로 받아보실 소식을 남기러 가볼까요?"
          imageType="page"
        />
        <GreenBasicButton color="300" link={PATH.HOME} newTab={true}>
          소식 남기러 가기
        </GreenBasicButton>
      </div>
    </>
  );
};
export default CompletePage;
