import { Post } from "@/types/post-type";
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
}: Post) => {
  return (
    <div className="postcard-wrapper">
      <div className="postcard-container">
        <PostInfo
          authorId={authorId}
          authorName={authorName}
          relations={relations}
          createdAt={createdAt}
          postId={postId}
          authorProfileImg={authorProfileImg}
        />
        {!!imageUrls.length && <PostImages imgUrls={imageUrls} />}
        <PostContext content={content} />
      </div>
    </div>
  );
};

export default Postcard;
