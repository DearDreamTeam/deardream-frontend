"use client";

import { useRef, useState } from "react";
import Gallery from "@/public/icons/buttons/imagesmode.svg";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";

interface GalleryButtonProps {
  imageCount: number;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const GalleryButton = ({
  imageCount,
  setImageFiles,
  setPreviewUrl,
}: GalleryButtonProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  /* 이미지 선택 버튼 처리 */
  const inputRef = useRef<HTMLInputElement>(null);
  const handleGalleryClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length > 2 || imageCount >= 2) {
      setIsAlertOpen(true);
      e.target.value = "";
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
    setPreviewUrl((prev) => [
      ...prev,
      ...[...files].map((file) => URL.createObjectURL(file)),
    ]);
  };
  return (
    <div>
      <button
        type="button"
        className="text-grey-600 flex items-center justify-center"
        onClick={handleGalleryClick}
      >
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
        <AlertDialog
          title={NOTIFICATION_MESSAGES.CANNOT_ADD_MORE_IMAGES.title}
          content={NOTIFICATION_MESSAGES.CANNOT_ADD_MORE_IMAGES.content}
          setIsOpen={setIsAlertOpen}
        />
      )}
    </div>
  );
};

export default GalleryButton;
