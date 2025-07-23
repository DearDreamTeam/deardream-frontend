"use client";

import { createReceiver } from "@/api/profile";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import ReceiverProfileEdit from "@/components/profile/receiver-profile-edit";
import { PATH } from "@/constants/path";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReceiverProfilePage = () => {
  const { receiver, setReceiver } = useReceiverStore();
  const [editUserProfile, setEditUserProfile] =
    useState<ReceiverProfileInfo>(receiver);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(true);
  }, [editUserProfile]);

  // 페이지 나가기 전 경고 메시지 추가
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // 프로필 정보 유효성 검사
  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    !editUserProfile?.phone?.trim();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createReceiver(editUserProfile, selectedFile);
      if (response.data.isSuccess) {
        setReceiver(response.data.result);
      }
    } catch (error) {
      console.error("Receiver profile update failed:", error);
    } finally {
      setIsLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        <div>
          <Header>받는 분 정보</Header>
          <ReceiverProfileEdit
            setEditReceiverProfile={setEditUserProfile}
            editReceiverProfile={editUserProfile}
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
        <AlertDialog
          title="받는 분 입력이 완료되었습니다."
          content="관계를 입력하러 가시죵"
          setIsOpen={setShowAlert}
          onAction={() => {
            router.push(PATH.RELATION);
          }}
        />
      )}
    </>
  );
};

export default ReceiverProfilePage;
