"use client";
import ActionHeader from "@/components/header/action-header";
import TextField from "@/app/letter/_components/text-field";
import TypeBar from "@/app/letter/_components/type-bar";
import ImagePreviewer from "../_components/image-previewer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const New = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");

  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <ActionHeader>
        <button className="p-2" onClick={router.back}>
          취소
        </button>
        <button className="p-2" disabled>
          등록
        </button>
      </ActionHeader>

      <div className="overflow-auto-hide-scroll flex flex-1 flex-col">
        <ImagePreviewer imageFiles={imageFiles} />
        <TextField content={content} setContent={setContent} />
      </div>

      <TypeBar
        imgLength={imageFiles.length}
        typedLength={content.length}
        setImageFiles={setImageFiles}
      />
    </div>
  );
};

export default New;
