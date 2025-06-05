import Dialog from "./dialog";

const ConfirmDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <Dialog.Message>{children}</Dialog.Message>
      <Dialog.Actions>
        <button className="text-main-red-300 modal-btn border-r border-r-gray-200">
          삭제
        </button>
        <button className="modal-btn text-gray-700">취소</button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmDialog;
