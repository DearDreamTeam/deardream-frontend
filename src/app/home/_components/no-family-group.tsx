import { useUserStore } from "@/stores/useUserStore";
import StateTemplate from "@/components/template/state-template";
import MakeFamilyGroupButton from "@/components/button/make-family-group-button";

const NoFamilyGroup = () => {
  return (
    <StateTemplate src="/images/ribbon/ribbon-full.svg" width={161.3}>
      <StateTemplate.Title>앗! 아직 그룹이 없어요</StateTemplate.Title>
      <StateTemplate.Content>
        <strong>{useUserStore.getState().user.name}</strong>님 만의 드림그룹을
        만들고,
        <br />
        따뜻한 이야기를 함께 나눠보세요.
      </StateTemplate.Content>
      <StateTemplate.Action>
        <MakeFamilyGroupButton />
      </StateTemplate.Action>
    </StateTemplate>
  );
};

export default NoFamilyGroup;
