import InviteFamilyButton from "@/components/button/invite-family-button";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <Image
        src={"/images/mailbox-empty.svg"}
        alt={"홈페이지 이미지"}
        width={198.14}
        height={218.67}
        className="pr-8"
      />
      <div className="flex flex-col items-center gap-4">
        <p className="text-label-2 text-center">
          앗! 아직 아무런 소식이 없어요. <br /> 가족을 초대하고 풍성히
          채워나가볼까요?
        </p>
        <InviteFamilyButton />
      </div>
    </main>
  );
};

export default Home;
