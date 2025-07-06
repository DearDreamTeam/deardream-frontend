import { PostcardProps } from "@/types/postcard-props";
import PostContext from "./post-context";
import PostImages from "./post-images";
import PostInfo from "./post-info";
import { PostCardType } from "@/types/post-card-type";

const mockPostCard: PostCardType = {
  name: "김수진",
  relation: "딸",
  profileImg: "",
  createdAt: Date.now(), //timestamp
  content:
    "엄마, 우리 지후가 벌써 초등학생이 되었어요. 아직도 유치원 가방 메고 뛰어다니던 모습이 선한데, 오늘은 스스로 준비물도 잘 챙기고 학교에 다녀왔어요. 정말 대견해요~ 엄마도 잘 지내고 계신거죠? 너무 보고 싶어요. 곧 여름 휴가 때 찾아뵐게요.",
  postImg: "",
};

const PostCard = () => {
  const { name, relation, content, createdAt } = mockPostCard;
  return (
    <div className="bg-gray-0 px-4">
      <div className="border-b border-b-gray-200 py-4">
        <PostInfo
          name={name}
          relation={relation}
          createdAt={createdAt}
          postId={0}
          profileImg={null}
        />
        <PostImages imgUrls={[]} />
        <PostContext content={content} />
      </div>
    </div>
  );
};

export default PostCard;
