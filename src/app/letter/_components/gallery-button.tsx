"use client";

import { useRef, useState } from "react";
import Gallery from "@/public/icons/buttons/imagesmode.svg";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";
import { EditableImage } from "@/types/editable-image";

interface GalleryButtonProps {
  imageCount: number;
  setImageFiles: React.Dispatch<React.SetStateAction<EditableImage[]>>;
}

const GalleryButton = ({ imageCount, setImageFiles }: GalleryButtonProps) => {
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

    setImageFiles((prev) => [
      ...prev,
      ...[...files].map((file) => ({
        fileId: 0, //ref
        originalFile: file,
        originalUrl: URL.createObjectURL(file),
        previewUrl: URL.createObjectURL(file),
        editedProps: null,
      })),
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
