"use client";

import { useRef, useState } from "react";
import Gallery from "@/public/icons/photo-selector/gallery.svg";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

interface GalleryButtonProps {
  imgLength: number;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const GalleryButton = ({ imgLength, setImageFiles }: GalleryButtonProps) => {
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
    if (files.length > 2 || imgLength >= 2) {
      setIsAlertOpen(true);
      e.target.value = "";
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
  };
  return (
    <div>
      <button type="button" onClick={handleGalleryClick}>
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
    </div>
  );
};

export default GalleryButton;
