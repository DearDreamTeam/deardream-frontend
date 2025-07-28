"use client";
import { useEffect, useState } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserInfoStore";

import HomeBanner from "./_components/home-banner";
import PeriodNotification from "./_components/period-notification";
import NoPost from "./_components/no-post";
import NoFamilyGroup from "./_components/no-family-group";
import Postcard from "@/components/postcard/postcard";
import PostcardSkeleton from "@/components/skeleton/postcard-skeleton";
import dynamic from "next/dynamic";

const PullToRefresh = dynamic(() => import("react-pull-to-refresh"), {
  ssr: false,
});

import { getFamilyPosts } from "@/api/post";

const Home = () => {
  const { post, setPost } = usePostStore();
  const { userProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFamilyPosts = async () => {
    if (userProfile.familyId) {
      const posts = await getFamilyPosts(userProfile.familyId);
      setPost(posts);
    }
  };

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
    <PullToRefresh
      onRefresh={fetchFamilyPosts}
      className="overflow-auto-hide-scroll h-full"
      style={{
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
      }}
    >
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
    </PullToRefresh>
  );
};

export default Home;
