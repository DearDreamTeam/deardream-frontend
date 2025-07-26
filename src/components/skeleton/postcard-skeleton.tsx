import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostcardSkeleton = () => {
  return (
    <div>
      <div className="postcard-wrapper">
        <div className="postcard-container flex flex-col gap-2">
          <div className="postcard-info-container">
            <Skeleton height={36} width={36} circle={true} />
            <Skeleton width={70} height={36} />
          </div>
          <Skeleton height={194} className="py-2" />
          <Skeleton height={81} className="py-2" />
        </div>
      </div>

      <div className="postcard-wrapper">
        <div className="postcard-container flex flex-col gap-2">
          <div className="postcard-info-container">
            <Skeleton height={36} width={36} circle={true} />
            <Skeleton width={70} height={36} />
          </div>
          <Skeleton height={81} className="py-2" />
        </div>
      </div>
    </div>
  );
};

export default PostcardSkeleton;
