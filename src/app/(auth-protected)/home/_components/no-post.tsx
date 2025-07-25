import InviteFamilyButton from "@/components/button/invite-family-button";
import KakaoShareScript from "@/components/scripts/kakao-share-script";
import StateTemplate from "@/components/template/state-template";
import Image from "next/image";

const NoPost = () => {
  return (
    <StateTemplate>
      <Image
        src={`/images/mailbox.svg`}
        alt="mailbox img"
        width={96.67}
        height={131.19}
        className="py-3 pr-5"
      />
      <StateTemplate.Title>소식함이 비어있어요</StateTemplate.Title>

      <StateTemplate.Content>
        새 소식을 남기고 멤버들을 초대해
        <br />
        소식함을 풍성히 채워나가보세요
      </StateTemplate.Content>

      <StateTemplate.Action>
        <InviteFamilyButton />
      </StateTemplate.Action>
      <KakaoShareScript />
    </StateTemplate>
  );
};

export default NoPost;
