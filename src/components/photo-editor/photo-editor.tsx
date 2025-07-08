"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import AspectRatioOptions from "./aspect-ratio-options";
import ActionIconBar from "./action-icon-bar";
import {
  getEditedImageUrl,
  getFlippedImageUrl,
} from "@/utils/get-edited-image-url";
import { EditedProps } from "@/types/editable-image";

const PhotoEditor = ({
  imageUrl,
  onSave,
  onClose,
  aspectRatio,
  isProfile = false,
}: {
  imageUrl: string;
  aspectRatio: number;
  onSave: (editedUrl: string, editedProps: EditedProps) => void;
  onClose: () => void;
  isProfile?: boolean;
}) => {
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log("complete 실행, croppedAreaPixels", croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const { editedUrl } = await getEditedImageUrl(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      onSave(editedUrl, { crop, zoom, rotation });
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const rotateLeft = useCallback(() => {
    setRotation((prev) => prev - 90);
  }, []);

  const handleFlipX = async () => {
    const flippedUrl = await getFlippedImageUrl(imageSrc);
    setImageSrc(flippedUrl);
  };

  return (
    <div className="bg-grey-900 fixed inset-0 z-50 box-border flex items-center justify-center">
      <div className="relative h-full w-full">
        <div className={`h-full w-full pb-[8.4rem]`}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape={isProfile ? "round" : "rect"}
          />
        </div>
        <div className="bg-grey-900 fixed bottom-0 w-full px-4 py-6">
          {!isProfile && <AspectRatioOptions aspectRatio={aspectRatio} />}
          <ActionIconBar
            onClose={onClose}
            toggleFlipX={handleFlipX}
            rotateLeft={rotateLeft}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
