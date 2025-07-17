"use client";

import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReceiverProfilePage = () => {
  const { receiver, setReceiver, setReceiverImage } = useReceiverStore();
  const [editUserProfile, setEditUserProfile] =
    useState<ReceiverProfileInfo>(receiver);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const isProfileIncomplete =
    !editUserProfile?.name?.trim() ||
    !editUserProfile?.birth?.trim() ||
    !editUserProfile?.phone?.trim();

  useEffect(() => {
    console.log("Receiver profile updated:", editUserProfile);
  }, [editUserProfile, setReceiver]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 이 함수 안에서 유효성 검사 + axios 처리
          if (!isProfileIncomplete) {
            setReceiver(editUserProfile);
            setReceiverImage({
              profileImage: selectedFile,
            });
            console.log("Receiver profile updated:", editUserProfile);
            router.push("/subscribe/receiver/address/");
          } else {
            console.error("Profile is incomplete");
          }
        }}
        className="bg-grey-0 relative flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        <div>
          <Header>받는 분 정보</Header>
          <ProfileEdit
            isSender={false}
            isInvite={false}
            setEditReceiverProfile={setEditUserProfile}
            editReceiverProfile={editUserProfile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton disabled={isProfileIncomplete}>
            저장
          </GreenBasicButton>
        </div>
      </form>
    </>
  );
};

export default ReceiverProfilePage;
