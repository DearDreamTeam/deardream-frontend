import Cancel from "@/public/icons/common/cancel.svg";

const ShareHeader = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <header className="flex justify-between py-[0.62rem]">
      <h1 className="text-headline-1">초대 링크 공유하기</h1>
      <button onClick={closeModal}>
        <Cancel />
      </button>
    </header>
  );
};

export default ShareHeader;
