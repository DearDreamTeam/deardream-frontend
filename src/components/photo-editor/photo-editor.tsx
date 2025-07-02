"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import AspectRatioOptions from "./aspect-ratio-options";
import ActionIconBar from "./action-icon-bar";
import { getEditedImageUrl } from "@/utils/get-edited-image-url";

const PhotoEditor = ({
  imageUrl,
  onSave,
  onClose,
  isProfile = false,
}: {
  imageUrl: string;
  onSave: (editedUrl: string, editedFile: File) => void;
  onClose: () => void;
  isProfile?: boolean;
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState(3 / 4);
  const [flipX, setFlipX] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const { editedUrl, editedfile } = await getEditedImageUrl(
        imageUrl,
        croppedAreaPixels,
        rotation,
        flipX,
      );
      onSave(editedUrl, editedfile);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const rotateLeft = useCallback(() => {
    setRotation((prev) => prev - 90);
  }, []);

  const toggleFlipX = () => setFlipX((prev) => !prev);

  return (
    <div className="bg-grey-900 fixed inset-0 z-50 box-border flex items-center justify-center">
      <div className="relative h-full w-full">
        <div
          className={`h-full w-full pb-[8.4rem] ${flipX ? "scale-x-[-1]" : ""}`}
        >
          <Cropper
            image={imageUrl}
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
          {!isProfile && (
            <AspectRatioOptions
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
            />
          )}
          <ActionIconBar
            onClose={onClose}
            toggleFlipX={toggleFlipX}
            rotateLeft={rotateLeft}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
