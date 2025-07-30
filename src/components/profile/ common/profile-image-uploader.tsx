import { useRef, useState } from "react";
import Image from "next/image";
import Pencil from "@/public/icons/common/pencil.svg";
import PhotoEditor from "@/components/photo-editor/photo-editor";
import { EditableImage, EditedProps } from "@/types/editable-image";
import { UserProfileInfo } from "@/types/user-info";
import { ReceiverProfileInfo } from "@/stores/useReceiverStore";

interface ProfileImageUploaderProps {
  imageUrl: string;
  editUserProfile?: UserProfileInfo | ReceiverProfileInfo;
  setImageUrl?: (url: string) => void;
  setSelectedFile?: (file: File) => void;
}

const ProfileImageUploader = ({
  imageUrl,
  editUserProfile,
  setImageUrl,
  setSelectedFile,
}: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState(false);
  const [editedProps, setEditedProps] = useState<EditableImage | null>(
    editUserProfile?.profileImage
      ? {
          originalFile: null,
          originalUrl: imageUrl,
          previewUrl: imageUrl,
          editedProps: null,
        }
      : null,
  );
  const [previewUrl, setPreviewUrl] = useState(imageUrl); // ← 새로 추가

  const handleSaveEditedImage = (
    editedUrl: string,
    editedFile: File,
    editedProps: EditedProps,
  ) => {
    setEditedProps({
      originalFile: editedFile,
      originalUrl: URL.createObjectURL(editedFile),
      previewUrl: editedUrl,
      editedProps,
    });

    setImageUrl?.(editedUrl); //  실제 이미지 보여주기
    setSelectedFile?.(editedFile); //  부모에게 전달해서 저장에 반영되도록
  };

  const onFileSelect = (file: File) => {
    setSelectedFile?.(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImageUrl?.(result);
      setPreviewUrl(result);
      setIsPhotoEditorOpen(true);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="relative mt-8 h-[98px] w-[98px]">
      <Image
        src={imageUrl || "/images/default-img.svg"}
        alt="프로필 이미지"
        fill
        className="rounded-full object-cover"
        onError={() => {
          // fallback 처리: props로 넘겨도 되고 내부에서 처리해도 됨
        }}
      />
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelect(file); // ⬅ 파일 전달
          }
        }}
        accept="image/*"
        hidden
      />
      <div
        onClick={() => {
          inputRef.current?.click();
        }}
        className="absolute right-0 bottom-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-green-300 p-1"
      >
        <Pencil />
      </div>
      {isPhotoEditorOpen && (
        <PhotoEditor
          imageUrl={previewUrl}
          onSave={handleSaveEditedImage}
          editedProps={editedProps?.editedProps}
          onClose={() => setIsPhotoEditorOpen(false)}
          isProfile={true}
          aspectRatio={1}
        />
      )}
    </div>
  );
};

export default ProfileImageUploader;
