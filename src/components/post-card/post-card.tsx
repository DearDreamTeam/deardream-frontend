import { PostcardProps } from "@/types/postcard-props";
import PostContext from "./post-context";
import PostImages from "./post-images";
import PostInfo from "./post-info";

const PostCard = ({
  postId,
  name,
  relation,
  profileImg,
  content,
  createdAt,
  postImg,
}: PostcardProps) => {
  return (
    <div className="bg-grey-0 px-4">
      <div className="border-b-grey-200 border-b py-4">
        <PostInfo
          postId={postId}
          name={name}
          relation={relation}
          profileImg={profileImg}
          createdAt={createdAt}
        />
        {!!postImg.length && <PostImages imgUrls={postImg} />}
        <PostContext content={content} />
      </div>
    </div>
  );
};

export default PostCard;
