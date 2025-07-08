"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ASPECT_RATIO_ITEMS } from "@/types/editable-image";

const ImageFallback = ({
  url,
  width,
  aspectIndex,
}: {
  url: string;
  width: number;
  aspectIndex: number;
}) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <Skeleton height={194} width={width} />
  ) : (
    <div className={`relative w-full ${ASPECT_RATIO_ITEMS[aspectIndex].class}`}>
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
