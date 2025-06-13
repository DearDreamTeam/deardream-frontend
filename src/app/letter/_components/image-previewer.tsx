"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ImagePreviewer = ({ imageFiles }: { imageFiles: File[] }) => {
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

  return (
    <div className="flex w-full justify-around gap-1 py-5">
      {previewUrl?.map((url, idx) => (
        <div key={idx} className="relative h-[13rem] w-full">
          <Image
            src={url}
            alt={"image"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-25"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
