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
    <div className="relative aspect-[3/4] w-full">
      <Image
        src={url}
        alt={"image"}
        fill
        className="rounded-sm object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default ImageFallback;
