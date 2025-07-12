import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { PostcardProps } from "@/types/postcard-props";
import { formatDateToDots } from "@/utils/format-date";
import MoreButton from "@/components/button/more-button";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";

const PostInfo = ({
  authorId,
  postId,
  authorName,
  relations,
  createdAt,
  authorProfileImg,
}: Pick<
  PostcardProps,
  | "authorId"
  | "postId"
  | "authorName"
  | "relations"
  | "createdAt"
  | "authorProfileImg"
>) => {
  return (
    <div className="flex items-center gap-1 px-[0.13rem] py-1">
      {authorProfileImg ? (
        <Image
          src={authorProfileImg}
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
            <span className="text-green-300">{relations}</span>
            <span>{authorName}</span>
          </p>
          <p className="text-caption-2 text-grey-300">
            {formatDateToDots(createdAt)}
          </p>
        </div>
        {useUserStore.getState().user.userId === authorId && (
          <MoreButton postId={postId} />
        )}
      </div>
    </div>
  );
};

export default PostInfo;
