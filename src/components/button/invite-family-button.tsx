"use client";

import { useState } from "react";
import UserAdd from "@/public/icons/buttons/person_add.svg";
import ShareOptions from "../modal/share-options/share-options";
import { usePlanStore } from "@/stores/usePlanStore";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import { useRouter } from "next/navigation";
import { PATH } from "@/constants/path";

const InviteFamilyButton = () => {
  const [isShareOptionsModalOpen, setIsShareOptionsModalOpen] = useState(false);
  const { plan } = usePlanStore();
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => setIsShareOptionsModalOpen(true)}
        className="button"
      >
        <UserAdd />
        <p>멤버 초대하기</p>
      </button>
      {isShareOptionsModalOpen && !plan.isActive && (
        <ConfirmDialog
          setIsOpen={setIsShareOptionsModalOpen}
          title="구독 내역 없음"
          content={renderMessageWithLineBreaks(
            `이어드림 플랜을 구독하시면 \n전체 서비스를 이용하실 수 있어요`,
          )}
          actionLabel="구독하기"
          action={() => router.push(PATH.SUBSCRIBE_PLAN)}
        />
      )}

      {isShareOptionsModalOpen && plan.isActive && (
        <ShareOptions setIsOpen={setIsShareOptionsModalOpen} />
      )}
    </div>
  );
};

export default InviteFamilyButton;
