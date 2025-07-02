import { useUserStore } from "@/stores/useUserStore";
import StateTemplate from "@/components/template/state-template";

const CompleteLetter = () => {
  return (
    <div className="modal-container">
      <div className="bg-grey-0 fixed inset-0" />
      <div className="z-30 w-full">
        <StateTemplate src={"/images/mail.png"} width={161.3}>
          <StateTemplate.Title>소중한 소식 작성 완료!</StateTemplate.Title>
          <StateTemplate.Content>
            <strong>{useUserStore.getState().user.name}</strong>님의 마음이 닿길
            원하는 그곳까지,
            <br />
            이어드림이 정성껏 이어드릴게요.
          </StateTemplate.Content>
        </StateTemplate>
      </div>
    </div>
  );
};

export default CompleteLetter;
