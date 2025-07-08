"use client";
import { usePostStore } from "@/stores/usePostStore";
import NoPost from "./_components/no-post";
import Postcard from "@/components/postcard/postcard";
import { useUserStore } from "@/stores/useUserStore";
import NoFamilyGroup from "./_components/no-family-group";
import HomeBanner from "./_components/home-banner";
import PeriodNotification from "./_components/period-notification";

const Home = () => {
  const { post } = usePostStore();
  const { user } = useUserStore();

  if (user.familyId === null) return <NoFamilyGroup />;
  if (post.length === 0) return <NoPost />;

  return (
    <div className="overflow-auto-hide-scroll h-full">
      <HomeBanner />
      <PeriodNotification />
      {post.map((letter) => (
        <Postcard
          key={letter.postId}
          postId={letter.postId}
          name={user.name}
          relation={user.relation}
          profileImg={user.profileImage}
          createdAt={letter.createdAt}
          content={letter.content}
          postImg={[...letter.imgUrls]}
          aspectIndex={letter.aspectIndex}
        />
      ))}
    </div>
  );
};

export default Home;
