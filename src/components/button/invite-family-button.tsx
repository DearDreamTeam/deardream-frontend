"use client";

import { useState } from "react";
import UserAdd from "@/public/icons/invite/user-add.svg";
import ShareOptions from "../modal/share-options/share-options";

const InviteFamilyButton = () => {
  const [isShareOptionsModalOpen, setIsShareOptionsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsShareOptionsModalOpen(true)}
        className="button w-fit"
      >
        <UserAdd />
        <p>가족 초대하기</p>
      </button>

      {isShareOptionsModalOpen && (
        <ShareOptions setIsOpen={setIsShareOptionsModalOpen} />
      )}
    </div>
  );
};

export default InviteFamilyButton;
