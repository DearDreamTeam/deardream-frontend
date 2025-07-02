import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { PostcardProps } from "@/types/postcard-props";
import { formatDateToDots } from "@/utils/format-date-to-dots";
import MoreButton from "@/components/button/more-button";
import Image from "next/image";

const PostInfo = ({
  postId,
  name,
  relation,
  createdAt,
  profileImg,
}: Pick<
  PostcardProps,
  "postId" | "name" | "relation" | "createdAt" | "profileImg"
>) => {
  return (
    <div className="flex items-center gap-1 px-[0.13rem] py-1">
      {profileImg ? (
        <Image
          src={profileImg}
          alt={"프로필 이미지"}
          width={36}
          height={36}
          className="rounded-full"
        />
      ) : (
        <Skeleton circle={true} width={36} height={36} />
      )}
      <div className="flex flex-1">
        <div className="flex-1">
          <p className="text-body-2 flex gap-[0.12rem]">
            <span className="text-green-300">{relation}</span>
            <span>{name}</span>
          </p>
          <p className="text-caption-2 text-grey-300">
            {formatDateToDots(createdAt)}
          </p>
        </div>
        <MoreButton postId={postId} />
      </div>
    </div>
  );
};

export default PostInfo;
