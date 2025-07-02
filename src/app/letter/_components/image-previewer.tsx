import ImageFallback from "@/components/post-card/image-fallback";
import DeleteButton from "@/public/icons/buttons/image-delete.svg";

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
        <div key={idx} className="relative w-full">
          <div className="w-full" onClick={() => setSelectedImageIndex(idx)}>
            <ImageFallback
              url={url}
              width={imageUrls.length === 2 ? 170 : 344}
            />
          </div>
          <button type="button" className="absolute top-1 right-1">
            <DeleteButton />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
