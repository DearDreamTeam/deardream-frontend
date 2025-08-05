"use client";

import { PATH } from "@/constants/path";
import axios from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useReceiverStore } from "@/stores/useReceiverStore";

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  const { plan } = usePlanStore();

  const { userProfile } = useUserStore();
  const { setReceiver } = useReceiverStore();

  const router = useRouter();

  useEffect(() => {
    if (!plan.isActive && userProfile.role === "DEFAULT") {
      router.push(PATH.SUBSCRIBE);
      return;
    }
    if (userProfile.role === "LEADER") {
      const fetchReceiver = async () => {
        const response = await axios.get(`/v1/recipient`);
        if (response.status === 200) {
          setReceiver(response.data.result);
        }
        console.log(response.data.result);
      };
      fetchReceiver();
      return;
    }
  }, [plan.isActive, router]);
  return <div className="h-full">{children}</div>;
};

export default SubscribeLayout;
