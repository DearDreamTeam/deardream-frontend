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
  const [showFamilyDialog, setShowFamilyDialog] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    console.log("현재 pathname:", pathname);
    console.log("현재 role:", userProfile.role);
    if (!userProfile.role) return;

    const checkReceiver = async () => {
      if (userProfile.role == "DEFAULT") {
        setShowDialog(true);
        return;
      }
      try {
        const res = await axios.get("/v1/recipient");

        console.log("recipient API 응답:", res.data);

        setReceiver(res.data.result);
      } catch (err) {
        console.error("수신자 정보 조회 실패", err);
      }
    };

    if (userProfile.role === "LEADER" || userProfile.role === "DEFAULT") {
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

  useEffect(() => {
    if (userProfile.role === "LEADER" && !userProfile.familyRegistered) {
      const complementFamily = async () => {
        try {
          const res = await axios.get("/v1/recipient");
          setReceiver(res.data.result);
          setShowFamilyDialog(true);
        } catch (err) {
          console.error("가족 완성 실패", err);
        }
      };
      complementFamily();
    }
  }, [setReceiver, userProfile.role, userProfile.familyRegistered]);
  const handleComplete = () => {
    router.push("/subscribe/receiver/address");
    setShowDialog(false); // 모달 닫기 (안 닫아도 라우팅되면 사라지긴 함)
  };

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
      {showFamilyDialog && (
        <AlertDialog
          title="완료하지 못한 가족 정보가 있어요"
          content="가족 정보를 완료해주세요"
          setIsOpen={setShowFamilyDialog}
          onAction={handleComplete}
        />
      )}
    </>
  );
}
