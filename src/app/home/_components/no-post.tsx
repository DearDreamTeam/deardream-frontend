import InviteFamilyButton from "@/components/button/invite-family-button";
import KakaoShareScript from "@/components/scripts/kakao-share-script";
import StateTemplate from "@/components/template/state-template";

const NoPost = () => {
  return (
    <StateTemplate src="/images/ribbon/ribbon-full.svg">
      <StateTemplate.Title>앗! 소식함이 비어있어요</StateTemplate.Title>

      <StateTemplate.Content>
        가장 먼저 소식을 남기거나,
        <br />
        멤버들을 초대해 우리만의 소식함을
        <br />
        함께 풍성하게 채워보는 건 어떨까요?
      </StateTemplate.Content>

      <StateTemplate.Action>
        <InviteFamilyButton />
      </StateTemplate.Action>
      <KakaoShareScript />
    </StateTemplate>
  );
};

export default NoPost;
