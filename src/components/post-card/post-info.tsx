import { PostCardType } from "@/types/post-card-type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import More from "@/public/icons/post-card/more.svg";
import { formatDateToDots } from "@/utils/format-date-to-dots";
const PostInfo = ({
  name,
  relation,
  createdAt,
}: Pick<PostCardType, "name" | "relation" | "createdAt">) => {
  return (
    <div className="flex items-center gap-1 px-[0.13rem] py-1">
      <Skeleton circle={true} width={36} height={36} />
      <div className="flex flex-1">
        <div className="flex-1">
          <p className="text-caption-1 flex gap-[0.12rem]">
            <span className="text-main-red-300">{relation}</span>
            <span>{name}</span>
          </p>
          <p className="text-caption-2 text-gray-500">
            {formatDateToDots(createdAt)}
          </p>
        </div>
        <button className="text-gray-500">
          <More />
        </button>
      </div>
    </div>
  );
};

export default PostInfo;
