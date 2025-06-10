import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostImages = () => {
  return (
    <div className="rounded-25 flex justify-center gap-1 py-1">
      <Skeleton height={194} width={170} />
      <Skeleton height={194} width={170} />
    </div>
  );
};

export default PostImages;
