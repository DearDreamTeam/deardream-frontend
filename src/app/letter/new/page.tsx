"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ActionHeader from "@/components/header/action-header";
import TextField from "@/app/letter/_components/text-field";
import TypeBar from "@/app/letter/_components/type-bar";
import ImagePreviewer from "@/app/letter/_components/image-previewer";
import TextLimit from "../_components/text-limit";
import GalleryButton from "../_components/gallery-button";

const New = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const imgLength = imageFiles.length;

  useEffect(() => {
    const contentLength = content.length;
    if (content.trim().length === 0) return setIsActive(false);

    if (imgLength === 0 && contentLength <= 600) return setIsActive(true);
    if (imgLength <= 2 && contentLength <= 200) return setIsActive(true);
    return setIsActive(false);
  }, [imgLength, content]);

  const submitLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("제출");
  };

  return (
    <form
      onSubmit={submitLetter}
      className="flex h-full flex-1 flex-col justify-between"
    >
      {/* 상단 header */}
      <ActionHeader>
        <button type="button" className="p-2" onClick={router.back}>
          취소
        </button>
        <button
          className={`p-2 ${isActive ? "text-main-red-300" : "text-gray-300"}`}
          disabled={!isActive}
        >
          등록
        </button>
      </ActionHeader>

      {/* 중앙 image-preview, textarea */}
      <div className="overflow-auto-hide-scroll flex flex-1 flex-col">
        {imgLength > 0 && <ImagePreviewer imageFiles={imageFiles} />}
        <TextField content={content} setContent={setContent} />
      </div>

      {/* 하단 type-bar */}
      <TypeBar>
        <GalleryButton imgLength={imgLength} setImageFiles={setImageFiles} />
        <TextLimit imgLength={imgLength} typedLength={content.length} />
      </TypeBar>
    </form>
  );
};

export default New;
