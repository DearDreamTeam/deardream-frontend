import Image from "next/image";
import MoreButton from "@/components/button/more-button";
import { useUserStore } from "@/stores/useUserInfoStore";
import { Post } from "@/types/post-type";
import { formatDateToDots } from "@/utils/format-date";
import { DEFAULT_IMAGE_PATH } from "@/constants/path";

const PostInfo = ({
  authorId,
  postId,
  authorName,
  relations,
  createdAt,
  authorProfileImg,
}: Pick<
  Post,
  | "authorId"
  | "postId"
  | "authorName"
  | "relations"
  | "createdAt"
  | "authorProfileImg"
>) => {
  return (
    <div className="flex items-center gap-1 px-[0.13rem] py-1">
      <Image
        src={authorProfileImg || DEFAULT_IMAGE_PATH}
        alt={"프로필 이미지"}
        width={36}
        height={36}
        className="rounded-full"
      />
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
        {useUserStore.getState().userProfile.id === authorId && (
          <MoreButton postId={postId} />
        )}
      </div>
    </div>
  );
};

export default PostInfo;
