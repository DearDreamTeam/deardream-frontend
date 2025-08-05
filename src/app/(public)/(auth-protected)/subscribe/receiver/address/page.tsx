"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import InstitutionAddressEdit from "@/components/address/institution-address-input";
import HomeAddressInput from "@/components/address/home-address-input";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

import { useReceiverStore } from "@/stores/useReceiverStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { createReceiver } from "@/api/profile";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { PATH } from "@/constants/path";

const AddressPage = () => {
  const { receiver, receiverImage } = useReceiverStore();
  const { updateUserProfile } = useUserStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const isInstitution = receiver.address.deliveryType === "INSTITUTION";

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const routeAfterSubmit = async () => {
    if (isInstitution) {
      router.push(PATH.SUBSCRIBE + "/family");
    } else {
      try {
        const res = await axios.post("/v1/family");
        if (res.status === 200) {
          updateUserProfile({ familyId: res.data.result.id });
          router.push(PATH.SUBSCRIBE + "/pay");
        }
      } catch {
        console.log("가족 생성 실패");
        setMessage("가족 정보 생성에 실패했습니다.");
        setIsAlertOpen(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receiver.name || !receiver.address.address) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await createReceiver(receiver, receiverImage.profileImage);
      if (res.data.isSuccess) {
        await routeAfterSubmit();
      } else {
        throw new Error("받는 사람 생성 실패");
      }
    } catch (err) {
      console.error("Receiver address update failed:", err);
      const error = err as AxiosError;

      const apiMessage =
        (error?.response?.data as { message?: string })?.message ??
        "알 수 없는 오류입니다. 관리자에게 문의해주세요.";
      setMessage(apiMessage);
      if (error.response?.status === 403) {
        router.push(PATH.SUBSCRIBE + "/family");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-grey-0 flex h-full w-full flex-col items-center justify-between p-4 pt-0"
      >
        <Header>주소 입력</Header>

        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          {isInstitution ? <InstitutionAddressEdit /> : <HomeAddressInput />}
        </div>

        <GreenBasicButton
          color="300"
          disabled={!receiver.name || !receiver.address.address || isLoading}
        >
          {isLoading ? "저장 중..." : "저장"}
        </GreenBasicButton>
      </form>

      {isAlertOpen && (
        <AlertDialog
          title="주소 입력 실패"
          content={message}
          setIsOpen={setIsAlertOpen}
          onAction={() => {
            window.location.href = PATH.SUBSCRIBE;
          }}
        />
      )}
    </>
  );
};

export default AddressPage;
