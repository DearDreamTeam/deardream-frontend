"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import InstitutionAddressEdit from "@/components/address/institution-address-input";
// import { PATH } from "@/constants/path";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { createReceiver } from "@/api/profile";
import HomeAddressInput from "@/components/address/home-address-input";
import { useRouter } from "next/navigation";

const AddressPage = () => {
  const { receiver, receiverImage } = useReceiverStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Receiver data submitted:", receiver);
    const response = await createReceiver(receiver, receiverImage.profileImage);
    console.log("Response from server:", response.data);
    router.push("/subscribe/family");
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
            disabled={!receiver.name || !receiver.address.address}
          >
            저장
          </GreenBasicButton>
        </div>
      </form>
    </>
  );
};
export default AddressPage;
