"use client";

import { useUserStore } from "@/stores/useUserInfoStore";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import { useEffect, useState, useRef } from "react";
import { PATH } from "@/constants/path";
import { useRouter } from "next/navigation";
import { usePlanStore } from "@/stores/usePlanStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { userProfile } = useUserStore();
  const { plan } = usePlanStore();

  const [showForbidden, setShowForbidden] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    content: string;
    onAction: () => void;
  } | null>(null);

  const hasChecked = useRef(false);

  useEffect(() => {
    if (!hasChecked.current && userProfile.id !== -1) {
      if (userProfile.role === "USER") {
        setAlertConfig({
          title: "플랜 구독 권한 없음",
          content: "가족의 리더가 아니면 구독할 수 없습니다.",
          onAction: () => router.push(PATH.HOME),
        });
        setShowForbidden(true);
      } else if (
        (plan.isActive || userProfile.familyRegistered) &&
        !window.location.pathname.includes("/pay")
      ) {
        setAlertConfig({
          title: "기존 가족 존재",
          content: "플랜 변경을 이용해주세요.",
          onAction: () => router.push(PATH.SUBSCRIBE_PLAN),
        });
        setShowForbidden(true);
      }
      hasChecked.current = true;
    }
  }, [plan.isActive, userProfile.role, userProfile.id]);

  return (
    <>
      {children}
      {showForbidden && alertConfig && (
        <AlertDialog
          title={alertConfig.title}
          content={alertConfig.content}
          setIsOpen={setShowForbidden}
          onAction={alertConfig.onAction}
        />
      )}
    </>
  );
}
