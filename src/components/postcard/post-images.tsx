import "react-loading-skeleton/dist/skeleton.css";
import ImageFallback from "./image-fallback";

const PostImages = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="flex justify-center gap-1 rounded-sm py-1">
      {imgUrls.map((url, idx) => (
        <ImageFallback
          key={idx}
          url={url}
          width={imgUrls.length === 2 ? 170 : 344}
          aspectIndex={imgUrls.length - 1}
        />
      ))}
    </div>
  );
};

export default PostImages;
