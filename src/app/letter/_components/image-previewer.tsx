import ImageFallback from "@/components/post-card/image-fallback";

const ImagePreviewer = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <div className="flex w-full justify-around gap-1 py-5">
      {imageUrls?.map((url, idx) => (
        <ImageFallback
          key={idx}
          url={url}
          width={imageUrls.length === 2 ? 170 : 344}
        />
      ))}
    </div>
  );
};

export default ImagePreviewer;
