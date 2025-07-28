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
const AddressPage = () => {
  const { receiver } = useReceiverStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Receiver data submitted:", receiver);
    try {
      const response = await updateReceiverAddress(receiver);
      if (response.data.isSuccess) {
        router.push(PATH.MYPAGE + "/subscribe/address/complete");
      }
    } catch (error) {
      console.error("Receiver address update failed:", error);
    }
  };
  return (
    <>
      <form
        className="bg-grey-0 flex h-full w-full flex-col items-center justify-between p-4 pt-0"
        onSubmit={handleSubmit}
      >
        <Header>주소 변경</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          {receiver.address.deliveryType === "INSTITUTION" ? (
            <InstitutionAddressEdit />
          ) : (
            <HomeAddressInput />
          )}
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton
            color="300"
            link={PATH.MYPAGE + "/subscribe/address/complete"}
            disabled={!receiver.name || !receiver.address.address || isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </GreenBasicButton>
        </div>
      </form>
    </>
  );
};
export default AddressPage;
