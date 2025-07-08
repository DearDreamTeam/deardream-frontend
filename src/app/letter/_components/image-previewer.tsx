import ImageFallback from "@/components/post-card/image-fallback";
import DeleteButton from "@/public/icons/buttons/image-delete.svg";
import { EditableImage } from "@/types/editable-image";

const ImagePreviewer = ({
  imageFiles,
  setSelectedImageId,
  aspectIndex,
  deleteFile,
}: {
  imageFiles: EditableImage[];
  setSelectedImageId: (url: number) => void;
  aspectIndex: number;
  deleteFile: (fileId: number) => void;
}) => {
  return (
    <div className="flex w-full justify-around gap-1 py-5">
      {imageFiles?.map((item) => (
        <div key={item.fileId} className="relative w-full">
          <div
            className="w-full"
            onClick={() => setSelectedImageId(item.fileId)}
          >
            <ImageFallback
              url={item.previewUrl}
              width={imageFiles.length === 2 ? 170 : 344}
              aspectIndex={aspectIndex}
            />
          </div>
          <button
            onClick={() => deleteFile(item.fileId)}
            type="button"
            className="absolute top-1 right-1"
          >
            <DeleteButton />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
