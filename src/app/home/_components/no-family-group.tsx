import { useUserStore } from "@/stores/useUserStore";
import EmptyStateLayout from "./empty-state-layout";
import Group from "@/public/icons/invite/group.svg";

const NoFamilyGroup = () => {
  return (
    <EmptyStateLayout src="/images/table.png">
      <EmptyStateLayout.Text>
        <p className="text-headline-1">앗! 아직 그룹이 없어요</p>
        <p className="text-label-2 text-center">
          <strong>{useUserStore.getState().user.name}</strong>님 만의 드림그룹을
          만들고,
          <br />
          따뜻한 이야기를 함께 나눠보세요.
        </p>
      </EmptyStateLayout.Text>
      <EmptyStateLayout.Action>
        <button className="button flex items-center justify-center gap-1">
          <Group />
          <span>드림그룹 만들기</span>
        </button>
      </EmptyStateLayout.Action>
    </EmptyStateLayout>
  );
};

export default NoFamilyGroup;
