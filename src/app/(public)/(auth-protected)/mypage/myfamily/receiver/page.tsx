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
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ReceiverProfilePage = () => {
  const { receiver, setReceiver } = useReceiverStore();
  const [editUserProfile, setEditUserProfile] =
    useState<ReceiverProfileInfo>(receiver);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    !editUserProfile?.phone?.trim();

  const handleSave = async () => {
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      setMessage("이미지 파일은 1MB 이하로 업로드해주세요.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await updateReceiver(editUserProfile, selectedFile);
      if (response.data.isSuccess) {
        setReceiver(response.data.result);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          setMessage(error.response?.data.message);
        } else if (error.response?.status === 413) {
          setMessage("이미지 파일 크기가 너무 큽니다.");
        } else if (error.response?.status === 415) {
          setMessage("이미지 파일 형식이 올바르지 않습니다.");
        } else {
          setMessage("이미지 파일은 1MB 이하 제한입니다.");
        }
      } else {
        setMessage("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
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
      {message && (
        <AlertDialog
          title="저장 실패"
          content={message}
          setIsOpen={() => setMessage("")}
        />
      )}
    </>
  );
};

export default ReceiverProfilePage;
