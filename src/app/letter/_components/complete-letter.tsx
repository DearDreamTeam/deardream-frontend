import EmptyStateLayout from "@/app/home/_components/empty-state-layout";
import { useUserStore } from "@/stores/useUserStore";

const CompleteLetter = () => {
  return (
    <div className="modal-container">
      <div className="bg-sub-blue-300 fixed inset-0" />
      <EmptyStateLayout
        src={"/images/mailbox-one.svg"}
        bgSrc="/images/background-ellipse-w.png"
      >
        <EmptyStateLayout.Text>
          <p className="text-headline-1 z-30">소중한 소식 작성 완료!</p>
          <p className="text-label-2 z-30 text-center">
            <strong>{useUserStore.getState().user.name}</strong>님의 마음이 닿길
            원하는 그곳까지,
            <br />
            이어드림이 정성껏 이어드릴게요.
          </p>
        </EmptyStateLayout.Text>
      </EmptyStateLayout>
    </div>
  );
};

export default CompleteLetter;
