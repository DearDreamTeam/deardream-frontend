import imageCompression from "browser-image-compression";

export const compressImage = async (file: File, maxMB?: number) => {
  const options = {
    maxSizeMB: maxMB ?? 1,
    maxWidthOrHeight: 1023,
    useWebWorker: true,
  };

  try {
    const compressedBlob = await imageCompression(file, options);

    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
      lastModified: Date.now(),
    });

    return compressedFile;
  } catch (error) {
    console.error("이미지 압축 실패", error);
    return file;
  }
};
