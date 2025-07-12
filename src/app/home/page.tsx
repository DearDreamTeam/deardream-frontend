"use client";
import { usePostStore } from "@/stores/usePostStore";
import NoPost from "./_components/no-post";
import Postcard from "@/components/postcard/postcard";
import { useUserStore } from "@/stores/useUserStore";
import NoFamilyGroup from "./_components/no-family-group";
import HomeBanner from "./_components/home-banner";
import PeriodNotification from "./_components/period-notification";
import { useEffect } from "react";
import { getFamilyPosts } from "@/api/post";

const Home = () => {
  const { post, setPost } = usePostStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user.familyId) {
      const fetchData = async () => {
        const posts = await getFamilyPosts(user.familyId ?? 2);
        setPost(posts);
      };
      fetchData();
    }
  }, []);

  if (user.familyId === null) return <NoFamilyGroup />;
  if (post.length === 0) return <NoPost />;

  return (
    <div className="overflow-auto-hide-scroll h-full">
      <HomeBanner />
      <PeriodNotification />
      {post.map((letter) => (
        <Postcard
          authorId={letter.authorId}
          key={letter.postId}
          postId={letter.postId}
          authorName={letter.authorName}
          relations={letter.relations}
          authorProfileImg={letter.authorProfileImg}
          createdAt={letter.createdAt}
          content={letter.content}
          imageUrls={letter.imageUrls}
        />
      ))}
    </div>
  );
};

export default Home;
