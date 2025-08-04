"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Result from "@/components/result/result";
import { PATH } from "@/constants/path";
import { useUserStore } from "@/stores/useUserInfoStore";
import axios from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { usePlanStore } from "@/stores/usePlanStore";
import { clearReceiverAddress } from "@/api/profile";
import { useReceiverStore } from "@/stores/useReceiverStore";

const CompletePage = () => {
  const hasRun = useRef(false); // 실행 여부 저장

  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useUserStore();
  const { clearPlan, plan } = usePlanStore();
  const { receiver, resetReceiverAddress } = useReceiverStore();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const QuitPlan = async () => {
      try {
        const response = await axios.patch(
          `/v1/test/payment/request/cancel/institution?userId=${userProfile.id}`,
        );
        console.log(response);
        if (response.status === 200) {
          clearPlan();
          console.log(receiver);
          await clearReceiverAddress(receiver);
          resetReceiverAddress();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const CancelPayment = async () => {
      try {
        const response = await axios.post(
          `/v1/test/payment/subscription/inactive`,
          {
            familyId: userProfile.familyId,
            orderUserId: userProfile.id,
          },
        );
        console.log("response", response);
        if (response.status === 200) {
          clearPlan();
          console.log(receiver);
          await clearReceiverAddress(receiver);
          resetReceiverAddress();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    // 기관 플랜인 경우 기관 플랜 해지 요청, 아닌 경우 정기 구독 해지 요청
    if (plan.type === "INSTITUTION") {
      QuitPlan();
    } else {
      CancelPayment();
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 p-4">
      {isLoading ? (
        <Result
          title="구독을 해지하는 중이에요"
          description="잠시만 기다려주세요."
          imageType="airplane"
        />
      ) : plan.type === "HOME" ? (
        <>
          <Result
            title="구독이 해지되었어요"
            description="다른 플랜으로 재구독 하실 수 있어요."
            imageType="airplane"
          />
          <GreenBasicButton color="300" link={PATH.SUBSCRIBE_PLAN}>
            다른 플랜 구독 하러가기
          </GreenBasicButton>
          <GreenBasicButton color="100" link={PATH.LETTER_LIST}>
            소식함 보러가기
          </GreenBasicButton>
        </>
      ) : (
        <Result
          title="소식지 제작이 중단되었어요"
          description="소식지 제작은 잠시 중단되었지만"
          description2="소식함 열람 및 다운로드는 계속 이용하실 수 있어요."
          description3="마이 -> 나의 정기 구독 -> 플랜 관리에서"
          description4="언제든 다시 플랜을 활성화 해주세요!"
          imageType="airplane"
        />
      )}
    </div>
  );
};
export default CompletePage;
