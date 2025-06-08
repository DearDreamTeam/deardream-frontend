import InviteFamilyButton from "@/components/button/invite-family-button";
import PostCard from "@/components/post-card/post-card";
import Image from "next/image";

const Home = () => {
  return (
    <div className="overflow-auto-hide-scroll flex h-full flex-col justify-center">
      <Image
        src={"/images/mailbox-empty.svg"}
        alt={"홈페이지 이미지"}
        width={198.14}
        height={218.67}
        className="self-center pr-8"
      />
      <div className="flex flex-col items-center gap-4 pb-8">
        <p className="text-label-2 text-center">
          앗! 아직 아무런 소식이 없어요. <br /> 가족을 초대하고 풍성히
          채워나가볼까요?
        </p>
        <InviteFamilyButton />
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
