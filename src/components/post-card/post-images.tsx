import "react-loading-skeleton/dist/skeleton.css";
import ImageFallback from "./image-fallback";

const PostImages = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="rounded-25 flex justify-center gap-1 py-1">
      {imgUrls.map((url, idx) => (
        <ImageFallback
          key={idx}
          url={url}
          width={imgUrls.length === 2 ? 170 : 344}
        />
      ))}
    </div>
  );
};

export default PostImages;
