"use client";

import { useRef, useState } from "react";
import Gallery from "@/public/icons/photo-selector/gallery.svg";
import AlertDialog from "../modal/dialog/alert-dialog";

interface TypeBarProps {
  isImageAdded: boolean;
  typedLength: number;
}

const TypeBar = ({ isImageAdded, typedLength }: TypeBarProps) => {
  /* 이미지가 추가된 상태면 200자, 이미지가 없는 상태면 600자 제한 설정 */
  const textLimit = isImageAdded ? "200" : "600";

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  /* 이미지 선택 버튼 처리 */
  const inputRef = useRef<HTMLInputElement>(null);
  const handleGalleryClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 2) {
      setIsAlertOpen(true);
      e.target.value = "";
      return;
    }
  };

  return (
    <div className="bg-gray-0 flex items-center justify-between border-y border-y-gray-200 p-4">
      <button onClick={handleGalleryClick}>
        <Gallery />
      </button>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      {isAlertOpen && (
        <AlertDialog setIsOpen={setIsAlertOpen}>
          사진은 최대 2장까지만 선택할 수 있어요.
        </AlertDialog>
      )}
      <div className="text-caption-2 flex gap-1 text-gray-600">
        <span className="min-w-[1.825rem] text-end">{typedLength}</span>
        <span>/{textLimit}자</span>
      </div>
    </div>
  );
};

export default TypeBar;
