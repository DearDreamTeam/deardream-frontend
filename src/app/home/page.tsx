"use client";
import { usePostStore } from "@/stores/usePostStore";
import NoPost from "./_components/no-post";
import PostCard from "@/components/post-card/post-card";
import { useUserStore } from "@/stores/useUserStore";

const Home = () => {
  const { post } = usePostStore();
  const { user } = useUserStore();
  if (post.length === 0) return <NoPost />;
  return (
    <div className="overflow-auto-hide-scroll h-full">
      {post.map((letter) => (
        <PostCard
          key={letter.postId}
          postId={letter.postId}
          name={user.name}
          relation={user.relation}
          profileImg={user.profileImage}
          createdAt={letter.createdAt}
          content={letter.content}
          postImg={[...letter.imgUrls]}
        />
      ))}
    </div>
  );
};

export default Home;
