import InviteFamilyButton from "@/components/button/invite-family-button";
import EmptyStateLayout from "./empty-state-layout";

const NoPost = () => {
  return (
    <EmptyStateLayout>
      <EmptyStateLayout.Text>
        <p className="text-headline-1">앗! 소식함이 비어있어요</p>
        <p className="text-label-2 text-center">
          가장 먼저 소식을 남기거나,
          <br />
          멤버들을 초대해 우리만의 소식함을
          <br />
          함께 풍성하게 채워보는 건 어떨까요?
        </p>
      </EmptyStateLayout.Text>

      <EmptyStateLayout.Action>
        <InviteFamilyButton />
      </EmptyStateLayout.Action>
    </EmptyStateLayout>
  );
};

export default NoPost;
