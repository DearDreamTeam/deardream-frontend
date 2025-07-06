import Dialog from "./dialog";
import { ConfirmDialogProps } from "@/types/dialog-props";

const ConfirmDialog = ({
  setIsOpen,
  action,
  actionLabel = "삭제",
  children,
}: ConfirmDialogProps) => {
  return (
    <Dialog>
      <Dialog.Message>{children}</Dialog.Message>
      <Dialog.Actions>
        <button
          type="button"
          onClick={action}
          className="text-main-red-300 modal-btn border-r border-r-gray-200"
        >
          {actionLabel}
        </button>
        <button
          type="button"
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
