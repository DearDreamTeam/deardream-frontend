import ImageFallback from "@/components/post-card/image-fallback";

const ImagePreviewer = ({
  imageUrls,
  setSelectedImageIndex,
}: {
  imageUrls: string[];
  setSelectedImageIndex: (url: number) => void;
}) => {
  return (
    <div className="flex w-full justify-around gap-1 py-5">
      {imageUrls?.map((url, idx) => (
        <div
          key={idx}
          className="w-full"
          onClick={() => setSelectedImageIndex(idx)}
        >
          <ImageFallback url={url} width={imageUrls.length === 2 ? 170 : 344} />
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
