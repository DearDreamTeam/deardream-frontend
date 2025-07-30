"use client";

import { PATH } from "@/constants/path";
import { usePlanStore } from "@/stores/usePlanStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  const { plan } = usePlanStore();
  const router = useRouter();

  useEffect(() => {
    if (!plan.isActive) {
      router.push(PATH.SUBSCRIBE);
      return;
    }
  }, [plan.isActive, router]);
  return <div>{children}</div>;
};

export default SubscribeLayout;
