"use client";
import { useState } from "react";
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

import AlertDialog from "@/components/modal/dialog/alert-dialog";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import {
  TEXT_LIMIT_INVALID_MESSAGE,
  WRITE_CANCEL_WARNING_MESSAGE,
} from "@/constants/messages";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import CompleteLetter from "../complete-letter";
import PhotoEditor from "@/components/photo-editor/photo-editor";

const PostEditor = ({ postcard, submitAction }: PostEditorProps) => {
  const router = useRouter();
  const [warningMessage, setWarningMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<null | number>(
    null,
  );

  /* inputs */
  const [content, setContent] = useState(postcard?.content ?? "");
  const [imageFiles, setImageFiles] = useState<File[]>(
    postcard?.imgFiles ?? [],
  );
  const [previewUrl, setPreviewUrl] = useState<string[]>(
    postcard?.imgUrls ?? [],
  );

  /* derived states */
  const imageCount = imageFiles.length;
  const isActive = isContentValid(content, imageCount);

  const handleSubmitLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isActive) {
      if (imageCount > 0) {
        setWarningMessage(TEXT_LIMIT_INVALID_MESSAGE.WITH_IMAGES);
      } else {
        setWarningMessage(TEXT_LIMIT_INVALID_MESSAGE.WITHOUT_IMAGES);
      }
      setIsAlertOpen(true);
      return;
    }

    if (postcard) {
      const letter: Post = {
        ...postcard,
        content: content,
        imgFiles: [...imageFiles],
        imgUrls: [...previewUrl],
      };
      (submitAction as PostState["editPost"])(postcard.postId, letter);
    } else {
      const user = useUserStore.getState().user;
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

    setIsComplete(true);
    setTimeout(() => {
      setIsComplete(false);
      router.replace(PATH.HOME);
    }, 2000);
  };

  const handleCancelLetter = () => {
    if (postcard) {
      if (postcard.content !== content) {
        setWarningMessage(WRITE_CANCEL_WARNING_MESSAGE.EDIT);
        setIsConfirmOpen(true);
        return;
      }
    } else {
      if (content.trim() || imageCount) {
        setWarningMessage(WRITE_CANCEL_WARNING_MESSAGE.NEW);
        setIsConfirmOpen(true);
        return;
      }
    }
    router.back();
  };

  const handleSaveEditedImage = (editedUrl: string, editedFile: File) => {
    if (selectedImageIndex === null) return;
    setImageFiles((prev) =>
      prev.map((file, idx) => (idx === selectedImageIndex ? editedFile : file)),
    );
    setPreviewUrl((prev) =>
      prev.map((url, idx) => (idx === selectedImageIndex ? editedUrl : url)),
    );
    setSelectedImageIndex(null);
  };

  return (
    <form
      onSubmit={handleSubmitLetter}
      className="flex h-full flex-1 flex-col justify-between"
    >
      {/* 상단 header */}
      <ActionHeader>
        <button type="button" className="p-2" onClick={handleCancelLetter}>
          취소
        </button>
        <button
          type="submit"
          className={`p-2 ${isActive ? "text-green-300" : "text-grey-300"}`}
        >
          등록
        </button>
      </ActionHeader>

      {/* 중앙 image-preview, textarea */}
      <div className="overflow-auto-hide-scroll flex flex-1 flex-col">
        {imageCount > 0 && (
          <ImagePreviewer
            imageUrls={previewUrl}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        )}
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

      {/* modal */}
      {isAlertOpen && (
        <AlertDialog setIsOpen={setIsAlertOpen}>
          {renderMessageWithLineBreaks(warningMessage)}
        </AlertDialog>
      )}
      {isConfirmOpen && (
        <ConfirmDialog
          setIsOpen={setIsConfirmOpen}
          action={router.back}
          actionLabel={"확인"}
        >
          {renderMessageWithLineBreaks(warningMessage)}
        </ConfirmDialog>
      )}
      {isComplete && <CompleteLetter />}
      {selectedImageIndex !== null && (
        <PhotoEditor
          imageUrl={previewUrl[selectedImageIndex]}
          onSave={handleSaveEditedImage}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </form>
  );
};

export default PostEditor;
