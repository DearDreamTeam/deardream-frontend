"use client";

import { PATH } from "@/constants/path";
import axios from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/loading-fallback/loading";

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  const { plan } = usePlanStore();
  const { userProfile, updateUserProfile } = useUserStore();
  const { setReceiver } = useReceiverStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let currentUser = userProfile;

        // 유저 정보 없으면 가져오기
        if (currentUser.id === -1) {
          const response = await axios.get("/v1/users/me");
          if (response.status === 200) {
            currentUser = response.data.result;
            updateUserProfile(currentUser);
          }
        }

        // 플랜 없고 기본 유저면 구독 페이지로 이동
        if (!plan.isActive && currentUser.role === "DEFAULT") {
          router.push(PATH.SUBSCRIBE);
          return;
        }

        // 리더면 수신자 정보 불러오기
        if (currentUser.role === "LEADER") {
          const response = await axios.get(`/v1/recipient`);
          if (response.status === 200) {
            setReceiver(response.data.result);
          }
        }
      } catch (error) {
        console.error("SubscribeLayout 초기화 실패:", error);
        // 에러 핸들링 필요시 추가
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [plan.isActive]); // plan.isActive가 바뀌면 다시 실행

  return isLoading ? (
    <div className="h-full">
      <Loading />
    </div>
  ) : (
    <div className="h-full">{children}</div>
  );
};

export default SubscribeLayout;
