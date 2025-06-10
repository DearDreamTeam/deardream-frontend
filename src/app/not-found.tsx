"use client";

import Lottie from "@/components/anim/Lottie";
import Dropdown from "@/components/dropdown/dropdown";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NotFound = () => {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div className="overflow-auto-hide-scroll flex h-full flex-col items-center justify-center gap-4">
      <div className="w-fit">
        <Lottie />
      </div>
      <p>존재하지 않는 페이지입니다.</p>
      <button className="button" onClick={() => router.replace("/home")}>
        홈으로 돌아가기
      </button>
      <button className="button" onClick={() => router.replace("/design")}>
        디자인 시스템 보기
      </button>
      <button className="button" onClick={() => setIsAlertOpen(true)}>
        AlertDialog Test
      </button>
      <button className="button" onClick={() => setIsConfirmOpen(true)}>
        ConfirmDialog Test
      </button>
      {isAlertOpen && (
        <AlertDialog setIsOpen={setIsAlertOpen}>
          200자 이상의 글은 사진과 함께 올릴 수 없어요.
          <br />
          글을 줄이거나, 사진을 삭제해볼까요?
        </AlertDialog>
      )}
      {isConfirmOpen && (
        <ConfirmDialog setIsOpen={setIsConfirmOpen}>
          한 번 삭제하면 다시 되돌릴 수 없어요.
          <br />
          그래도 삭제하시겠어요?
        </ConfirmDialog>
      )}
      <Dropdown />
    </div>
  );
};

export default NotFound;
