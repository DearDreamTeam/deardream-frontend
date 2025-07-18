"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useReceiverStore } from "@/stores/useReceiverStore";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setReceiver } = useReceiverStore();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const checkReceiver = async () => {
      try {
        const res = await axios.get("/v1/recipient");

        if (!res.data.result) {
          setShowDialog(true); // 정보가 비어 있으면 모달 띄우기
        } else {
          setReceiver(res.data.result);
        }
      } catch (err) {
        console.error("사용자 정보 조회 실패", err);
        setShowDialog(true); // 요청 실패 시에도 모달 띄우기
      }
    };

    checkReceiver();
  }, []);

  const handleMove = () => {
    router.push("/subscribe");
    setShowDialog(false); // 모달 닫기 (안 닫아도 라우팅되면 사라지긴 함)
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
    </>
  );
}
