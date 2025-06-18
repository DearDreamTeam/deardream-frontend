"use client";
import { useState } from "react";
import FileCopy from "@/public/icons/share-options/file-copy.svg";

const LinkCopy = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  return (
    <div className="flex flex-col text-gray-500">
      <p className="text-caption-2 p-1 text-center">또는 링크 복사하기</p>
      <div className="rounded-25 flex gap-1 bg-gray-50 px-4 py-2">
        <span className="flex-1">{link}</span>
        <button onClick={handleCopy} className="text-gray-900">
          <FileCopy />
        </button>
      </div>
      {copied && (
        <div className="bg-main-red-300 text-gray-0 rounded-25 absolute self-center p-1">
          복사 완료!
        </div>
      )}
    </div>
  );
};

export default LinkCopy;
