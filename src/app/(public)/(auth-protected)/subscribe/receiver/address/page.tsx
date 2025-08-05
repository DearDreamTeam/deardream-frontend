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

  const isInstitution = receiver.address.deliveryType === "INSTITUTION";

  const isIncomplete = isInstitution
    ? !receiver.address.code || !receiver.address.address
    : !receiver.address.address || !receiver.address.postalCode;

  useEffect(() => {
    if (!message) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [message]);

  const postLink = async () => {
    const response = await axios.post("/v1/family/link");
    if (response.status === 200) {
      return response.data.result.link;
    }
    return null;
  };

  const routeAfterSubmit = async () => {
    try {
      const res = await axios.post("/v1/family");
      if (res.status === 200) {
        updateUserProfile({ familyId: res.data.result.id });
        try {
          await postLink();
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.data.message) {
              setMessage(error.response?.data.message);
            }
          }
        }
        if (isInstitution) {
          router.replace(PATH.SUBSCRIBE + "/family");
        } else {
          router.replace(PATH.SUBSCRIBE + "/pay");
        }
      }
    } catch {
      console.log("가족 생성 실패");
      setMessage("가족 정보 생성에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isIncomplete) {
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
      if (error.response?.status === 403) {
        setMessage("가족이 이미 존재합니다. 재구독을 이용해주세요");
      } else if (
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        setMessage((error.response.data as { message: string }).message);
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

        <div className="text-title-2 overflow-auto-hide-scroll my-4 flex h-full w-full flex-col">
          {isInstitution ? <InstitutionAddressEdit /> : <HomeAddressInput />}
        </div>

        <GreenBasicButton color="300" disabled={isIncomplete || isLoading}>
          {isLoading ? "저장 중..." : "저장"}
        </GreenBasicButton>
      </form>

      {message && (
        <AlertDialog
          title={
            message === "가족이 이미 존재합니다. 재구독을 이용해주세요"
              ? "가족 정보 확인"
              : "주소 입력 실패"
          }
          content={message}
          setIsOpen={() => setMessage("")}
          onAction={() => {
            if (message === "가족이 이미 존재합니다. 재구독을 이용해주세요") {
              router.replace(PATH.SUBSCRIBE_PLAN);
            } else {
              window.location.href = PATH.HOME;
            }
          }}
        />
      )}
    </>
  );
};

export default AddressPage;
