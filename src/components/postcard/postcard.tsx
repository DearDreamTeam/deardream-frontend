import { PostcardProps } from "@/types/postcard-props";
import PostContext from "./post-context";
import PostImages from "./post-images";
import PostInfo from "./post-info";

const Postcard = ({
  authorId,
  postId,
  authorName,
  relations,
  authorProfileImg,
  content,
  createdAt,
  imageUrls,
  aspectIndex,
}: PostcardProps) => {
  return (
    <div className="bg-grey-0 px-4">
      <div className="border-b-grey-200 border-b py-4">
        <PostInfo
          authorId={authorId}
          authorName={authorName}
          relations={relations}
          createdAt={createdAt}
          postId={postId}
          authorProfileImg={authorProfileImg}
        />
        {!!imageUrls.length && (
          <PostImages imgUrls={imageUrls} aspectIndex={aspectIndex} />
        )}
        <PostContext content={content} />
      </div>
    </div>
  );
};

export default Postcard;
