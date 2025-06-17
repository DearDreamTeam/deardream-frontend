"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ActionHeader from "@/components/header/action-header";
import TextField from "@/app/letter/_components/text-field";
import TypeBar from "@/app/letter/_components/type-bar";
import ImagePreviewer from "@/app/letter/_components/image-previewer";
import TextLimit from "../text-limit";
import GalleryButton from "../gallery-button";

import { PostState } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { Post } from "@/types/post-type";
import { PostEditorProps } from "@/types/post-editor-props";
import { PATH } from "@/constants/path";
import { isContentValid } from "@/utils/post-content-rules";

const PostEditor = ({ postcard, submitAction }: PostEditorProps) => {
  const router = useRouter();

  /* inputs */
  const [content, setContent] = useState(postcard?.content ?? "");
  const [imageFiles, setImageFiles] = useState<File[]>(
    postcard?.imgFiles ?? [],
  );
  const [previewUrl, setPreviewUrl] = useState<string[]>(
    postcard?.imgUrls ?? [],
  );

  const [isActive, setIsActive] = useState(false);
  const imageCount = imageFiles.length;
  const { user } = useUserStore();

  useEffect(() => {
    const isValid = isContentValid(content, imageCount);
    setIsActive(isValid);
  }, [content, imageCount]);

  const submitLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postcard) {
      const letter: Post = {
        ...postcard,
        content: content,
        imgFiles: [...imageFiles],
        imgUrls: [...previewUrl],
      };
      (submitAction as PostState["editPost"])(postcard.postId, letter);
    } else {
      const letter: Post = {
        postId: Date.now(),
        authorId: user.userId,
        familyId: user.familyId,
        content: content,
        imgFiles: [...imageFiles],
        imgUrls: [...previewUrl],
        createdAt: Date.now(),
      };
      (submitAction as PostState["addPost"])(letter);
    }

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
        {imageCount > 0 && <ImagePreviewer imageUrls={previewUrl} />}
        <TextField content={content} setContent={setContent} />
      </div>

      {/* 하단 type-bar */}
      <TypeBar>
        <GalleryButton
          imageCount={imageCount}
          setImageFiles={setImageFiles}
          setPreviewUrl={setPreviewUrl}
        />
        <TextLimit imageCount={imageCount} typedLength={content.length} />
      </TypeBar>
    </form>
  );
};

export default PostEditor;
