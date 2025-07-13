import { Area } from "react-easy-crop";

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // CORS 문제 방지
    image.src = url;
  });
};

const getRadianAngle = (degreeValue: number): number => {
  return (degreeValue * Math.PI) / 180;
};

export const getFlippedImageUrl = async (imageSrc: string): Promise<string> => {
  const img = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context not available");

  // 3. 좌우 반전
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Failed to convert canvas to Blob");

      const flippedUrl = URL.createObjectURL(blob);
      URL.revokeObjectURL(imageSrc); // 메모리 정리
      resolve(flippedUrl);
    }, "image/png");
  });
};

const getResourceFilename = (url: string) => {
  return url.split("/").pop() || "image.png";
};

export const getEditedImageUrl = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
): Promise<{ editedUrl: string; editedFile: File }> => {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2d context");

  const rotRad = getRadianAngle(rotation);

  // 이미지 크기 계산
  const bBoxWidth =
    Math.abs(Math.cos(rotRad) * image.width) +
    Math.abs(Math.sin(rotRad) * image.height);
  const bBoxHeight =
    Math.abs(Math.sin(rotRad) * image.width) +
    Math.abs(Math.cos(rotRad) * image.height);

  // 캔버스 크기
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 1. 크롭 위치로 이동
  ctx.translate(-pixelCrop.x, -pixelCrop.y);

  // 2. 이미지 중심으로 이동
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);

  // 3. rotate 적용
  ctx.rotate(rotRad);

  // 4. 이미지 그리기
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise<{ editedUrl: string; editedFile: File }>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Canvas is empty");
      const filename = getResourceFilename(imageSrc);
      const editedFile = new File([blob], `${filename}.png`, {
        type: "image/png",
      });
      const editedUrl = URL.createObjectURL(blob);

      resolve({ editedUrl, editedFile });
    }, "image/png");
  });
};
