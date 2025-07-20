"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useReceiverStore } from "@/stores/useReceiverStore";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { useUserStore } from "@/stores/useUserInfoStore";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setReceiver } = useReceiverStore();
  const { userProfile } = useUserStore();
  const [showDialog, setShowDialog] = useState(false);
  const [showForbidden, setShowForbidden] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    console.log("현재 pathname:", pathname);
    console.log("현재 role:", userProfile.role);

    if (!userProfile.role) return;

    const checkReceiver = async () => {
      try {
        const res = await axios.get("/v1/recipient");

        console.log("recipient API 응답:", res.data);

        if (!res.data.result) {
          console.log("구독 정보 없음. 현재 role:", userProfile.role);
          if (userProfile.role === "LEADER" || "DEFAULT") {
            setShowDialog(true);
          }
        } else {
          setReceiver(res.data.result);
        }
      } catch (err) {
        console.error("수신자 정보 조회 실패", err);
        if (userProfile.role === "LEADER" || "DEFAULT") {
          setShowDialog(true);
        }
      }
    };

    if (userProfile.role === "LEADER" || "DEFAULT") {
      checkReceiver();
    } else {
      if (pathname !== "/mypage/myfamily") {
        setShowForbidden(true);
      }
    }
  }, [
    userProfile.role,
    pathname,
    setReceiver,
    setShowDialog,
    setShowForbidden,
  ]);

  const handleMove = () => {
    router.push("/subscribe");
    setShowDialog(false); // 모달 닫기 (안 닫아도 라우팅되면 사라지긴 함)
  };

  const handleForbidden = () => {
    router.push("/mypage");
    setShowForbidden(false); // 모달 닫기 (안 닫아도 라우팅되면 사라지긴 함)
  };

  const handleCancel = () => {
    router.push("/mypage");
    setShowDialog(false);
  };

  return (
    <>
      {children}
      {showDialog && (
        <ConfirmDialog
          title="구독 정보 없음"
          content="플랜 구독을 먼저 해야 해요."
          setIsOpen={setShowDialog}
          action={handleMove}
          cancelAction={handleCancel}
          actionLabel="구독하러 가기"
        />
      )}
      {showForbidden && (
        <AlertDialog
          title="접근 권한 없음"
          content="리더만 접근할 수 있어요!"
          setIsOpen={setShowForbidden}
          onAction={handleForbidden}
        />
      )}
    </>
  );
}
