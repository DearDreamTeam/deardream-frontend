"use client";
import { useState } from "react";
import FileCopy from "@/public/icons/share-options/file_copy.svg";
import { SHARE_DATA } from "@/components/modal/share-options/share-option-items";
import { useInvitationStore } from "@/stores/useInvitationStore";

const LinkCopy = () => {
  const [copied, setCopied] = useState(false);
  const { familyLink } = useInvitationStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        (SHARE_DATA.url ?? "") + "invite?familylink=" + (familyLink ?? ""),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  return (
    <div className="text-grey-500 flex flex-col">
      <p className="text-body-2 p-1 text-center">또는 링크 복사하기</p>
      <div className="bg-grey-50 flex gap-1 rounded-sm px-4 py-[0.69rem]">
        <span className="line-clamp-1 flex-1">
          {(SHARE_DATA.url ?? "") + "invite?familylink=" + (familyLink ?? "")}
        </span>
        <button onClick={handleCopy}>
          <FileCopy />
        </button>
      </div>
      {copied && (
        <div className="shadow-default absolute right-4 self-center rounded-sm bg-green-100/90 p-2">
          초대 링크를 복사했어요!
        </div>
      )}
    </div>
  );
};

export default LinkCopy;
