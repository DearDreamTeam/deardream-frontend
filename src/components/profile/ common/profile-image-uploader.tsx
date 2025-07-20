import { useRef } from "react";
import Image from "next/image";
import Pencil from "@/public/icons/common/pencil.svg";

interface ProfileImageUploaderProps {
  imageUrl: string;
  onFileSelect: (file: File) => void;
}

const ProfileImageUploader = ({
  imageUrl,
  onFileSelect,
}: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
          if (file) onFileSelect(file);
        }}
        accept="image/*"
        hidden
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="absolute right-0 bottom-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-green-300 p-1"
      >
        <Pencil />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
