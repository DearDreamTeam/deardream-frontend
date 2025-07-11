"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import AddressEdit from "@/components/mypage/address-edit";
import { PATH } from "@/constants/path";
import { useState } from "react";
const AddressPage = () => {
  const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"
  return (
    <>
      <div className="bg-grey-0 flex h-screen w-full flex-col items-center justify-between p-4 pt-0">
        <Header>주소 입력</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col">
          <AddressEdit planType={planType} />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton link={PATH.MYPAGE + "/subscribe/plan/complete"}>
            저장
          </GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default AddressPage;
