"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageFallback = ({ url, width }: { url: string; width: number }) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <Skeleton height={194} width={width} />
  ) : (
    <div className="relative h-[13rem] w-full">
      <Image
        src={url}
        alt={"image"}
        fill
        style={{ objectFit: "contain" }}
        className="rounded-25"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default ImageFallback;
