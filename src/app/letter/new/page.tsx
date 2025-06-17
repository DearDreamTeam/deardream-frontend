"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ActionHeader from "@/components/header/action-header";
import TextField from "@/app/letter/_components/text-field";
import TypeBar from "@/app/letter/_components/type-bar";
import ImagePreviewer from "@/app/letter/_components/image-previewer";
import TextLimit from "../_components/text-limit";
import GalleryButton from "../_components/gallery-button";

import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { Post } from "@/types/post-type";
import { PATH } from "@/constants/path";

const New = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const imgLength = imageFiles.length;
  const { addPost } = usePostStore();
  const { user } = useUserStore();
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);

  useEffect(() => {
    if (imageFiles.length === 0) return;

    /* 미리 보기 초기화 */
    setPreviewUrl([]);

    /* 미리 보기 url 생성 */
    imageFiles.map((file: File) =>
      setPreviewUrl((prev) => [...prev, URL.createObjectURL(file)]),
    );
  }, [imageFiles]);

  useEffect(() => {
    const contentLength = content.length;
    if (content.trim().length === 0) return setIsActive(false);

    if (imgLength === 0 && contentLength <= 600) return setIsActive(true);
    if (imgLength <= 2 && contentLength <= 200) return setIsActive(true);
    return setIsActive(false);
  }, [imgLength, content]);

  const submitLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const letter: Post = {
      postId: Date.now(),
      authorId: user.userId,
      familyId: user.familyId,
      content: content,
      imgFiles: [...imageFiles],
      imgUrls: [...previewUrl],
      createdAt: Date.now(),
    };
    addPost(letter);
    router.replace(PATH.HOME);
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
          type="submit"
          className={`p-2 ${isActive ? "text-main-red-300" : "text-gray-300"}`}
          disabled={!isActive}
        >
          등록
        </button>
      </ActionHeader>

      {/* 중앙 image-preview, textarea */}
      <div className="overflow-auto-hide-scroll flex flex-1 flex-col">
        {imgLength > 0 && <ImagePreviewer imageUrls={previewUrl} />}
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
