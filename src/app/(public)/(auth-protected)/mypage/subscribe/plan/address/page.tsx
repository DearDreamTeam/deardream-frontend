"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import InstitutionAddressEdit from "@/components/address/institution-address-input";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { updateReceiverAddress } from "@/api/profile";
import HomeAddressInput from "@/components/address/home-address-input";
import { PATH } from "@/constants/path";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
const AddressPage = () => {
  const { receiver, setReceiver } = useReceiverStore();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receiver.address.address || isLoading) {
      return;
    }
    setIsLoading(true);
    console.log("Receiver data submitted:", receiver);
    try {
      const response = await updateReceiverAddress(receiver);
      if (response.data.isSuccess) {
        if (receiver.address.deliveryType === "HOME") {
          router.push(PATH.SUBSCRIBE + "/pay");
        } else {
          router.push(PATH.SUBSCRIBE_PLAN + "/complete");
        }
      }
    } catch (error) {
      console.error("Receiver address update failed:", error);
    }
  };
  return (
    <>
      <form
        className="bg-grey-0 overflow-auto-hide-scroll flex h-full w-full flex-col items-center justify-between p-4 pt-0"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col items-center">
          <Header setIsModalOpen={setIsAlertOpen}>주소 변경</Header>
          <div className="text-title-2 my-4 flex w-full flex-col">
            {receiver.address.deliveryType === "INSTITUTION" ? (
              <InstitutionAddressEdit />
            ) : (
              <HomeAddressInput />
            )}
          </div>
        </div>
        <GreenBasicButton
          color="300"
          link={
            receiver.address.deliveryType === "HOME"
              ? PATH.SUBSCRIBE + "/pay"
              : PATH.SUBSCRIBE_PLAN + "/complete"
          }
          disabled={!receiver.address.address || isLoading}
        >
          {isLoading ? "저장 중..." : "저장"}
        </GreenBasicButton>
      </form>
      {isAlertOpen && (
        <ConfirmDialog
          title="정말 나가시겠습니까?"
          content="입력하신 정보가 저장되지 않습니다."
          setIsOpen={setIsAlertOpen}
          actionLabel="나가기"
          action={() => {
            setReceiver({
              address: {
                deliveryType: receiver.address.deliveryType,
                address: "",
                code: "",
                recipientName: "",
                recipientPhone: "",
                postalCode: "",
                institutionName: "",
                institutionPhone: "",
              },
            });
            router.push(PATH.SUBSCRIBE_PLAN);
          }}
          cancelAction={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
};
export default AddressPage;
