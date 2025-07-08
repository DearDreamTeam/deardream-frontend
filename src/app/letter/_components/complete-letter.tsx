import { useUserStore } from "@/stores/useUserStore";
import StateTemplate from "@/components/template/state-template";
import LetterImage from "@/components/images/letter-image";
import EllipseImage from "@/components/images/ellipse-image";

const CompleteLetter = () => {
  return (
    <div className="modal-container">
      <div className="bg-grey-0 fixed inset-0" />
      <div className="z-30 w-full">
        <StateTemplate>
          <StateTemplate.ImageFiled>
            <EllipseImage color="green-100" />
            <LetterImage />
          </StateTemplate.ImageFiled>
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
