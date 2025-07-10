"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import RibbonImage from "@/components/images/ribbon-image";
import { PATH } from "@/constants/path";
// import { useState } from "react";

const QuitPage = () => {
  // const [planType] = useState<"PERSONAL" | "INSTITUTION" | "NONE">("PERSONAL"); // "PERSONAL" | "INSTITUTION" | "NONE"
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-between bg-white p-4 pt-0">
        <Header>구독 해지</Header>
        <div className="text-title-2 mt-4 flex h-full w-full flex-col items-center justify-center gap-4">
          <RibbonImage />
          <div></div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2">
          <GreenBasicButton
            color="300"
            link={PATH.MYPAGE + "/subscribe/address/complete"}
          >
            계속 소식지 받아오기
          </GreenBasicButton>
          <GreenBasicButton
            color="100"
            link={PATH.MYPAGE + "/subscribe/address/complete"}
          >
            소식지 그만받기
          </GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default QuitPage;
