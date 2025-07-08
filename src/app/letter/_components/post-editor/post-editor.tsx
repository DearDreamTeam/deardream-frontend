"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ActionHeader from "@/components/header/action-header";
import TextField from "@/app/letter/_components/text-field";
import TypeBar from "@/app/letter/_components/type-bar";
import ImagePreviewer from "@/app/letter/_components/image-previewer";
import TextLimit from "../text-limit";
import GalleryButton from "../gallery-button";

import { PostState } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { Post, PostBack, PostFront } from "@/types/post-type";
import { PostEditorProps } from "@/types/post-editor-props";
import { PATH } from "@/constants/path";
import { isContentValid } from "@/utils/post-content-rules";

import AlertDialog from "@/components/modal/dialog/alert-dialog";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import CompleteLetter from "../complete-letter";
import PhotoEditor from "@/components/photo-editor/photo-editor";
import { EditableImage, EditedProps } from "@/types/editable-image";

const PostEditor = ({ postcard, submitAction }: PostEditorProps) => {
  const fileIdRef = useRef(0);
  const router = useRouter();
  const [warningMessage, setWarningMessage] = useState({
    title: "",
    content: "",
  });

  /* modal open state */
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  /* inputs */
  const [content, setContent] = useState(postcard?.content ?? "");
  const [aspectIndex, setAspectIndex] = useState(postcard?.aspectIndex ?? 0);
  const [imageFiles, setImageFiles] = useState<EditableImage[]>(
    postcard?.imgUrls.map((url) => ({
      fileId: fileIdRef.current++,
      originalFile: null,
      originalUrl: url,
      previewUrl: url,
      editedProps: null,
    })) ?? [],
  );

  const [selectedImageId, setSelectedImageId] = useState<null | number>(null);

  /* derived states */
  const imageCount = imageFiles.length;
  const isActive = isContentValid(content, imageCount);

  useEffect(() => {
    const imgCount = imageFiles.length;
    if (imgCount === 0) return;
    setAspectIndex(imgCount - 1);
  }, [imageFiles]);

  const handleSubmitLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isActive) {
      if (imageCount > 0) {
        setWarningMessage(NOTIFICATION_MESSAGES.TEXT_LIMIT_INVALID.WITH_IMAGES);
      } else {
        setWarningMessage(
          NOTIFICATION_MESSAGES.TEXT_LIMIT_INVALID.WITHOUT_IMAGES,
        );
      }
      setIsAlertOpen(true);
      return;
    }

    if (postcard) {
      const letter: Post = {
        ...postcard,
        content: content,
        aspectIndex: aspectIndex,
      };
      const letterBack: PostBack = {
        ...letter,
        imgFiles: [], // .editedProps ? 생성 : originalFile
      };
      console.log(letterBack);
      const letterFront: PostFront = {
        ...letter,
        imgUrls: imageFiles.map((item) => item.previewUrl),
      };
      (submitAction as PostState["editPost"])(postcard.postId, letterFront);
    } else {
      const user = useUserStore.getState().user;
      const letter: Post = {
        postId: Date.now(),
        authorId: user.userId,
        familyId: user.familyId,
        content: content,
        createdAt: Date.now(),
        aspectIndex: aspectIndex,
      };

      const letterBack: PostBack = {
        ...letter,
        imgFiles: [], // .editedProps ? 생성 : originalFile
      };
      console.log(letterBack);

      const letterFront: PostFront = {
        ...letter,
        imgUrls: imageFiles.map((item) => item.previewUrl),
      };
      (submitAction as PostState["addPost"])(letterFront);
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
        setWarningMessage(NOTIFICATION_MESSAGES.WRITE_CANCEL_WARNING.EDIT);
        setIsConfirmOpen(true);
        return;
      }
    } else {
      if (content.trim() || imageCount) {
        setWarningMessage(NOTIFICATION_MESSAGES.WRITE_CANCEL_WARNING.NEW);
        setIsConfirmOpen(true);
        return;
      }
    }
    router.back();
  };

  const handleSaveEditedImage = (
    editedUrl: string,
    editedProps: EditedProps,
  ) => {
    if (selectedImageId === null) return;
    setImageFiles((prev) =>
      prev.map((item) =>
        item.fileId === selectedImageId
          ? {
              ...item,
              previewUrl: editedUrl,
              editedProps,
            }
          : item,
      ),
    );
    setSelectedImageId(null);
  };

  const deleteFile = (fileId: number) => {
    setImageFiles((prev) => prev.filter((item) => item.fileId !== fileId));
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
            imageFiles={imageFiles}
            setSelectedImageId={setSelectedImageId}
            aspectIndex={aspectIndex}
            deleteFile={deleteFile}
          />
        )}
        <TextField content={content} setContent={setContent} />
      </div>

      {/* 하단 type-bar */}
      <TypeBar>
        <GalleryButton
          imageCount={imageCount}
          setImageFiles={setImageFiles}
          fileIdRef={fileIdRef}
        />
        <TextLimit imageCount={imageCount} typedLength={content.length} />
      </TypeBar>

      {/* modal */}
      {isAlertOpen && (
        <AlertDialog
          title={warningMessage.title}
          content={renderMessageWithLineBreaks(warningMessage.content)}
          setIsOpen={setIsAlertOpen}
        />
      )}
      {isConfirmOpen && (
        <ConfirmDialog
          title={warningMessage.title}
          content={renderMessageWithLineBreaks(warningMessage.content)}
          setIsOpen={setIsConfirmOpen}
          action={router.back}
          actionLabel={"확인"}
        />
      )}
      {isComplete && <CompleteLetter />}
      {selectedImageId !== null && (
        <PhotoEditor
          imageUrl={
            imageFiles.find((item) => item.fileId === selectedImageId)
              ?.originalUrl as string
          }
          onSave={handleSaveEditedImage}
          onClose={() => setSelectedImageId(null)}
        />
      )}
    </form>
  );
};

export default PostEditor;
