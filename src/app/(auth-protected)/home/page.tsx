"use client";
import { usePostStore } from "@/stores/usePostStore";
import NoPost from "./_components/no-post";
import Postcard from "@/components/postcard/postcard";
import { useUserStore } from "@/stores/useUserInfoStore";
import NoFamilyGroup from "./_components/no-family-group";
import HomeBanner from "./_components/home-banner";
import PeriodNotification from "./_components/period-notification";
import { useEffect, useState } from "react";
import { getFamilyPosts } from "@/api/post";
import PostcardSkeleton from "@/components/skeleton/postcard-skeleton";

const Home = () => {
  const { post, setPost } = usePostStore();
  const { userProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile.familyId) {
      const fetchData = async () => {
        const posts = await getFamilyPosts(userProfile.familyId!);
        setPost(posts);
        setIsLoading(true);
      };
      fetchData();
    }
  }, [userProfile.familyId]);

  if (userProfile.familyId === null) return <NoFamilyGroup />;
  if (!isLoading) return <PostcardSkeleton />;
  if (isLoading && post.length === 0) return <NoPost />;

  return (
    <div className="overflow-auto-hide-scroll h-full">
      <HomeBanner />
      <PeriodNotification />
      {post
        .slice()
        .reverse()
        .map((letter) => (
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
