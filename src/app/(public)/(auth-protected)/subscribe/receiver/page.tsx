"use client";

import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import ReceiverProfileEdit from "@/components/profile/receiver-profile-edit";
import { PATH } from "@/constants/path";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ReceiverProfilePage = () => {
  const { receiver, setReceiver, receiverImage, setReceiverImage } =
    useReceiverStore();

  const [editUserProfile, setEditUserProfile] =
    useState<ReceiverProfileInfo>(receiver);

  const [selectedFile, setSelectedFile] = useState<File | null>(
    receiverImage.profileImage,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    !editUserProfile?.phone?.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isProfileIncomplete || isLoading) {
      return;
    }
    setIsLoading(true);

    // 상태 변경 먼저 적용
    setReceiver(editUserProfile);
    setReceiverImage({
      profileImage: selectedFile,
      profileImageKey: undefined,
    });

    // 라우팅은 상태 변경 이후 한 프레임 뒤에 처리 (UX 안정)
    setTimeout(() => {
      router.push(PATH.SUBSCRIBE + "/receiver/address");
    }, 0);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        <div>
          <Header setIsModalOpen={setShowAlert}>받는 분 정보</Header>
          <ReceiverProfileEdit
            editReceiverProfile={editUserProfile}
            setEditReceiverProfile={setEditUserProfile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton disabled={isProfileIncomplete || isLoading}>
            {isLoading ? "저장 중..." : "저장"}
          </GreenBasicButton>
        </div>
      </form>

      {showAlert && (
        <ConfirmDialog
          title="정말 나가시겠습니까?"
          content="입력하신 정보가 저장되지 않습니다."
          setIsOpen={setShowAlert}
          actionLabel="나가기"
          action={() => {
            window.location.href = PATH.SUBSCRIBE;
          }}
          cancelAction={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default ReceiverProfilePage;
