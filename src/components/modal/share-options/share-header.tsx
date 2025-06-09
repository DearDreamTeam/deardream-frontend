import Cancel from "@/public/icons/common/cancel.svg";

const ShareHeader = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <header className="flex justify-between py-2">
      <h1 className="text-label-1">공유하기</h1>
      <button onClick={closeModal}>
        <Cancel />
      </button>
    </header>
  );
};

export default ShareHeader;
