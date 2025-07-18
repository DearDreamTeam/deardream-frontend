import StateTemplate from "@/components/template/state-template";
import MakeFamilyGroupButton from "@/components/button/make-family-group-button";
import RibbonImage from "@/components/images/ribbon-image";

const NoFamilyGroup = () => {
  return (
    <StateTemplate>
      <RibbonImage />

      <StateTemplate.Title>아직 그룹이 없어요</StateTemplate.Title>

      <StateTemplate.Content>
        가족 그룹을 만들고,
        <br />
        따뜻한 이야기를 함께 나눠보세요
      </StateTemplate.Content>

      <StateTemplate.Action>
        <MakeFamilyGroupButton />
      </StateTemplate.Action>
    </StateTemplate>
  );
};

export default NoFamilyGroup;
