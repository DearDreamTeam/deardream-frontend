import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";

const CompleteLetter = () => {
  return (
    <div className="modal-container">
      <div className="bg-sub-blue-300 fixed inset-0" />
      <div className="relative z-50">
        <Image
          src={"/images/mailbox-3d-white.svg"}
          alt="img"
          width={274}
          height={285}
        />
        <div className="flex flex-col gap-4 py-[1.43rem] text-center">
          <h1 className="text-headline-1">소중한 소식 작성 완료!</h1>
          <p className="text-label-1">
            <strong>{useUserStore.getState().user.name}</strong>님의 마음이 닿길
            원하는 그곳까지,
            <br />
            이어드림이 정성껏 이어드릴게요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompleteLetter;
