import Dialog from "./dialog";
import { DialogProps } from "@/types/dialog-props";

const ConfirmDialog = ({ setIsOpen, children }: DialogProps) => {
  return (
    <Dialog>
      <Dialog.Message>{children}</Dialog.Message>
      <Dialog.Actions>
        <button className="text-main-red-300 modal-btn border-r border-r-gray-200">
          삭제
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="modal-btn text-gray-700"
        >
          취소
        </button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmDialog;
