"use client";

import { updateReceiver } from "@/api/profile";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import ReceiverProfileEdit from "@/components/profile/receiver-profile-edit";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ReceiverProfilePage = () => {
  const { receiver, setReceiver } = useReceiverStore();
  const [editUserProfile, setEditUserProfile] =
    useState<ReceiverProfileInfo>(receiver);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    !editUserProfile?.phone?.trim();

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await updateReceiver(editUserProfile, selectedFile);
      if (response.data.isSuccess) {
        setReceiver(response.data.result);
      }
    } catch (error) {
      console.error("Error updating receiver profile:", error);
    } finally {
      setIsLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 이 함수 안에서 유효성 검사 + axios 처리
          if (!isProfileIncomplete) {
            handleSave();
          } else {
            console.error("Profile is incomplete");
          }
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
          title="저장 완료"
          content="받는 분 정보가 성공적으로 저장되었습니다."
          setIsOpen={setShowAlert}
          onAction={() => {
            setShowAlert(false);
            router.push("/mypage/myfamily/");
          }}
        />
      )}
    </>
  );
};

export default ReceiverProfilePage;
